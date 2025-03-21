import '../style/products.css'
export default function ProductListItem() {
    return (
        <div className="product-list-item-container">
            <div className="product-list-item">
                <div>
                    <img src="https://static.vecteezy.com/system/resources/previews/028/047/017/non_2x/3d-check-product-free-png.png" alt="Product" />
                </div>
                <div>
                    <h3>Product Name</h3>
                    <p>Product Description</p>
                    <p>Price: $99.99</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}