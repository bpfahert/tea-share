import Navbar from './Navbar';
import { TeaType } from '../ts/interfaces';
import TeaList from './TeaList';


export default function ViewTeas() {
    const teaArray: TeaType[] = [
        { tea_name: "Test Tea", type: "Green", brand: "David's Tea", rating: 9, notes: "A great tea!" },
        { tea_name: "Test Tea 2", type: "Herbal", brand: "David's Tea", rating: 7, notes: "A decent tea" }
    ]
    
    return (
        <div>
            <Navbar />
            <TeaList tealist={teaArray} listname={"Recently added teas"} />
            <TeaList tealist={teaArray} listname={"Green teas"} />
            <TeaList tealist={teaArray} listname={"Black teas"} />
            <TeaList tealist={teaArray} listname={"Herbal teas"} />
            <TeaList tealist={teaArray} listname={"White teas"} />
            <TeaList tealist={teaArray} listname={"Oolong teas"} />
        </div>
    )

}