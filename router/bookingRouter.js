const { Router } = require("express")
const booking = Router();

const { createBooking, getBooking, getBookingById, updateBooking, deleteBooking } = require('../controller/booking.controller')

const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({
            success: false,
            message: validationResult.error.details[0].message,
        });
    }
    next();
}

const {
    createValidationSchema,
    updateValidationSchema
} = require('../validation/bookingValidation');

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: "Booking boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /booking/createBooking:
 *   post:
 *     summary: "Yangi Booking ro'yxatdan o'tgazish"
 *     tags: [Booking]
 *     description: "Yangi Booking yaratish"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_id:
 *                 type: string
 *               createdAt:
 *                 type: string
 *               fineshed:
 *                 type: string
 *               payment_method_id:
 *                 type: string
 *               delivery_method_id:
 *                 type: string
 *               status_id:
 *                 type: string
 *     responses:
 *       "201":
 *         description: "Booking muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
booking.post('/createBooking', validateSchema(createValidationSchema), createBooking)

/**
 * @swagger
 * /booking/getBooking:
 *   get:
 *     summary: "Booking olish"
 *     tags: [Booking]
 *     description: "Booking olish"
 *     responses:
 *       "200":
 *         description: "Booking muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
booking.get('/getBooking', getBooking)

/**
 * @swagger
 * /booking/getBookingById/{id}:
 *   get:
 *     summary: "Booking ID bo'yicha olish"
 *     tags: [Booking]
 *     description: "Booking ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Booking muvaffaqiyatli olindi"
 *       "404":
 *         description: "Booking topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
booking.get('/getBookingById/:id', getBookingById)

/**
 * @swagger
 * /booking/deleteBooking/{id}:
 *   delete:
 *     summary: "Booking ID bo'yicha o'chirish"
 *     tags: [Booking]
 *     description: "Booking ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Booking muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Booking topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
booking.delete('/deleteBooking/:id', deleteBooking)

/**
 * @swagger
 * /booking/updateBookingById/{id}:
 *   put:
 *     summary: "Booking yangilash"
 *     tags: [Booking]
 *     description: "Booking ID bo'yicha yangilash"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               createdAt:
 *                 type: string
 *               fineshed:
 *                 type: string
 *     responses:
 *       "200":
 *         description: "Booking muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Booking topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
booking.put('/updateBookingById/:id', validateSchema(updateValidationSchema), updateBooking)


module.exports = { booking }