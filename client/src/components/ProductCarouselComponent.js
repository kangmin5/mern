import { Carousel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ProductCarouselComponent = () => {
	return (
		<Carousel>
			<Carousel.Item>
				<img
					className='d-block w-100'
					style={{ height: '300px', objectFit: 'cover' }}
					src='/images/carousel/carousel-1.png'
					alt='First slide'
				/>
				<Carousel.Caption>
					<LinkContainer
						style={{ cursor: 'pointer', color: 'yellow' }}
						to='/product-details'
					>
						<h3>Bestseller in Notebooks Category</h3>
					</LinkContainer>
					<p>Dell Inspiron 15 3000, 15.6 inch HD</p>
				</Carousel.Caption>
			</Carousel.Item>

			<Carousel.Item>
				<img
					className='d-block w-100'
					style={{ height: '300px', objectFit: 'cover' }}
					src='/images/carousel/carousel-2.png'
					alt='Second slide'
				/>

				<Carousel.Caption>
					<LinkContainer
						style={{ cursor: 'pointer', color: 'yellow' }}
						to='/product-details'
					>
						<h3>Bestseller in Books Category</h3>
					</LinkContainer>
					<p>정춘희 , 흐르는 강물에 꽃을 띄우라</p>
				</Carousel.Caption>
			</Carousel.Item>

			<Carousel.Item>
				<img
					className='d-block w-100'
					style={{ height: '300px', objectFit: 'cover' }}
					src='/images/carousel/carousel-3.png'
					alt='Third slide'
				/>

				<Carousel.Caption>
					<LinkContainer
						style={{ cursor: 'pointer', color: 'yellow' }}
						to='/product-details'
					>
						<h3>Bestseller in Cameras Category</h3>
					</LinkContainer>
					<p>Canon, V7 Full Frame</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
};

export default ProductCarouselComponent;
