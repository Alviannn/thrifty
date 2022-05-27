import Image from "next/image";
import Link from "next/link";
import { FaClock, FaDollarSign, FaEnvelope, FaMapMarkerAlt, FaPencilAlt, FaPhoneAlt, FaTag, FaMoneyBillAlt } from "react-icons/fa";
import UserInfoItem from "../../components/User/UserInfoItem";
import Head from "next/head";
import { useState } from "react";
import FetchLoading from "../../components/Widget/FetchLoading";
import useSWR from "swr";
import axios from "axios";
import ProductItem from "../../components/Product/ProductItem";

const Index = () => {
	const address = "https://fakestoreapi.com/products";

	const fetcher = async (url) => {
		const { data } = await axios.get(url);
		return data;
	};

	const options = {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	};

	const { data: items } = useSWR(address, fetcher, options);

	return (
		<>
			<Head>
				<title>thrifty! - Profile</title>
			</Head>
			<div className="row min-vh-100 pt-5 d-flex align-items-center text-black">
				<>
					<div className="col-lg-4 col-12">
						<Image
							src="/img/thrift.png"
							alt="Scrolling"
							width="100%"
							height="100%"
							layout="responsive"
							priority
						/>
					</div>
					<div className="col-lg-8 col-12">
						<div className="card bg-transparent w-100 border-0 m-auto float-lg-start">
							<div className="card-body text-lg-start text-center">
								<div className="row">
									<div className="col">
										<h1 className="mb-3">My Profile</h1>
									</div>
								</div>
								<div className="row">
									<div className="col-lg-6 col-12">
										<UserInfoItem icon={<FaTag />} isi="Fabian Habil" title="Nama" />
										<UserInfoItem
											icon={<FaEnvelope />}
											isi="fabianhabilramdhan@gmail.com"
											title="Email"
										/>
										<UserInfoItem icon={<FaPhoneAlt />} isi="081asdasd" title="Nomor Telepon" />
										<UserInfoItem icon={<FaMapMarkerAlt />} isi="Buah Batu" title="Alamat" />
									</div>
									<div className="col-lg-6 col-12">
										<UserInfoItem icon={<FaClock />} isi="Kemaren" title="Bergabung Tanggal" />
										<UserInfoItem icon={<FaMoneyBillAlt />} isi="Rp500000" title="Saldo" />
										<div className="row">
											<div className="col-6">
                                                <button className="btn btn-mocca w-100 mt-2"  data-bs-toggle="modal" data-bs-target="#exampleModal"><FaMoneyBillAlt /> Topup</button>
											</div>
											<div className="col-6">
												<Link href="/profile/edit">
													<a className="btn btn-brown w-100 mt-2">
														<FaPencilAlt /> Edit Profile
													</a>
												</Link>
											</div>
										</div>
									</div>
                                    <div class="modal fade justify-content-center" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Topup</h5>
                                                </div>
                                                <div class="modal-body">
                                                    <div className="form-group mb-3">
                                                        <span className="me-2 mt-1 position-absolute text-mocca"><FaDollarSign /></span>
                                                        <input type="text" className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline text-dark-brown" placeholder="Masukkan jumlah topup anda" />
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-mocca" data-bs-dismiss="modal">Batal</button>
                                                    <form action="/topup" method="PUT">
                                                        <button type="submit" class="btn btn-brown">Bayar</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
								</div>
							</div>
						</div>
					</div>
				</>
			</div>
		</>
	);
};

export default Index;
