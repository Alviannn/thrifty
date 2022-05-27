import Link from 'next/link';
import { createContext, useState } from 'react';
import { FaArrowLeft, FaDollarSign, FaDotCircle, FaInfoCircle, FaPlus, FaTag } from 'react-icons/fa';
import productSchema from '../../validations/product-validation';
import ProductFormInput from '../../components/Product/ProductFormInput';

const FormInputContext = createContext();

const ProductForm = () => {
    const [data, setData] = useState({
        name: '',
        price: '',
        description: '',
        type: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = (e) => {
        const result = productSchema.validate(data, { abortEarly: false });
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
        <form action="/products" method="POST" className="text-lg-start text-center">
            <div className="row mb-3">
                <div className="col">
                    <FormInputContext.Provider value={{ data, setData, errors }}>
                        <ProductFormInput propKey="name" name="nama" icon={<FaTag />} />
                        <ProductFormInput propKey="price" name="harga" icon={<FaDollarSign />} />
                        <ProductFormInput propKey="description" name="deskripsi" icon={<FaInfoCircle />} />
                        <ProductFormInput propKey="type" name="tipe" icon={<FaDotCircle />} />
                    </FormInputContext.Provider>
                </div>

            </div>
            <div className="row mb-3">
                <div className="col">
                    <span className="bg-beige p-2 me-2 rounded">1. Atasan</span>
                    <span className="bg-mocca p-2 me-2 rounded">2. Bawahan</span>
                    <span className="bg-beige p-2 me-2 rounded">3. Luaran</span>
                    <span className="bg-mocca p-2 me-2 rounded">4. Lainnya</span>
                </div>
            </div>

            <button type="submit" className="btn btn-brown w-75 mb-2" onClick={validateForm}><FaPlus /> Tambah</button>
            <Link href="/products">
                <a className="btn btn-mocca w-75 mb-3"><FaArrowLeft /> Batal</a>
            </Link>
        </form>
    );
};

export { FormInputContext };
export default ProductForm;