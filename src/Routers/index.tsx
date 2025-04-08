import { Routes,Route } from "react-router-dom"
import Home from "../Pages/Home"
import Products from "../Pages/Products"
import SingleProduct from "../Pages/SingleProduct"
import Checkout from "../Pages/Checkout"
import Page404 from "../Pages/404Page"
import Login from "../Pages/Login/Login"
import Profile from "../Pages/Profile/Profile"
import Register from "../Pages/Register/register"
import AuthRouter from "./Auth"
import UserUpdate from "../Pages/Profile/UserUpdate/UserUpdate"

type Props={
    toggleCart:() => void
}

const Routers = ({toggleCart}:Props) =>{
    return(
        <div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/products/category/:name" element={<Products/>} />
                <Route path="/product/:productName" element={<SingleProduct  toggleCart={toggleCart}/>} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="*" element={<Page404/>}/>
                <Route element={<AuthRouter/>}>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/update-user" element={<UserUpdate/>}/>
                    <Route path="/products/checkout" element={<Checkout/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default Routers