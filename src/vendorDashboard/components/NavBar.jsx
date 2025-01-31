import React from 'react'

const NavBar = ({showLoginHandler , showRegisterHandler , showLogOut , logOutHandler}) => {

  const firmName = localStorage.getItem("firmName");

  return (
   <div className="navSection">
    <div className="company">
      Vendor Dashboard
    </div>

    {
      firmName && (
        <div>
          <h4>FirmName : {firmName}</h4>
        </div>
      )
    }

    <div className="userAuth">

      {
        showLogOut ? (
          <span onClick={logOutHandler}>LogOut</span>
        ) : (
          <>
            <span onClick={showLoginHandler}>Login /</span>
            <span onClick={showRegisterHandler}>Register</span>
          </>
        )
      }

      
      
    </div>
   </div>
  )
}

export default NavBar
