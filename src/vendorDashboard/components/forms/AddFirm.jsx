import React , {useState} from 'react'
import { API_URL } from '../../data/ApiPath';

const AddFirm = () => {

  const [firmName , setFirmName] = useState('');
  const [area , setArea] = useState('');
  const [category , setCategory] = useState([]);
  const [region , setRegion] = useState([]);
  const [offer , setOffer] = useState('');
  const [file , setFile] = useState(null);

  const handleCategoryChange = (event) => {
    let value = event.target.value;
    
    if(category.includes(value)) {
      setCategory(category.filter((cat) => cat !== value));
    }
    else {
      setCategory([...category , value]);
    }

    
  }
  
  const handleRegionChange = (event) => {
    let value = event.target.value;
    if(region.includes(value)) {
      setRegion(region.filter((reg) => reg !== value));
    }
    else {
      setRegion([...region , value]);
    }
  }

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile)
  }

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      if(!loginToken) {
        console.log("User not authenticated")
        alert("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append("firmName" , firmName);
      formData.append("area" , area);
      formData.append("offer" , offer);
      category.forEach((cat) => formData.append("category" , cat));
      region.forEach((reg) => formData.append("region" , reg));
      formData.append("image" , file);

      const response = await fetch(`${API_URL}firm/add-firm`, {
        method : "POST",
        headers : {
          "token" : loginToken
        },
        body : formData,
      });
      console.log("response" , response)

      const data = await response.json();
      if(response.ok) {
        console.log("firm added successfully : " , data);
        alert("Firm added successfully");

        setArea("");
        setFirmName("");
        setCategory([]);
        setRegion([]);
        setOffer("");

        localStorage.setItem("firmId" , data.firmId);
      }
      else if(data.message === "vendor can have only one firm") {
        alert("vendor can have only one firm");
        setArea("");
        setFirmName("");
        setCategory([]);
        setRegion([]);
        setOffer("");
      }

    }
    catch(error) {
      console.log("error while adding firm : " , error);
      alert("Error while adding firm");
    }
  }

  return (
    <div className="firmSection">
        <form className="tableForm" onSubmit={handleFirmSubmit}>

            <h3>Add Firm</h3>

            <label htmlFor="firmname">Firm Name</label>
            <input type="text" id='firmname' name="firmName" placeholder='Enter firm name'
              onChange={(e) => setFirmName(e.target.value)} value={firmName}
            /> <br />

            <label htmlFor="area">Area</label>
            <input type="text" id='area' placeholder='Enter area' name='area'
              onChange={(e) => setArea(e.target.value)} value={area}
            /> <br />

            <div className="checkInp">
              <label>Category</label>
              <div className="inputsContainer">
                <div className="checkBoxContainer"> 
                  <label htmlFor="veg">Veg</label>
                  <input type='checkbox' id='veg'  value={"veg"} onChange={handleCategoryChange} checked ={category.includes("veg")}/>
                </div>
                <div className="checkBoxContainer">
                  <label htmlFor="non-veg">Non-Veg</label>
                  <input type='checkbox' id='non-veg'  value={"non-veg"} onChange={handleCategoryChange} checked = {category.includes("non-veg")}/>
                </div>
              </div>
            </div>

            <div className="checkInp">
              <label>Region</label>
              <div className="regionContainer">
                <div className="regBoxContainer"> 
                  <label htmlFor="sIdian">South Indian</label>
                  <input type="checkbox" id='sIndain'  value={"south-indian"} 
                    checked= {region.includes("south-indian")} onChange={handleRegionChange}
                  />
                </div>
                <div className="regBoxContainer">
                  <label htmlFor="nIndian">North Indian</label>
                  <input type="checkbox" id='nIndian'  value={"north-indian"}
                    checked= {region.includes("north-indian")} onChange={handleRegionChange}
                  />
                </div>

                <div className="regBoxContainer"> 
                  <label htmlFor="chinesee">Chinese</label>
                  <input type="checkbox" id='chinesee'  value={"chineese"} 
                    checked = {region.includes("chineese")} onChange = {handleRegionChange}
                  />  
                </div>
                <div className="regBoxContainer">
                  <label htmlFor="bakery">Bakery</label>
                  <input type="checkbox" id='bakery'  value={"bakery"} 
                    checked= {region.includes("bakery")} onChange={handleRegionChange}
                  />
                </div>
              </div>
            </div>


            <label htmlFor="offer">Offer</label>
            <input type="text" id='offer' placeholder='Enter offer' name='offer'
              onChange={(e) => setOffer(e.target.value)} value={offer}  
            /><br />

            <label htmlFor="firmimage">Firm Image</label>
            <input type="file" id='name' onChange={handleFileUpload} /><br />

            <button className="btnSubmit" type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default AddFirm