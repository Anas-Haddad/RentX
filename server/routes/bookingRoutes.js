const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

const { protect } = require('../middleware/authMiddleware');

router.get('/check', bookingController.checkAvailability);
router.get('/busy-dates', bookingController.getBusyDates);
router.get('/my-bookings', protect, bookingController.getMyBookings);
router.post('/', bookingController.createBooking);
router.get('/', bookingController.getAllBookings);
router.put('/:id/status', bookingController.updateBookingStatus);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
