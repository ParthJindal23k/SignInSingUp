import React, { useState } from 'react'
import axios from "axios"; 


import { Navigate,useNavigate } from 'react-router-dom';

const Register = () => {

    const [username,setusername] = useState("");
    const [email,setemail] = useState(""); 
    const [password ,setpassword] = useState("");

    const navi = useNavigate();

    const handleSubmit = async (e) =>{

      e.preventDefault();

        try{
            const response = await axios.post("http://localhost:7070/api/auth/signup" ,{
                username,
                email,
                password

            },
        );
        const data = response.data;
        console.log(data);

        navi("/dashboard");

        

        }
        catch(err){
            alert(`Error: ${err.response ? err.response.data : err.message}`);
        }

    }

  return (
    <div>
      <h2>Register</h2>
        <input type="text" placeholder='Username' value= {username} onChange={(e) => setusername(e.target.value)  } />
        <input type="text" placeholder='Email' value= {email} onChange={(e) => setemail(e.target.value)  } />
        <input type="password" placeholder='Password' value= {password} onChange={(e) => setpassword(e.target.value)  } />

        <button onClick={handleSubmit} type = "submit" >Register</button>

      <p>Already have an account? 
          <span style={{cursor:'pointer'  }} onClick={() => navi("/login")}  >
            Login here
          </span>

         </p>

    </div>
  )
}

export default Register
