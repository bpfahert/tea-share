import React from 'react';
import Navbar from './Navbar';


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

    const listElements = userList.map(user => {
        return <li>{user}</li>
    })

    return (
        <div>
            <Navbar />
            <ul>
                {/* <li><a href="/userinfo">User</a></li> */}
                {listElements}
            </ul>
        </div>
    )

}