import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import AlertMessage from "./alertMessage";

export default function Product({ addProductHandler }) {
  const [alert, setAlert] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("https://fakestoreapi.com/products", data)
      .then((response) => {
        addProductHandler(response.data);
        setAlert({ text: "Producto agregado con éxito", type: "success" });
      })
      .catch((error) => {
        setAlert({ text: "Error al agregar producto", type: "error" });
      });
  };

  const handleCloseAlert = () => {
    setAlert(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-sm bg-light">
      {alert && (
        <AlertMessage message={alert.text} type={alert.type} onClose={handleCloseAlert} />
      )}

      <h2 className="mb-4">Add Product</h2>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          {...register("title", {
            required: "El título es obligatorio",
            maxLength: {
              value: 40,
              message: "El título debe tener como máximo 40 caracteres",
            },
          })}
        />
        {errors.title && <div className="text-danger">{errors.title.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price:
        </label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          id="price"
          {...register("price", {
            required: "El precio es obligatorio",
            valueAsNumber: true,
            min: {
              value: 0.01,
              message: "El precio debe ser un número positivo",
            },
          })}
        />
        {errors.price && <div className="text-danger">{errors.price.message}</div>}
      </div>


      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <textarea
          className="form-control"
          id="description"
          {...register("description", {
            required: "La descripción es obligatoria",
            maxLength: {
              value: 80,
              message: "La descripción debe tener como máximo 80 caracteres",
            },
          })}
        />
        {errors.description && <div className="text-danger">{errors.description.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Image URL:
        </label>
        <input
          type="text"
          className="form-control"
          id="image"
          {...register("image", {
            required: "La URL de la imagen es obligatoria",
            pattern: {
              value: /^https:\/\/.*\.jpg$/,
              message: "La URL de la imagen no es válida",
            },
          })}
        />
        {errors.image && <div className="text-danger">{errors.image.message}</div>}
      </div>

      <button type="submit" className="btn btn-primary">
        Add Product
      </button>
    </form>
  );
}
