import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from './components/Home.jsx'
import Page2 from './components/page2.jsx'
import List from './components/list.jsx'
import VerticalList from "./components/vertical-list";
import Footer from './components/Footer.jsx'  
import Contact from './components/contact.jsx'
import LoginPage from './components/Login.jsx'
import ExplorePage from './components/explore/Explore.jsx';
import Products  from './components/explore/products.jsx';
import Cart from './components/explore/Cart.jsx';
import { CartProvider } from './components/explore/CartContext.jsx';
import Navbar from './components/navbar.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';

// A wrapper component to handle conditional Navbar rendering
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  // Check if the current path is NOT /dashboard
  const showNavbar = location.pathname !== "/dashboard";

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Cart />
        {/* Wrap everything in the conditional layout */}
        <LayoutWrapper>
          <Routes>
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
                <ExplorePage />
                <Products />
                <Footer />
              </>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </CartProvider>
  );
}

export default App; 