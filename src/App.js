import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';

const connectSocketServer = () => {
  const socketIo = io('http://localhost:8080', {
    transports: ['websocket']
  });
  return socketIo;
}

function App() {

  const [socket] = useState( connectSocketServer() );
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline( true );
    })
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline( false );
    })
  }, [socket]);


  useEffect(() => {
    socket.on('current-bands', data => {
      setBands(data);
    });
  }, [socket]);

  const addVoteBand = (id) => {
    socket.emit('add-vote', id);
  }

  const deleteBand = ( id ) => {
    socket.emit('delete-band', id);
  }

  const changeNameBand = (id, name) => {
    socket.emit('change-name-band', {id, name});
  }

  const createBand = ( name ) => {
    socket.emit('create-band', name);
  }
  
  return (
    <div className="container">

      <div>
        <p>
          Service status:
          {
            online
              ? (<span>Online</span>)
              : (<span>Offline</span>)
          }
        </p>
      </div>

      <h1>BandNames</h1>
      <hr/>

      <div>
        <div>
          <BandList
            data = { bands }
            addVote = { addVoteBand }
            deleteBand = { deleteBand }
            changeNameBand = { changeNameBand }
          />
        </div>

        <div>
          <BandAdd
            createBand={ createBand }
          />
        </div>
      </div>

    </div>
  );
}

export default App;
