import Link from "next/link";
import { createContext, useState } from "react";
import {
	FaArrowLeft,
	FaEnvelope,
	FaLock,
	FaMapMarkerAlt,
	FaPhoneAlt,
	FaTag,
	FaUnlock,
	FaUserPlus,
} from "react-icons/fa";
import registerSchema from "../../validations/register-validation";
import RegisterFormInput from "./RegisterFormInput";
import axios from "axios";

const FormInputContext = createContext();

const RegisterForm = () => {
	const [data, setData] = useState({
		fullName: "",
		address: "",
		phone: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [errors, setErrors] = useState({});

	const Register = () => {
		const json = JSON.stringify({
			email: data.email,
			password: data.password,
			fullName: data.fullName,
			phone: data.phone,
			address: data.address,
		});

		axios
			.post("http://localhost:5000/v1/auth/register", json, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const validateForm = (e) => {
		const result = registerSchema.validate(data, { abortEarly: false });
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
			console.log("register");
			Register();
		}
	};

	return (
		<div className="text-lg-start text-center">
			<FormInputContext.Provider value={{ data, setData, errors }}>
				<RegisterFormInput type="text" propKey="fullName" name="nama lengkap" icon={<FaTag />} />
				<RegisterFormInput type="text" propKey="address" name="alamat" icon={<FaMapMarkerAlt />} />
				<RegisterFormInput type="text" propKey="phone" name="nomor telepon" icon={<FaPhoneAlt />} />
				<RegisterFormInput type="text" propKey="email" name="email" icon={<FaEnvelope />} />
				<RegisterFormInput type="password" propKey="password" name="password" icon={<FaUnlock />} />
				<RegisterFormInput
					type="password"
					propKey="confirmPassword"
					name="konfirmasi password"
					icon={<FaLock />}
				/>
			</FormInputContext.Provider>
			<button className="btn btn-brown w-75 mb-2" onClick={validateForm}>
				<FaUserPlus /> Daftar
			</button>
			<Link href="/login">
				<a className="btn btn-mocca w-75">
					<FaArrowLeft /> Kembali
				</a>
			</Link>
		</div>
	);
};

export { FormInputContext };
export default RegisterForm;
