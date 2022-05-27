import styled, { keyframes } from 'styled-components';

const floating = keyframes`
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }

    100% {
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
    }
`;

const Circles = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    overflow: hidden;
`;

const Circle = styled.div`
	background-image: linear-gradient(45deg, #b05c3c, #d79771);
    width: 20px;
    height: 20px;
    display: block;
    position: absolute;
    bottom: -150px;
    list-style: none;
    border-radius: 50%;
    animation: ${floating} 25s linear infinite;

    &:nth-child(1) {
        width: 80px;
        height: 80px;
        left: 25%;
        animation-delay: 0s;
    }

    &:nth-child(2) {
        width: 20px;
        height: 20px;
        left: 10%;
        animation-delay: 2s;
        animation-duration: 12s;
    }

    &:nth-child(3) {
        width: 20px;
        height: 20px;
        left: 70%;
        animation-delay: 4s;
    }

    &:nth-child(4) {
        width: 60px;
        height: 60px;
        left: 40%;
        animation-delay: 0s;
        animation-duration: 18s;
    }

    &:nth-child(5) {
        width: 20px;
        height: 20px;
        left: 65%;
        animation-delay: 0s;
    }

    &:nth-child(6) {
        width: 110px;
        height: 110px;
        left: 75%;
        animation-delay: 3s;
    }

    &:nth-child(7) {
        width: 150px;
        height: 150px;
        left: 35%;
        animation-delay: 7s;
    }

    &:nth-child(8) {
        width: 25px;
        height: 25px;
        left: 50%;
        animation-delay: 15s;
        animation-duration: 45s;
    }

    &:nth-child(9) {
        width: 15px;
        height: 15px;
        left: 20%;
        animation-delay: 2s;
        animation-duration: 35s;
    }

    &:nth-child(10) {
        width: 150px;
        height: 150px;
        left: 85%;
        animation-delay: 0s;
        animation-duration: 11s;
    }
`;

const Background = () => {
    return (
        <Circles>
            <Circle></Circle>
            <Circle></Circle>
            <Circle></Circle>
            <Circle></Circle>
            <Circle></Circle>
            <Circle></Circle>
            <Circle></Circle>
            <Circle></Circle>
            <Circle></Circle>
            <Circle></Circle>
        </Circles>
    );
};

export default Background;