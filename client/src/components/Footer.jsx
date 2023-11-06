import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
    const navigate = useNavigate();

  return (
    <FooterContainer>
        <div className="left">
            <div className="logo" onClick={() => navigate('/')}>
                <h1>ZEALTHY</h1>
            </div>
        </div>
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
    width: 100vw;
    height: max-content;
    display: flex;
    justify-content: space-between;
    bottom: 0;
    transition: 0.2s ease-in-out;
    background-color: rgb(255, 255, 255);
    .left {
        display: flex;
        align-items: center;
        margin-left: 3%;
        cursor: pointer;
        h1 {
            font-family: "Gill Sans", sans-serif;
            font-weight: bolder;
            font-size: 1.2rem;
            @media (min-width: 768px) {
                font-size: 2rem;
            }
        }
`;
export default Footer;