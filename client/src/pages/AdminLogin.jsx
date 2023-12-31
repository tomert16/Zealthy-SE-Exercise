import styled from "styled-components";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../configs/firebase.config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRequests } from "../redux/requestsSlice";


const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    //login functionality
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const {email, password} = formValues;
            await dispatch(fetchRequests());
            await signInWithEmailAndPassword(firebaseAuth, email, password);
            navigate('/admin');
        } catch (err) {
            setError('Incorrect email or password');
        }
    };

    // checks if the user is logged in
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
            navigate('/admin');
        } else {
            console.error('not logged in');
        }
    });

  return (
    <LoginContainer>
        <NavBar isAdmin/>
        <div className="form-container">
            <form className="form" onSubmit={handleLogin}>
                <p className="form-title">Admin Login</p>
                <div className="input-container">
                    <input type="email" placeholder="Enter email" name="email" value={formValues.email} onChange={(e) => setFormValues({...formValues, [e.target.name]: e.target.value})}/>
                    <span>
                    </span>
                </div>
                <div className="input-container">
                    <input type="password" placeholder="Enter password" name="password" value={formValues.password} onChange={(e) => setFormValues({...formValues, [e.target.name]: e.target.value})}/>
                    </div>
                    <button type="submit" className="submit">
                        Sign in
                    </button>
                {/* <p className="signup-link">
                    No account?
                    <a href="">Sign up</a>
                </p> */}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    </LoginContainer>
  )
}

const LoginContainer = styled.div`
    .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 10%;
    }
    .form {
        background-color: #fff;
        display: block;
        padding: 1rem;
        max-width: 350px;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    .form-title {
        font-size: 1.25rem;
        line-height: 1.75rem;
        font-weight: 600;
        text-align: center;
        color: #000;
    }
    .input-container {
        position: relative;
    }
    .input-container input, .form button {
        outline: none;
        border: 1px solid #e5e7eb;
        margin: 8px 0;
    }
    .input-container input {
        background-color: #fff;
        padding: 1rem;
        padding-right: 3rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        width: 300px;
        border-radius: 0.5rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    } 
    .submit {
        display: block;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        background-color: green;
        color: #ffffff;
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 500;
        width: 100%;
        border-radius: 0.5rem;
        text-transform: uppercase;
    }
    .signup-link {
        color: #6B7280;
        font-size: 0.875rem;
        line-height: 1.25rem;
        text-align: center;
    }
    .signup-link a {
        text-decoration: underline;
  }
    .error-message {
        color: red;
        font-size: 1.2rem;
        text-align: center;
    }
`;
export default AdminLogin;