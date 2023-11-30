import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Swiggy from "./components/Login/LoginMain";
import Mainpage from "./components/mainPage/mainPage";
import CityHotels from './components/CityHotels/cityhotelmainpage'
import { useSelector } from "react-redux";
import HomePage from "./components/CityHotels/HomePage";
import Hotelitems from "./components/CityHotels/HotelItems";
import CheckoutPage from "./components/Checkout/Checkout";
import OrderPlace from "./components/orderPlaced/orderPlace";
import OrderHistory from "./components/orderhistory/OrderHistory";
import ResetPassword from "./components/Login/resetPassword";
function App() {
  const auth = useSelector((state)=>state.login.logginStatus)
  const hotelitemsUndefined = useSelector((state)=>state.login.hotels)
  const orderResponse = useSelector((state) => state.login.OrderResponse)
  console.log(orderResponse.length===0)
  if(window.location.pathname=='/login'){
    localStorage.clear()
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Swiggy />} />
          <Route path="/" element={auth ? <HomePage /> : <Navigate to='/login' /> }/>
          {/* <Route path="/city/:cityname" element={<CityHotels />}/> */}
          {/* <Route path="/home" element={<HomePage />}/> */}
          <Route path="/hotelItems" element={ auth ? <Hotelitems /> : <Navigate to='/login'/>}/>
          <Route path="/checkout" element={ auth ? <CheckoutPage /> : <Navigate to='/login' />} />
          <Route path="/OrderPlace" element={ orderResponse.length !==0 ? <OrderPlace /> : <Navigate to='/' />} />
          <Route path="/orderhistory" element={  <OrderHistory />} />
          <Route path="/reset" element={  <ResetPassword />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
