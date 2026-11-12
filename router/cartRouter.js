const { Router } = require("express")
const cart = Router();

const { createCart, getCart, getCartById, updateCart, deleteCart,  } = require('../controller/cart.controller')

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
} = require('../validation/cartValidation');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: "Cart boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /cart/createCart:
 *   post:
 *     summary: "Yangi Cart ro'yxatdan o'tgazish"
 *     tags: [Cart]
 *     description: "Yangi Cart yaratish"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *               createdAt:
 *                 type: string
 *               finishedAt:
 *                 type: string
 *               status_id:
 *                 type: string
 *     responses:
 *       "201":
 *         description: "Cart muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
cart.post('/createCart', validateSchema(createValidationSchema), createCart)

/**
 * @swagger
 * /cart/getCart:
 *   get:
 *     summary: "Cart olish"
 *     tags: [Cart]
 *     description: "Cart olish"
 *     responses:
 *       "200":
 *         description: "Cart muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
cart.get('/getCart', getCart)

/**
 * @swagger
 * /cart/getCartById/{id}:
 *   get:
 *     summary: "Cart ID bo'yicha olish"
 *     tags: [Cart]
 *     description: "Cart ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Cart muvaffaqiyatli olindi"
 *       "404":
 *         description: "Cart topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
cart.get('/getCartById/:id', getCartById)

/**
 * @swagger
 * /cart/deleteCart/{id}:
 *   delete:
 *     summary: "Cart ID bo'yicha o'chirish"
 *     tags: [Cart]
 *     description: "Cart ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Cart muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Cart topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
cart.delete('/deleteCart/:id', deleteCart)

/**
 * @swagger
 * /cart/updateCartById/{id}:
 *   put:
 *     summary: "Cart yangilash"
 *     tags: [Cart]
 *     description: "Cart ID bo'yicha yangilash"
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
 *               createdAt:
 *                 type: string
 *               finishedAt:
 *                 type: string
 *     responses:
 *       "200":
 *         description: "Cart muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Cart topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
cart.put('/updateCartById/:id', validateSchema(updateValidationSchema), updateCart)



module.exports = { cart }