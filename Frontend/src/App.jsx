import React, { useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router";
import { Home } from "./pages/Home/Home";
import { Cart } from "./pages/Cart/Cart";
import { PlaceOrder } from "./pages/PlaceOrder/PlaceOrder";
import { Footer } from "./components/Footer/Footer";
import { LogingPopup } from "./components/LogingPopup/LogingPopup";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LogingPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="overflow-   sm:overflow-hidden p-0  box-border min-h-screen w-[80%] m-auto ">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
