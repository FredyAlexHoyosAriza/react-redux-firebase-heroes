import { Route, Routes } from "react-router"
import LoginScreen from "../components/Sign/LoginScreen"
import RegisterScreen from "../components/Sign/RegisterScreen"

const SignRouter = () => {
    return (
        <Routes>

            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

        </Routes>
    )
}

export default SignRouter
