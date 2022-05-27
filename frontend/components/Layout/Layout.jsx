import Background from "./Background";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
	return (
		<>
            <Background />
			<Navbar />
			<div class="container">
				<main>{children}</main>
			</div>
			<Footer />
		</>
	);
};

export default Layout;
