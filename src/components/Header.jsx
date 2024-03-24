import { useState } from 'react';

export const Header = ({
	allProducts,
	setAllProducts,
	total,
	countProducts,
	setCountProducts,
	setTotal,
}) => {
	const [active, setActive] = useState(false);

	const onDeleteProduct = product => {
		const results = allProducts.filter(
			item => item.id !== product.id
		);

		setTotal(total - product.price * product.quantity);
		setCountProducts(countProducts - product.quantity);
		setAllProducts(results);
	};

	const onCleanCart = () => {
		setAllProducts([]);
		setTotal(0);
		setCountProducts(0);
	};

	const [activeLink, setActiveLink] = useState('Promociones');

	const handleClick = (link) => {
		setActiveLink(link);
	};

	return (
		<header>
			<div className='header'>
				<img src="/img/blife.png" alt="" className='img-header' />
				<div className='navegation'>
					<a href="#" className={activeLink === 'Productos' ? 'navegation-link active-link' : 'navegation-link'} onClick={() => handleClick('Productos')}>Productos</a>
      				<a href="#" className={activeLink === 'Promociones' ? 'navegation-link active-link' : 'navegation-link'} onClick={() => handleClick('Promociones')}>Promociones</a>
      				<a href="#" className={activeLink === 'Nosotros' ? 'navegation-link active-link' : 'navegation-link'} onClick={() => handleClick('Nosotros')}>Nosotros</a>
				</div>
				<div className='container-icon'>
					<div
						className='container-cart-icon'
						onClick={() => setActive(!active)}
					>
						<img src="/img/search.png" alt="" className='icon-cart-search' />
						<img src="/img/user.png" alt="" className='icon-cart-user' />
						<img src="/img/bolsa.png" alt="" className='icon-cart' />
						<div className='count-products'>
							<span id='contador-productos'>{countProducts}</span>
						</div>
					</div>

					<div
						className={`container-cart-products ${
							active ? '' : 'hidden-cart'
						}`}
					>
						{allProducts.length ? (
							<>
								<div className='row-product'>
									{allProducts.map(product => (
										<div className='cart-product' key={product.id}>
											<div className='info-cart-product'>
												<span className='cantidad-producto-carrito'>
													{product.quantity}
												</span>
												<p className='titulo-producto-carrito'>
													{product.nameProduct}
												</p>
												<span className='precio-producto-carrito'>
													${product.price}
												</span>
											</div>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='currentColor'
												className='icon-close'
												onClick={() => onDeleteProduct(product)}
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M6 18L18 6M6 6l12 12'
												/>
											</svg>
										</div>
									))}
								</div>

								<div className='cart-total'>
									<h3>Total:</h3>
									<span className='total-pagar'>${total}</span>
								</div>

								<button className='btn-clear-all' onClick={onCleanCart}>
									Vaciar Carrito
								</button>
							</>
						) : (
							<p className='cart-empty'>El carrito está vacío</p>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};
