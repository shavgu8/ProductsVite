import { Others } from '../../../Static/type'
import Button from '../../UI/Button'
import style from '../style.module.css'
import { useNavigate } from 'react-router-dom'

type Props={
    otherProducts: Others[]
}

const OtherProducts =(props:Props) =>{
    const navigate=useNavigate();
    const{otherProducts} = props;
    return(
        <>
            <h6>you may also like</h6>
            <ul className={style['list-zone']}>
                {otherProducts?.map((item,index)=>{
                    return(
                        <li key={index}>
                            <div className={style["list-item-imgZone"]}>
                                <img src={`http://${window.location.host}/${item.image.desktop}`} alt="" className={style['desktopImg']} />
                                <img src={`http://${window.location.host}/${item.image.mobile}`} alt="" className={style['mobileImg']} />
                            </div>
                            <div className={style.commonZone}>
                                <div className={style['list-item-nameZone']}>
                                    <h6>{item.name}</h6>
                                </div>
                                <div className={style['list-item-buttonZone']}>
                                    <Button 
                                        text={"See Product"} 
                                        handleClick={() => navigate(`/product/${item.slug}`)} 
                                        buttonName={'btn-primary'} />
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>

    )
}

export default OtherProducts