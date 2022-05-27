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
} from "react-icons/fa";
import userEditSchema from "../../validations/user-edit-validation";
import UserEditFormInput from "./UserEditFormInput";

const FormInputContext = createContext();

const UserEditForm = () => {
	const [data, setData] = useState({
		Nama: "",
		Email: "",
		Phone: "",
		Address: "",
	});
	const [errors, setErrors] = useState(false);

	const validateForm = (e) => {
		const result = userEditSchema.validate(data, { abortEarly: false });
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
		}
	};

	return (
		<>
			<form action="/users/update" method="POST" className="text-lg-start text-center">
				<div className="row">
					<FormInputContext.Provider value={{ data, setData, errors }}>
						<div className="col-lg-6 col-12">
							<UserEditFormInput propKey="Nama" icon={<FaTag className="text-gold" />} readOnly={false} />
							<UserEditFormInput
								propKey="Email"
								icon={<FaEnvelope className="text-gold" />}
								readOnly={true}
							/>
						</div>
						<div className="col-lg-6 col-12">
							<UserEditFormInput
								propKey="Nomor Telepon"
								icon={<FaPhoneAlt className="text-gold" />}
								readOnly={false}
							/>
							<UserEditFormInput
								propKey="Alamat"
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
			</form>
		</>
	);
};

export { FormInputContext };
export default UserEditForm;
