const { Router } = require("express")
const customer = Router();

const { createCustomer, getCustomer, getCustomerById, updateCustomer, deleteCustomer, searchCustomer } = require('../controller/customer.controller')

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
} = require('../validation/customerValidation');

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: "Customer boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /customer/createCustomer:
 *   post:
 *     summary: "Yangi Customer ro'yxatdan o'tgazish"
 *     tags: [Customer]
 *     description: "Yangi Customer yaratish"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               email:
 *                 type: string
 *               birth_date:
 *                 type: string
 *               gender:
 *                 type: number
 *               lang_id:
 *                 type: string
 *               hashed_refresh_token:
 *                 type: string
 *     responses:
 *       "201":
 *         description: "Customer muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
customer.post('/createCustomer', validateSchema(createValidationSchema), createCustomer)

/**
 * @swagger
 * /customer/getCustomer:
 *   get:
 *     summary: "Customer olish"
 *     tags: [Customer]
 *     description: "Customer olish"
 *     responses:
 *       "200":
 *         description: "Customer muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
customer.get('/getCustomer', getCustomer)

/**
 * @swagger
 * /customer/getCustomerById/{id}:
 *   get:
 *     summary: "Customer ID bo'yicha olish"
 *     tags: [Customer]
 *     description: "Customer ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Customer muvaffaqiyatli olindi"
 *       "404":
 *         description: "Customer topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
customer.get('/getCustomerById/:id', getCustomerById)

/**
 * @swagger
 * /customer/deleteCustomer/{id}:
 *   delete:
 *     summary: "Customer ID bo'yicha o'chirish"
 *     tags: [Customer]
 *     description: "Customer ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Customer muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Customer topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
customer.delete('/deleteCustomer/:id', deleteCustomer)

/**
 * @swagger
 * /customer/updateCustomerById/{id}:
 *   put:
 *     summary: "Customer yangilash"
 *     tags: [Customer]
 *     description: "Customer ID bo'yicha yangilash"
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
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               email:
 *                 type: string
 *               birth_date:
 *                 type: string
 *               gender:
 *                 type: number
 *               hashed_refresh_token:
 *                 type: string
 *     responses:
 *       "200":
 *         description: "Customer muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Customer topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
customer.put('/updateCustomerById/:id', validateSchema(updateValidationSchema), updateCustomer)

/**
 * @swagger
 * /customer/searchCustomer:
 *   get:
 *     summary: "Customer qidirish"
 *     tags: [Customer]
 *     description: "Customer qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Customer muvaffaqiyatli topildi"
 *       "404":
 *         description: "Customer topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
customer.get('/searchCustomer', searchCustomer)

module.exports = { customer }