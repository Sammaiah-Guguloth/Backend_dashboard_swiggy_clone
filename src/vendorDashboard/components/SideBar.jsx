import React from 'react'

const SideBar = ({showFirmHandler , showProductHandler , showAllProductsHandler}) => {

  const firmId = localStorage.getItem("firmId");

  return (
    <div className="sideBarSection">
        <ul>
            {
              !firmId && <li onClick={showFirmHandler}>Add Firm</li>
            }
            <li onClick={showProductHandler}>Add Product </li>
            <li onClick={showAllProductsHandler}>All Products</li>
            <li>User Details</li>
        </ul>
    </div>
  )
}

export default SideBar