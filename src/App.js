import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./components/logIn";
import ProductList from "./components/productList";
import ProtectedRoute from "./components/protectedRoute";
import { AuthProvider } from "./components/authContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  return (
    <AuthProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;



