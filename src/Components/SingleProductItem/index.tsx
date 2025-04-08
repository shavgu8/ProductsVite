import Spinner from 'react-bootstrap/Spinner';
import style from './style.module.css'
import { useNavigate } from "react-router-dom";
import ProductHeaderSide from "./ProductHeaderSide";
import ProductBoxes from "../ProductBoxes";
import ProductMiddleSide from "./ProductMiddleSide";
import OtherProducts from "./OtherProducts";
import { useAppselectore } from '../../Store';
import { useEffect, useState } from 'react';

type Props ={
    toggleCart:() => void
}

const SingleProductItem = ({ toggleCart }: Props) => {
    const { singleData,status } = useAppselectore(state => state.singleProduct);
    const [inputValue, setInputValue] = useState(singleData?.count || 1);
    const navigate = useNavigate();

    useEffect(() => {
        if (singleData) {
            setInputValue(singleData.count || 1);
        }
    }, [singleData]);

    const handleDecrease = () => {
        setInputValue(prevState => {
            while(prevState > 0){
                return prevState -1
            }
            return prevState
        })
    };

    const handleIncrease = () => {
        setInputValue(prevState => prevState + 1);
    };

    return (
        <>
            {status==='loading' && (
                <Spinner animation="border" role="status" className={style.spinnerAnimate}>
                    <span className="visually-hidden"></span>
                </Spinner>
            )}
            {status==='loaded' && singleData && (
                <div className={style['product-zone']}>
                    <div className={style.goBackTag}>
                        <span onClick={() => navigate(`/products/category/${singleData.category}`)} className={style.navigateSpan}>Go Back</span>
                    </div>
                    <div className={style["product-details"]}>
                        <ProductHeaderSide
                            id={singleData.id}
                            image={singleData.image}
                            name={singleData.name}
                            description={singleData.description}
                            price={singleData.price}
                            newProduct={singleData.new}
                            inputValue={inputValue}
                            handleDecrease={handleDecrease}
                            handleIncrease={handleIncrease}
                            toggleCart={toggleCart}
                        />
                        <ProductMiddleSide
                            features={singleData.features}
                            includes={singleData.includes}
                        />
                        <div className={style['product-footerSide']}>
                            <div className={style.productFlexSide}>
                                <img src={`http://${window.location.host}/${singleData?.gallery.first.desktop}`} alt="" />
                                <img src={`http://${window.location.host}/${singleData?.gallery.second.desktop}`} alt="" />
                            </div>
                            <div>
                                <img src={`http://${window.location.host}/${singleData?.gallery.third.desktop}`} alt="" />
                            </div>
                        </div>
                        <div className={style['other-products']}>
                            <OtherProducts otherProducts={singleData.others} />
                        </div>
                    </div>
                </div>
            )}
            <ProductBoxes />
        </>
    );
};

export default SingleProductItem;

