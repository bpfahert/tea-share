import React from 'react';
import Navbar from './Navbar';
import { UserRef } from '../ts/interfaces';


export default function UserList() {
    const [userList, setUserList] = React.useState([]);

    // async function getUserList() {
    //     const response = await fetch(`http://localhost:9000/user/userlist`);
    //     const json = await response.json();
    
    //     if(response.ok) {
    //       setUserList(json);
    //     }
        
    //   }
    
      
    // React.useEffect(() => {
    //     getUserList();
    // }, []);

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

    const listElements = userList.map((user : UserRef) => {
        return <li>{user.username}</li>
    })

    return (
        <div>
            <Navbar username="" userID=""/>
            <ul>
                {/* <li><a href="/userinfo">User</a></li> */}
                {listElements}
            </ul>
        </div>
    )

}