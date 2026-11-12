const { Router } = require('express');
const cart_items = Router();

const {
    createcart_Item,
    getcart_Item,
    getcart_ItemById,
    deletecart_Item,
} = require("../controller/cart_item.controller")

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
} = require("../validation/cart_itemValidation")

/**
 * @swagger
 * tags:
 *   name: CartItem
 *   description: CartItem boshqarish uchun API endpointlari
 */


/**
 * @swagger
 * /cart_items/createcart_Item:
 *   post:
 *     summary: Yangi CartItem ro'yxatdan o'tkazish
 *     tags: [CartItem]
 *     description: Yangi CartItem yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              ticket_id:
 *                type: string
 *              cart_id:
 *                type: string
 *     responses:
 *       '201':
 *         description: CartItem muvaffaqiyatli ro'yxatdan o'tdi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatolari
 *       '500':
 *         description: Server xatosi
 */
cart_items.post("/createcart_Item", validateSchema(createValidationSchema), createcart_Item);


/**
 * @swagger
 * /cart_items/getcart_Item:
 *   get:
 *     summary: Barcha CartItem olish
 *     tags: [CartItem]
 *     description: Barcha CartItem olish
 *     responses:
 *       '200':
 *         description: Barcha CartItem muvaffaqiyatli olindi
 *       '500':
 *         description: Server xatosi
 */
cart_items.get("/getcart_Item", getcart_Item);


/**
 * @swagger
 * /cart_items/getcart_ItemById/{id}:
 *   get:
 *     summary: CartItem ID bo'yicha olish
 *     tags: [CartItem]
 *     description: CartItem ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: CartItem ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: CartItem muvaffaqiyatli olindi
 *       '404':
 *         description: CartItem topilmadi
 *       '500':
 *         description: Server xatosi
 */
cart_items.get("/getcart_ItemById/:id", getcart_ItemById);

/**
 * @swagger
 * /cart_items/deletecart_Item/{id}:
 *   delete:
 *     summary: CartItem ID bo'yicha o'chirish
 *     tags: [CartItem]
 *     description: CartItem ID bo'yicha o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan CartItem ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: CartItem muvaffaqiyatli o'chirildi
 *       '404':
 *         description: CartItem topilmadi
 *       '500':
 *         description: Server xatosi
 */
cart_items.delete("/deletecart_Item/:id", deletecart_Item);

module.exports = { cart_items };