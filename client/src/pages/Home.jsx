/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";
import NavBar from "../components/NavBar";
import RequestForm from "../components/RequestForm";
import { ToastContainer } from 'react-toastify';
import Footer from "../components/Footer";


const Home = () => {
  return (
    <Container>
        <NavBar isAdmin/>
        <ToastContainer />
        <div className="welcome-message">
          <h1>Welcome to Zealthy's Help Desk</h1>
          <h3>Please feel free to fill out out request form and we will get back to you</h3>
        </div>
        <RequestForm />
        <Footer />
    </Container>
  )
}

const Container = styled.div`
  .welcome-message {
    text-align: center;
  }
`;
export default Home;