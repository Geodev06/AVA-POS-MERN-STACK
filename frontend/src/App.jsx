
import { Route, Routes, Navigate } from "react-router-dom";

import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from "./pages/Dashboard"
import Product from "./pages/Product"
import Setting from "./pages/Setting"
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
    const { user } = useAuthContext()

    return (
        <Routes>
            <Route path="/" element={<Navigate to='/login' />}></Route>

            <Route path="/login" element={!user ? <Login /> : <Navigate to='/dashboard' />}></Route>

            <Route path="/signup" element={<Signup />}></Route>


            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to='/login' />}></Route>

            <Route path="/product" element={user ? <Product /> : <Navigate to='/login' />}></Route>

            <Route path="/setting" element={user ? <Setting /> : <Navigate to='/login' />}></Route>
        </Routes>
    );
}

export default App;