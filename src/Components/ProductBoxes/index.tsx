import style from './style.module.css'
import headphonesImg from '../../../public/assets/shared/desktop/image-category-thumbnail-headphones.png'
import speakersImg from '../../../public/assets/shared/desktop/image-category-thumbnail-speakers.png'
import earphonesImg from '../../../public/assets/shared/desktop/image-category-thumbnail-earphones.png'
import Button from '../UI/Button'

type Props ={
    closeModal?:() => void
}

const ProductBoxes =({closeModal}:Props) =>{
    return(
        <div className={style['main-product-box']}>
            <div className={style['product-box']}>
                <div className={style['product-box-details']}>
                    <div className={style.productImg}>
                        <img src={headphonesImg} alt="Headphones img" />
                    </div>
                    <p>Headphones</p>
                    <div style={{paddingBottom:"30px",display:'flex',alignItems:"center",gap:"13px"}}>
                        <Button
                            text={"shop"}
                            isLink={true}
                            path='/products/category/headphones'
                            buttonName={'categoryLink'}
                            handleClick={closeModal}
                        />
                        <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1.322 1l5 5-5 5" stroke="#D87D4A" strokeWidth="2" fill="none" fillRule="evenodd"/></svg>
                    </div>
                </div>
            </div>
            <div className={style['product-box']}>
                <div className={style['product-box-details']}>
                    <div className={style.productImg}>
                        <img src={speakersImg} alt="Speakers img" />
                    </div>
                    <p>Speakers</p>
                    <div style={{paddingBottom:"30px",display:'flex',alignItems:"center",gap:"13px"}}>
                        <Button
                            text={"shop"}
                            isLink={true}
                            path='/products/category/speakers'
                            buttonName={'categoryLink'}
                            handleClick={closeModal}
                        />
                        <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1.322 1l5 5-5 5" stroke="#D87D4A" strokeWidth="2" fill="none" fillRule="evenodd"/></svg>
                    </div>
                </div>
            </div>
            <div className={style['product-box']}>
                <div className={style['product-box-details']}>
                    <div className={style.thirdProductImg}>
                        <img src={earphonesImg} alt="Speakers img" />
                    </div>
                    <p>Earphones</p>
                    <div style={{paddingBottom:"30px",display:'flex',alignItems:"center",gap:"13px"}}>
                        <Button
                            text={"shop"}
                            isLink={true}
                            path='/products/category/earphones'
                            buttonName={'categoryLink'}
                            handleClick={closeModal}
                        />
                        <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1.322 1l5 5-5 5" stroke="#D87D4A" strokeWidth="2" fill="none" fillRule="evenodd"/></svg>
                    </div>
                </div>
            </div>       
        </div>
    )
}

export default ProductBoxes