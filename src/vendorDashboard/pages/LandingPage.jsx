import React, { useState , useEffect} from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import VendorLogin from '../components/forms/VendorLogin';
import VendorRegister from '../components/forms/VendorRegister';
import AddFirm from '../components/forms/AddFirm';
import AddProduct from '../components/forms/AddProduct';
import Welcome from '../components/Welcome';
import AllProducts from '../components/AllProducts';

const LandingPage = () => {

   const [showLogin , setShowLogin] = useState(false);
   const [showRegister , setShowRegister] = useState(false);
   const [showFirm , setShowFirm] = useState(false);
   const [showProduct , setShowProduct] = useState(false);
   const [showWelcome , setShowWelcome] = useState(false);
   const [showAllProducts , setShowAllProducts] = useState(false);
   const [showLogOut , setShowLogOut] = useState(false);

   function showLoginHandler() {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
   }
   function showRegisterHandler() {
    setShowLogin(false);
    setShowRegister(true);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
   }
   function showFirmHandler() {
    if(showLogOut) {
        setShowLogin(false);
        setShowRegister(false);
        setShowFirm(true);
        setShowProduct(false);
        setShowWelcome(false);
        setShowAllProducts(false);
    }
    else {
        alert("Please login first");
        setShowLogin(true);
    }
   }
   function showProductHandler() {
    if(showLogOut) {
        setShowLogin(false);
        setShowRegister(false);
        setShowFirm(false);
        setShowWelcome(false);
        setShowProduct(true);
        setShowAllProducts(false);
    }
    else {
        alert("Please login first");
        setShowLogin(true);
    }
   }
   function showWelcomeHandler() {
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(true);
    setShowAllProducts(false);
   }
   function showAllProductsHandler() {
    if(showLogOut) {
        setShowLogin(false);
        setShowRegister(false);
        setShowFirm(false);
        setShowProduct(false);
        setShowWelcome(false);
        setShowAllProducts(true);
    }
    else {
        alert("Please login first");
        setShowLogin(true);
    }
   }

   useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    if(loginToken) {
        setShowLogOut(true);
    }
   });

   const logOutHandler = () => {
    const isConfirmed = confirm("are you sure you want to log out");
    if(!isConfirmed) return;
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName")
    setShowLogOut(false);
    showLoginHandler(true);
    
   }

  return (
    <>
        <section>
            <NavBar showLoginHandler = {showLoginHandler} showRegisterHandler = {showRegisterHandler} showLogOut = {showLogOut} logOutHandler = {logOutHandler}/>
            <div className='collectionSection'>
                <SideBar showFirmHandler = {showFirmHandler} showProductHandler = {showProductHandler} showAllProductsHandler = {showAllProductsHandler}/>
                {
                    showLogin && <VendorLogin showWelcomeHandler = {showWelcomeHandler}/>
                }
                
                {
                    showRegister && <VendorRegister showLoginHandler = {showLoginHandler}/>
                
                }       
                {
                    showFirm &&  showLogOut && <AddFirm />

                }       
                {
                    showProduct && showLogOut && <AddProduct />
                }
                {
                    showWelcome && <Welcome />
                }
                {
                    showAllProducts && showLogOut && <AllProducts />
                }
            </div>
        </section>
    </>
  )
}

export default LandingPage;