const { Router } = require("express")
const human = Router();

const { createHuman_category, getHuman_category, getHuman_categoryById, updateHuman_category,deleteHuman_category, searchHuman_category} = require('../controller/human_category.controller')

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
} = require('../validation/human_category');

/**
 * @swagger
 * tags:
 *   name: Human
 *   description: "Human boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /human/createHuman:
 *   post:
 *     summary: "Yangi Human ro'yxatdan o'tgazish"
 *     tags: [Human]
 *     description: "Yangi Human yaratish"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start_age:
 *                 type: number
 *               finish_age:
 *                 type: number
 *               gender:
 *                 type: string
 *     responses:
 *       "201":
 *         description: "Human muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
human.post('/createHuman', validateSchema(createValidationSchema),  createHuman_category)

/**
 * @swagger
 * /human/getHuman:
 *   get:
 *     summary: "Human olish"
 *     tags: [Human]
 *     description: "Human olish"
 *     responses:
 *       "200":
 *         description: "Human muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
human.get('/getHuman', getHuman_category)

/**
 * @swagger
 * /human/getHumanById/{id}:
 *   get:
 *     summary: "Human ID bo'yicha olish"
 *     tags: [Human]
 *     description: "Human ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Human muvaffaqiyatli olindi"
 *       "404":
 *         description: "Human topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
human.get('/getHumanById/:id', getHuman_categoryById)

/**
 * @swagger
 * /human/deleteHuman/{id}:
 *   delete:
 *     summary: "Human ID bo'yicha o'chirish"
 *     tags: [Human]
 *     description: "Human ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Human muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Human topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
human.delete('/deleteHuman/:id', deleteHuman_category)

/**
 * @swagger
 * /human/updateHumanById/{id}:
 *   put:
 *     summary: "Human yangilash"
 *     tags: [Human]
 *     description: "Human ID bo'yicha yangilash"
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
 *               start_age:
 *                 type: number
 *               finish_age:
 *                 type: number
 *               gender:
 *                 type: string
 *     responses:
 *       "200":
 *         description: "Human muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Human topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
human.put('/updateHumanById/:id', validateSchema(updateValidationSchema), updateHuman_category)

/**
 * @swagger
 * /human/searchHuman:
 *   get:
 *     summary: "Human qidirish"
 *     tags: [Human]
 *     description: "Human qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Human muvaffaqiyatli topildi"
 *       "404":
 *         description: "Human topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
human.get('/searchHuman', searchHuman_category)

module.exports = { human }