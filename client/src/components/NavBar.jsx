import styled from "styled-components";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../configs/firebase.config";
import { signOut } from "firebase/auth";


const NavBar = ({ isAdmin }) => {
    const navigate = useNavigate();

    //nav bar links 
    const links = [
        {name: 'Home', link: '/'},
        {name: 'Management Portal', link: '/admin_login'},
    ]

    //sign out functionality
    const handleSignOut = async() => {
        try {
            await signOut(firebaseAuth);
            navigate('/admin_login');
        } catch (err) {
            console.error(err);
        }
    }

    // checks if the user is logged in
    // onAuthStateChanged(firebaseAuth, (currentUser) => {
    //     if (!currentUser) {
    //         navigate('/admin_login');
    //     }
    // })

  return (
    <Nav>
        <div className="left">
            <div className="logo" onClick={() => navigate('/')}>
                <h1>ZEALTHY</h1>
            </div>
            <ul className="links">
                {links.map(({name, link}) => {
                    return (
                        <li key={name}>
                            <Link to={link}>{name}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
        {isAdmin ? null : <div className="right">
            <p onClick={handleSignOut}>Sign Out</p>
        </div>}
    </Nav>
  )
}

NavBar.propTypes = {
    isAdmin: PropTypes.bool
}

const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height 12vh;
    width 100vw;
    z-index: 2;
    padding 0 -6rem;
    top: 0;
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
    }
    .links {
        display: flex;
        list-style-type: none;
        gap: 2rem;
        li {
            a{
                color: black;
                text-decoration: none;
                &:hover {
                    color: green;
                }
            }
        }
    }
    .right {
        margin-right: 3%;
        cursor: pointer;
        p:hover {
            color: green;
        }
    }
`;
export default NavBar;