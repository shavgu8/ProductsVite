import style from './style.module.css'
import { useEffect, useState, } from "react";
import { useAppselectore,useAppDispatch } from "../../Store"
import { useParams,useNavigate } from "react-router-dom";
import { filterProductsByName } from "../../Store/Products";
import { Spinner } from 'react-bootstrap';
import ProductBoxes from '../ProductBoxes';
import Button from '../UI/Button';

const CategoryProducts =() =>{
    const[loading,setLoading] = useState(false)
    const{data} = useAppselectore(state => state.products)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params =useParams();

    useEffect(() =>{
        setLoading(true);
        if(params.name !== undefined){
            setTimeout(() =>{
                setLoading(false)
            },800)
           dispatch(filterProductsByName(params.name)) 
           window.scrollTo({top:0,behavior:"instant"})
        }
        else{
            []
        }
    },[dispatch, params.name])
    
    return(
        <>
            <div className={style['category-main-head']}>
                <h5>{params.name}</h5>
            </div>
            <div className={style['container']}>
                <ul>
                    {loading &&(
                        <Spinner animation="border" role="status" style={{position:"absolute",top:"50px"}}>
                                <span className="visually-display"></span>
                        </Spinner>
                    )}
                    {!loading && (
                        data.map((item,index) =>{
                            return(
                                <li key={item.id}>
                                    <div className={index === 1 ? style['reversed'] : style['category-container'] }>
                                        <div className={style['container-left-side']} >
                                            <img src={`http://${item.categoryImage}/${item.categoryImage.desktop}`} alt=""  className={style.desktopImg}/>
                                            <img src={`http://${window.location.host}/${item.categoryImage.tablet}`} alt=""  className={style.tabletImg}/>
                                            <img src={`http://${window.location.host}/${item.categoryImage.mobile}`} alt=""  className={style.mobileImg}/>
                                        </div>
                                        <div className={style['container-right-side']}>
                                            <div className={style['container-details']}>
                                                {item.new ===true && (<p>new product</p>)}
                                                <div className={style['container-text']}>
                                                    <h4>{item.name}</h4>
                                                    <span>{item.description}</span>
                                                </div>
                                                <div className={style['container-button']}>
                                                    <Button text={"See Product"} handleClick={() => navigate(`/product/${item.slug}`)} buttonName={'btn-primary'} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    )}
                </ul>
            </div>
                <ProductBoxes/>
        </>
    )
}

export default CategoryProducts