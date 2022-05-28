import Head from "next/head";
import react, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import styled from "styled-components";
import { FaDollarSign } from "react-icons/fa";
import FetchLoading from "../../components/Widget/FetchLoading";
import Bargain from "../../components/Bargain/Bargain";
import { useAuth } from "../../contexts/auth";
import { useEffect } from "react";

const ProductImage = styled.img`
	@media (min-width: 992px) {
		width: 75% !important;
	}
`;

const TextJudul = styled.h4`
	font-size: 1.5vw;
	@media (max-width: 1500px) {
		font-size: 2vw;
	}
	@media (max-width: 900px) {
		font-size: 2.5vw;
	}
	@media (max-width: 600px) {
		font-size: 3vw;
	}
	@media (max-width: 420px) {
		font-size: 4vw;
	}
`;

const ProductDetails = () => {
	const router = useRouter();
	const { id } = router.query;
	const { profile } = useAuth();

	const address = `http://localhost:5000/v1/products/${id}`;

	const fetcher = async (url) => {
		const { data } = await axios.get(url);
		const test = data.data.product;
		console.log(test);
		return test;
	};

	const options = {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	};

	const { data: item } = useSWR(address, fetcher, options);
	console.log(item);
	const [owner, setOwner] = useState(false);

	useEffect(() => {
		if (item) {
			setOwner(item ? (profile.id == item.seller.id ? true : false) : false);
		}
	}, [item]);
	const checkType = (check) => {
		if (check == 1) {
			return "Atasan";
		} else if (check == 2) {
			return "Bawahan";
		} else if (check == 3) {
			return "Luaran";
		} else if (check == 4) {
			return "Lainnya";
		}
	};

	return (
		<>
			<Head>
				<title>thrifty! - Detail Produk</title>
			</Head>
			<div className="container pt-lg-0 pt-5">
				<div className="row min-vh-100 pt-5 d-flex align-items-center text-black">
					{!item ? (
						<FetchLoading />
					) : (
						<>
							<div className="col-lg-4 col-12 mb-lg-0 mb-5">
								<ProductImage
									src={item.image}
									className="w-50 d-block ms-lg-auto m-auto"
									alt={item.title}
								/>
							</div>
							<div className="col-lg-8 col-12 mb-lg-0 mb-5 px-5 text-lg-start text-center">
								<h2 className="mb-3 text-dark-brown">{item.name}</h2>
								<h6 className="text-dark-brown">
									Oleh{" "}
									<Link href="/profile/2">
										<a className="text-decoration-none text-brown">{item.seller.fullName}</a>
									</Link>
								</h6>
								<span className="badge bg-beige text-dark-brown fs-6">{checkType(item.type)}</span>
								<hr />
								<h6 className="text-brown">{item.description}</h6>
								<h5 className="mb-3">Rp. {item.price}</h5>
								{!owner && (
									<>
										<button
											className="btn btn-brown"
											data-bs-toggle="modal"
											data-bs-target="#exampleModal"
										>
											<FaDollarSign /> Tawar Harga
										</button>
										<div
											class="modal fade justify-content-center"
											id="exampleModal"
											tabindex="-1"
											aria-labelledby="exampleModalLabel"
											aria-hidden="true"
										>
											<div class="modal-dialog modal-dialog-centered">
												<div class="modal-content">
													<div class="modal-header">
														<h5 class="modal-title" id="exampleModalLabel">
															Tawar Harga
														</h5>
													</div>
													<div class="modal-body">
														<div className="form-group mb-3">
															<span className="me-2 mt-1 position-absolute text-mocca">
																<FaDollarSign />
															</span>
															<input
																type="text"
																className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline text-dark-brown"
																placeholder="Masukkan tawaran anda"
															/>
														</div>
													</div>
													<div class="modal-footer">
														<button
															type="button"
															class="btn btn-mocca"
															data-bs-dismiss="modal"
														>
															Batal
														</button>
														<form action="/bargain" method="PUT">
															<button type="submit" class="btn btn-brown">
																Tawar
															</button>
														</form>
													</div>
												</div>
											</div>
										</div>
									</>
								)}
								{owner && (
									<>
										<div className="row">
											<div className="col-12">
												<h3 className="text-dark-brown mt-2">Daftar Tawaran</h3>
												<hr />
											</div>
											<div className="col-12">
												<div className="row">
													<TextJudul className="col-4 text-dark-brown">
														Penawaran Dari
													</TextJudul>
													<TextJudul className="col-4 text-dark-brown">Harga</TextJudul>
												</div>
												<Bargain nama="Fabian" harga={50000} />
												<Bargain nama="Rahmat" harga={20000} />
												<Bargain nama="Alvian" harga={2000} />
											</div>
										</div>
									</>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default ProductDetails;
