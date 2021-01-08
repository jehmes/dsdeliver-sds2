import { fetchProducts } from "../api";
import ProductCard from "./ProductCard";
import { Product } from "./types";

//Ta falando q a variave products é uma lista de produtos
type Props = {
    products: Product[];
}

function ProductsList({ products }: Props) {
    return (
        <div className="orders-list-container">
            <div className="orders-list-items">
                {products.map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))}                        
            </div>
        </div>
    )
}

export default ProductsList;