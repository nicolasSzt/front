import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import LoginPage from "./pages/Login/login";
import RegisterPage from "./pages/register/register";
import HomePage from "./pages/home/home";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/home' element={<HomePage />} />
            </Routes>
        </div>
    )
}

export default App;