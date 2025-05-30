import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/login";
import HomePage from "./pages/home/Home";
import RegisterPage from "./pages/Register/Register";

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