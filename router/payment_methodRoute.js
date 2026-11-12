const { Router } = require("express")
const payment_method = Router();

const {
    createPayment_method,
    getPayment_method,
    getPayment_methodById,
    updatePayment_method,
    deletePayment_method,
    searchPayment_method
} = require('../controller/payment_method.controller')

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
} = require('../validation/payment_method');


/**
 * @swagger
 * tags:
 *   name: Payment Method
 *   description: "Payment Method ni boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /payment_method/createPayment_method:
 *   post:
 *     summary: "Yangi Payment Method ro'yxatdan o'tkazish"
 *     tags: [Payment Method]
 *     description: "Yangi Payment Method yaratish"
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
 *                  example: "Naqd pul"
 *     responses:
 *       "201":
 *         description: "Payment Method muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
payment_method.post('/createPayment_method', validateSchema(createValidationSchema), createPayment_method)


/**
 * @swagger
 * /payment_method/getPayment_method:
 *   get:
 *     summary: "Payment Method olish"
 *     tags: [Payment Method]
 *     description: "Barcha Payment Method larni olish"
 *     responses:
 *       "200":
 *         description: "Payment Method muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
payment_method.get('/getPayment_method', getPayment_method)


/**
 * @swagger
 * /payment_method/getPayment_methodById/{id}:
 *   get:
 *     summary: "Payment Method ID bo'yicha olish"
 *     tags: [Payment Method]
 *     description: "Payment Method ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Payment Method muvaffaqiyatli olindi"
 *       "404":
 *         description: "Payment Method topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
payment_method.get('/getPayment_methodById/:id', getPayment_methodById)


/**
 * @swagger
 * /payment_method/deletePayment_method/{id}:
 *   delete:
 *     summary: "Payment Method ID bo'yicha o'chirish"
 *     tags: [Payment Method]
 *     description: "Payment Method ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Payment Method muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Payment Method topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
payment_method.delete('/deletePayment_method/:id', deletePayment_method)


/**
 * @swagger
 * /payment_method/updatePayment_methodById/{id}:
 *   put:
 *     summary: "Payment Method yangilash"
 *     tags: [Payment Method]
 *     description: "Payment Method ID bo'yicha yangilash"
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
 *                 example: "Naqd pul"
 *     responses:
 *       "200":
 *         description: "Payment Method muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Payment Method topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
payment_method.put('/updatePayment_methodById/:id', validateSchema(updateValidationSchema), updatePayment_method)


/**
 * @swagger
 * /payment_method/searchPayment_method:
 *   get:
 *     summary: "Payment Method qidirish"
 *     tags: [Payment Method]
 *     description: "Payment Method ni nom bo'yicha qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Payment Method muvaffaqiyatli topildi"
 *       "404":
 *         description: "Payment Method topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
payment_method.get('/searchPayment_method', searchPayment_method)

module.exports = {payment_method}