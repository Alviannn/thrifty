import Link from "next/link";
import { createContext, useState } from "react";
import styled from "styled-components";
import { FaArrowLeft, FaLock, FaSignInAlt, FaEnvelope } from "react-icons/fa";
import loginSchema from "../../validations/login-validation";
import LoginFormInput from "./LoginFormInput";
import axios from "axios";
import { useAuth } from "../../contexts/auth";
import { useRouter } from "next/router";
import BerhasilPop from "../Popup/BerhasilPop";

const RegisterLink = styled.a`
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;

const FormInputContext = createContext();

const LoginForm = () => {
	const router = useRouter();
	const {
		profile,
		setProfile,
		accessToken,
		setAccessToken,
		setAuthenticated,
		isAuthenticated,
		getProfile,
		refreshToken,
	} = useAuth();

	const [loading, setLoading] = useState(false);

	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});

	const Login = () => {
		axios
			.post(
				"http://localhost:5000/v1/auth/login",
				{
					...data,
				},
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				setAuthenticated(true);
				setAccessToken(res.data.data.accessToken);
				const token = res.data.data.accessToken;
				const notice = "Login Berhasil!";
				BerhasilPop(notice);
				setTimeout(() => {
					console.log(token);
					getProfile(token);
					setLoading(true);
					router.reload("/");
				}, 5000);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const validateForm = (e) => {
		const result = loginSchema.validate(data, { abortEarly: false });
		const { error } = result;

		if (error) {
			e.preventDefault();

			const errorData = {};

			for (const err of error.details) {
				const name = err.path[0];
				const message = err.message;
				errorData[name] = message;
			}
			setErrors(errorData);
		} else {
			Login();
		}
	};

	return (
		<>
			{!loading && (
				<>
					<div className="text-lg-start text-center">
						<FormInputContext.Provider value={{ data, setData, errors }}>
							<LoginFormInput type="text" propKey="email" icon={<FaEnvelope />} />
							<LoginFormInput type="password" propKey="password" icon={<FaLock />} />
						</FormInputContext.Provider>
						<button className="btn btn-brown w-75 mb-2" onClick={validateForm}>
							<FaSignInAlt /> Masuk
						</button>
						<Link href="/">
							<a className="btn btn-mocca w-75 mb-3">
								<FaArrowLeft /> Kembali
							</a>
						</Link>
						<p>
							Belum memiliki akun?{" "}
							<Link href="/register" passHref>
								<RegisterLink className="register-link text-dark-brown">Daftar</RegisterLink>
							</Link>
						</p>
					</div>
				</>
			)}
		</>
	);
};

export { FormInputContext };
export default LoginForm;
