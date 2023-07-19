import { TeaType } from '../ts/interfaces';
import TeaList from './TeaList';
import React from 'react';

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

    const green_tea_list = allTeas.filter((tea : TeaType) => tea.type === "Green");
    const black_tea_list = allTeas.filter((tea : TeaType) => tea.type === "Black");
    const herbal_tea_list = allTeas.filter((tea : TeaType) => tea.type === "Herbal");
    const white_tea_list = allTeas.filter((tea : TeaType) => tea.type === "White");
    const oolong_tea_list = allTeas.filter((tea : TeaType) => tea.type === "Oolong");

    return (
        <div>
            <TeaList tealist={allTeas} listname={"Recently added teas"} />
            <TeaList tealist={green_tea_list} listname={"Green teas"} />
            <TeaList tealist={black_tea_list} listname={"Black teas"} />
            <TeaList tealist={herbal_tea_list} listname={"Herbal teas"} />
            <TeaList tealist={white_tea_list} listname={"White teas"} />
            <TeaList tealist={oolong_tea_list} listname={"Oolong teas"} />
        </div>
    )

}