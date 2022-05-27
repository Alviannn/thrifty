import Head from "next/head";
import Image from "next/image";
import UserEditForm from "../../components/User/UserEditForm";

const UserEdit = () => {
	return (
		<>
			<div className="row min-vh-100 pt-5 d-flex align-items-center text-black">
				<div className="col-lg-4 col-12">
					<Image
						src="/img/thrift.png"
						alt="Scrolling"
						width="100%"
						height="100%"
						layout="responsive"
						priority
					/>
				</div>
				<div className="col-lg-8 col-12 my-5">
					<div className="row">
						<div className="col">
							<h1 className="mb-3 text-lg-start text-center">Edit Profile</h1>
						</div>
					</div>
					<UserEditForm />
				</div>
			</div>
		</>
	);
};

export default UserEdit;
