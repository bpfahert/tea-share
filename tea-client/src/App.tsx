import { useAuthContext } from "./hooks/useAuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserFeed from "./components/UserFeed";
import UserInfo from "./components/UserInfo";
import UserList from "./components/UserList";
import TeaInfo from "./components/TeaInfo";
import ViewTeas from "./components/ViewTeas";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import { ReactElement, useEffect, useState } from "react";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    const { userContext } = useAuthContext();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    const checkAuth = (Component: ReactElement) => {
        if(isLoading === true) {
            return <Loading />;
        } else if (isLoading === false && userContext !== null) {
            return Component;
        } else {
            return <Signup />;
        }
    }

    return (
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={checkAuth(<UserFeed />)} />
                    <Route path="/signup" element={checkAuth(<Signup />)} />
                    <Route path='/user/profile/:id' element={checkAuth(<UserInfo />)} />
                    <Route path='/userlist' element={checkAuth(<UserList />)} />
                    <Route path='/viewteas' element={checkAuth(<ViewTeas />)} />
                    <Route path='/teas/:id' element={checkAuth(<TeaInfo />)} />
                </Routes>
            </BrowserRouter>
    )
}