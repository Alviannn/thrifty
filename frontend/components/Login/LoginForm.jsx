import Link from 'next/link';
import { createContext, useState } from 'react';
import styled from 'styled-components';
import { FaArrowLeft, FaLock, FaSignInAlt, FaEnvelope } from 'react-icons/fa';
import loginSchema from '../../validations/login-validation';
import LoginFormInput from './LoginFormInput';

const RegisterLink = styled.a`
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const FormInputContext = createContext();

const LoginForm = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = (e) => {
        const result = loginSchema.validate(data, { abortEarly: false });
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
        <form action="/login" method="POST" className="text-lg-start text-center">
            <FormInputContext.Provider value={{ data, setData, errors }}>
                <LoginFormInput type="text" propKey="email" icon={<FaEnvelope />} />
                <LoginFormInput type="password" propKey="password" icon={<FaLock />} />
            </FormInputContext.Provider>
            <button type="submit" className="btn btn-brown w-75 mb-2" onClick={validateForm}><FaSignInAlt /> Masuk</button>
            <Link href="/">
                <a className="btn btn-mocca w-75 mb-3"><FaArrowLeft /> Kembali</a>
            </Link>
            <p>Belum memiliki akun? <Link href="/register" passHref><RegisterLink className="register-link text-dark-brown">Daftar</RegisterLink></Link></p>
        </form>
    );
};

export { FormInputContext };
export default LoginForm;