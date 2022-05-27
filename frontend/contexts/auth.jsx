import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const router = useRouter();
	const [profile, setProfile] = useState({});
	const [accessToken, setAccessToken] = useState(null);
	const [isAuthenticated, setAuthenticated] = useState(true);
	const [loading, setLoading] = useState(true);

	const getProfile = (token) => {
		axios
			.get(`http://localhost:5000/v1/users`, {
				headers: {
					authorization: `Bearer ${token}`,
				},
				withCredentials: true,
			})
			.then((res) => {
				const data = res.data.data.user;
				setProfile({ ...data });
				localStorage.setItem("data", JSON.stringify(data));
				setAuthenticated(true);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setAuthenticated(false);
				localStorage.removeItem("data");
			});
	};

	const refreshToken = () => {
		axios
			.post(
				"http://localhost:5000/v1/auth/refresh",
				{},
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				setAccessToken(res.data.data.accessToken);
				const token = res.data.data.accessToken;
				setLoading(true);
				setTimeout(() => {
					if (token) {
						getProfile(token);
					}
				}, 3000);
			})
			.catch((err) => {
				console.log(err);
				setAuthenticated(false);
				localStorage.removeItem("data");
			});
	};

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("data"));
		refreshToken();
		console.log("yes");
		if (!data) {
			setAuthenticated(false);
		} else {
			setProfile({ ...data });
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				profile,
				setProfile,
				accessToken,
				setAccessToken,
				setAuthenticated,
				getProfile,
				setLoading,
				loading,
				refreshToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
