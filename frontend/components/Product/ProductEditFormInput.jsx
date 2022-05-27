import { useContext } from 'react';
import { FormInputContext } from './ProductEditForm';

const ProductEditFormInput = ({ propKey, name, icon }) => {
    const { data, setData, errors } = useContext(FormInputContext);

    const handleChange = (e) => {
        const { value } = e.target;
        setData({ ...data, [propKey]: value });
    };

    return (
        <div className="form-group mb-3">
            <span className="me-2 mt-1 position-absolute text-mocca">{icon}</span>
            <input type="text" className="form-control bg-transparent w-75 ps-4 border-0 border-bottom rounded-0 d-inline text-dark-brown" name={propKey} placeholder={`Masukkan ${name} produk`} value={data[propKey]} onChange={handleChange} />
            {errors[propKey] && <div className="alert alert-warning w-75 py-2 mb-2 m-auto float-lg-start text-start" role="alert">{errors[propKey]}</div>}
        </div>
    );
};

export default ProductEditFormInput;