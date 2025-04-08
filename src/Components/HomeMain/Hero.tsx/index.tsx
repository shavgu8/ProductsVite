import { useAppselectore } from '../../../Store'
import mobileImg from '../../../../public/assets/home/mobile/image-header.jpg'
import Button from '../../UI/Button'
import style from './style.module.css'
import { useNavigate } from 'react-router-dom'

const Hero =() =>{
    const navigate = useNavigate()
    const{data} =useAppselectore(state => state.products)
    return(
        <div className={style["header-main"]}>
            <div className={style["header-main-left"]}>
                <span>NEW PRODUCT</span>
                <h4>XX99 Mark II Headphones</h4>
                <p>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
                <div className={style.buttonHead}>
                <Button 
                    text={"See Product"} 
                    handleClick={() => {
                        if(data){
                            navigate(`/product/${data[3].slug}`)
                        }
                        else{
                            {{<div>...loading</div>}}
                        }
                    }} 
                    buttonName={'btn-primary'} />
            </div>
        </div>
            <div className={style["header-main-right"]}>
                <img src={mobileImg} alt="" className={style["mobileImg"]} />
            </div>
        </div>
    )
}

export default Hero