import styled, { keyframes } from 'styled-components';

const ellipsis1 = keyframes`
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
`;

const ellipsis2 = keyframes`
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(24px, 0);
    }
`;

const ellipsis3 = keyframes`
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(0);
    }
`;

const Loading = styled.div`
	background-image: linear-gradient(45deg, #b05c3c, #d79771);
    width: 80px;
    height: 35px;
    padding: 10px 0;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    border-radius: 10px;

    .dot {
        background-color: #fff;
        width: 15px;
        height: 15px;
        position: absolute;
        border-radius: 50%;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    .dot:nth-child(1) {
        left: 8px;
        animation: ${ellipsis1} .6s infinite;
    }

    .dot:nth-child(2) {
        left: 8px;
        animation: ${ellipsis2} .6s infinite;
    }

    .dot:nth-child(3) {
        left: 32px;
        animation: ${ellipsis2} .6s infinite;
    }

    .dot:nth-child(4) {
        left: 56px;
        animation: ${ellipsis3} .6s infinite;
    }
`;

const FetchLoading = () => {
    return (
        <Loading>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </Loading>
    );
};

export default FetchLoading;