const { Router } = require("express")
const delivery_method = Router();

const {
    createDelivery_method,
    getDelivery_method,
    getDelivery_methodById,
    updateDelivery_method,
    deleteDelivery_method,
    searchDelivery_method
} = require('../controller/delivery_method.controller')

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
} = require('../validation/delivery_methodValidation');


/**
 * @swagger
 * tags:
 *   name: Delivery Method
 *   description: "Delivery Method ni boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /delivery_method/createDelivery_method:
 *   post:
 *     summary: "Yangi Delivery Method ro'yxatdan o'tkazish"
 *     tags: [Delivery Method]
 *     description: "Yangi Delivery Method yaratish"
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
 *                  example: "Kuryer orqali"
 *     responses:
 *       "201":
 *         description: "Delivery Method muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
delivery_method.post('/createDelivery_method', validateSchema(createValidationSchema), createDelivery_method)


/**
 * @swagger
 * /delivery_method/getDelivery_method:
 *   get:
 *     summary: "Delivery Method olish"
 *     tags: [Delivery Method]
 *     description: "Barcha Delivery Method larni olish"
 *     responses:
 *       "200":
 *         description: "Delivery Method muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
delivery_method.get('/getDelivery_method', getDelivery_method)


/**
 * @swagger
 * /delivery_method/getDelivery_methodById/{id}:
 *   get:
 *     summary: "Delivery Method ID bo'yicha olish"
 *     tags: [Delivery Method]
 *     description: "Delivery Method ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Delivery Method muvaffaqiyatli olindi"
 *       "404":
 *         description: "Delivery Method topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
delivery_method.get('/getDelivery_methodById/:id', getDelivery_methodById)


/**
 * @swagger
 * /delivery_method/deleteDelivery_method/{id}:
 *   delete:
 *     summary: "Delivery Method ID bo'yicha o'chirish"
 *     tags: [Delivery Method]
 *     description: "Delivery Method ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Delivery Method muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Delivery Method topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
delivery_method.delete('/deleteDelivery_method/:id', deleteDelivery_method)


/**
 * @swagger
 * /delivery_method/updateDelivery_methodById/{id}:
 *   put:
 *     summary: "Delivery Method yangilash"
 *     tags: [Delivery Method]
 *     description: "Delivery Method ID bo'yicha yangilash"
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
 *                 example: "Kuryer orqali"
 *     responses:
 *       "200":
 *         description: "Delivery Method muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Delivery Method topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
delivery_method.put('/updateDelivery_methodById/:id', validateSchema(updateValidationSchema), updateDelivery_method)


/**
 * @swagger
 * /delivery_method/searchDelivery_method:
 *   get:
 *     summary: "Delivery Method qidirish"
 *     tags: [Delivery Method]
 *     description: "Delivery Method ni nom bo'yicha qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Delivery Method muvaffaqiyatli topildi"
 *       "404":
 *         description: "Delivery Method topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
delivery_method.get('/searchDelivery_method', searchDelivery_method)

module.exports = {delivery_method}