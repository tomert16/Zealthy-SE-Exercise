import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { updateRequest } from '../redux/requestsSlice';
import { AiOutlineCloseCircle } from'react-icons/ai';
import { successfullySentEmail } from '../ui/Toastify';

const RequestManagementCard = ({ request, setToggleCard }) => {
    const dispatch = useDispatch();
    const [status, setStatus] = useState(request.status);
    const [toggleMessage, setToggleMessage] = useState(false);
    const [message, setMessage] = useState('');
    // function to update the status of the request
    const handleStatusUpdate = (e) => {
        e.preventDefault();
        try {
            const updatedData = {
                id: request.id,
                status: status,
            };
            dispatch(updateRequest(updatedData));
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };
    //funtion to send an email response to the patient
    const handleEmailMessage = (e) => {
        e.preventDefault();
        console.log(`Would normally send email here to ${request.email} with body: ${message}`);
        successfullySentEmail(request);
    }

  return (
    <CardContainer>
        <div className="request-card-container">
            <div className="request-card">
                <button className="exit-card" onClick={() => setToggleCard(false)}>
                    <AiOutlineCloseCircle />
                </button>
                <h2>Date: {request.date}</h2>
                <h3>Patient: {request.name}</h3>
                <h3>Email: {request.email}</h3>
                <h3>Reason for request: {request.reason}</h3>
                <div className="status-update">
                    <label>Status: </label>
                    <select name="" id="" onChange={(e) => setStatus(e.target.value)}>
                        <option value="">{request.status}</option>
                        {request.status !== 'New' ? <option value="New">New</option> : null}
                        {request.status !== 'In progress' ? <option value="In progress">In Progress</option> : null}
                        {request.status !== 'Resolved' ? <option value="Resolved">Resolved</option> : null}
                    </select>
                    <button className="submit" onClick={handleStatusUpdate}>
                        Update Status
                    </button>
                </div>
                <div className="email-message">
                    <button onClick={() => setToggleMessage(!toggleMessage)}>
                        Write a message
                    </button>
                    {toggleMessage ? 
                        <div className="message-container">
                            <textarea placeholder='Write a message' value={message} onChange={(e) => setMessage(e.target.value)}/> 
                            <button className="send-msg" onClick={handleEmailMessage}>Send</button>
                        </div>
                    : null}
                </div>
            </div>
        </div>
    </CardContainer>
  )
}

RequestManagementCard.propTypes = {
    request: PropTypes.object,
    setToggleCard: PropTypes.func
}

const CardContainer = styled.div`
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
    .request-card-container {
        display: flex;
        justify-content: center;
        margin-top: 10%;
        height: max-content;
    }
    .request-card {
        background-color: white;
        border-radius: 10px;
        justify-content: center;
        width: 50%;
        padding: 1rem;
        select {
            width: fit-content;
        }
        button {
            width: fit-content;
        }
    }
    .exit-card {
        background: transparent;
        border: transparent;
        display: flex;
        cursor: pointer;
        svg {
            font-size: 2rem;
        }
    }
    .status-update {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        align-items: center;
    }
    .email-message {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 1%;
        .message-container {
            margin: 1%;
            display: flex;
            flex-direction: column;
            align-items: end;
            button {
                margin: 2%;
            }
        }
    }
`;
export default RequestManagementCard;