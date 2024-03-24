import { data } from '../data';
import { Calificacion } from './Calificacion';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export const ProductList = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {
	const onAddProduct = product => {
		if (allProducts.find(item => item.id === product.id)) {
			const products = allProducts.map(item =>
				item.id === product.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
			setTotal(total + product.price * product.quantity);
			setCountProducts(countProducts + product.quantity);
			return setAllProducts([...products]);
		}

		setTotal(total + product.price * product.quantity);
		setCountProducts(countProducts + product.quantity);
		setAllProducts([...allProducts, product]);
	};

	return (
		<div className='container-items'>
			{data.map(product => (
				<div className='item' key={product.id}>
					<figure>
						<img src={product.img} alt={product.nameProduct} />
						<div className='contenedor-doble'>
							<h2 className='product-name-list'><strong>{product.nameProduct}</strong></h2>
							<h2 className='product-name-list'>${product.price}</h2>
						</div>
						<div className='contenedor-doble p-1'>
							<span className='contenido-producto'>{product.capsulas} Cápsulas | {product.miligramos} Mg</span>
							<span className='precio-anterior'>${product.precio_anterior}</span>
						</div>
						<Calificacion onChange={(rating) => handleRatingChange(rating)} defaultValue={product.stars} />
					</figure>
					<div className='info-product'>
						<div className='contenedor-doble'>
							<div className='social-media'>
								<span className='compartir'>Comparte</span>
								<div className='iconos-redes'>
									<FaFacebook />
									<FaTwitter />
									<FaInstagram />
								</div>
							</div>
							<button onClick={() => onAddProduct(product)}>
								Agregar
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
