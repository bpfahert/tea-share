import React from "react";
import Navbar from "./components/Navbar";
import RouteSwitch from "./RouteSwitch";
import { UserType } from "./ts/interfaces";


export default function App() {

    const [user, setUser] = React.useState<UserType>();

    // TODO: Navbar keeps refreshing, should only refresh once. Change a tag to Link?

    async function getUser() {
        const response = await fetch('http://localhost:9000/user/getuser', {
            credentials: 'include',
        });
        const json = await response.json();

        if(response.ok) {
            setUser(json);
        }
    }

    React.useEffect(() => {
        getUser();
    }, []);

    const usersname = user?.user?.username ? user.user.username : "";
    const id = user?.user?._id ? user.user._id : "";

    return (
        <div>
            <Navbar username={usersname} userID={id}/>
            <RouteSwitch />
        </div>

    )
}