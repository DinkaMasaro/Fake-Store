import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Product from "./product";
import { useAuth } from "./authContext";
import AlertMessage from "./alertMessage";

export default function ProductList() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);  // Estado para controlar el menú desplegable
    const { handleLogout } = useAuth();

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem("loggedIn");
        console.log("isLoggedIn", isLoggedIn);

        axios
            .get("https://fakestoreapi.com/products")
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setAlert({ text: "Error getting products", type: "error" });
                setLoading(false);
            });
    }, [navigate]);

    const addProductHandler = (newProduct) => {
        setProducts([...products, newProduct]);
        setShowForm(false);
        setAlert({ text: "Product successfully added", type: "success" });
    };

    const handleCloseAlert = () => {
        setAlert(null);
    };

    const deleteProductHandler = (id) => {
        axios
            .delete(`https://fakestoreapi.com/products/${id}`)
            .then(() => {
                setProducts(products.filter(product => product.id !== id));
                setAlert({ text: "Product successfully deleted", type: "success" });
            })
            .catch((error) => {
                setAlert({ text: "Error deleting product", type: "error" });
            });
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            {alert && <AlertMessage message={alert.text} type={alert.type} onClose={handleCloseAlert} />}

            {/* Icono de hamburguesa en la esquina superior derecha */}
            <button
                className="btn btn-light position-fixed top-0 end-0 m-3"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ zIndex: 1000 }}
            >
                <i className="bi bi-gear" style={{ fontSize: "1.5rem" }}></i> {/* Icono de tuerca */}
            </button>

            {/* Menú desplegable al hacer clic en el ícono de hamburguesa */}
            {menuOpen && (
                <div className="position-fixed top-0 end-0 p-3 mt-5" style={{ zIndex: 999 }}>
                    <div className="bg-light shadow rounded p-2">
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                handleLogout();
                                navigate("/");
                            }}
                        >
                            Log out
                        </button>
                    </div>
                </div>
            )}

            <h1 className="text-center mb-4">Listado de Productos</h1>
            <div className="text-center mb-4">
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                >Agregar Producto</button>
            </div>

            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map((product) => (
                    <div key={product.id} className="col">
                        <div className="card h-100">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="card-img-top"
                                height="200"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/200?text=Imagen+No+Disponible";
                                }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">${product.price}</p>
                            </div>
                            <div className="card-footer text-center">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteProductHandler(product.id)}
                                >
                                    Eliminar Producto
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Agregar Producto</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setShowForm(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <Product addProductHandler={addProductHandler} setAlert={setAlert} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
