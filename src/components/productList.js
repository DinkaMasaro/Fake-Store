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
                setAlert({ text: "Error al obtener los productos", type: "error" });
                setLoading(false);
            });
    }, [navigate]);

    const addProductHandler = (newProduct) => {
        setProducts([...products, newProduct]);
        setShowForm(false);
        setAlert({ text: "Producto agregado con éxito", type: "success" });
    };

    const handleCloseAlert = () => {
        setAlert(null);
    };

    const deleteProductHandler = (id) => {
        axios
            .delete(`https://fakestoreapi.com/products/${id}`)
            .then(() => {
                setProducts(products.filter(product => product.id !== id));
                setAlert({ text: "Producto eliminado con éxito", type: "success" });
            })
            .catch((error) => {
                setAlert({ text: "Error eliminando el producto", type: "error" });
            });
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            {alert && <AlertMessage message={alert.text} type={alert.type} onClose={handleCloseAlert} />}

            <button
                className="btn btn-secondary ms-1"
                onClick={() => {
                    handleLogout();
                    navigate("/");
                }}
            >
                Log out
            </button>
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
