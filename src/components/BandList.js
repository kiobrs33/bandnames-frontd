import React, { useEffect, useState } from 'react'

export const BandList = ({data, addVote, deleteBand, changeNameBand}) => {
    const [bands, setBands] = useState(data);

    useEffect(() => {
        setBands(data);
    }, [ data ]);

    const onChageInput = (e, id) => {
        const newName = e.target.value;

        setBands(bands => bands.map( band => {
                if(band.id === id){
                    band.name = newName;
                }
                return band;
            })
        );
    }

    // Cuando el input pierde el focus
    const onBlurInput = (id, newName) => {
        console.log(id,newName)
        changeNameBand(id, newName);
    }

    const crearRows = () => {
        return bands.map( band => (
            <tr key={band.id}>
                <td>
                    <button 
                        onClick={ () => addVote(band.id) } 
                    > +1 </button>
                </td>
                <td>
                    <input 
                        type="text" value={band.name} 
                        onChange = {e => onChageInput(e, band.id)}
                        onBlur = {() => onBlurInput(band.id, band.name)}
                />
                </td>
                <td><h3> {band.votes} </h3></td>
                <td>
                    <button onClick={() => deleteBand(band.id)}>Borrar</button>
                </td>
            </tr>
        ));
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>

                    </tr>
                </thead>
                <tbody>
                    { crearRows() }
                </tbody>
            </table>
        </>
    )
}
