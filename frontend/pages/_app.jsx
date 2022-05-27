import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import { AuthProvider, useAuth } from "../contexts/auth";
import { PrivateRoute } from "../contexts/ProtectRoute";

function MyApp({ Component, pageProps }) {
	const protectedRoutes = ["/login", "/profile", "/profile/edit", "/products/add", "/products/edit/[id]"];

	useEffect(() => {
		import("bootstrap/dist/js/bootstrap");
	}, []);

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<AuthProvider>
				<PrivateRoute protectedRoutes={protectedRoutes}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</PrivateRoute>
			</AuthProvider>
		</>
	);
}

export default MyApp;
