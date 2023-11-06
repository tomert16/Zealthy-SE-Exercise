const { RequestModel } = require('../models/RequestModel.js'); 

module.exports.createNewRequest = async (req, res) => {
    const { name, email, reason, date } = req.body;
    RequestModel.createRequest(name, email, reason, date, (err) => {
        if (err) {
            return res.status(404).json({ msg: 'Error creating new request' });
        } else {
            return res.status(200).json({ msg: 'New request created', name, email, reason, date });
        }
    })
};

module.exports.getAllRequests = async (req, res) => {
    RequestModel.allRequests((err, requests) => {
        if (err) {
            return res.status(500).json({ msg: 'Error getting all requests' });
        } else {
            return res.status(200).json({ msg: 'All requests retrieved', requests });
        }
    });
};

module.exports.getRequestById = async (req, res) => {
    const { id } = req.params;
    RequestModel.getRequestById(id, (err, request) => {
        if (err) {
            return res.status(500).json({ msg: 'Error getting request by id' });
        } else {
            return res.status(200).json({ msg: 'Request retrieved', request });
        }
    })
};

module.exports.updateRequestStatus = async (req, res) => {
    const { id, status } = req.body;
    RequestModel.getRequestById(id, (err, request) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({ msg: 'Request not found' });
        } else {
            if (request) {
                RequestModel.updateRequest(id, status, (err) => {
                    if (err) {
                        console.error(err.message);
                        return res.status(500).send({ msg: 'Error updating request status' });
                    } else {
                        return res.status(200).json({ msg: 'Request Statys updated', status });
                    }
                })
            }
        }
    })
}