import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";

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

const Home = () => {
	return (
		<>
			<Head>
				<title>thrifty!</title>
			</Head>
			<div className="row min-vh-100 align-items-center text-black py-5">
				<div className="col-lg-6 col-12">
					<Img src="/img/thrift.png" className="d-block ms-auto" alt="Scrolling" />
				</div>
				<div className="col-lg-6 col-12 px-5">
					<Tagline>
						Teman <span style={{ color: "#D79771" }}>thrift</span>
					</Tagline>
					<Tagline>andalan</Tagline>
					<Tagline style={{ color: "#B05C3C" }}>anda</Tagline>
					<Link href="/products">
						<button className="btn btn-mocca mt-2 btn-lg">
							Cari Produk <FaArrowRight />
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Home;
