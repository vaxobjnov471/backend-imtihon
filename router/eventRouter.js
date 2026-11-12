const { Router } = require("express")
const event = Router();

const { createEvent, getEvent, getEventById, updateEvent, deleteEvent, searchEvent } = require('../controller/event.controller')

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
} = require('../validation/eventValidation');

/**
 * @swagger
 * tags:
 *   name: Event
 *   description: "Event boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /event/createEvent:
 *   post:
 *     summary: "Yangi Event ro'yxatdan o'tgazish"
 *     tags: [Event]
 *     description: "Yangi Event yaratish"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               photo:
 *                 type: string
 *               start_date:
 *                 type: string
 *               start_time:
 *                 type: string
 *               finish_date:
 *                 type: string
 *               finish_time:
 *                 type: string
 *               info:
 *                 type: string
 *               event_type_id:
 *                 type: string
 *               human_category_id:
 *                 type: string
 *               venue_id:
 *                 type: string
 *               lang_id:
 *                 type: string
 *               release_date:
 *                 type: string
 *     responses:
 *       "201":
 *         description: "Event muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
event.post('/createEvent', validateSchema(createValidationSchema), createEvent)

/**
 * @swagger
 * /event/getEvent:
 *   get:
 *     summary: "Event olish"
 *     tags: [Event]
 *     description: "Event olish"
 *     responses:
 *       "200":
 *         description: "Event muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
event.get('/getEvent', getEvent)

/**
 * @swagger
 * /event/getEventById/{id}:
 *   get:
 *     summary: "Event ID bo'yicha olish"
 *     tags: [Event]
 *     description: "Event ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Event muvaffaqiyatli olindi"
 *       "404":
 *         description: "Event topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
event.get('/getEventById/:id', getEventById)

/**
 * @swagger
 * /event/deleteEvent/{id}:
 *   delete:
 *     summary: "Event ID bo'yicha o'chirish"
 *     tags: [Event]
 *     description: "Event ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Event muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Event topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
event.delete('/deleteEvent/:id', deleteEvent)

/**
 * @swagger
 * /event/updateEventById/{id}:
 *   put:
 *     summary: "Event yangilash"
 *     tags: [Event]
 *     description: "Event ID bo'yicha yangilash"
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
 *               photo:
 *                 type: string
 *               start_date:
 *                 type: string
 *               start_time:
 *                 type: string
 *               finish_date:
 *                 type: string
 *               finish_time:
 *                 type: string
 *               info:
 *                 type: string
 *               event_type_id:
 *                 type: string
 *               human_category_id:
 *                 type: string
 *               venue_id:
 *                 type: string
 *               lang_id:
 *                 type: string
 *               release_date:
 *                 type: string
 *     responses:
 *       "200":
 *         description: "Event muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Event topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
event.put('/updateEventById/:id', validateSchema(updateValidationSchema), updateEvent)

/**
 * @swagger
 * /event/searchEvent:
 *   get:
 *     summary: "Event qidirish"
 *     tags: [Event]
 *     description: "Event qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Event muvaffaqiyatli topildi"
 *       "404":
 *         description: "Event topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
event.get('/searchEvent', searchEvent)

module.exports = { event }