import React from 'react';
import { useEffect, useState, useReducer } from 'react';
import ValidateToken from "../utils/ValidateToken";
import "../style/createProduct.css";
import CreateProductActions from "../functions/CreateProductActions";
import { useFormState } from 'react-dom';

async function productAciton(state, action){
    if (action.type === "POST") {
        //const { title, description, price, category } = action.payload;
        const data = {
            ...action.payload
        }

        const response = await CreateProductActions(data);
        console.log("Producto creado:", data, response);
        return { 
            title: response.title,
            description: response.description,
            price: response.price,
            category: response.category
        }
    } 

    if (action.type === "PATCH") {
        const { id, ...rest} = action.payload;
        const data = {
            ...rest
        };
    }
}
export default function CreateProduct() {
    ValidateToken();
    const [categories, setCategories] = useState([]);
    const [state, dispatch] = useReducer(productAciton, {
        title: "",
        description: "",
        price: 0,
        category: ""
    });
    

    useEffect(() => {
        async function fetchCategorias(){
            const response = await fetch("https://dummyjson.com/products/categories");
            const data = await response.json();
            setCategories(data);
        }
        fetchCategorias();
    }, []);

    async function submitAction(formData){
        const { title, description, price, category } = Object.fromEntries(formData);
        dispatch({type: "POST", payload: {title, description, price, category}});

        return;
    }

    return (
        <div>
            <h1>Crear Producto</h1>
            <div className="container">
                <form className="container-form" method='POST' action={submitAction}> 
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Título</label>
                        <input type="text" className="form-control" id="title" placeholder="Título del producto" name='title' required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Descripción</label>
                        <textarea className="form-control" id="description" rows="3" name='description' required></textarea>
                    </div>
                    <div className='row-group'>
                        <div className="mb-3 container-col2">
                            <label htmlFor="categories" className="form-label">Categorias</label>
                            <select className="form-select" id="category" required name='category'>
                                {categories.map((category) => (
                                    <option key={category.slug} value={category.slug}>{category.name}</option>
                                ))}
                            </select>       
                        </div>
                        <div className="mb-3 container-col2">
                            <label htmlFor="price" className="form-label">Precio</label>
                            <input type="number" className="form-control" id="price" placeholder="$0.00" name='price' required />
                        </div>
                    </div>
                    <ButtonSave/>
                </form>
            </div>
        </div>
    );
}



function ButtonSave(){
    const {pending} = useFormState();
    return (
        <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? "Guardando..." : "Guardar"}
        </button>
    )
}