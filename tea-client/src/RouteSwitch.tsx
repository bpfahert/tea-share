import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserFeed from "./components/UserFeed";
import UserInfo from "./components/UserInfo";
import UserList from "./components/UserList";
import TeaInfo from "./components/TeaInfo";
import ViewTeas from "./components/ViewTeas";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";

export default function RouteSwitch() {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/home" element={<UserFeed />} />
                <Route path='/user/profile/:id' element={<UserInfo />} />
                <Route path='/userlist' element={<UserList />} />
                <Route path='/viewteas' element={<ViewTeas />} />
                <Route path='/teas/:id' element={<TeaInfo />} />
            </Routes>
        </BrowserRouter>
    );
}