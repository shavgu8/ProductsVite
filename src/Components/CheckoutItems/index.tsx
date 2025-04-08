import { useCallback, useEffect, useState } from 'react';
import style from './style.module.css';
import Button from '../UI/Button';
import CheckoutRightSide from './Checkout-RightSide';
import CheckoutLeftSide from './Checkout-leftSide';
import { Spinner } from 'react-bootstrap';
import { useAppselectore } from '../../Store';
import { useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';
import supabase from '../../Config/supabaseConfig';
import { useNavigate } from 'react-router-dom';

export type FormForPost = {
  name: string;
  email: string;
  phone?: string;
  address: string;
  zip?: string;
  city: string;
  country: string;
  paymentOption: string;
  emoneyNumber?: string;
  emoneyPin?: string;
};

const CheckoutItems = () => {
  const navigate =useNavigate();
  const {cartData } = useAppselectore(state => state.cart);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<string>('');
  const [grandTotal, setGrandTotal] = useState<string>('');
  const [check, setCheck] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormForPost>();
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const getUser = useCallback(async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;

      if (user) {
        reset({
          email: user.user_metadata?.email || '',
          name: user.user_metadata?.userName || '',
          phone: user.user_metadata?.phone || '',
          address: user.user_metadata?.address || '',
          zip: user.user_metadata?.zip || '',
          city: user.user_metadata?.city || '',
          country: user.user_metadata?.country || '',
          paymentOption: 'emoney'
        });
      }
    } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
    }
  }, [reset]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const onSubmit = () => {
    if (cartData.length > 0) {
      setCheck(prev => !prev);
    } else {
      setShow(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 700);

    const totalAmount = cartData.reduce((acc, item) => acc + (item.count as number) * item.price, 0);
    setTotal(totalAmount >= 1000 ? (totalAmount / 1000).toFixed(3).replace('.', ',') : totalAmount.toString());
    setGrandTotal(totalAmount + 50 >= 1000 ? ((totalAmount + 50) / 1000).toFixed(3).replace('.', ',') : (totalAmount + 50).toString());
  }, [cartData]);

  return (
    <div className={style['container']}>
      {loading && (
        <div className={style.spinnerWrapper}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {error && (
        <div className={style.alertWrapper}>
          <Alert variant="danger" >
              <Alert.Heading>ERROR</Alert.Heading>
              <p>
              {error}
              <div style={{paddingTop:"15px"}}>
                  <Button 
                      text={'Close Error Message'} 
                      isLink={true} 
                      buttonName={'active-gray'}
                      handleClick={() => {
                        setError(null)
                        navigate('/')
                      }} 
                  />
              </div>
              </p>
          </Alert>
        </div>
      )}
      {show && (
        <div className={style.alertWrapper}>
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Cart is Empty!</Alert.Heading>
            <p>
              Your shopping cart is empty. Please add items to your cart before proceeding to checkout.
              Go back to the products page and select the items you wish to purchase.
              <div style={{ paddingTop: '15px' }}>
                <Button
                  text="Click Here!"
                  isLink
                  path={`/products/category/${cartData.length > 0 ? cartData.at(-1)?.category : ''}`}
                  buttonName="active-gray"
                />
              </div>
            </p>
          </Alert>
        </div>
      )}
      <div className={style.goBackTag}>
        <Button
          text="Go Back"
          isLink
          path={`/products/category/${cartData.length > 0 ? cartData.at(-1)?.category : ''}`}
          buttonName="active-gray"
        />
      </div>
      <form className={style['checkout-container']} onSubmit={handleSubmit(onSubmit)}>
        <CheckoutLeftSide
          register={register}
          errors={errors}
          setValue={setValue}
        />
        {!loading && (
          <CheckoutRightSide
            total={total}
            grandTotal={grandTotal}
            cartData={cartData}
            check={check}
          />
        )}
      </form>
    </div>
  );
};

export default CheckoutItems;
