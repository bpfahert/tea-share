import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserFeed from "./components/UserFeed";
import UserInfo from "./components/UserInfo";
import UserList from "./components/UserList";
import TeaInfo from "./components/TeaInfo";
import ViewTeas from "./components/ViewTeas";
import Signup from "./components/Signup";

export default function RouteSwitch() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserFeed />} />
                <Route path="/createaccount" element={<Signup />} />
                <Route path='/userinfo' element={<UserInfo />} />
                <Route path='/userlist' element={<UserList />} />
                <Route path='/viewteas' element={<ViewTeas />} />
                <Route path='/teas/:id' element={<TeaInfo />} />
            </Routes>
        </BrowserRouter>
    );
}