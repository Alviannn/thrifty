import Swal from "sweetalert2";

const BerhasilPop = (berhasilmsg) => {
	return (
		<>
			{Swal.mixin({
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 2500,
				timerProgressBar: true,
				background: "green",
				color: "white",
				customClass: {
					container: "swalainx",
				},
				didOpen: (toast) => {
					toast.addEventListener("mouseenter", Swal.stopTimer);
					toast.addEventListener("mouseleave", Swal.resumeTimer);
				},
			}).fire({
				icon: "success",
				title: berhasilmsg,
				iconColor: "#F3F6F4",
			})}
		</>
	);
};

export default BerhasilPop;
