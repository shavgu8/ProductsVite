import { NavLink } from "react-router-dom";
import style from "./style.module.css"

type Props ={
    isLink?:boolean,
    path?:string,
    text:string,
    buttonType?: 'button' | 'submit' | 'reset',
    handleClick?:() => void,
    buttonName:string
} 
const Button = (props:Props) =>{
    const {text, handleClick, buttonName,isLink,path,buttonType='submit'} = props;
    if(isLink && path){
        return(
            <>
                <NavLink to={path} className={`${style[buttonName]}`} onClick={handleClick}>{text}</NavLink>
            </>
        )
    }
    return (
        <>
            <button type={buttonType} className={`${style[buttonName]}`} onClick={handleClick}>{text}</button>
        </>
    )
}

export default Button