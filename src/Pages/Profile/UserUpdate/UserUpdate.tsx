import { useForm } from "react-hook-form";
import Button from "../../../Components/UI/Button";
import Input from "../../../Components/UI/Input";
import { UserFormData } from "../../Register/register"
import style from './style.module.css'
import supabase from "../../../Config/supabaseConfig";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

const UserUpdate = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const{register,handleSubmit,formState:{errors},reset } = useForm<UserFormData>();

    const setUpdate = async(formData:UserFormData) =>{
        const { data, error } = await supabase.auth.updateUser({
            data:{
                email: formData.email,
                userName:formData.userName,
                age: formData.age,
                country:formData.country,
                address:formData.address,
                zip:formData.zip,
                phone:formData.phone,
                city:formData.city
            }
        });
        return{data,error};
    }
    const getUser =useCallback(async() =>{
        try{
            const { data: { user },error } = await supabase.auth.getUser();
            if(error){
                throw error
            }
            if(user){
                reset({
                    email: user.user_metadata?.email,
                    userName: user.user_metadata?.userName,
                    age: user.user_metadata?.age,
                    country: user.user_metadata?.country,
                    address: user.user_metadata?.address,
                    zip: user.user_metadata?.zip,
                    phone: user.user_metadata?.phone,
                    city: user.user_metadata?.city,
                });
            }
        }
        catch(error){
            setError(error instanceof Error ? error.message : String(error));
        }
    },[reset])

    const onSubmit = async(data:UserFormData) =>{
        const{error} = await setUpdate(data);
        if(!error){
            navigate('/profile')
        }
        if(error){
           setShow(true)
           setError(error.message)
        }
    }
    useEffect(() =>{
        getUser()
    },[])

  return (
    <div style={{minHeight:'100vh'}} className={style['update-zone']}>
        {show && (
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
                            handleClick={() => setShow(false)} 
                        />
                    </div>
                    </p>
                </Alert>
            </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
                <h5>User Update</h5>
                <div className={style['input-grid-zone']}>
                    <Input 
                        label="Email"
                        inputName="signEmail"
                        placeHolder="alexei@mail.com"
                        type="email"
                        {...register("email", { 
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Wrong Format',
                            },
                        })}     
                        isError={Boolean(errors.email)}
                        textError={errors.email?.message}
                    />
                    <Input 
                        label="Username"
                        inputName="signUsername"
                        placeHolder="Jack"
                        type="text"
                        {...register("userName", { 
                            pattern: {
                                value: /^[a-zA-Z0-9]{4,16}$/,
                                message: 'Username must be  between 4 to 16 characters long',
                            },
                        })}     
                        isError={Boolean(errors.userName)}
                        textError={errors.userName?.message}
                    />
                    <Input 
                        label="Age"
                        inputName="signAge"
                        placeHolder="14"
                        type="number"
                        {...register("age", { 
                            min:{
                                value:14,
                                message:'User must be over 16 years old'
                            },    
                        })}     
                        isError={Boolean(errors.age)}
                        textError={errors.age?.message}
                    />
                    <Input 
                        label="Country"
                        inputName="signCountry"
                        placeHolder="France"
                        type="text"
                        {...register("country", { 
                            pattern: {
                                value: /^[a-zA-Z\s]*$/,
                                message: 'Country name should only contain letters',
                            },
                        })}     
                        isError={Boolean(errors.country)}
                        textError={errors.country?.message}
                    />
                    <Input
                        label="Phone Number"
                        id="phoneId"
                        placeHolder="+1 202-555-0136"
                        type="text"
                        inputName="signPhone"
                        {...register('phone', {
                             pattern: {
                                value: /^\+?\d{0,3}?[-.\s]?\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/,
                                message: "Wrong Format!"
                            },                           
                        })}
                        isError={Boolean(errors.phone)}
                        textError={errors.phone?.message}
                    />
                     <Input
                        label="Address"
                        id="addressId"
                        placeHolder="1137 Williams Avenue"
                        type="text"
                        inputName="signAddress"
                        {...register('address', {
                            
                        })}
                        isError={Boolean(errors.address)}
                        textError={errors.address?.message}
                    />
                     <Input
                        label="ZIP Code"
                        id="zipId"
                        placeHolder="10001"
                        type="number"
                        inputName="signZip"
                        {...register('zip', {
                            maxLength:{
                                value:5,
                                message:'Zip Code Contains 4 Number'
                            },
                        })}
                        isError={Boolean(errors.zip)}
                        textError={errors.zip?.message}
                    />
                    <Input
                        label="City"
                        id="cityId"
                        placeHolder="New York"
                        type="text"
                        inputName="signCity"
                        {...register('city', {
                            pattern: {
                                value: /^[a-zA-Z\s]*$/,
                                message: 'City name should only contain letters',
                            },
                        })}
                        isError={Boolean(errors.city)}
                        textError={errors.city?.message}
                    />
                </div>
                <div className={style['regButton-zone']}>
                    <Button buttonType="submit" text={"Update"} buttonName={"btn-primary-100"} />
                    <Button buttonType="button" text={"Close"} buttonName={"btn-primary-100"} handleClick={() => navigate('/profile')} />
                </div>
        </form>
    </div>
  )
}

export default UserUpdate