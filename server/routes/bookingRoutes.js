const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/check', bookingController.checkAvailability);
router.post('/', bookingController.createBooking);
router.get('/', bookingController.getAllBookings);
router.put('/:id/status', bookingController.updateBookingStatus);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
