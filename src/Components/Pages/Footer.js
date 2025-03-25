import React from 'react'
import logo from '../../Images/logo.jpeg'
import { NavLink } from 'react-router-dom';
import { FaEnvelope, FaFacebook, FaGlobe, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import '../../Styles/Footer.css'
import { Container, Nav, Row, Col } from 'react-bootstrap';


const Footer = () => {
  return (
    <footer className='footer bg-dark text-light d-flex text-center  custom-footer'>
      <Container fluid className='footer-container'>
        <Row>
          <Col md={3}>
            <div className='d-flex justify-content-center logo'>
              <img src={logo} to='/' alt='loading' />
            </div>
          </Col>
          <Col md={3} className='text-start'>
              <h3 className='my-4 text-start'>Book Store</h3>
              <Nav className='d-flex flex-column'>
                <Nav.Link as={NavLink} to='/' className='bg-dark nav-link'><span>Home</span></Nav.Link>
                <Nav.Link as={NavLink} to='/BookDetails/:bookId' className='nav-link'><span>Book Details</span></Nav.Link>
                <Nav.Link as={NavLink} to='/ShoppingCart' className='nav-link'><span>Order Details</span></Nav.Link>
                <Nav.Link as={NavLink} to='/blog' className='nav-link'><span>Blog</span></Nav.Link>
                <Nav.Link as={NavLink} to='/contact-us' className='nav-link'><span>Contact Us</span></Nav.Link>
                <Nav.Link as={NavLink} to='/about-us' className='nav-link'><span>About Us</span></Nav.Link>
              </Nav>
          </Col> 
          <Col md={3}>
              <h3 className='my-4 text-start'>Contact Us</h3>
              <Nav className='book-link d-flex flex-column text-start'>
                <address><FaMapMarkerAlt size={24} />  <a href='tel:+91 12345 67890' className='text-decoration-none text-light'>123 Tech Street, City, India</a></address>
                <address><FaPhoneAlt size={24} />  <a href='tel:+91 12345 67890' className='text-decoration-none text-light'>+91 97545 56756</a></address>
                <address><FaEnvelope size={24} />  <a href='mailto:support@bookstore.com' className='text-decoration-none text-light'>support@bookstore.com</a></address>
                <address><FaGlobe size={24}/>  <a href='www.bookstore.com' className='text-decoration-none text-light'>www.bookstore.com</a></address>
              </Nav>
          </Col>
          <Col md={3}>
              <h3 className='my-4 text-start'>Follow Us</h3>
              <div className='link text-start'>
                <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'><i className='fa fa-facebook'><FaFacebook /></i></a>
                <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'><i className='fa fa-instagram'><FaInstagram /></i></a>
                <a href='https://www.linkedin.com/' target='_blank' rel='noopener noreferrer'><i className='fa fa-linkedin'><FaLinkedin /></i></a>
              </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} className='text-center d-sm-flex justify-content-center align-items-center pt-5'>
            <span>&copy; {new Date().getFullYear()} Copyright ABC Software Technologies Pvt Ltd 2025</span>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
