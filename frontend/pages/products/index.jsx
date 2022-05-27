import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import axios from 'axios';
import { FaArrowDown, FaArrowUp, FaPlus } from 'react-icons/fa';
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
                    <div className="row pt-5 d-flex justify-content-center text-black">
                        <div className="col-lg-4 col-md-6 col-12 mb-4">
                            <h5>Urut berdasarkan</h5>
                            <button className="btn btn-sm btn-brown me-2"><FaArrowDown /> Harga Terendah</button>
                            <button className="btn btn-sm btn-dark-brown me-2"><FaArrowUp /> Harga Tertinggi</button>
                        </div>

                        <div className="col-lg-4 col-md-6 col-12 mb-4">
                            <h5>Filter berdasarkan</h5>
                            <button className="btn btn-sm btn-beige me-2">Atasan</button>
                            <button className="btn btn-sm btn-mocca me-2">Bawahan</button>
                            <button className="btn btn-sm btn-beige me-2">Luaran</button>
                            <button className="btn btn-sm btn-mocca me-2">Lainnya</button>
                        </div>

                        <div className="col-lg-4 col-12 mb-4">
                            <h5>Masukkan produk anda sendiri</h5>
                            <Link href="/products/add">
                                <a className="btn btn-sm btn-brown"><FaPlus /> Tambah Produk</a>
                            </Link>
                        </div>

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