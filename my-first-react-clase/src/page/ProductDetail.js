import { useParams, useNavigate } from "react-router-dom";
import "../style/productDetail.css";
import ValidateToken from "../utils/ValidateToken";

const products = [
    { id: 1, name: "Unlocking the Power of Cloud Computing", date: "November 12, 2024", image: "https://i.scdn.co/image/ab67616d00001e02460895c0deb4e737ab631dae", description: "A guide to scalable cloud solutions." },
    { id: 2, name: "AI and the Future of Work", date: "December 5, 2024", image: "https://i.scdn.co/image/ab67616d00001e02460895c0deb4e737ab631dae", description: "How AI is shaping the workforce." }
];

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.id === parseInt(id));
    ValidateToken();
    
    if (!product) return <h2>Producto no encontrado</h2>;

    return (
        <div className="product-detail">
            <img src={product.image} alt={product.name} />
            <div className="product-detail-content">
                <button onClick={() => navigate(-1)}>← Volver</button>
                <h2>{product.name}</h2>
                <p>{product.date}</p>
                <p>{product.description}</p>
            </div>
        </div>
    );
}
