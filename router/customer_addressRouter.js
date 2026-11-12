const { Router } = require("express")
const customer_address = Router();

const { createCustomer_address, getCustomer_address, getCustomer_addressById, updateCustomer_address, deleteCustomer_address, searchCustomer_address } = require('../controller/customer_address.controller')

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
} = require('../validation/customer_addressValidation');

/**
 * @swagger
 * tags:
 *   name: Customer_address
 *   description: "Customer_address boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /customer_address/createCustomer_address:
 *   post:
 *     summary: "Yangi Customer_address ro'yxatdan o'tgazish"
 *     tags: [Customer_address]
 *     description: "Yangi Customer_address yaratish"
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
 *               region_id:
 *                 type: string
 *               destrict_id:
 *                 type: string
 *               street:
 *                 type: string
 *               house:
 *                 type: string
 *               flat:
 *                 type: number
 *               location:
 *                 type: string
 *               post_index:
 *                 type: string
 *               info:
 *                 type: string
 *     responses:
 *       "201":
 *         description: "Customer_address muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
customer_address.post('/createCustomer_address', validateSchema(createValidationSchema), createCustomer_address)

/**
 * @swagger
 * /customer_address/getCustomer_address:
 *   get:
 *     summary: "Customer_address olish"
 *     tags: [Customer_address]
 *     description: "Customer_address olish"
 *     responses:
 *       "200":
 *         description: "Customer_address muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
customer_address.get('/getCustomer_address', getCustomer_address)

/**
 * @swagger
 * /customer_address/getCustomer_addressById/{id}:
 *   get:
 *     summary: "Customer_address ID bo'yicha olish"
 *     tags: [Customer_address]
 *     description: "Customer_address ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Customer_address muvaffaqiyatli olindi"
 *       "404":
 *         description: "Customer_address topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
customer_address.get('/getCustomer_addressById/:id', getCustomer_addressById)

/**
 * @swagger
 * /customer_address/deleteCustomer_address/{id}:
 *   delete:
 *     summary: "Customer_address ID bo'yicha o'chirish"
 *     tags: [Customer_address]
 *     description: "Customer_address ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Customer_address muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Customer_address topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
customer_address.delete('/deleteCustomer_address/:id', deleteCustomer_address)

/**
 * @swagger
 * /customer_address/updateCustomer_addressById/{id}:
 *   put:
 *     summary: "Customer_address yangilash"
 *     tags: [Customer_address]
 *     description: "Customer_address ID bo'yicha yangilash"
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
 *               region_id:
 *                 type: string
 *               destrict_id:
 *                 type: string
 *               street:
 *                 type: string
 *               house:
 *                 type: string
 *               flat:
 *                 type: number
 *               location:
 *                 type: string
 *               post_index:
 *                 type: string
 *               info:
 *                 type: string
 *     responses:
 *       "200":
 *         description: "Customer_address muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Customer_address topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
customer_address.put('/updateCustomer_addressById/:id', validateSchema(updateValidationSchema), updateCustomer_address)

/**
 * @swagger
 * /customer_address/searchCustomer_address:
 *   get:
 *     summary: "Customer_address qidirish"
 *     tags: [Customer_address]
 *     description: "Customer_address qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Customer_address muvaffaqiyatli topildi"
 *       "404":
 *         description: "Customer_address topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
customer_address.get('/searchCustomer_address', searchCustomer_address)

module.exports = { customer_address }