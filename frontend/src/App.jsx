
import { Route, Routes, Navigate } from "react-router-dom";


import Dashboard from "./pages/Dashboard"
import { useAuthContext } from "./hooks/useAuthContext";
import Sidebar from "./components/Sidebar";
import Product from "./pages/Product";
import Setting from "./pages/Setting";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";


const App = () => {
    const { user } = useAuthContext()

    return (
        <>
            {/* {
                user ?
                    <>
                        <Sidebar />
                        <Routes>
                            <Route path="/" element={<Dashboard />}></Route>
                            <Route path="/dashboard" element={<Dashboard />}></Route>
                            <Route path="/product" element={<Product />}></Route>
                            <Route path="/setting" element={<Setting />}></Route>
                        </Routes>
                    </> : ''
            }
            {
                !user ?
                    <Routes>
                        <Route path="/" element={<Login />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/signup" element={<Signup />}></Route>
                    </Routes> : ''
            } */}

            {
                user ? <>
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<Dashboard />}></Route>
                        <Route path="/dashboard" element={<Dashboard />}></Route>
                        <Route path="/product" element={<Product />}></Route>
                        <Route path="/setting" element={<Setting />}></Route>

                        <Route path="/login" element={<Navigate to='/dashboard' />}></Route>
                        <Route path="/signup" element={<Navigate to='/dashboard' />}></Route>


                    </Routes>
                </> : ''
            }

            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
            </Routes>
        </>
    );
}

export default App;