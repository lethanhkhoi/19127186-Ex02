import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from './pages/HomePage';
import Modal from './components/modal/Modal';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="Container">

      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="/login" element={<Modal />}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
