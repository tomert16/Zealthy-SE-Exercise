const express = require('express');
const router = express.Router();
const { createNewRequest, getAllRequests, getRequestById, updateRequestStatus } = require('../controllers/RequestController.js');

router.get('/', getAllRequests);
router.post('/create_request', createNewRequest);
router.get('/:id', getRequestById);
router.patch('/:id', updateRequestStatus);

module.exports = router;