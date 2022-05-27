const UserInfoItem = ({ icon, title, isi }) => {
	return (
		<>
			<div>
				<h6 className="mb-1 text-gold">
					{icon} {"   "}
					{title}
				</h6>
				<h6 className="card-title">{isi}</h6>
			</div>
			<hr />
		</>
	);
};

export default UserInfoItem;
