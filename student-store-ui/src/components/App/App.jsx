import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import { removeFromCart, addToCart, getQuantityOfItemInCart, getTotalItemsInCart } from "../../utils/cart";
import "./App.css";


function App() {

  // State variables
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userInfo, setUserInfo] = useState({ id: "", email: ""});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);

  // Toggles sidebar
  const toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);

  // Functions to change state (used for lifting state)
  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const handleOnCheckout = async () => {
    try {
      setIsCheckingOut(true);

      const order = {
        customer_id: parseInt(userInfo.id),
        status: "pending",
      };
  
      let response = await axios.post("http://localhost:3000/orders", order);
      console.log("Response data:", response.data);
      const orderId = response.data.order_id;

     Object.keys(cart).map(async (productId) => ((
        await axios.post(`http://localhost:3000/orders/${orderId}/items`, {product_id: parseInt(productId),
          quantity: cart[productId]})
        
      )));

      // const totalPriceResponse = await axios.get(`http://localhost:3000/orders/${orderId}/total`);
      // const totalPrice = totalPriceResponse.data.total_price;

      // // Update the order with the total price
      // await axios.put(`http://localhost:3000/orders/${orderId}`, { total_price: totalPrice });
      await axios.put(`http://localhost:3000/orders/${orderId}`, { status: 'completed' });

      
      // Debugging: log the response data
      response = await axios.get(`http://localhost:3000/orders/${orderId}`);
  
      setOrder(response.data);
      console.log(response.data);
      setCart({});
      setUserInfo({ id: "", email: ""});
    } catch (err) {
      // Debugging: log the error
      console.error("Checkout error:", err);
  
      setError(err.message);
    } finally {
      setIsCheckingOut(false);
    }
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get("http://localhost:3000/products"); // No /api prefix if not used
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      }
      setIsFetching(false);
    };
  
    fetchProducts();
  }, []);
  

  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar
          cart={cart}
          error={error}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          isOpen={sidebarOpen}
          products={products}
          toggleSidebar={toggleSidebar}
          isCheckingOut={isCheckingOut}
          addToCart={handleOnAddToCart}
          removeFromCart={handleOnRemoveFromCart}
          getQuantityOfItemInCart={handleGetItemQuantity}
          getTotalItemsInCart={handleGetTotalCartItems}
          handleOnCheckout={handleOnCheckout}
          order={order}
          setOrder={setOrder}
        />
        <main>
          <SubNavbar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchInputValue={searchInputValue}
            handleOnSearchInputChange={handleOnSearchInputChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  error={error}
                  products={products}
                  isFetching={isFetching}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  addToCart={handleOnAddToCart}
                  searchInputValue={searchInputValue}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="/:productId"
              element={
                <ProductDetail
                  cart={cart}
                  error={error}
                  products={products}
                  addToCart={handleOnAddToCart}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFound
                  error={error}
                  products={products}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
 