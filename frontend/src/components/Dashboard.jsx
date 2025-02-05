import React from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navi = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navi("/login");
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 '>
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className='text-2xl font-bold text-center text-amber-600 mb-4 '>Welcome , {user ? user.username : "User"}</h2>
          <p className='text-center text-gray-600 mb-4 '>You are logged in as {user ? user.email : "unknown user"}.</p>

          <div className='space-y-4'>
            <button className = "w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 cursor-pointer " onClick={handleLogout} >Logout</button>
            <p className='text-center text-sm text-gray-600 mt-4 ' >Want to update your information?
            <span className='text-amber-600 cursor-pointer hover:underline' onClick={() => navi("/profile")}> Go to profile </span>

            </p>
          </div>

        </div>
    </div>
  )
}

export default Dashboard
