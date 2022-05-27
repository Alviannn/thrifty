import { useAuth } from "./auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import GagalPop from "../components/Popup/GagalPop";

export const PrivateRoute = ({ protectedRoutes, children }) => {
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

	useEffect(() => {
		if (!isAuthenticated) {
			if (
				router.asPath == "/profile" ||
				router.asPath == "/products/edit/[id]" ||
				router.asPath == "/products/add" ||
				router.asPath == `/products/edit/${router.query.id}`
			) {
				const popup = "Silahkan Login dahulu!";
				GagalPop(popup);
				router.push("/login");
			}
		} else {
			if (router.asPath == "/login") {
				router.push("/");
			}
		}
	});

	return children;
};
