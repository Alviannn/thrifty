import Link from "next/link";
import { createContext, useState } from "react";
import styled from "styled-components";
import { FaArrowLeft, FaLock, FaSignInAlt, FaEnvelope } from "react-icons/fa";
import loginSchema from "../../validations/login-validation";
import LoginFormInput from "./LoginFormInput";
import axios from "axios";

const RegisterLink = styled.a`
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;

const FormInputContext = createContext();

const LoginForm = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});

	const Login = () => {
		const json = JSON.stringify({
			email: data.email,
			password: data.password,
		});
		axios
			.post("http://localhost:5000/v1/auth/login", json, {
				headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
			})
			.then((res) => {
				console.log(res.data);
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
	);
};

export { FormInputContext };
export default LoginForm;
