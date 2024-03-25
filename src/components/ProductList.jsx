import { useState } from 'react';
import { data } from '../data';
import { Calificacion } from './Calificacion';
import { FaFacebook, FaTwitter, FaInstagram, FaRegHeart, FaHeart } from 'react-icons/fa';

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

	const [activePoints, setActivePoints] = useState(Array(5).fill(0));

	const handlePointClick = (itemIndex, pointIndex) => {
		setActivePoints(prevActivePoints => {
			const newActivePoints = [...prevActivePoints];
			newActivePoints[itemIndex] = pointIndex;
			return newActivePoints;
		});
	};

	const [liked, setLiked] = useState(data.map(() => false));

	const handleLikeClick = (index) => {
		setLiked(prevLiked => {
			const newLiked = [...prevLiked];
			newLiked[index] = !newLiked[index]; 
			return newLiked;
		});
	};

	return (
		<div className='container-items'>
			{data.map((product, index) => (
				<div className='item' key={product.id}>
					<figure>
						<div className='like-contador'>
							{liked[index] ? (
								<FaHeart color='#FF8E8E' onClick={() => handleLikeClick(index)} />
							) : (
								<FaRegHeart color='#FF8E8E' onClick={() => handleLikeClick(index)} />
							)}
							{liked[index] ? product.likes + 1 : product.likes}
						</div>
						<div className='descuento'>-{product.descuento}%</div>
						<img src={product.img} alt={product.nameProduct} />
						<div className='slider-img'>
							<ul>
							{[0, 1, 2].map((pointIndex) => ( // Cambia el número de puntos de navegación según sea necesario
								<li 
									key={pointIndex} 
									className={activePoints[index] === pointIndex ? 'active-point' : ''} 
									onClick={() => handlePointClick(index, pointIndex)}
								></li>
							))}
							</ul>
						</div>
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
