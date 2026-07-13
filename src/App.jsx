import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import CoinDetails from "./pages/CoinDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/coin/:id" element={<CoinDetails />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;