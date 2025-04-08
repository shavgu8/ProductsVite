import { useEffect } from "react";
import SingleProductItem from "../Components/SingleProductItem"
import style from '../Components/SingleProductItem/style.module.css'
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../Store";
import { getSingleProductData } from "../Store/SingleProduct";

type Props ={
    toggleCart:() => void
}
const SingleProduct = ({toggleCart}:Props) =>{
    const dispatch=useAppDispatch()
    const params = useParams();
    useEffect(() => {
        if (params.productName) {
            dispatch(getSingleProductData(params.productName));
            window.scrollTo({top:0,behavior:"instant"})
        }
    }, [dispatch, params.productName]);
    return(
        <div className={style.zone}>
            <SingleProductItem 
                toggleCart={toggleCart}
            />
        </div>
    )
}
export default SingleProduct