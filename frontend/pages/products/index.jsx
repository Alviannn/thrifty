import Head from 'next/head';
import useSWR from 'swr';
import axios from 'axios';
import FetchLoading from '../../components/Widget/FetchLoading';
import ProductItem from '../../components/Product/ProductItem';

const Product = () => {
    const address = 'https://fakestoreapi.com/products';

    const fetcher = async (url) => {
        const { data } = await axios.get(url);
        return data;
    };

    const options = {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    };

    const { data: items } = useSWR(address, fetcher, options);

    return (
        <>
            <Head>
                <title>thrifty! - Produk</title>
            </Head>

            <div className="container min-vh-100 py-5">
                {!items ? (
                    <FetchLoading />
                ) : (
                    <div className="row mt-lg-5 pt-5 d-flex justify-content-center text-black">
                        {items.map((item) => {
                            return (
                                <div key={item.id} className="col-lg-4 col-md-6 col-12 p-0">
                                    <ProductItem item={item} />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default Product;