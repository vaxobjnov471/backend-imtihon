const { Router } = require("express")
const ticket_status = Router();

const {
    createTicket_status,
    getTicket_status,
    getTicket_statusById,
    updateTicket_status,
    deleteTicket_status,
    searchTicket_status
} = require('../controller/ticket_status.controller')

const validateSchema = (schema) => (req,res,next) => {
    const validationResult = schema.validate(req.body, );
    if (validationResult.error){
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
} = require('../validation/titicket_statusValidation');


/**
 * @swagger
 * tags:
 *   name: Ticket Status
 *   description: "Ticket Status ni boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /ticket_status/createTicket_status:
 *   post:
 *     summary: "Yangi Ticket Status ro'yxatdan o'tkazish"
 *     tags: [Ticket Status]
 *     description: "Yangi Ticket Status yaratish"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                  type: string
 *                  example: "Sotilgan"
 *     responses:
 *       "201":
 *         description: "Ticket Status muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
ticket_status.post('/createTicket_status', validateSchema(createValidationSchema), createTicket_status)


/**
 * @swagger
 * /ticket_status/getTicket_status:
 *   get:
 *     summary: "Ticket Status olish"
 *     tags: [Ticket Status]
 *     description: "Barcha Ticket Status larni olish"
 *     responses:
 *       "200":
 *         description: "Ticket Status muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
ticket_status.get('/getTicket_status', getTicket_status)


/**
 * @swagger
 * /ticket_status/getTicket_statusById/{id}:
 *   get:
 *     summary: "Ticket Status ID bo'yicha olish"
 *     tags: [Ticket Status]
 *     description: "Ticket Status ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Ticket Status muvaffaqiyatli olindi"
 *       "404":
 *         description: "Ticket Status topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
ticket_status.get('/getTicket_statusById/:id', getTicket_statusById)


/**
 * @swagger
 * /ticket_status/deleteTicket_status/{id}:
 *   delete:
 *     summary: "Ticket Status ID bo'yicha o'chirish"
 *     tags: [Ticket Status]
 *     description: "Ticket Status ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Ticket Status muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Ticket Status topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
ticket_status.delete('/deleteTicket_status/:id', deleteTicket_status)


/**
 * @swagger
 * /ticket_status/updateTicket_statusById/{id}:
 *   put:
 *     summary: "Ticket Status yangilash"
 *     tags: [Ticket Status]
 *     description: "Ticket Status ID bo'yicha yangilash"
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
 *               name:
 *                 type: string
 *                 example: "Sotilgan"
 *     responses:
 *       "200":
 *         description: "Ticket Status muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Ticket Status topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
ticket_status.put('/updateTicket_statusById/:id', validateSchema(updateValidationSchema), updateTicket_status)


/**
 * @swagger
 * /ticket_status/searchTicket_status:
 *   get:
 *     summary: "Ticket Status qidirish"
 *     tags: [Ticket Status]
 *     description: "Ticket Status ni nom bo'yicha qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Ticket Status muvaffaqiyatli topildi"
 *       "404":
 *         description: "Ticket Status topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
ticket_status.get('/searchTicket_status', searchTicket_status)

module.exports = {ticket_status}