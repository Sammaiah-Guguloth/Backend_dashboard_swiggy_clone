import React , {useState } from 'react'
import { API_URL } from '../../data/ApiPath';

const VendorRegister = ({showLoginHandler}) => {

  const [username , setUsername] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');


  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}vendor/register`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({username , email , password}),

      });

      const data = response.json();
      console.log("data from server : " , data);

      if(response.ok) {
        alert("vendor registered successfully");
        setUsername("");
        setEmail("");
        setPassword("");
        showLoginHandler();
      }
      else {
        alert("vendor registration failed");
      }

    }
    catch(error) {
      console.log("Error while registering error : " , error);
    }
  }

  return (
    <div className='registerSection'>
        <form className='authForm' onSubmit={handleOnSubmit}>
            <h3>Vendor Register</h3>

            <label htmlFor="username">Username</label>
            <input type='text' placeholder='enter your email'id='username' value={username}
              onChange={(e) => setUsername(e.target.value)}
            /><br/>

            <label htmlFor="email">Email</label>
            <input type='text' placeholder='enter your email' id='email' value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br/>

            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='enter your password'id='password' value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br/>

            <button className="btnSubmit" type='submit'>Submit</button>

        </form>
    </div>
  ) 
}

export default VendorRegister