import React from 'react';
import { UserRef } from '../ts/interfaces';
import { Link } from 'react-router-dom';


export default function UserList() {
    const [userList, setUserList] = React.useState([]);

    // Get list of all users
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:9000/user/userlist`, {
                credentials: 'include',
                mode: 'cors',
            });
            const json = await response.json();
            if(response.ok) {
                setUserList(json)
            }
        }

        fetchData()
    }, [])

    const listElements = userList.map((user : UserRef, index) => {
        return <li key={index}><Link to={`/user/profile/${user._id}`} >{user.username}</Link></li>
    })

    return (
        <div>
            <ul style={{listStyle: "none"}}>
                {listElements}
            </ul>
        </div>
    )

}