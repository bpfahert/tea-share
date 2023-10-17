import React from 'react';
import { UserType } from '../ts/interfaces';
import { Link } from 'react-router-dom';


export default function UserList() {
    const [userList, setUserList] = React.useState<UserType[]>([]);

    // Get list of all users
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://tea-share-production.up.railway.app/user/userlist`, {
                credentials: 'include',
                mode: 'cors',
            });
            const json = await response.json();
            if(response.ok) {
                setUserList(json)
            }
        }

        fetchData();
    }, [])

    const listElements = userList.map((user : UserType, index) => {
        return <li key={index}><Link to={`/user/profile/${user._id}`} >{user.username}</Link></li>
    })

    return (
        <div className='container text-center'>
            <ul style={{listStyle: "none"}}>
                {listElements}
            </ul>
        </div>
    )

}