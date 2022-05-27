import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import styled from 'styled-components';
import { FaDollarSign } from 'react-icons/fa';
import FetchLoading from '../../components/Widget/FetchLoading';

const ProductImage = styled.img`
    @media (min-width: 992px) {
        width: 75% !important;
    }
`;

const ProductDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    const address = `https://fakestoreapi.com/products/${id}`;

    const fetcher = async (url) => {
        const { data } = await axios.get(url);
        return data;
    };

    const options = {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    };

    const { data: item } = useSWR(address, fetcher, options);

    return (
        <>
            <Head>
                <title>thrifty! - Detail Produk</title>
            </Head>

            <div className="container pt-lg-0 pt-5">
                <div className="row min-vh-100 pt-5 d-flex align-items-center text-black">
                    {!item ? (
                        <FetchLoading />
                    ) : (
                        <>
                            <div className="col-lg-4 col-12 mb-lg-0 mb-5">
                                <ProductImage src={item.image} className="w-50 d-block ms-lg-auto m-auto" alt={item.title} />
                            </div>
                            <div className="col-lg-8 col-12 mb-lg-0 mb-5 px-5 text-lg-start text-center">
                                <h2 className="mb-3 text-dark-brown">{item.title}</h2>
                                <h6 className="text-dark-brown">Oleh Rahmat - 5m yang lalu</h6>
                                <span className="badge bg-beige text-dark-brown fs-6">Kaus</span>
                                <hr />
                                <h6 className="text-brown">{item.description}</h6>
                                <h5 className="mb-3">Rp. {item.price}</h5>
                                <button className="btn btn-brown"><FaDollarSign /> Tawar Harga</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductDetails;