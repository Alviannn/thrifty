import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { createContext, useState } from "react";
import {
	FaArrowLeft,
	FaArrowUp,
	FaCity,
	FaEnvelope,
	FaGlobe,
	FaHome,
	FaMapMarkerAlt,
	FaPhoneAlt,
	FaTag,
	FaUser,
	FaKey,
} from "react-icons/fa";
import userEditSchema from "../../validations/user-edit-validation";
import registerSchema from "../../validations/register-validation";
import UserEditFormInput from "./UserEditFormInput";
import { useAuth } from "../../contexts/auth";
import axios from "axios";

const FormInputContext = createContext();

const UserEditForm = () => {
	const { profile, accessToken } = useAuth();

	const [data, setData] = useState({
		Nama: profile.fullName,
		Email: profile.email,
		Phone: profile.phone,
		Address: profile.address,
	});
	const [errors, setErrors] = useState(false);

	const updateProfile = () => {
		axios
			.put(
				"http://localhost:5000/v1/users",
				{
					fullName: data.Nama,
					phone: data.Phone,
					address: data.Address,
				},
				{
					headers: {
						authorization: `Bearer ${accessToken}`,
					},
				}
			)
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

		updateProfile();
		// if (error) {
		// 	e.preventDefault();

		// 	const errorData = {};

		// 	for (const err of error.details) {
		// 		const name = err.path[0];
		// 		const message = err.message;
		// 		errorData[name] = message;
		// 	}

		// 	setErrors(errorData);
		// } else {
		// }
	};

	return (
		<>
			<div className="text-lg-start text-center">
				<div className="row">
					<FormInputContext.Provider value={{ data, setData, errors }}>
						<div className="col-lg-6 col-12">
							<UserEditFormInput
								type="text"
								propKey="Nama"
								icon={<FaTag className="text-gold" />}
								readOnly={false}
							/>
							<UserEditFormInput
								type="text"
								propKey="Email"
								icon={<FaEnvelope className="text-gold" />}
								readOnly={true}
							/>
						</div>
						<div className="col-lg-6 col-12">
							<UserEditFormInput
								type="text"
								propKey="Phone"
								icon={<FaPhoneAlt className="text-gold" />}
								readOnly={false}
							/>
							<UserEditFormInput
								type="text"
								propKey="Address"
								icon={<FaMapMarkerAlt className="text-gold" />}
								readOnly={false}
							/>
						</div>
					</FormInputContext.Provider>
				</div>
				<button type="submit" className="btn btn-brown w-100 mb-2" onClick={validateForm}>
					Update
				</button>
				<Link href="/profile">
					<a className="btn btn-beige w-100">
						<FaArrowLeft /> Back
					</a>
				</Link>
			</div>
		</>
	);
};

export { FormInputContext };
export default UserEditForm;
