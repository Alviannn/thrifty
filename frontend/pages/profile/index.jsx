import Image from "next/image";
import Link from "next/link";
import {
	FaClock,
	FaDollarSign,
	FaEnvelope,
	FaMapMarkerAlt,
	FaPencilAlt,
	FaPhoneAlt,
	FaTag,
	FaMoneyBillAlt,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import UserInfoItem from "../../components/User/UserInfoItem";
import Head from "next/head";
import axios from "axios";
import { useAuth } from "../../contexts/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import BerhasilPop from "../../components/Popup/BerhasilPop";
import GagalPop from "../../components/Popup/GagalPop";

const Index = () => {
	const address = "https://fakestoreapi.com/products";
	const router = useRouter();
	const fetcher = async (url) => {
		const { data } = await axios.get(url);
		return data;
	};
	const [bayar, setBayar] = useState(0);

	const { profile, accessToken } = useAuth();
	const options = {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	};

	const topup = () => {
		axios
			.post(
				"http://localhost:5000/v1/users/topup",
				{ balance: bayar },
				{
					headers: {
						authorization: `Bearer ${accessToken}`,
					},
				}
			)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const Logout = () => {
		axios
			.delete("http://localhost:5000/v1/auth/logout", {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res);
				localStorage.removeItem("data");
				const notice = "Logout berhasil!";
				BerhasilPop(notice);
				router.reload("/");
			})
			.catch((err) => {
				console.log(err);
				const notice = "Logout gagal!";
				GagalPop(notice);
			});
	};

	const tanggal = profile.createdAt;
	const tanggalFix = tanggal?.slice(0, 10);
	const duit = "Rp" + profile.balance;

	return (
		<>
			<Head>
				<title>thrifty! - Profile</title>
			</Head>
			{profile && (
				<>
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
												<UserInfoItem icon={<FaTag />} isi={profile.fullName} title="Nama" />
												<UserInfoItem icon={<FaEnvelope />} isi={profile.email} title="Email" />
												<UserInfoItem
													icon={<FaPhoneAlt />}
													isi={profile.phone}
													title="Nomor Telepon"
												/>
												<UserInfoItem
													icon={<FaMapMarkerAlt />}
													isi={profile.address}
													title="Alamat"
												/>
											</div>
											<div className="col-lg-6 col-12">
												<UserInfoItem
													icon={<FaClock />}
													isi={tanggalFix}
													title="Bergabung Tanggal"
												/>
												<UserInfoItem icon={<FaMoneyBillAlt />} isi={duit} title="Saldo" />
												<div className="row">
													<div className="col-6">
														<button
															className="btn btn-mocca w-100 mt-2"
															data-bs-toggle="modal"
															data-bs-target="#exampleModal"
														>
															<FaMoneyBillAlt /> Topup
														</button>
													</div>
													<div className="col-6">
														<Link href="/profile/edit">
															<a className="btn btn-brown w-100 mt-2">
																<FaPencilAlt /> Edit Profile
															</a>
														</Link>
													</div>
												</div>
												<div className="row">
													<div className="col-12" onClick={Logout}>
														<a className="btn btn-danger w-100 mt-2">
															<FiLogOut /> Logout
														</a>
													</div>
												</div>
											</div>
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
																Topup
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
																	placeholder="Masukkan jumlah topup anda"
																	value={bayar}
																	onChange={(e) => {
																		setBayar(e.target.value);
																	}}
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
															<button class="btn btn-brown" onClick={topup}>
																Bayar
															</button>
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
			)}
		</>
	);
};

export default Index;
