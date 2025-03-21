import { useNavigate } from "react-router-dom";
import "../style/products.css";

export default function ProductListItem({ product }) {
    const navigate = useNavigate();

    return (
        <div className="product-list-item-container" onClick={() => navigate(`/products/${product.id}`)}>
            <div className="product-list-item">
                <div>
                    <img src={product.image} alt={product.name} />
                </div>
                <div>
                    <h3>{product.name}</h3>
                    <p>{product.date}</p>
                </div>
            </div>
        </div>
    );
}
