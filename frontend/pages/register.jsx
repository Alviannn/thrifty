import Head from 'next/head';
import Image from 'next/image';
import RegisterForm from '../components/Register/RegisterForm';

const Register = () => {
    return (
        <>
            <Head>
                <title>thrifty! - Daftar</title>
            </Head>

            <div className="container">
                <div className="row min-vh-100 d-flex align-items-center text-black">
                    <div className="col-lg-6 col-12 mt-3">
                        <div className="w-75 d-block m-auto">
                            <Image src="/img/thrift.png" alt="Thrift" width="100%" height="100%" layout="responsive" priority />
                        </div>
                    </div>
                    <div className="col-lg-6 col-12 my-5">
                        <h1 className="mb-3 text-lg-start text-center text-dark-brown">Daftar</h1>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;