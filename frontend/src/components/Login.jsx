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
    <div>
      <h2>Login</h2>
        <input type="text" placeholder='Email' value={email} onChange={(e) => setemail(e.target.value)}/>
        <input type="text" placeholder='Password' value={password} onChange={(e) => setpassword(e.target.value)}/>
        <button onClick={handleSubmit} >Log In</button>

        <p>
            Don't have an account?
            <span style={{cursor:'pointer'}} onClick={() => Navi("/register")}>
                Register here
            </span>
            </p>

    </div>
  )
}

export default Login
