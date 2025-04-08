import { useEffect, useState } from "react";
import supabase from "../../Config/supabaseConfig"
import { User } from '@supabase/auth-js';
import style from './style.module.css'
import Button from "../../Components/UI/Button";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Profile = () => {
    const navigate= useNavigate();
    const [data,setData] = useState<User>();
    const [loading,setLoading] =useState(true);
    const [error, setError] = useState<string | null>(null);

    const getUser = async() =>{
        try{
            const { data: { user },error } = await supabase.auth.getUser();
            if(error){
                throw error
            }
            if(user){
                setData(user)
            }
        }
        catch(error){
            setError(error instanceof Error ? error.message : String(error));
        }
        finally{
            setLoading(false);
        }
}
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw error;
        }
        navigate('/');
    };
    useEffect(() =>{
        setTimeout(() =>{
            getUser()
        },300)
    },[])

    return (
      <div className={style['profile-container']} style={{minHeight:'100vh'}}>
        {loading?  (
            <Spinner animation="border" role="status" style={{position:"absolute",top:"140px"}}>
                <span className="visually-display"></span>
            </Spinner>
        ) : error ? (
            <div className={style['error-message']}>
                <h1>Error</h1>
                <p>{error}</p>
            </div>
        ) : (
            <div className={style['user']}>
                <div className={style['left-side']}>
                    <h1>Profile</h1>
                    <div className={style['user-info']}>
                        <h3>Username: <p>{data?.user_metadata?.userName}</p></h3>
                        <h3>Email: <p>{data?.user_metadata?.email}</p></h3>
                        <h3>Country: <p>{data?.user_metadata?.country}</p></h3>
                        <h3>City: <p>{data?.user_metadata?.city}</p></h3>
                        <h3>Address: <p>{data?.user_metadata?.address}</p></h3>
                        <h3>Zip: <p>{data?.user_metadata?.zip}</p></h3>
                        <h3>Age: <p>{data?.user_metadata?.age}</p></h3>
                        <h3>Phone: <p>{data?.user_metadata?.phone}</p></h3>
                    </div>
                </div>
                <div className={style['right-side']}>
                    <Button 
                        text="Edit User" 
                        buttonName={"btn-link2"} 
                        isLink={true}
                        path="/update-user"
                    />
                    <Button 
                        text="Log Out" 
                        buttonName={"btn-link2"} 
                        handleClick={signOut}
                    />
                </div>
            </div>
        ) }
      </div>
    )
  }
  
  export default Profile