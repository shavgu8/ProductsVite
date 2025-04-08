import { NavLink } from "react-router-dom"
import style from '../style.module.css'
const Navigation =() =>{
    return(
        <>
            <ul>
                <li><NavLink to={"/"} className={style.active}>home</NavLink></li>
                <li><NavLink to={"/products/category/headphones"} className={style.active}>headphones</NavLink></li>
                <li><NavLink to={"/products/category/speakers"} className={style.active}>speakers</NavLink></li>
                <li><NavLink to={"/products/category/earphones"} className={style.active}>earphones</NavLink></li>
            </ul>
        </>
    )
}

export default Navigation