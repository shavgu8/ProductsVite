import { useState, useEffect } from 'react';
import Input from '../../UI/Input';
import style from '../style.module.css';
import logoImg from '../../../../public/assets/checkout/icon-cash-on-delivery.svg';
import { FormForPost } from '..';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

type Props = {
  register: UseFormRegister<FormForPost>;
  errors: FieldErrors<FormForPost>;
  setValue: UseFormSetValue<FormForPost>;
};

const CheckoutLeftSide = ({ register, errors, setValue }: Props) => {
  const [paymentOption, setPaymentOption] = useState('emoney');

  useEffect(() => {
    setValue('paymentOption', paymentOption);
  }, [paymentOption, setValue]);

  return (
    <div className={style['checkout-leftSide']}>
      <h3>CHECKOUT</h3>
      <div className={style['checkout-billingDetails']}>
        <span className={style.mainSpan}>Billing Details</span>
        <div className={style['flex-input']}>
          <Input
            label="Name"
            id="nameId"
            placeHolder="Alexei Ward"
            type="text"
            inputName="input"
            {...register('name', {
              required: {
                value: true,
                message: 'Enter Name !!!',
              },
              maxLength: {
                value: 20,
                message: 'Name cannot exceed 20 characters',
              },
            })}
            isError={Boolean(errors.name)}
            textError={errors.name?.message}
          />
          <Input
            label="Email Address"
            id="emailId"
            placeHolder="alexei@mail.com"
            type="email"
            inputName="input"
            {...register('email', {
              required: {
                value: true,
                message: 'Enter Email !!!',
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Wrong Format',
              },
            })}
            isError={Boolean(errors.email)}
            textError={errors.email?.message}
          />
        </div>
        <Input
          label="Phone Number"
          id="phoneId"
          placeHolder="+1 202-555-0136"
          type="text"
          inputName="input"
          {...register('phone', {
            required: {
              value: true,
              message: 'Enter Phone Number !!!',
            },
            pattern: {
              value: /^\+?\d{0,3}?[-.\s]?\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/,
              message: "Wrong Format!"
            }
          })}
          isError={Boolean(errors.phone)}
          textError={errors.phone?.message}
        />
      </div>
      <div className={style['checkout-shippingInfo']}>
        <span className={style.mainSpan}>Shipping Info</span>
        <Input
          label="Address"
          id="addressId"
          placeHolder="1137 Williams Avenue"
          type="text"
          inputName="input-100w"
          {...register('address', {
            required: {
              value: true,
              message: 'Enter Address !!!',
            },
          })}
          isError={Boolean(errors.address)}
          textError={errors.address?.message}
        />
        <div className={style['flex-input']}>
          <Input
            label="ZIP Code"
            id="zipId"
            placeHolder="10001"
            type="number"
            inputName="input"
            {...register('zip', {
              required: {
                value: true,
                message: 'Enter ZIP Code !!!',
              },
              maxLength:{
                value:5,
                message:'Zip Code Contains 4 Number'
              }
            })}
            isError={Boolean(errors.zip)}
            textError={errors.zip?.message}
          />
          <Input
            label="City"
            id="cityId"
            placeHolder="New York"
            type="text"
            inputName="input"
            {...register('city', {
              required: {
                value: true,
                message: 'Enter City !!!',
              },
            })}
            isError={Boolean(errors.city)}
            textError={errors.city?.message}
          />
        </div>
        <Input
          label="Country"
          id="countryId"
          placeHolder="United States"
          type="text"
          inputName="input"
          {...register('country', {
            required: {
              value: true,
              message: 'Enter Country !!!',
            },
          })}
          isError={Boolean(errors.country)}
          textError={errors.country?.message}
        />
      </div>
      <div className={style['checkout-paymentDetails']}>
        <span className={style.mainSpan}>Payment Details</span>
        <div className={style['payment-method']}>
          <h6>Payment Method</h6>
          <div className={style['payment-flex']}>
            <Input
              label="e-Money"
              id="pay-emoney"
              type="radio"
              isChecked={paymentOption === 'emoney'}
              onChange={() => setPaymentOption('emoney')}
            />
            <Input
              label="Cash on Delivery"
              id="pay-cash"
              type="radio"
              isChecked={paymentOption === 'cash'}
              onChange={() => setPaymentOption('cash')}
            />
          </div>
        </div>
        {paymentOption === 'cash' && (
          <footer className={style['checkout-leftContainer-footer']}>
            <div className={style.logoSide}>
              <img src={logoImg} alt="Cash on Delivery" />
            </div>
            <div className={style.textSide}>
              <span className={style.footerSpan}>
                The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.
              </span>
            </div>
          </footer>
        )}
        {paymentOption === 'emoney' && (
          <footer className={style['checkout-leftContainer-footer']}>
            <div className={style['footer-flex']}>
              <Input
                label="e-Money Number"
                placeHolder="238521993"
                type="number"
                inputName="input"
                id="num"
                {...register('emoneyNumber', {
                  required: {
                    value: paymentOption === 'emoney',
                    message: 'Enter e-Money Number !!!',
                  },
                })}
                isError={Boolean(errors.emoneyNumber)}
                textError={errors.emoneyNumber?.message}
              />
              <Input
                label="e-Money PIN"
                placeHolder="6891"
                type="password"
                inputName="input"
                id="pin"
                {...register('emoneyPin', {
                  required: {
                    value: paymentOption === 'emoney',
                    message: 'Enter e-Money PIN !!!',
                  },
                })}
                isError={Boolean(errors.emoneyPin)}
                textError={errors.emoneyPin?.message}
              />
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

export default CheckoutLeftSide;
