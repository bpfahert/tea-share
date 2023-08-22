import { useAuthContext } from "./hooks/useAuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserFeed from "./components/UserFeed";
import UserInfo from "./components/UserInfo";
import UserList from "./components/UserList";
import TeaInfo from "./components/TeaInfo";
import ViewTeas from "./components/ViewTeas";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";

export default function App() {
    const { userContext } = useAuthContext();

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={userContext ? <UserFeed /> : <Navigate to="/signup" />} />
                <Route path="/signup" element={!userContext ? <Signup /> : <Navigate to="/" /> } />
                <Route path='/user/profile/:id' element={userContext ? <UserInfo /> : <Navigate to="/signup" />} />
                <Route path='/userlist' element={userContext ? <UserList /> : <Navigate to="/signup" />} />
                <Route path='/viewteas' element={userContext ? <ViewTeas /> : <Navigate to="/signup" />} />
                <Route path='/teas/:id' element={userContext ? <TeaInfo /> : <Navigate to="/signup" />} />
            </Routes>
        </BrowserRouter>
    )
}