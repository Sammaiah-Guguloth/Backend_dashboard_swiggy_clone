import React , { useState , useEffect }from 'react'
import { API_URL } from '../data/ApiPath';

const AllProducts = () => {
  const [products , setProducts] = useState([]);

  const productsHandler = async () => {
    const firmId = localStorage.getItem("firmId");
    try {
        const response = await fetch(`${API_URL}product/${firmId}/products`);
        const data = await response.json();
        console.log("data : " , data);
        setProducts(data.products)
    }
    catch(error) {
        console.log("error while fetching the products : " , error);
        alert("couldn't the fectch all products ");
    }
  }

  useEffect(() => {
    productsHandler();
  } , []);


  const deleteProductById = async (productId) => {
    let isConfirmed = confirm("Are you sure ?? You want to delete")
    if (!isConfirmed)  return;
    try {
      const response = await fetch(`${API_URL}product/${productId}` , {
        method : "DELETE"
      });
      if(response.ok) {
        // setProducts(products.filter((item) => (item._id !== productId))); // not a relaible way cuz set is not // immediate
        setProducts(prevProducts => prevProducts.filter((item) => (item._id !== productId)));
        alert("Product deleted successfully");
      }
      else {
        alert("couldn't delete the product");
      }
    }
    catch(error) {
      console.log("Error whle d")
      alert("couldn't delete the product");
    }

  }


  return (
    <div className='allProducts'>
      {!products ? (<p>No Products Added</p>)
        : (
          <table className='productTable'>
            <thead>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </thead>

            <tbody>

              {
                products.map((item) => {
                  return (
                    <tr key={item._id}>
                        <td>{item.productName}</td>
                        <td>{item.price}</td>
                        <td>
                          {
                            item.image && <img src={`${API_URL}uploads/${item.image}`} alt={item.productName} className='productImage' />
                          }
                        </td>
                        <td>
                          <button onClick={() => deleteProductById(item._id)}>Delete</button>
                        </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>
        )
      }
    </div>
  )
}

export default AllProducts