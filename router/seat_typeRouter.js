const { Router } = require("express")
const seat_type = Router();

const {
    createSeat_Type,
    getSeat_Type,
    getSeat_TypeById,
    updateSeat_Type,
    deleteSeat_Type,
    searchSeat_Type
} = require('../controller/seat_type.controller')

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
} = require('../validation/seat_typeValidation');


/**
 * @swagger
 * tags:
 *   name: Seat Type
 *   description: "Seat Type ni boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /seat_type/createSeat_type:
 *   post:
 *     summary: "Yangi Seat Type ro'yxatdan o'tkazish"
 *     tags: [Seat Type]
 *     description: "Yangi Seat Type yaratish"
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
 *                  example: "VIP"
 *     responses:
 *       "201":
 *         description: "Seat Type muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
seat_type.post('/createSeat_type', validateSchema(createValidationSchema), createSeat_Type)


/**
 * @swagger
 * /seat_type/getSeat_type:
 *   get:
 *     summary: "Seat Type olish"
 *     tags: [Seat Type]
 *     description: "Barcha Seat Type larni olish"
 *     responses:
 *       "200":
 *         description: "Seat Type muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
seat_type.get('/getSeat_type', getSeat_Type)


/**
 * @swagger
 * /seat_type/getSeat_typeById/{id}:
 *   get:
 *     summary: "Seat Type ID bo'yicha olish"
 *     tags: [Seat Type]
 *     description: "Seat Type ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Seat Type muvaffaqiyatli olindi"
 *       "404":
 *         description: "Seat Type topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
seat_type.get('/getSeat_typeById/:id', getSeat_TypeById)


/**
 * @swagger
 * /seat_type/deleteSeat_type/{id}:
 *   delete:
 *     summary: "Seat Type ID bo'yicha o'chirish"
 *     tags: [Seat Type]
 *     description: "Seat Type ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Seat Type muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Seat Type topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
seat_type.delete('/deleteSeat_type/:id', deleteSeat_Type)


/**
 * @swagger
 * /seat_type/updateSeat_typeById/{id}:
 *   put:
 *     summary: "Seat Type yangilash"
 *     tags: [Seat Type]
 *     description: "Seat Type ID bo'yicha yangilash"
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
 *                 example: "VIP"
 *     responses:
 *       "200":
 *         description: "Seat Type muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Seat Type topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
seat_type.put('/updateSeat_typeById/:id', validateSchema(updateValidationSchema), updateSeat_Type)


/**
 * @swagger
 * /seat_type/searchSeat_type:
 *   get:
 *     summary: "Seat Type qidirish"
 *     tags: [Seat Type]
 *     description: "Seat Type ni nom bo'yicha qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Seat Type muvaffaqiyatli topildi"
 *       "404":
 *         description: "Seat Type topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
seat_type.get('/searchSeat_type', searchSeat_Type)

module.exports = {seat_type}