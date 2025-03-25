import React, { useContext, useState } from 'react'
import '../../Styles/ShippingCart.css'
import { FaCheckSquare, FaTruck, FaMoneyCheck, FaTrash } from 'react-icons/fa'
import axios from 'axios';
import { BookContext } from '../../App';

const ShippingCart = () => {
  const { cart, setCart, price, handleRemove } = useContext(BookContext);

  const initialUserDetails = {
    name: '',
    phone: '',
    phoneAlt: '',
    city: '',
    state: '',
    landmark: '',
    pincode: '',
    address: '',
  }
  
  const [userDetails, setUserDetails] = useState(initialUserDetails);
  const [orderStatus, setOrderStatus] = useState('');
  const [successMessage, setSuccessMessage] = useState(false)

  const handleInput = (e) => {
    setUserDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setOrderStatus('')
  }

  const handleSubmit =   async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your Cart is Empty!")
      return;
    }

    console.log("Order Data:", {
      userDetails,
      cart,
      price,
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
    try {
          
      const response = await axios.post('http://127.0.0.1:5000/ShippingCart',  {
        userDetails,
        cart,
        price
      });

      if (response.status === 200) {
        setOrderStatus('Order placed successfully!');
        setCart([]);
        setUserDetails(initialUserDetails)
        setSuccessMessage(true)

        setTimeout(()=>{
          setSuccessMessage(false)
        }, 5000)
      }
    }
    catch (error) {
      console.error("Error placing order:", error);
      setOrderStatus('Failed to place order');
    }
  }





  return (

    <div className='shipping-info'>
      <form onSubmit={handleSubmit} method='POST'>
        <div className='icons'>
          <span><i className='fa fa-check-square'><FaCheckSquare /> </i>
            <p>ORDER</p>
            <hr className='line' />
          </span>

          <span><i className='fa fa-truck'><FaTruck /></i>
            <p>SHIPPING</p>
            <hr className='line' />
          </span>
          <span><i className='fa fa-money-check'><FaMoneyCheck /></i>
            <p>PAYMENT</p>
          </span>
        </div>
        <div className='book-details'>
          <h3>Order Details</h3>
          <ul>
            {
              cart.length > 0 ? (cart.map((orderedBook) => (
                <li key={orderedBook.bookId}> <span className='title'>{orderedBook.bookTitle}</span><br /> <span className='qty'> Quantity: {orderedBook.amount}</span> <span className='price'>Price: {orderedBook.price}</span> <i className='fa fa-trash' onClick={() => { handleRemove(orderedBook.bookId) }}><FaTrash /></i> </li>
              ))
              ) : (
                <p className='order-empty'>Your Cart is Empty</p>
              )
            }
          </ul>
          <h4 className='price'>Total Price : {price}</h4>
        </div>

        <div className='input-group'>
          <input type='text' name='name' id='name' value={userDetails.name} onChange={handleInput} placeholder='Full Name' required />
          <input type='text' name='phone' id='phno' value={userDetails.phone} onChange={handleInput} placeholder='Phone Number ' required />
          <input type='text' name='phoneAlt' id='phno2' value={userDetails.phoneAlt} onChange={handleInput} placeholder='Alternative Phone Number' />
        </div>
        <div className='input-group'>
          <h3>Shipping Address</h3>
          <div className='address1'>
            <input type='text' name='city' id='city' value={userDetails.city} onChange={handleInput} placeholder='City/District/Town' required />
            <select name="state" id="state" value={userDetails.state} onChange={handleInput} required>
              <option value="" disabled>State</option>
              <option value="Tamil_Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Telangana">Telangana</option>
              <option value="Kerala">Kerala</option>
              <option value="Uttar_Pradesh">Uttar Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh	">Chhattisgarh </option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal_Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Madhya_Pradesh">Madhya Pradesh</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Odisha">Odisha</option>
              <option value="Sikkim">Sikkim</option>
              <option value="West_Bengal">West Bengal</option>
              <option value="Tripura">Tripura</option>
            </select>
          </div>
          <div className='address2'>
            <input type='text' name='landmark' id='landmark' value={userDetails.landmark} onChange={handleInput} placeholder='Landmark(Optional)' />
            <input type='text' name='pincode' id='pincode' value={userDetails.pincode} onChange={handleInput} placeholder='Pincode' required />
          </div>
          <textarea name="address" id="address" value={userDetails.address} onChange={handleInput} cols="41" rows="5" placeholder="House No, Building Name" required></textarea>
        </div>
        <button type='submit' className='btn btn-danger'>Submit</button>
      </form>
      {successMessage && (
        <div className='success-message'><p>{orderStatus}</p>
        </div>
      )}
    </div>
  )
}

export default ShippingCart
