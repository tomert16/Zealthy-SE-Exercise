import styled from "styled-components";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../configs/firebase.config";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";


const NavBar = ({ isAdmin }) => {
    const navigate = useNavigate();
    const [toggleNavBurger, setToggleNavBurger] = useState(false);

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

    // function to display the navburger links
    const handleToggleNavBurger = () => {
        setToggleNavBurger(!toggleNavBurger);
    };

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
        <div className="right">
            <div className="navburger">
                <div className="background">
                    <button className="menu__icon" onClick={handleToggleNavBurger}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
            {toggleNavBurger ? <div className="navburger-links-container">
                <ul className="navburger-links">
                    {links.map(({name, link}) => {
                        return (
                            <li key={name}>
                                <Link to={link}>{name}</Link>
                            </li>
                        )
                    })}
                    {isAdmin ? null :<p className="navburger-signout-btn" onClick={handleSignOut}>Sign Out</p>}
                </ul>
                <button className="close-navbar" onClick={handleToggleNavBurger}>
                    <MdOutlineClose />
                </button>
            </div> : null}
            {isAdmin ? null :<p className="signout-btn" onClick={handleSignOut}>Sign Out</p>}
        </div>
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
    @media (max-width: 540px) {
        .links, .signout-btn {
            display: none;
        }
    }
    .right {
        margin-right: 3%;
        cursor: pointer;
        p:hover {
            color: green;
        }
        @media (min-width: 541px) {
            .navburger {
                display: none;
            }
        }
        /* <style for menu__icon> ======== */
        .menu__icon {
            width: 32px;
            height: 32px;
            padding: 4px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: transform .4s;
            border: none;
            background: none;
        }
        
        .menu__icon span {
            width: 100%;
            height: 0.25rem;
            border-radius: 0.125rem;
            background-color: black;
            box-shadow: 0 .5px 2px 0 hsla(0, 0%, 0%, .2);
            transition: width .4s, transform .4s, background-color .4s;
        }
        
        .menu__icon :nth-child(1) {
            width: 75%;
        }
        
        .menu__icon :nth-child(2) {
            width: 50%;
        }
        
        .menu__icon:target {
            transform: rotate(-90deg);
        }
        
        .menu__icon:target span {
            width: .25rem;
            transform: translateX(10px);
            background-color: black;
        }
        .navburger-links-container {
            border-style: solid;
            border-radius: 3px;
            border-color: black;
            position: relative;
            background: rgba(0,0,0,.5);
            height: 100vh;
            left: 0;
            position: fixed;
            top: 0;
            width: 100vw;
            z-index: 1000;
            overflow-x: scroll;
            text-align: center;
            transition: 0.3s;
            .navburger-links {
                background-color: white;
                height: 100vh;
                width: fit-content;
                position: fixed;
                top: 0;
                right: 0;
                margin: 0.1rem;
                li {
                    list-style-type: none;
                    font-size: 1rem;
                    margin-bottom: 15%;
                    transform: translate(-20%, 30%);
                    a{
                        text-decoration: none;
                        color: black;
                      }
                    a:hover {
                        color: black
                    }
                }
                .navburger-signout-btn {
                    transform: translate(-20%, 30%)
                }
            }
            .close-navbar {
                position: relative;
                right: 5%;
                background: transparent;
                border: none;
                svg {
                    color: white;
                    font-size: 1.5rem;
                }
                @media (min-width: 320px) {
                    right: 14%;
                }
                @media (min-width: 375px) {
                    right: 4%;
                }
                @media (min-width: 425px) {
                    left: 2%;
                }
            }
    }
    }
`;
export default NavBar;