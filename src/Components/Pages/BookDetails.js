import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom' 
import '../../Styles/BookDetails.css'
import StarRating from '../Routes/StarRating';
import { BookContext } from '../../App';
import DisplayBook from './DisplayBook';


const BookDetails = () => {
  const {bookId} = useParams();
  const [currentBookDetail, setCurrentBookDetail] = useState(null);
  const { Books, handleAddtoCart } = useContext(BookContext);

  useEffect(() => {
    if (Books && Books.length > 0) {
      const bookFound = Books.find((book) =>
        book.bookId === parseInt(bookId));
      console.log('Found Book:', bookFound);
      if (bookFound) {
        setCurrentBookDetail(bookFound);
      }
    }
  }, [bookId, Books])
  return (
    <div className='book-details-container bg-light'>
      {currentBookDetail ? (
          <div>
            <div className='row' style={{marginTop:'30px', marginLeft:'30px'}}>
              <img src={currentBookDetail.ImageUrl} className='img-fluid' alt={currentBookDetail.bookTitle} />
              <div className='col-md-8'>
                <h1>{currentBookDetail.bookTitle}</h1>
                <h3>Author: {currentBookDetail.Author}</h3>
                <p>{currentBookDetail.description}</p>

                <div className='price-details'>
                  <span className="card-link" style={{ fontWeight: 'bold', marginRight: '5px' }}>₹{currentBookDetail.price}</span>
                  <span className='original-price' style={{ textDecoration: 'line-through', color: 'red', marginRight: '5px' }}>₹{currentBookDetail.originalPrice}</span>
                  <span className='discount' style={{ color: 'green' }}>(-{currentBookDetail.discountPercentage}%)</span>
                  <StarRating className='d-flex justify-content-center' rating={currentBookDetail.rating} size={25} />
                </div>
                
                <button className='btn btn-danger add-to-cart-btn' onClick={()=>handleAddtoCart(currentBookDetail)}>Add to Cart</button>
                <Link to='/ShippingCart'><button className='btn btn-success buy-now-btn'>Buy Now</button></Link>
              </div>
            </div>
          </div>
      ) : (
        <DisplayBook />
      )
      }
            

    </div>
  )
}

export default BookDetails
