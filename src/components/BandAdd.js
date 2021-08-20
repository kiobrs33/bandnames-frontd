import React, { useState } from 'react';

export const BandAdd = ({ createBand }) => {

    const [bandName, setBandName] = useState('');

    const onSubmitForm = (e) => {
        e.preventDefault();

        if(bandName.trim().length > 0){
            createBand(bandName);
        }

        setBandName('');
    }

    return (
        <>
            <h1>Agregar Banda</h1>

            <form onSubmit={onSubmitForm} >
                <input
                    placeholder="Nuevo nombre de banda"
                    onChange={ e => setBandName(e.target.value)}
                    value={bandName}
                />

                <button type="submit">Create</button>
            </form>
        </>
    )
}
