import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../Hooks/UseToken';



const SignUp = () => {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const {createUser, updateUser}= useContext(AuthContext);
    const [signupError, setSignUpError] = useState('')
const [createUserEmail,setCreateUserEmail] = useState('')
    const [token] =useToken(createUserEmail)
    const navigate = useNavigate()
 if(token){
    navigate('/')
 }
    
    const handleSignUp=(data) =>{
        console.log(data);
        setSignUpError('')
        createUser(data.email, data.password)
        .then(result =>{
            const user =result.user;
            console.log(user)
            toast('user create successfully')
            const userInfo = {
                displayName: data.name
            }
            updateUser(userInfo)
            .then(()=>{
              saveUser(data.name, data.email)
            })
            .catch (err=>
                console.log(err));
                navigate('/')
        })
        .catch(error => {console.log(error)
            setSignUpError(error.message)});
    }
    const saveUser =(name, email) =>{
        const user = {name, email};
        fetch('http://localhost:5000/users',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data =>{
            setCreateUserEmail(email)
        })
    }
    
  
    return (
        <div className='h-[800px] flex justify-center items-center'>
        <div className='w-96 p-7'>
            <h1 className="text-xl text-center">Signup</h1>
            <form onSubmit={handleSubmit(handleSignUp)}>

              
            
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text"  {...register("name",
                    {
                        required:"Name is require"
                    })} className="input input-bordered w-full max-w-xs" />
                   
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email"  {...register("email", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />
                   {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password"  {...register("password",{
                        required:'password is required',
                        minLength: {value:6 , message:"password must be 6 words long"}
                    })} className="input input-bordered w-full max-w-xs" />
                       {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                </div>
               
                
             
                <input className='btn btn-accent w-full mt-4' value="Signup" type="submit" />
                {signupError && <p className='text-red-600'>{signupError}</p> }
            </form>
            <p>Already have an account <Link className='text-secondary' to='/login'>Please Login</Link> </p>
            <div className="divider">OR</div>
            <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
        </div>
    </div>
    );
};

export default SignUp;