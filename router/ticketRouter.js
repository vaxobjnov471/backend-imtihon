const { Router } = require("express")
const ticket = Router();

const { createTicket, getTicket, getTicketById, updateTicket, deleteTicket,  } = require('../controller/ticket.controller')

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
} = require('../validation/ticketValidation');

/**
 * @swagger
 * tags:
 *   name: Ticket
 *   description: "Ticket boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /ticket/createTicket:
 *   post:
 *     summary: "Yangi Ticket ro'yxatdan o'tgazish"
 *     tags: [Ticket]
 *     description: "Yangi Ticket yaratish"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: string
 *               seat_id:
 *                 type: string
 *               price:
 *                 type: number
 *               service_fee:
 *                 type: number
 *               status_id:
 *                 type: string
 *               ticket_type:
 *                 type: number
 *     responses:
 *       "201":
 *         description: "Ticket muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
ticket.post('/createTicket', validateSchema(createValidationSchema), createTicket)

/**
 * @swagger
 * /ticket/getTicket:
 *   get:
 *     summary: "Ticket olish"
 *     tags: [Ticket]
 *     description: "Ticket olish"
 *     responses:
 *       "200":
 *         description: "Ticket muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
ticket.get('/getTicket', getTicket)

/**
 * @swagger
 * /ticket/getTicketById/{id}:
 *   get:
 *     summary: "Ticket ID bo'yicha olish"
 *     tags: [Ticket]
 *     description: "Ticket ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Ticket muvaffaqiyatli olindi"
 *       "404":
 *         description: "Ticket topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
ticket.get('/getTicketById/:id', getTicketById)

/**
 * @swagger
 * /ticket/deleteTicket/{id}:
 *   delete:
 *     summary: "Ticket ID bo'yicha o'chirish"
 *     tags: [Ticket]
 *     description: "Ticket ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Ticket muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Ticket topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
ticket.delete('/deleteTicket/:id', deleteTicket)

/**
 * @swagger
 * /ticket/updateTicketById/{id}:
 *   put:
 *     summary: "Ticket yangilash"
 *     tags: [Ticket]
 *     description: "Ticket ID bo'yicha yangilash"
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
 *               event_id:
 *                 type: string
 *               seat_id:
 *                 type: string
 *               price:
 *                 type: number
 *               service_fee:
 *                 type: number
 *               status_id:
 *                 type: string
 *               ticket_type:
 *                 type: number
 *     responses:
 *       "200":
 *         description: "Ticket muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Ticket topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
ticket.put('/updateTicketById/:id', validateSchema(updateValidationSchema), updateTicket)

module.exports = { ticket }