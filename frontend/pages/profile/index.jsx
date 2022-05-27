import Image from "next/image";
import Link from "next/link";
import {
	FaCity,
	FaClock,
	FaEnvelope,
	FaGlobe,
	FaHome,
	FaMapMarkerAlt,
	FaPencilAlt,
	FaPhoneAlt,
	FaTag,
	FaUser,
	FaMoneyBillAlt,
} from "react-icons/fa";
import UserInfoItem from "../../components/User/UserInfoItem";
import Head from "next/head";

const Index = () => {
	return (
		<>
			<Head>
				<title>thrifty! - Profile</title>
			</Head>
			<div className="row min-vh-100 pt-5 d-flex align-items-center text-black">
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
											<Link href="/topup">
												<a className="btn btn-mocca w-100 mt-2">
													<FaMoneyBillAlt /> Topup
												</a>
											</Link>
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Index;
