import styled from "styled-components";
import { BsCheck } from "react-icons/bs";
import { TiCancel } from "react-icons/ti";

const TextIsi = styled.h5`
	font-size: 1.5vw;
	@media (max-width: 1500px) {
		font-size: 2vw;
	}
	@media (max-width: 900px) {
		font-size: 2.5vw;
	}
	@media (max-width: 600px) {
		font-size: 3vw;
	}
	@media (max-width: 420px) {
		font-size: 4vw;
	}
`;

const Bargain = ({ nama, harga }) => {
	return (
		<>
			<div className="row mb-3">
				<TextIsi className="col-4 mx-auto my-auto">{nama}</TextIsi>
				<TextIsi className="col-4 mx-auto my-auto">Rp {harga}</TextIsi>
				<TextIsi className="col-4 mx-auto my-auto">
					<div className="row d-flex flex-row justify-content-around">
						<button className="btn btn-danger col-5 btn-sm ">
							<TiCancel />
						</button>
						<button className="btn btn-success col-5 btn-sm  ">
							<BsCheck />
						</button>
					</div>
				</TextIsi>
			</div>
		</>
	);
};

export default Bargain;
