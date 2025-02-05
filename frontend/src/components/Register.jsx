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
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8  rounded-lg shadow-lg w-96'>

      <h2 className='text-2xl font-bold text-center text-amber-600'>Register</h2>
      <form className='mt-4 space-y-4'>

        <input type="text" placeholder='Username' value= {username} onChange={(e) => setusername(e.target.value)  } className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400'  />
        <input type="text" placeholder='Email' value= {email} onChange={(e) => setemail(e.target.value)  }  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400'  />
        <input type="password" placeholder='Password' value= {password} onChange={(e) => setpassword(e.target.value)   }  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400'   />

        <button onClick={handleSubmit} type = "submit" className='w-full bg-amber-600 text-white  py-2 rounded-lg hover:bg-amber-700 cursor-pointer' >Register</button>

      </form>
      <p className='mt-4 text-center text-sm text-gray-600'> Already have an account? 
          <span className='text-amber-600 cursor-pointer hover:underline' onClick={() => navi("/login")}  >
            Login here
          </span>

         </p>

      </div>
    </div>
  )
}

export default Register
