import React, { useState } from 'react'
import { API_URL } from '../../data/ApiPath';

const AddProduct = () => {

  const [productName , setProductName] = useState("");
  const [price , setPrice] = useState("");
  const [bestSeller , setBestSeller] = useState(false);
  const [isVeg , setIsVeg] = useState(true);
  const [file , setFile] = useState(null);
  const [description , setDescription] = useState("");

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {

      const firmId = localStorage.getItem("firmId");
      const loginToken = localStorage.getItem("loginToken");
      if(!loginToken || !firmId) {
        new Error("Authentication failed");
      }

      const formData = new FormData();
      formData.append("productName" , productName);
      formData.append("price" , price);
      formData.append("description" , description);
      formData.append("bestseller" , bestSeller);
      formData.append("category" , isVeg ? "veg" : "non-veg");
      formData.append("image" , file);

      const response = await fetch(`${API_URL}product//add-product/${firmId}` , {
        method : "POST",
        body : formData,
      });

      const data = await response.json();

      if(response.ok) {
        alert("Product added successfully");
        setProductName("");
        setPrice("");
        setBestSeller(false);
        setIsVeg(true);
        setFile(null);
        setDescription("");
      }
      else {
        alert("Couldn't add the product");
      }
    }
    catch(error) {
      console.log("Error while adding product : " , error);
      alert("Couldn't add the product");
    }
  }

  return (
     <div className="firmSection">
        <form className="tableForm" onSubmit={handleProductSubmit}>

            <h3>Add Prodcut</h3>

            <label htmlFor="productName">Product Name</label>
            <input type="text" id='productName' placeholder='Enter Product Name'
              value={productName} onChange={(e) => setProductName(e.target.value)}
            /> <br />

            <label htmlFor="price">Price</label>
            <input type="text" id='price' placeholder='Enter Price'
              value={price} onChange={(e) => setPrice(e.target.value)}
            /> <br />

            <div className="bestSeller">
              <label>Bestseller : </label>
              <div className="bestSellerRadioBtns">
                <div className="radioContainer">
                  
                  <input type='radio' id='yes' name='bestseller' value='yes' 
                    checked = {bestSeller} onChange={(e) => setBestSeller(e.target.checked)}
                  />
                  <label htmlFor='yes'>Yes</label>
                </div>
                <div className="radioContainer">
                  
                  <input type='radio' id='no' name='bestseller' value='no'
                    checked = {!bestSeller} onChange={(e) => setBestSeller(!e.target.checked)} 
                  />
                  <label htmlFor='no' >No</label>
                </div> <br />
                
              </div>
            </div>

            <div className="bestSeller">
              <label>Category : </label>
              <div className="bestSellerRadioBtns">
                <div className="radioContainer">
                  
                  <input type='radio' id='veg'  value='veg' 
                    checked={isVeg} onChange={(e) => setIsVeg(e.target.checked)}
                  />
                  <label htmlFor='veg' >Veg</label>
                </div>
                <div className="radioContainer">
                  
                  <input type='radio' id='non-veg'  value='non-veg'
                    checked={!isVeg} onChange={(e) => setIsVeg(!e.target.checked)}
                  />
                  <label htmlFor='non-veg'>Non-Veg</label>
                </div> <br />
                
              </div>
            </div>
            

            <label htmlFor="desc">Description</label>
            <input type="text" id='desc' placeholder='Enter Description'
              onChange={(e) => setDescription(e.target.value)} value={description}
            /><br />

            <label htmlFor="productImage">Product Image</label>
            <input type="file" id='productImage' placeholder='Select Image'
              onChange={(e) => setFile(e.target.files[0])}
            /><br />

            <button className="btnSubmit" type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default AddProduct