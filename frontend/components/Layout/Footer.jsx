import styled from "styled-components";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Foo = styled.footer`
	background-image: linear-gradient(45deg, #b05c3c, #d79771);
	color: #fff;
	padding: 50px 0;
	position: relative;
	text-align: center;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	.copyright {
		margin-bottom: 20px;
		font-size: 18px;
	}
	.icon {
		width: 35px;
		height: 35px;
		margin: 0 20px;
		display: inline-block;
		line-height: 35px;
		border-radius: 10px;
	}
	.icon:hover {
		background-color: #fff;
	}
	.icon:hover a {
		color: #bfbe58;
	}
	.icon a {
		color: #fff;
		font-size: 20px;
	}
`;

const Footer = () => {
	return (
		<Foo>
			<p className="copyright" id="copyright">
				Copyright &copy; {new Date().getFullYear()}, Thrifty.
			</p>
			<div className="icon">
				<a href="https://github.com/Alviannn" target="_blank" rel="noopener noreferrer">
					<FaGithub />
				</a>
			</div>
			<div className="icon">
				<a href="https://github.com/rahmatsyifana12" target="_blank" rel="noopener noreferrer">
					<FaGithub />
				</a>
			</div>
			<div className="icon">
				<a href="https://www.github.com/leonardo-lim" target="_blank" rel="noopener noreferrer">
					<FaGithub />
				</a>
			</div>
			<div className="icon">
				<a href="https://github.com/fabianhabil" target="_blank" rel="noopener noreferrer">
					<FaGithub />
				</a>
			</div>
		</Foo>
	);
};

export default Footer;
