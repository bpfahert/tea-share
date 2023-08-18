import React from 'react';
import { UserRef } from '../ts/interfaces';


export default function UserList() {
    const [userList, setUserList] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:9000/user/userlist`)
            const json = await response.json()

            if(response.ok) {
                setUserList(json)
            }
        }

        fetchData()
    }, [])

    const listElements = userList.map((user : UserRef, index) => {
        return <li key={index}><a href={`/user/profile/${user._id}`} >{user.username}</a></li>
    })

    return (
        <div>
            <ul>
                {listElements}
            </ul>
        </div>
    )

}