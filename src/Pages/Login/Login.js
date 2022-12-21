import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../Hooks/UseToken';

const Login = () => {

    const { register,formState: { errors }, handleSubmit } = useForm();
    const {signIn}= useContext(AuthContext);
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const location= useLocation();
    const navigate= useNavigate();
    const from = location.state?.from?.pathname || "/";
    if(token){
        navigate(from,{ replace: true });
    }
    
    const getUserToken = email =>{
        fetch(`http://localhost:5000/jwt?email=${email}`)
        .then(res => res.json())
        .then(data => {
            if(data.accessToken)
              localStorage.setItem('accessToken', data.accessToken)
          
        })
       }
    const handleLogin = data =>{
        console.log(data)
        signIn(data.email, data.password)
        .then(result =>{
            const user =result.user;
            setLoginUserEmail(data.email)
            console.log(user);
    getUserToken(user.email);
        })
        .catch(error =>  console.log(error));
    }
    
    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h1 className="text-xl text-center"> Login</h1>
                <form onSubmit={handleSubmit(handleLogin)}>

                  
                    
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" {...register("email",{required: "Email Address is required"})}  className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password",{required: "Password is required", minLength:{value:6, message: 'password must be 6 word or longer'}})}  className="input input-bordered w-full max-w-xs" />
                        <label className="label">
                            <span className="label-text">Forget Password</span>
                        </label>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                   
                    
                 
                    <input className='btn btn-accent w-full' value="Login" type="submit" />
                </form>
                <p>New to Doctor Portal <Link className='text-secondary' to='/signup'>Create new account</Link> </p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;