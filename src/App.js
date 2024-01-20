import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Landing from "./Pages/Landing";
import MarketBoy from "./Pages/MarketBoy";
import Orders from "./Pages/Orders";
import Delivery from "./Pages/Delivery";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/market" element={<MarketBoy />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/delivery" element={<Delivery />} />
      </Routes>
    </Router>
  );
}

export default App;
