import style from './style.module.css'
import zx9SpeakerImg from '../../../public/assets/image-zx9SpeakerImg.png'
import yx1EarphonesImg from '../../../public/assets/home/desktop/image-earphones-yx1.jpg'
import CircleImg from '../../../public/assets/home/desktop/pattern-circles.svg'
import { useAppDispatch, useAppselectore } from '../../Store'
import { useEffect } from 'react'
import ProductBoxes from '../ProductBoxes'
import Button from '../UI/Button'
import { useNavigate } from 'react-router-dom'
import Hero from './Hero.tsx'

const HomeMain =() =>{
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const{data} = useAppselectore(state => state.products)
    useEffect(() =>{
        window.scrollTo({top:0,behavior:"instant"})
    },[dispatch])
    return(
        <div className={style.main}>
                <Hero/>
                <ProductBoxes/>
            <div className={style['main-footer']}>
                <div className={style['main-footer-firstBox']}>
                    <div className={style['first-box-leftSide']}>
                        <img src={zx9SpeakerImg} alt="image" className={style["speaker-img"]} />
                        <img src={CircleImg} alt="" className={style['circle-img']}/>
                    </div>
                    <div className={style['first-box-rightSide']}>
                        <h4>ZX9 SPEAKER</h4>
                        <p>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
                        <div style={{paddingTop:"16px",zIndex:"3"}}>
                            <Button 
                                text={"See Product"} 
                                handleClick={() => {
                                    if(data){
                                        navigate(`/product/${data[5].slug}`)
                                    }
                                    else{
                                        {{<div>...loading</div>}}
                                    }
                                }} 
                                buttonName={'btn-link'}
                            />
                        </div>
                    </div>
                </div>
                <div className={style['main-footer-secondtBox']}>
                    <div className={style['second-box-leftSide']}>
                        <div className={style['second-box-text']}>
                            <span>ZX7 SPEAKER</span>
                            <div style={{minWidth:'160px'}}>
                                <Button 
                                    text={"See Product"} 
                                    handleClick={() => {
                                        if(data){
                                            navigate(`/product/${data[4].slug}`)
                                        }
                                        else{
                                            {{<div>...loading</div>}}
                                        }
                                    }} 
                                    buttonName={'btn-link2'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style['main-footer-divideBox']}>
                    <div className={style.leftSideImg}>
                        <img src={yx1EarphonesImg} alt="" />
                    </div>
                    <div className={style.rightSideBox}>
                        <div className={style.rightSideText}>
                            <span>YX1 EARPHONES</span>
                            <div>
                                <Button 
                                    text={"See Product"} 
                                    handleClick={() => {
                                        if(data){
                                            navigate(`/product/${data[0].slug}`)
                                        }
                                        else{
                                            {{<div>...loading</div>}}
                                        }
                                    }} 
                                    buttonName={'btn-link2'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}
export default HomeMain