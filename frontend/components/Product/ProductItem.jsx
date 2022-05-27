import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { FaArrowRight, FaPencilAlt } from "react-icons/fa";
import { useAuth } from "../../contexts/auth";

const Card = styled.div`
	height: 400px;
	box-shadow: 0 0 12px 0 rgba(31, 38, 135, 0.15);
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, 0.18);
	overflow: auto;
`;

const CardImage = styled.div`
	width: 100%;
	height: 350px;
	overflow: hidden;
`;

const DetailButton = styled.a`
	& {
		transform: translateX(0);
		transition: 0.3s;
	}

	&:hover {
		transform: translateX(10px);
	}
`;

const EditButton = styled.a`
	position: absolute;
	top: 10px;
	right: 10px;
`;

const ProductItem = ({ item }) => {
	const { isAuthenticated } = useAuth();
	return (
		<Card className="card m-2 p-2">
			<CardImage>
				<Image
					src={item.image}
					className="card-img-top m-auto"
					alt={item.title}
					width="100%"
					height="100%"
					layout="responsive"
					priority
				/>
			</CardImage>
			<div className="card-body">
				<h6 className="card-title text-dark-brown">{item.title}</h6>
				<h5 className="card-text">Rp. {item.price}</h5>
				<hr />
				<h6 className="card-text text-dark-brown mb-3">
					{" "}
					Oleh{" "}
					<Link href="/profile/2">
						<a className="text-decoration-none text-brown">Rahmat</a>
					</Link>
					- 5m yang lalu
				</h6>
				<Link href={`/products/${item.id}`}>
					<DetailButton className="btn btn-mocca w-100">
						Lihat Detail <FaArrowRight />
					</DetailButton>
				</Link>
				{isAuthenticated && (
					<>
						<Link href={`/products/edit/${item.id}`}>
							<EditButton className="btn btn-warning">
								<FaPencilAlt />
							</EditButton>
						</Link>
					</>
				)}
			</div>
		</Card>
	);
};

export default ProductItem;
