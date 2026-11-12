const { Router } = require("express")
const seat = Router();

const { createSeat, getSeat, getSeatById, updateSeat, deleteSeat, searchSeat } = require('../controller/seat.controller')

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
} = require('../validation/seatValidation');

/**
 * @swagger
 * tags:
 *   name: Seat
 *   description: "Seat boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /seat/createSeat:
 *   post:
 *     summary: "Yangi Seat ro'yxatdan o'tgazish"
 *     tags: [Seat]
 *     description: "Yangi Seat yaratish"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector:
 *                 type: number
 *               row_number:
 *                 type: number
 *               number:
 *                 type: number
 *               venue_id:
 *                 type: string
 *               seat_type_id:
 *                 type: string
 *               location_in_schema:
 *                 type: string
 *     responses:
 *       "201":
 *         description: "Seat muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
seat.post('/createSeat', validateSchema(createValidationSchema), createSeat)

/**
 * @swagger
 * /seat/getSeat:
 *   get:
 *     summary: "Seat olish"
 *     tags: [Seat]
 *     description: "Seat olish"
 *     responses:
 *       "200":
 *         description: "Seat muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
seat.get('/getSeat', getSeat)

/**
 * @swagger
 * /seat/getSeatById/{id}:
 *   get:
 *     summary: "Seat ID bo'yicha olish"
 *     tags: [Seat]
 *     description: "Seat ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Seat muvaffaqiyatli olindi"
 *       "404":
 *         description: "Seat topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
seat.get('/getSeatById/:id', getSeatById)

/**
 * @swagger
 * /seat/deleteSeat/{id}:
 *   delete:
 *     summary: "Seat ID bo'yicha o'chirish"
 *     tags: [Seat]
 *     description: "Seat ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Seat muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Seat topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
seat.delete('/deleteSeat/:id', deleteSeat)

/**
 * @swagger
 * /seat/updateSeatById/{id}:
 *   put:
 *     summary: "Seat yangilash"
 *     tags: [Seat]
 *     description: "Seat ID bo'yicha yangilash"
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
 *               sector:
 *                 type: number
 *               row_number:
 *                 type: number
 *               number:
 *                 type: number
 *               venue_id:
 *                 type: string
 *               seat_type_id:
 *                 type: string
 *               location_in_schema:
 *                 type: string
 *     responses:
 *       "200":
 *         description: "Seat muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Seat topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
seat.put('/updateSeatById/:id', validateSchema(updateValidationSchema), updateSeat)

/**
 * @swagger
 * /seat/searchSeat:
 *   get:
 *     summary: "Seat qidirish"
 *     tags: [Seat]
 *     description: "Seat qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Seat muvaffaqiyatli topildi"
 *       "404":
 *         description: "Seat topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
seat.get('/searchSeat', searchSeat)

module.exports = { seat }