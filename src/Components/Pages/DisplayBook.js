import { useContext } from "react";
import { BookContext } from "../../App";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFilteredBooks from "../hooks/useFilteredBooks";
import StarRating from "../Routes/StarRating";
import '../../Styles/BookDetails.css'

const DisplayBook = () => {
  const { books, handleAddtoCart } = useContext(BookContext);
  const { categories, selectedCategory, setSelectedCategory, searchTerm, setSearchTerm, FilteredBooks, applyFilters } = useFilteredBooks(books);
  console.log(FilteredBooks);

  return (
    <Container fluid className="my-5">
      {/* Search & Category Filter Section */}
      <Row className="my-5">
        <Col md={4} className="d-flex flex-row justify-content-end">
          <Form.Select value={selectedCategory}  onChange={(e) => setSelectedCategory(e.target.value)} className="w-50 rounded-0 py-3">
            {categories.map((category, index) => (
              <option key={index} value={category} >
                {category}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={6} className="d-flex flex-row justify-content-start">
          <Form.Control
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} className="w-75 py-3 rounded-0"
          />
          <Button variant="dark" className="w-25 ms-2 rounded-0 py-3" onClick={applyFilters}>
            Search
          </Button>
          
        </Col>
      </Row>

      {/* Book Display Section */}
      <Row className="mx-5">
        {FilteredBooks && FilteredBooks.length > 0 ? (
          FilteredBooks.map((book) => (
            <Col md={2} key={book.bookId} className="mb-4">
              <Card className="home-card my-2" key={book.bookId}>
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
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No books found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default DisplayBook;
