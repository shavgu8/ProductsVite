import { Products } from '../../../Static/type'
import style from '../style.module.css'
import Button from '../../UI/Button'
import { removeAll } from '../../../Store/Cart'
import { useAppDispatch } from '../../../Store'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

type Props={
    grandTotal:string | undefined,
    cartData?:Products[]
}

const OrderModal =({grandTotal,cartData}:Props) =>{
    const[view,setView] = useState(false)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleView = () => {
        setView(prev => !prev);
    }
    return(
        <div className={style['orderModal-zone']}>
            <div className={style.activeHeight}>
                <div className={style.orderLogo}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                        <circle cx="32" cy="32" r="32" fill="#D87D4A"/>
                        <path d="M20.7539 33.3328L27.5054 40.0843L43.3085 24.2812" stroke="white" strokeWidth="4"/>
                    </svg>
                </div>
                <div className={style.orderTextZone}>
                    <h3>THANK YOU FOR YOUR ORDER</h3>
                    <span>You will receive an email confirmation shortly.</span>
                </div>
            </div>
            <div className={style['order-container-wrapper']}>
                <ul className={style["orderList"]}>
                    {cartData!== undefined && (
                        <li className={style['order-listItem']}>
                            {view? (
                                cartData?.map((item) =>{
                                    return(
                                        <div className={style['order-leftSide']} key={item.id}>
                                            <div className={style['order-leftSide-wrapper']}>
                                                <div className={style['order-imgZone']}>
                                                    <img src={`http://${window.location.host}/${item?.image?.desktop}`} alt={cartData[0].name} />
                                                </div>
                                                <div className={style['order-leftSide-text']}>
                                                    <h3>
                                                        {item.name.split(" ").slice(0,-1).join(" ")}
                                                    </h3>
                                                    <span>$ {item.price}</span>
                                                </div>
                                            </div>
                                            <div className={style['orderCount']}>
                                                <span>x{item.count}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            ): (
                                <div className={style['order-leftSide']}>
                                    <div className={style['order-leftSide-wrapper']}>
                                        <div className={style['order-imgZone']}>
                                            <img src={`http://${window.location.host}/${cartData[0]?.image?.desktop}`} alt={cartData[0].name} />
                                        </div>
                                        <div className={style['order-leftSide-text']}>
                                            <h3>
                                                {cartData[0].name.split(" ").slice(0,-1).join(" ")}
                                            </h3>
                                            <span>$ {cartData[0].price}</span>
                                        </div>
                                    </div>
                                    <div className={style['orderCount']}>
                                        <span>x{cartData[0].count}</span>
                                    </div>
                                </div>
                            )}
                            <div className={style['order-Items']}>
                                {!view? (
                                    <p onClick={handleView} style={{cursor:'pointer'}}>
                                        and  {cartData.length-1}  other item(s)
                                    </p>
                                ):(
                                    <p onClick={handleView} style={{cursor:'pointer'}}>
                                        View less
                                    </p>
                                )
                                }
                            </div>
                        </li>
                    )}
                </ul>
                <div className={style['order-rightSide']}>
                    <div className={style['order-priceSide']}>
                        <span>Grand total</span>
                        <p>$ {grandTotal}</p>
                    </div>
                </div>
            </div>
            <div className={style['order-buttonZone']}>
                <Button
                    buttonName='btn-primary-100'
                    text="BACK TO HOME"
                    handleClick={() => {
                        dispatch(removeAll())
                        navigate('/')
                    }}
                />
            </div>
        </div>
    )
}

export default OrderModal