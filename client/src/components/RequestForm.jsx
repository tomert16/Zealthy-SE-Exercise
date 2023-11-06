import { useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { createNewRequest } from '../redux/requestsSlice';
import { requestNotSubmitted, requestTicketSubmitted } from '../ui/Toastify';

const RequestForm = () => {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        reason: '',
    });

    const submitNewRequest = async(e) => {
        e.preventDefault();
        const current = new Date();
        const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
        const requestData = {
            name: formValues.name,
            email: formValues.email,
            reason: formValues.reason,
            date: date
        };
        const submitRequest = await dispatch(createNewRequest(requestData));
        if (!submitRequest.error) {
            requestTicketSubmitted();
            setFormValues({
                name: '',
                email: '',
                reason: '',
            });
        } else {
            requestNotSubmitted();
            console.error('Error creating new request');
        }
    }


  return (
    <Form>
        <div className="container">
            <form className="modal" onSubmit={submitNewRequest}>
                <div className="modal__header">
                    <span className="modal__title">Request Ticket</span>
                </div>
                <div className="modal__body">
                    <div className="input">
                        <label className="input__label">Name</label>
                        <input className="input__field" name="name" type="text" required value={formValues.name} onChange={(e) => setFormValues({...formValues, [e.target.name]: e.target.value})}/> 
                    </div>
                    <div className="input">
                        <label className="input__label">Email</label>
                        <input className="input__field" name="email" type="email" required value={formValues.email} onChange={(e) => setFormValues({...formValues, [e.target.name]: e.target.value})}/> 
                    </div>
                    <div className="input">
                        <label className="input__label">Description</label>
                        <textarea className="input__field input__field--textarea" name="reason" required value={formValues.reason} onChange={(e) => setFormValues({...formValues, [e.target.name]: e.target.value})}></textarea>
                        <p className="input__description">Give us a detailed description so we can find the best help for you.</p>
                    </div>
                </div>
                <div className="modal__footer">
                    <button className="button button--primary">Submit Request</button>
                </div>
            </form>
        </div>
    </Form>
  )
}


const Form = styled.div`
    .button {
        appaerance: none;
        font: inherit;
        border: none;
        background: none;
        cursor: pointer;
    }
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }
    .modal {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 500px;
        background-color: #fff;
        box-shadow: 0 15px 30px 0 rgba(0, 125, 171, 0.15);
        border-radius: 10px;
    }
    .modal__header {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #ddd;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .modal__body {
        padding: 1rem 1rem;
    }
    .modal__footer {
        padding: 0 1.5rem 1.5rem;
    }
    .modal__title {
        font-weight: 700;
        font-size: 1.25rem;
    }
    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: 0.15s ease;
    }
    .button--icon {
        width: 2.5rem;
        height: 2.5rem;
        background-color: transparent;
        border-radius: 0.25rem;
    }
    .button--icon:focus, .button--icon:hover {
        background-color: #ededed;
    }
    .button--primary {
        background-color: green;
        color: #FFF;
        padding: 0.75rem 1.25rem;
        border-radius: 0.25rem;
        font-weight: 500;
        font-size: 0.875rem;
    }
    .button--primary:hover {
        background-color: darkgreen;
    }
    .input {
        display: flex;
        flex-direction: column;
    }
    .input + .input {
        margin-top: 1.75rem;
    }
    .input__label {
        font-weight: 700;
        font-size: 0.875rem;
    }
    .input__field {
        display: block;
        margin-top: 0.5rem;
        border: 1px solid #DDD;
        border-radius: 0.25rem;
        padding: 0.75rem 0.75rem;
        transition: 0.15s ease;
    }
    .input__field:focus {
        outline: none;
        border-color: #007dab;
        box-shadow: 0 0 0 1px #007dab, 0 0 0 4px rgba(0, 125, 171, 0.25);
    }
    .input__field--textarea {
        min-height: 100px;
        max-width: 100%;
    }
    .input__description {
        font-size: 0.875rem;
        margin-top: 0.5rem;
        color: #8d8d8d;
    }

`;
export default RequestForm;