import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import UserInfo from "./components/UserInfo";
import UserList from "./components/UserList";
import ViewTeas from "./components/ViewTeas";
import Signup from "./components/Signup";

export default function RouteSwitch() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/createaccount" element={<Signup />} />
                <Route path='/userinfo' element={<UserInfo />} />
                <Route path='/userlist' element={<UserList />} />
                <Route path='/viewteas' element={<ViewTeas />} />
            </Routes>
        </BrowserRouter>
    );
}