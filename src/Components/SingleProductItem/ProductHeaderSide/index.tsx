import { useCallback} from 'react';
import Button from '../../UI/Button';
import style from '../style.module.css';
import { useAppDispatch, useAppselectore } from '../../../Store';
import { changeCartCount } from '../../../Store/Cart';

type Props = {
    id: string,
    image: {
        mobile: string,
        tablet: string,
        desktop: string
    },
    name: string,
    description: string,
    price: number,
    handleDecrease: () => void,
    handleIncrease: () => void,
    inputValue: number,
    newProduct: boolean,
    toggleCart:() => void
}

const ProductHeaderSide = ({
    image, 
    name, 
    description, 
    price, 
    newProduct, 
    inputValue,
    handleDecrease,
    handleIncrease,
    toggleCart
}: Props) => {
    const dispatch = useAppDispatch();
    const { singleData} = useAppselectore(state => state.singleProduct);

    const handleClick = useCallback(() => {
        if (singleData) {
            toggleCart()
            dispatch(changeCartCount({ data: singleData, newCount: inputValue }));
        }
    }, [dispatch, inputValue, singleData, toggleCart]);
    
    return (
        <div className={style["product-headerSide"]}>
            <div className={style["product-imgSide"]}>
                <img src={`http://${window.location.host}/${image.desktop}`} alt={name}  className={style.desktopImg}/>
                <img src={`http://${window.location.host}/${image.tablet}`} alt={name} className={style.tabletImg}/>
                <img src={`http://${window.location.host}/${image.mobile}`} alt={name} className={style.mobileImg}/>      
            </div>
            <div className={style["product-textSide"]}>
                {newProduct && (<p>new product</p>)}
                <h4>{name}</h4>
                <span className={style.descriptionSpan}>{description}</span>
                <span className={style.priceLine}>${price >=1000? (price/1000).toFixed(3).replace(".",',') : price}</span>
                <div className={style["product-commonZone"]}>
                    <div className={style.countZone}>
                        <span className={style.decrease} onClick={handleDecrease}>-</span>
                        <input type="number" value={inputValue} readOnly />
                        <span className={style.increase} onClick={handleIncrease}>+</span>
                    </div>
                    <div className={style.buttonZone}>
                        <Button
                            text={"Add to Cart"}
                            handleClick={handleClick}
                            buttonName={'btn-primary'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductHeaderSide;


