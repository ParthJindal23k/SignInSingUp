import React, { useState } from 'react'
import axios from "axios";  
import { Navigate, useNavigate } from 'react-router-dom';


const Login = () => {

    const Navi = useNavigate();

    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");

    const handleSubmit = async(e) =>{
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:7070/api/auth/signin", {
                email,
                password
            })

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user",JSON.stringify(response.data.user));

            Navi("/dashboard");


        }
        catch(err){
            alert("wrong email or password");
            console.log(`This is a error which says ${err}`);
        }
    }


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-96'>

      <h2 className='text-2xl font-bold text-center text-amber-600'>Login</h2>
      <form className='mt-4 space-y-4'>

        <input type="text" placeholder='Email' value={email} onChange={(e) => setemail(e.target.value)}  className='w-full px-4  py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400'/>
        <input type="password" placeholder='Password' value={password} onChange={(e) => setpassword(e.target.value)}  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400'  />
        <button onClick={handleSubmit} className='w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 cursor-pointer' >Log In</button>
      </form>

        <p className='mt-4 text-center text-sm text-gray-600'>
            Don't have an account?
            <span className='text-amber-600 cursor-pointer hover:underline' onClick={() => Navi("/register")}>
                Register here
            </span>
            </p>

      </div>
    </div>
  )
}

export default Login
