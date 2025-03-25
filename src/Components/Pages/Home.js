import '../../Styles/Home.css'
import { Link } from 'react-router-dom';
import BookStore from '../../Images/slide1.avif'
import { Card, Container } from 'react-bootstrap'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import StarRating from '../Routes/StarRating';
import { useContext } from 'react';
import { BookContext } from '../../App';
 
const Home = () => {

  const { handleAddtoCart, books } = useContext(BookContext);

  return (
    <Container fluid className='p-0 m-0 d-flex flex-column justify-content-center align-items-center custom-container-home-1'>
      <Container fluid className='p-0 m-0 d-flex justify-content-center align-items-center home-container-1'>
        <img src={BookStore} alt='loading' className='img-fluid container-img position-relative' />
        <div className='d-flex flex-column justify-content-item align-items-center position-absolute'>
          <h1 className='fs-1 fw-bold'>Discover Your Next Favorite Book!</h1>
          <p className='fs-5 text-muted fw-medium'>Explore our vast collection of books from bestsellers to hidden gems.</p>
        </div>
      </Container>


      <Container fluid className='custom-container-home-3'>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={8}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 6 },
            1200: { slidesPerView: 7 }
          }}
          navigation
        >
          {books && books.length > 0 ? (
            books.map((book) => (
              <SwiperSlide>
                <Card className="home-card my-5" key={book.bookId}>
                  <div className='card-img'>
                    <Link to={`/BookDetails/${book.bookId}`} >
                      <img src={book.ImageUrl} className="card-img-top" alt="loading..." />
                    </Link>
                  </div>

                  <Card.Body>
                    <Link to={`/BookDetails/${book.bookId}`} className='text-decoration-none' >
                      <Card.Title className="card-title p-0 m-0 fs-6">{book.bookTitle}</Card.Title>
                      <Card.Text className="card-text fs-6">{book.description}</Card.Text>
                    </Link>
                    <Link to={`/BookDetails/${book.bookId}`} className='text-decoration-none'>
                      <div className='price'>
                        <span className='original-price text-primary'><s>₹{book.originalPrice}</s></span>
                        <span className="card-link text-success"> ₹{book.price}</span>
                        <span className='discount text-danger'> (-{book.discountPercentage}%)</span>
                      </div>
                      <StarRating className='d-flex justify-content-center' rating={book.rating} size={20} />
                    </Link>
                    <div className="card-btn">
                      <button className="btn btn-danger btn-sm" onClick={() => handleAddtoCart(book)}>Add to Cart</button>
                      <Link to='/ShippingCart'><button className="btn btn-warning btn-sm text-light">Buy Now</button></Link>
                    </div>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            ))
          ) : (
            <p>No Books Available</p>
          )}
        </Swiper>
      </Container>
    </Container >
  )
}

export default Home
