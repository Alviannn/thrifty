import FetchLoading from "../../components/Widget/FetchLoading";
import useSWR from "swr";
import axios from "axios";
import ProductItem from "../../components/Product/ProductItem";
import Head from "next/head";

const Profile = () => {
	const address = "https://fakestoreapi.com/products";

	const fetcher = async (url) => {
		const { data } = await axios.get(url);
		return data;
	};

	const options = {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	};

	const { data: items } = useSWR(address, fetcher, options);

	return (
		<>
			<Head>
				<title>thrifty! - Toko</title>
			</Head>
			<div className="container min-vh-100 py-5">
				{!items ? (
					<FetchLoading />
				) : (
					<>
						<div className="row mt-lg-5 pt-3">
							<div className="justify-content-center align-items-center d-flex flex-column">
								<h1 className="text-dark-brown">Toko Fabian</h1>
								<h5 className="text-brown">Jln. Buah Batu</h5>
							</div>
							{items.map((item) => {
								return (
									<div key={item.id} className="col-lg-4 col-md-6 col-12 p-0">
										<ProductItem item={item} />
									</div>
								);
							})}
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default Profile;
