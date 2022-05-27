import Head from "next/head";
import styled from "styled-components";
import { FiArrowRight } from "react-icons/fi";

const Tagline = styled.h1`
	font-size: 4vw;
	@media (max-width: 900px) {
		font-size: 7vw;
	}
	@media (max-width: 550px) {
		font-size: 9vw;
	}
`;

const Img = styled.img`
	width: 100%;
	height: 100%;
`;

const TextButton = styled.p`
	padding: 0;
	margin: 0;
	font-size: 20px;
	@media (max-width: 470px) {
		font-size: 14px;
	}
	@media (max-width: 360px) {
		font-size: 10px;
	}
	@media (max-width: 320px) {
		font-size: 9px;
	}
`;

const Home = () => {
	return (
		<>
			<Head>
				<title>thrifty!</title>
			</Head>
			<div className="row min-vh-100 align-items-center text-black pt-md-2 pb-md-4">
				<div className="col-lg-6 col-12">
					<Img src="/img/thrift.png" className="d-block ms-auto" alt="Scrolling" />
				</div>
				<div className="col-lg-6 col-12 px-5">
					<Tagline>
						Teman <span style={{ color: "#D79771" }}>thrift</span>
					</Tagline>
					<Tagline>andalan</Tagline>
					<Tagline style={{ color: "#B05C3C" }}>anda</Tagline>
					<button className="btn btn-mocca mt-2 btn-lg" style={{ width: "50%" }}>
						<TextButton>
							Cari Produk <FiArrowRight />
						</TextButton>
					</button>
				</div>
			</div>
		</>
	);
};

export default Home;
