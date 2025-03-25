import { FaTrash } from 'react-icons/fa'
import '../../Styles/ShoppingCart.css'
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useContext } from 'react';
import { BookContext } from '../../App';

const ShoppingCart = () => {
  const { cart, setCart, price, handleRemove } = useContext(BookContext);
  

  const incrementCount = (bookId) => {
    setCart(cart.map(item =>
      item.bookId === bookId ? { ...item, amount: item.amount + 1 } : item

    ))
  }
  const decrementCount = (bookId) =>
    setCart(cart.map(item =>
      item.bookId === bookId && item.amount > 1 ? { ...item, amount: item.amount - 1 } : item
    ))

  return (
    <Container fluid className='shopping-cart-container'>
    <article>
      <h1 className='heading'>Shopping Cart Details</h1>
      {
        cart?.map((item) => (
          <div className='cart-items' key={item.bookId}>
            <div className='cart-item'>
              <span className='book-id'> {item.bookId} </span>
              <img src={item.ImageUrl} alt='Loading' />
              <span className='book-title'>{item.bookTitle}</span>
            </div>

            <div className='addsub_item'>
              <button className='btn btn-success' onClick={() => { incrementCount(item.bookId) }}> + </button>
              <button className='btn btn-warning'> {item.amount} </button>
              <button className='btn btn-danger' onClick={() => { decrementCount(item.bookId) }}> - </button>
            </div>

            <div className='price'>
              <span> {item.price} </span>
              <button className='fa fa-trash' onClick={() => { handleRemove(item.bookId) }}> <i><FaTrash /></i> </button>
            </div>
          </div>
        ))
      }
      <br /><hr />
      <div className='total'>
        <span className='total-price'> Total Price of Your Cart: INR ₹{price}</span><br/>
        <Link to='/ShippingCart'>
        <button className='btn btn-warning'>Buy Now</button>
        </Link>
      </div>  
    </article>
    </Container>
  )
}

export default ShoppingCart
