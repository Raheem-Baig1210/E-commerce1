import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home.jsx'
import SplashCursor from './components/SplashCursor'
import Page2 from './components/page2.jsx'
import List from './components/list.jsx'
import VerticalList from "./components/vertical-list";
import Footer from './components/Footer.jsx'  
import Contact from './components/contact.jsx'
import { GlobeHero } from "./components/Golbe.jsx";
import LoginPage from './components/Login.jsx'
import ExplorePage from './components/explore/Explore.jsx';
import Products  from './components/explore/products.jsx';
import Cart from './components/explore/Cart.jsx';
import { CartProvider } from './components/explore/CartContext.jsx';
import Navbar from './components/navbar.jsx';



function App() {

  return (
    <CartProvider>
  <Router>
    {/* <SplashCursor /> */}
    <Cart />
    <Navbar />
    <Routes>
      {/* THE MAIN LANDING PAGE ROUTE */}
      <Route 
        path="/" 
        element={
          <>
            <Home />
            <VerticalList />
            <Page2 />
            <List />
            <Contact />
            <Footer />
          </>
        } 
      />
      <Route path="/explore" element={
        
        <>
        {/* <Cart /> */}
        <ExplorePage />
        <Products />
        <Footer />
      </>
        } />
      {/* THE LOGIN PAGE ROUTE */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </Router>
  </CartProvider>
);
}

export default App