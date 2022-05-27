import Link from "next/link";
import { FaShoppingCart, FaSignInAlt } from "react-icons/fa";
import styled from "styled-components";

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

const Navbar = () => {
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
										className={`fs-4 mx-4 text-decoration-none navbar-brand`}
										style={{ color: "#A0A0A0" }}
									>
										Product
									</a>
								</Link>
							</li>
							<li className="nav-item py-2">
								<Link href="/about">
									<a
										className={`fs-4 mx-4 text-decoration-none navbar-brand`}
										style={{ color: "#A0A0A0" }}
									>
										Toko Saya
									</a>
								</Link>
							</li>
						</ul>
						<form className="d-flex ms-auto position-relative">
							<Link href="/login">
								<a className="btn btn-gold ms-3 py-2">
									<FaSignInAlt /> Login
								</a>
							</Link>
						</form>
					</div>
				</div>
			</Nav>
		</>
	);
};

export default Navbar;
