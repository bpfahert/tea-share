import TeaList from "./TeaList";
import { TeaType } from "../ts/interfaces";
import Navbar from "./Navbar";

export default function UserInfo() {
    const teaArray: TeaType[] = [
        { tea_name: "Test Tea", type: "Green", brand: "David's Tea", rating: 9, notes: "A great tea!" },
        { tea_name: "Test Tea 2", type: "Herbal", brand: "David's Tea", rating: 7, notes: "A decent tea" }
    ]

    return (
        <div>
            <Navbar />
            <p>Username: </p>
            <p>Favorite type of tea: </p>
            <p>User's favorite teas:</p>
            <TeaList tealist={teaArray} listname={"User's favorite teas"}/>
            <p>Teas added by User</p>
            <TeaList tealist={teaArray} listname={"User's added teas"}/>
        </div>
    )
}