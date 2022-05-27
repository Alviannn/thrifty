import Link from "next/link";
import { FaShoppingCart, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import styled from "styled-components";
import react, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../../contexts/auth";

const Nav = styled.nav`
	z-index: 1;
	.navbar-collapse {
		background-color: #fff;
		box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
	}
	@media (min-width: 992px) {
		.navbar-collapse {
			background-color: transparent;
			box-shadow: none;
		}
	}
`;

const ProfileText = styled.p`
	padding: 0;
	margin: 0;
	font-weight: bold;
	font-size: 18px;
`;

const Navbar = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const { profile, isAuthenticated, loading } = useAuth();
	return (
		<>
			<Nav className="navbar navbar-expand-lg navbar-light bg-transparent position-absolute w-100 mb-3 text-black">
				<div className="container">
					<Link href="/">
						<a className="navbar-brand fs-1" style={{ color: "#D79771" }}>
							thrifty
						</a>
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse mt-lg-0 mt-2 pb-lg-0 rounded" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item py-2">
								<Link href="/products">
									<a
										className={`fs-5 mx-4 text-decoration-none navbar-brand`}
										style={{ color: "#A0A0A0" }}
									>
										Produk
									</a>
								</Link>
							</li>
							{isAuthenticated && (
								<>
									<li className="nav-item py-2">
										<Link href={`/profile/${profile.id}`}>
											<a
												className={`fs-5 mx-4 text-decoration-none navbar-brand`}
												style={{ color: "#A0A0A0" }}
											>
												Toko Saya
											</a>
										</Link>
									</li>
								</>
							)}
						</ul>
						<form
							className="d-flex ms-auto position-relative nav-item"
							style={{ paddingTop: "5px", paddingBottom: "5px" }}
						>
							{!isAuthenticated && (
								<div className="ms-3" style={{ paddingTop: "11px", paddingBottom: "11px" }}>
									<Link href="/register">
										<button className="btn mx-2 btn-brown">
											<FaUserPlus /> Daftar
										</button>
									</Link>
									<Link href="/login">
										<button className="btn mx-2 btn-dark-brown">
											<FaSignInAlt /> Masuk
										</button>
									</Link>
								</div>
							)}
							{isAuthenticated && profile && (
								<div style={{ marginLeft: "10px" }}>
									<Link href="/profile">
										<button className="btn">
											<ProfileText>
												<CgProfile /> {profile.fullName}
											</ProfileText>
										</button>
									</Link>
								</div>
							)}
						</form>
					</div>
				</div>
			</Nav>
		</>
	);
};

export default Navbar;
