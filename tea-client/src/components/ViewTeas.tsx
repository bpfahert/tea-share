import Navbar from './Navbar';
import { TeaType } from '../ts/interfaces';
import TeaList from './TeaList';
import React from 'react';
import { all } from 'axios';


export default function ViewTeas() {
    const [allTeas, setAllTeas] = React.useState([]);

    async function getAllTeas() {
        const response = await fetch('http://localhost:9000/teas/all');
        const json = await response.json();
    
        if(response.ok) {
          setAllTeas(json);
        }
        
    }    React.useEffect(() => {
        getAllTeas();
        
    }, []);
    
    return (
        <div>
            <TeaList tealist={allTeas} listname={"Recently added teas"} />
            <TeaList tealist={allTeas} listname={"Green teas"} />
            <TeaList tealist={allTeas} listname={"Black teas"} />
            <TeaList tealist={allTeas} listname={"Herbal teas"} />
            <TeaList tealist={allTeas} listname={"White teas"} />
            <TeaList tealist={allTeas} listname={"Oolong teas"} />
        </div>
    )

}