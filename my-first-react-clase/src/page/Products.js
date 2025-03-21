import ProductListItem from "../components/ProductListItem";

const products = [
    { id: 1, name: "Unlocking the Power of Cloud Computing", date: "November 12, 2024", image: "https://i.scdn.co/image/ab67616d00001e02460895c0deb4e737ab631dae", description: "A guide to scalable cloud solutions." },
    { id: 2, name: "AI and the Future of Work", date: "December 5, 2024", image: "https://images.pexels.com/photos/5488660/pexels-photo-5488660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", description: "How AI is shaping the workforce." }
];

export default function Products() {
    return (
        <div>
            <h1 style={{ textAlign: "center", color: "#252930" }}>Lista de productos</h1>
            <div className="container-products">
                {products.map(product => (
                    <ProductListItem key={product.id} product={product} image={product.image} />
                ))}
            </div>
        </div>
    );
}
