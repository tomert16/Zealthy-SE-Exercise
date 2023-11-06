import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { fetchRequests, selectRequests } from '../redux/requestsSlice';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { DataGrid } from '@mui/x-data-grid';
import RequestManagementCard from '../components/RequestManagementCard';
import { ToastContainer } from 'react-toastify';
import { firebaseAuth } from '../configs/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AiOutlineInfoCircle } from'react-icons/ai';


const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const requests = useSelector(selectRequests);
    const [selectedRow, setSelectedRow] = useState(null);
    const [toggleCard, setToggleCard] = useState(false);

    //fetches the requests data
    useEffect(() => {
      try {
        dispatch(fetchRequests())
      } catch (err) {
        console.error('Error fetching requests', err)
      }
    }, [dispatch]);

    //columns for the requests management table
    const columns = [
      {field: 'id', headerName: 'ID', width: 70},
      {field: 'name', headerName: 'Name', width: 130},
      {field: 'email', headerName: 'Email', width: 200},
      {field: 'reason', headerName: 'Reason', width: 250},
      {field: 'status', headerName: 'Status', width: 180},
      {field: 'date', headerName: 'Date', width: 180},
      {width: 130,
        renderCell: (params, index) => [
          <button key={index} onClick={() => handleEditRequest(params.row)} className="request-info-btn">
            <AiOutlineInfoCircle />
          </button>
        ]
      }
    ];

    //rows for the requests management table
    const rows = requests.map((request) => {
      return {
        id: request.id,
        name: request.name,
        email: request.email,
        reason: request.reason,
        status: request.status,
        date: request.date,
      }
    });

    //function to handle the edit button click
    const handleEditRequest = (request) => {
      setSelectedRow(request);
      setToggleCard(true);
    }

    //checks if the user is logged in, if not then redirect to login page
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) {
        navigate('/admin_login');
      }
    })


  return (
    <Container>
        <NavBar />
        <ToastContainer />
        <h1 className="header">Management Portal</h1>
        <div className="data-table">
          <DataGrid 
            columns={columns} 
            rows={rows} 
            initialState={{
              pagination: {
                paginationModel: {page: 0, pageSize: 10}
              }
            }}
            pageSizeOptions={[5, 10, requests.length]}
          />
        </div>
        {toggleCard ? <RequestManagementCard request={selectedRow} setToggleCard={setToggleCard}/> : null}
        {/* <Footer /> */}
    </Container>
  )
}

const Container = styled.div`
  .header {
    text-align: center;
    text-decoration: underline;
  }
  .data-table {
    background-color: #fff;
  }
  .request-info-btn {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    svg {
      font-size: 1.5rem;
      &:hover {
        color: green;
      }
    }
  }
`;
export default Admin;