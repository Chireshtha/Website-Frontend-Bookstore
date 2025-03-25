import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import Header from './Components/Pages/Header';
import Home from './Components/Pages/Home';
import BookDetails from './Components/Pages/BookDetails';
import BooksDetails from './Components/API Data/Books';
import ShoppingCart from './Components/Pages/ShoppingCart';
import Footer from './Components/Pages/Footer';
import ShippingCart from './Components/Pages/ShippingCart';
import Blog from './Components/Pages/Blog';
import Aboutus from './Components/Pages/Aboutus';
import Contact from './Components/Pages/Contact';

export const BookContext = createContext();
 
function App() {

  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);
  const [price, setPrice] = useState(0);
  const [books, setBooks] = useState([]);
  
  
  

 
//API from backend process
  // const fetchAvailableBooks = async () => {
  //   try {
  //     const response = await axios.get("http://127.0.0.1:5000/Books_Details");
  //     const availableBooks = response.data.filter(book => book.is_available);
  //     setBooks(availableBooks)
  //     console.log("Available book loaded", availableBooks)
  //   }
  //   catch (error) {
  //     console.log({ "message": "Failed to load available books", error })
  //   }
  // }

  // useEffect(() => {
  //   fetchAvailableBooks();
  // }, [])

  //API from frontend
  useEffect(() => {
    setBooks(BooksDetails);
  }, [])

  //Extracting Book Details
  const Books = books.map((currentBook) => {
    return currentBook;
  })

  //Handle total price
  const handlePrice = () => {
    let res = 0;
    cart.map((item) => {
      return res += item.amount * item.price
    })
    setPrice(res)
  }
  useEffect(() => {
    handlePrice();
  })

  //handle AddtoCart Details
  const handleAddtoCart = (book) => {
    const IsBookInCart = !cart.some((cartItem) => cartItem.bookId === book.bookId)
    if (IsBookInCart) {
      setCart((prevCart) => [...prevCart, book]);
      setWarning(false)
    }
    else {
      setWarning(true);
      setTimeout(() => {
        setWarning(false)
      }, 2000)
    }
  };

  //Removing AddtoCart Items
  const handleRemove = (bookId) => {
    setCart(cart.filter(item =>
      item.bookId !== bookId
    ))
  }

  return (
    <BookContext.Provider value={{cart, setCart, handleAddtoCart, warning, books, Books ,price, handleRemove}}>
    <BrowserRouter>
      <Header size={cart.length} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/BookDetails/:bookId' element={<BookDetails  />} />
        <Route path='/ShoppingCart' element={<ShoppingCart />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact-us' element={<Contact />} />
        <Route path='/about-us' element={<Aboutus />} />
        <Route path='/ShippingCart' element={<ShippingCart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </BookContext.Provider>
  );
}

export default App;
