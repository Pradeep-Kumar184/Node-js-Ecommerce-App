import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./component/auth/Register";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Login from "./component/auth/Login";
import Dashboard from "./component/Dashboard";
import PrivateRoute from "./component/routes/Private";
import ForgotPassword from "./component/auth/ForgotPassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/about" element={<About></About>}></Route>
            <Route path="/contact" element={<Contact></Contact>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/forgot-Password" element={<ForgotPassword />}></Route>
            {/* private route */}
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route path="" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
