import React, { useCallback, useContext, useRef, useState } from 'react'
import logo from '../../Images/logo.jpeg';
import { Link, NavLink } from 'react-router-dom';
import '../../Styles/Header.css';
import { FaBars, FaCartPlus, FaSearch, FaTimes } from 'react-icons/fa'
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import useToggle from '../../Components/hooks/useToggle.js';
import { BookContext } from '../../App.js';

const Header = ({ size }) => {
  const { isToggled, handleToggle } = useToggle();
  const toggleRef = useRef(null)
  const { warning } = useContext(BookContext);
  const [globalSearch, setGlobalSearch] = useState("");

  const handleSearch = (e) => {
    setGlobalSearch(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (globalSearch.trim() !== "") {
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(globalSearch)}`;
      window.open(googleSearchUrl, '_blank');
      setGlobalSearch("");
    }
  }



  const handlemobileDropdownItemClick = useCallback(() => {
    if (window.innerWidth < 767 && toggleRef.current) {
      toggleRef.current.click();
    }
  }, [])
  return (
    <Navbar bg='dark' variant='dark' expand="md" className='px-3 d-flex justify-content-center fixed-top h-80 custom-navbar'>
      <Container fluid className='d-flex justify-content-center align-items-center'>
        <Navbar.Brand as={NavLink} to="/" className='logo-img'>
          <img src={logo} alt='loading logo' className='logo' />
        </Navbar.Brand>
        <Navbar.Toggle ref={toggleRef} aria-controls='navbar-nav' onClick={handleToggle}>{isToggled ? <FaTimes size={24} /> : <FaBars size={24} />}</Navbar.Toggle>
        <Navbar.Collapse id='navbar-nav' clas
          sName='flex-row navbar-collapse'>
          <Nav className='d-flex justify-content-center align-items-center mx-5 my-4 pt-3 navbar-1'>
            <Nav.Link as={NavLink} to='/' className='nav-link custom-nav-item text-decoration-none' onClick={handlemobileDropdownItemClick}> <span>Home</span> </Nav.Link>
            <Nav.Link as={NavLink} to='/BookDetails/:bookId' className='nav-link custom-nav-item text-decoration-none' onClick={handlemobileDropdownItemClick}> <span>Book Details</span> </Nav.Link>
            <Nav.Link as={NavLink} to='/ShoppingCart' className='nav-link custom-nav-item text-decoration-none' onClick={handlemobileDropdownItemClick}> <span>Order Details</span> </Nav.Link>
            <Nav.Link as={NavLink} to='/blog' className='nav-link custom-nav-item text-decoration-none' onClick={handlemobileDropdownItemClick}> <span>Blog</span> </Nav.Link>
            <Nav.Link as={NavLink} to='/contact-us' className='nav-link custom-nav-item text-decoration-none' onClick={handlemobileDropdownItemClick}> <span>Contact Us</span> </Nav.Link>
            <Nav.Link as={NavLink} to='/about-us' className='nav-link custom-nav-item text-decoration-none' onClick={handlemobileDropdownItemClick}> <span>About Us</span> </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Container fluid className='d-flex flex-row  align-items-center search-cart-container'>
           <form onSubmit={handleSubmit} className='d-flex align-items-center mx-5 search-container'>
            <input type='text' value={globalSearch} onChange={handleSearch} placeholder='Search here...' className='custom-search ms-2 rounded-3' />
            <Button variant='dark' className='custom-btn rounded-3 mx-auto mb-4' type='submit'><FaSearch className='mx-2'/></Button>
          </form>
           <div className='cart'>
            <Link to='/ShoppingCart'> <FaCartPlus className='cart-icon' />
              {size > 0 && <span className='cart-badge'>{size}</span>}
            </Link>
          </div>
          {warning && (
            <div className='alert alert-danger fixed-top text-center w-30 mx-auto mt-5'>
              Item has been already added to the cart
            </div>)}
        </Container>
      </Container>
    </Navbar>
  )
}

export default Header
