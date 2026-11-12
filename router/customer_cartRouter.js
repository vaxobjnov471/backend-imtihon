const { Router } = require("express")
const customer_cart = Router();

const { createCustomer_cart, getCustomer_cart, getCustomer_cartById, updateCustomer_cart, deleteCustomer_cart, searchCustomer_cart } = require('../controller/customer_cart.controller')

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
} = require('../validation/customer_cartValidation');

/**
 * @swagger
 * tags:
 *   name: Customer_cart
 *   description: "Customer_cart boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /customer_cart/createCustomer_cart:
 *   post:
 *     summary: "Yangi Customer_cart ro'yxatdan o'tgazish"
 *     tags: [Customer_cart]
 *     description: "Yangi Customer_cart yaratish"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               number:
 *                 type: string
 *               year:
 *                 type: string
 *               month:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_main:
 *                 type: boolean
 *     responses:
 *       "201":
 *         description: "Customer_cart muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
customer_cart.post('/createCustomer_cart', validateSchema(createValidationSchema), createCustomer_cart)

/**
 * @swagger
 * /customer_cart/getCustomer_cart:
 *   get:
 *     summary: "Customer_cart olish"
 *     tags: [Customer_cart]
 *     description: "Customer_cart olish"
 *     responses:
 *       "200":
 *         description: "Customer_cart muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
customer_cart.get('/getCustomer_cart', getCustomer_cart)

/**
 * @swagger
 * /customer_cart/getCustomer_cartById/{id}:
 *   get:
 *     summary: "Customer_cart ID bo'yicha olish"
 *     tags: [Customer_cart]
 *     description: "Customer_cart ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Customer_cart muvaffaqiyatli olindi"
 *       "404":
 *         description: "Customer_cart topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
customer_cart.get('/getCustomer_cartById/:id', getCustomer_cartById)

/**
 * @swagger
 * /customer_cart/deleteCustomer_cart/{id}:
 *   delete:
 *     summary: "Customer_cart ID bo'yicha o'chirish"
 *     tags: [Customer_cart]
 *     description: "Customer_cart ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Customer_cart muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Customer_cart topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
customer_cart.delete('/deleteCustomer_cart/:id', deleteCustomer_cart)

/**
 * @swagger
 * /customer_cart/updateCustomer_cartById/{id}:
 *   put:
 *     summary: "Customer_cart yangilash"
 *     tags: [Customer_cart]
 *     description: "Customer_cart ID bo'yicha yangilash"
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
 *               phone:
 *                 type: string
 *               number:
 *                 type: string
 *               year:
 *                 type: string
 *               month:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_main:
 *                 type: boolean
 *     responses:
 *       "200":
 *         description: "Customer_cart muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Customer_cart topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
customer_cart.put('/updateCustomer_cartById/:id', validateSchema(updateValidationSchema), updateCustomer_cart)

/**
 * @swagger
 * /customer_cart/searchCustomer_cart:
 *   get:
 *     summary: "Customer_cart qidirish"
 *     tags: [Customer_cart]
 *     description: "Customer_cart qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Customer_cart muvaffaqiyatli topildi"
 *       "404":
 *         description: "Customer_cart topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
customer_cart.get('/searchCustomer_cart', searchCustomer_cart)

module.exports = { customer_cart }