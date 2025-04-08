import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppselectore } from "../../Store";
import { changeCartCount, removeAll, removeItem } from "../../Store/Cart";
import style from './style.module.css';
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { Products } from "../../Static/type";

type Props = {
    closeModal: () => void;
    setIsCartOpen: (open: boolean) => void;
};

const Cart = ({ closeModal, setIsCartOpen }: Props) => {
    const dispatch = useAppDispatch();
    const { cartData } = useAppselectore(state => state.cart);
    const [total, setTotal] = useState<string>("0.00");
    const navigate = useNavigate();

    useEffect(() => {
        const storedCartData = localStorage.getItem('cart-products');
        if (storedCartData) {
            const cartProducts = JSON.parse(storedCartData);
            cartProducts.forEach((item: Products) => {
                dispatch(changeCartCount({ data: item, newCount: (item.count as number) }));
            });
        }
    }, [dispatch]);

    useEffect(() => {
        if (cartData.length < 1) {
            setIsCartOpen(false);
        }
    }, [cartData, setIsCartOpen]);

    const handleDecrease = useCallback((itemId: string) => {
        const item = cartData.find(item => item.id === itemId);
        if (item) {
            const newCount = (item.count || 0) - 1;
            if (newCount < 1) {
                dispatch(removeItem(itemId));
            } else {
                dispatch(changeCartCount({ data: item, newCount }));
            }
        }
    }, [cartData, dispatch]);

    const handleIncrease = useCallback((itemId: string) => {
        const item = cartData.find(item => item.id === itemId);
        if (item) {
            const newCount = (item.count || 0) + 1;
            dispatch(changeCartCount({ data: item, newCount }));
        }
    }, [cartData, dispatch]);

    useEffect(() => {
        const totalAmount = cartData.reduce((acc, item) => acc + (item.count as number) * item.price, 0);
        setTotal(totalAmount >= 1000 ? (totalAmount / 1000).toFixed(3).replace('.', ',') : totalAmount.toString());

        if (cartData.length > 0) {
            localStorage.setItem('cart-products', JSON.stringify(cartData));
        } else {
            localStorage.removeItem('cart-products');
        }
    }, [cartData]);

    return (
        <div className={style['cart-container']}>
            <div className={style['cart-containerHead']}>
                <span>Cart({cartData.length})</span>
                <Button
                    text={"Remove all"}
                    handleClick={() => {
                        dispatch(removeAll());
                        closeModal();
                    }}
                    buttonName={'btn-remove-link'}
                />
            </div>
            <ul className={style['cart-productsContainer']}>
                {cartData.map((item) => (
                    <li key={item.id}>
                        <div className={style['cart-productDetails']}>
                            <img 
                                src={`http://${window.location.host}/${item.image?.desktop || 'default-image.jpg'}`} 
                                alt={item.name} 
                            />
                            <div className={style['cart-item-price']}>
                                <h6>{item.name.split(' ').slice(0, -1).join(" ")}</h6>
                                <span>$ {item.price >= 1000 ? (item.price / 1000).toFixed(3).replace(".", ',') : item.price}</span>
                            </div>
                        </div>
                        <div className={style["product-commonZone"]}>
                            <div className={style.countZone}>
                                <span className={style.decrease} onClick={() => handleDecrease(item.id)}>-</span>
                                <input type="number" value={item.count} readOnly />
                                <span className={style.increase} onClick={() => handleIncrease(item.id)}>+</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className={style['cart-totalPrice']}>
                <span>TOTAL</span>
                <div><p>$ {total}</p></div>
            </div>
            <div className={style['cart-button']} onClick={() => closeModal()}>
                <Button
                    text={"Checkout"}
                    handleClick={() => navigate('/products/checkout', { replace: true })}
                    buttonType="button"
                    buttonName={'btn-primary-100'}
                />
            </div>
        </div>
    );
};

export default Cart;
