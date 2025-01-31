import React, { useState } from 'react'
import { API_URL } from '../../data/ApiPath';

const VendorLogin = ({showWelcomeHandler}) => {

  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [error , setError] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}vendor/login`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({email , password}),
      });

      const data = await response.json();

      if(response.ok) {
        alert("vendor logged in successfully");
        localStorage.setItem("loginToken" , data.token);
        setEmail("");
        setPassword("");
        showWelcomeHandler();
      }

      const vendorId = data.vendorId;
      const vendorResponse = await fetch(`${API_URL}vendor/get-vendor/${vendorId}`);
      const vendorData = await vendorResponse.json();
      console.log("vendor data : " , vendorData);
      if(vendorResponse.ok) {
        const vendorFirmId =  vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        console.log("firmId : " , vendorFirmId);
        console.log("firmName : " , vendorFirmName);
        localStorage.setItem("firmId" , vendorFirmId);
        localStorage.setItem("firmName" , vendorFirmName);
        window.location.reload();
      }
      
    }
    catch(error) {
      alert("couldn't log in ");
      console.log("Error while logging in : " , error);
    }
  }

  return (
    <div className="loginSection">
        
        <form className='authForm' onSubmit={loginHandler}>
            <h3>Vendor Login</h3>

            <label htmlFor="email">Email</label>
            <input type='text' placeholder='enter your email' value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br/>

            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='enter your password' value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br/>

            <button className="btnSubmit" type='submit'>Submit</button>

        </form>
    </div>
  )
}

export default VendorLogin