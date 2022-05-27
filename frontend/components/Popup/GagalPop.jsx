import Swal from "sweetalert2";

function GagalPop(errormsg) {
	return (
		<>
			{Swal.mixin({
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 2500,
				timerProgressBar: true,
				background: "red",
				color: "white",
				customClass: {
					container: "swalainx",
				},
				didOpen: (toast) => {
					toast.addEventListener("mouseenter", Swal.stopTimer);
					toast.addEventListener("mouseleave", Swal.resumeTimer);
				},
			}).fire({
				icon: "error",
				title: errormsg,
				iconColor: "#F3F6F4",
			})}
		</>
	);
}

export default GagalPop;
