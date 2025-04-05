import { Routes, Route } from "react-router-dom";
import Home from "../page/Home";
import About from "../page/About";
import Contact from "../page/Contact";
import Login from "../page/Login";
import Products from "../page/Products";
import ProductDetail from "../page/ProductDetail"; // 👈 Importar el detalle
import ReducerScreen from "../page/ReducerScreen";
import CreateProduct from "../page/CreateProduct";
import Calculadora from "../page/Calculadora";
import Cart from "../page/Cart";

export default function MyRouters() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="usereducer-component" element={<ReducerScreen />} />
            <Route path="/calculadora" element={<Calculadora />} />
        </Routes>
    );
}
