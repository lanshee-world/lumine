import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';


const Addproducts = () => {
  // initialize the hooks
  const[product_name, setProductName] = useState("");
  const[product_description, setProductDescription] = useState("");
  const[product_cost, setProductCost] = useState("");
  const[product_photo, setProductPhoto] = useState("");

  //  declare the additional hooks to manage the state of the application
  const[loading, setLoading] = useState(false);
  const[success, setSuccess] = useState("");
  const[error, setError] = useState("");

  //  create a function that will handle the submit action
  const handleSubmit = async (e) =>{
    // prevent the site from reloading
    e.preventDefault()

    // setLoading hook with a message(activate it)
    setLoading(true)

    try{
    //  create a formdata
    const formdata = new FormData()

    // append the details to the form data created
    formdata.append("product_name", product_name);
    formdata.append("product_description",product_description);
    formdata.append("product_cost", product_cost);
    formdata.append("product_photo", product_photo);

    // Interact with axios to help you use the method post
    const response = await axios.post("https://keyafidel.alwaysdata.net/api/add_product", formdata)

    // set the loading hook back to default
    setLoading(false)

    // update the success hook with a message
    setSuccess(response.data.message)

    // clearing the hooks(setting them back to default/empty)
    setProductName("");
    setProductDescription("");
    setProductCost("");
    setProductPhoto("");

    // clearing the form
    e.target.reset()

    setTimeout(()=>{
      setSuccess("");
    },5000);
    }
    catch(error){
      // set the loading hook back to default
      setLoading(false)

      // update the setError with a message
      setError(error.message)
    }
  }
  return (
  <div className="container-fluid bg-dark min-vh-100 d-flex align-items-center justify-content-center">
    
    <div className="card shadow-lg p-4 border-0" style={{ 
      maxWidth: "500px", 
      width: "100%", 
      background: "rgba(0,0,0,0.85)", 
      borderRadius: "15px" 
    }}>
      
      <h3 className="text-center mb-4" style={{ color: "#d4af37", letterSpacing: "1px" }}>
        Add Luxury Item
      </h3>

      {/* Loader */}
      {loading && <Loader />}

      {/* Messages */}
      {success && <div className="alert alert-success text-center">{success}</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <input
            type="text"
            placeholder="Accessory Name"
            className="form-control bg-light text-white border-secondary"
            required
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Description"
            className="form-control bg-light text-white border-secondary"
            required
            value={product_description}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            placeholder="Price"
            className="form-control bg-light text-white border-secondary"
            required
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ color: "#d4af37" }}>
            Accessory Photo
          </label>
          <input
            type="file"
            className="form-control bg-dark text-white border-secondary"
            required
            accept="image/*"
            onChange={(e) => setProductPhoto(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="btn w-100 fw-bold"
          style={{
            background: "linear-gradient(45deg, #d4af37, #f1d27a)",
            color: "#000",
            border: "none"
          }}
        >
          Add Accessory
        </button>

      </form>
    </div>
  </div>
)
}

export default Addproducts;
