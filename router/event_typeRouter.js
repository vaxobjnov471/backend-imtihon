const { Router } = require("express")
const event_type = Router();

const { createEvent_type, getEvent_type, getEvent_typeById, updateEvent_type, deleteEvent_type, searchEvent_type } = require('../controller/Event_type.controller')

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
} = require('../validation/event_typeValidation');

/**
 * @swagger
 * tags:
 *   name: Event_type
 *   description: "Event_type boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /event_type/createEvent_type:
 *   post:
 *     summary: "Yangi Event_type ro'yxatdan o'tgazish"
 *     tags: [Event_type]
 *     description: "Yangi Event_type yaratish"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               payment_id:
 *                 type: string
 *     responses:
 *       "201":
 *         description: "Event_type muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
event_type.post('/createEvent_type', validateSchema(createValidationSchema), createEvent_type)

/**
 * @swagger
 * /event_type/getEvent_type:
 *   get:
 *     summary: "Event_type olish"
 *     tags: [Event_type]
 *     description: "Event_type olish"
 *     responses:
 *       "200":
 *         description: "Event_type muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
event_type.get('/getEvent_type', getEvent_type)

/**
 * @swagger
 * /event_type/getEvent_typeById/{id}:
 *   get:
 *     summary: "Event_type ID bo'yicha olish"
 *     tags: [Event_type]
 *     description: "Event_type ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Event_type muvaffaqiyatli olindi"
 *       "404":
 *         description: "Event_type topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
event_type.get('/getEvent_typeById/:id', getEvent_typeById)

/**
 * @swagger
 * /event_type/deleteEvent_type/{id}:
 *   delete:
 *     summary: "Event_type ID bo'yicha o'chirish"
 *     tags: [Event_type]
 *     description: "Event_type ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Event_type muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Event_type topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
event_type.delete('/deleteEvent_type/:id', deleteEvent_type)

/**
 * @swagger
 * /event_type/updateEvent_typeById/{id}:
 *   put:
 *     summary: "Event_type yangilash"
 *     tags: [Event_type]
 *     description: "Event_type ID bo'yicha yangilash"
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
 *               payment_id:
 *                 type: string
 *     responses:
 *       "200":
 *         description: "Event_type muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Event_type topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
event_type.put('/updateEvent_typeById/:id', validateSchema(updateValidationSchema), updateEvent_type)

/**
 * @swagger
 * /event_type/searchEvent_type:
 *   get:
 *     summary: "Event_type qidirish"
 *     tags: [Event_type]
 *     description: "Event_type qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Event_type muvaffaqiyatli topildi"
 *       "404":
 *         description: "Event_type topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
event_type.get('/searchEvent_type', searchEvent_type)

module.exports = { event_type }