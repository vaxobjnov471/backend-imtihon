const { Router } = require('express');
const destricts = Router();

const {
    createDestrict,
    getDestrict,
    getDestrictById,
    updateDestrict,
    deleteDestrict,
    searchDestrict
} = require("../controller/destrict.controller")


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
} = require("../validation/destrictValidation")


/**
 * @swagger
 * tags:
 *   name: Destrict
 *   description: Destrict boshqarish uchun API endpointlari
 */


/**
 * @swagger
 * /destricts/createDestrict:
 *   post:
 *     summary: Yangi Destrict ro'yxatdan o'tkazish
 *     tags: [Destrict]
 *     description: Yangi Destrict yaratish
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
 *                 type: string
 *               region_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Destrict muvaffaqiyatli ro'yxatdan o'tdi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatolari
 *       '500':
 *         description: Server xatosi
 */
destricts.post("/createDestrict", validateSchema(createValidationSchema), createDestrict);


/**
 * @swagger
 * /destricts/getDestrict:
 *   get:
 *     summary: Barcha Destrict olish
 *     tags: [Destrict]
 *     description: Barcha Destrict olish
 *     responses:
 *       '200':
 *         description: Barcha Destrict muvaffaqiyatli olindi
 *       '500':
 *         description: Server xatosi
 */
destricts.get("/getDestrict", getDestrict);


/**
 * @swagger
 * /destricts/getDestrictById/{id}:
 *   get:
 *     summary: Destrict ID bo'yicha olish
 *     tags: [Destrict]
 *     description: Destrict ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Destrict ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Destrict muvaffaqiyatli olindi
 *       '404':
 *         description: Destrict topilmadi
 *       '500':
 *         description: Server xatosi
 */
destricts.get("/getDestrictById/:id", getDestrictById);


/**
 * @swagger
 * /destricts/updateDestrictById/{id}:
 *   put:
 *     summary: Destrict yangilash
 *     tags: [Destrict]
 *     description: Destrict ID bo'yicha yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Yangilanadigan Destrict ID si
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
 *     responses:
 *       '200':
 *         description: Destrict muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatolari
 *       '404':
 *         description: Destrict topilmadi
 *       '500':
 *         description: Server xatosi
 */
destricts.put("/updateDestrictById/:id", validateSchema(updateValidationSchema), updateDestrict);


/**
 * @swagger
 * /destricts/deleteDestrict/{id}:
 *   delete:
 *     summary: Destrict ID bo'yicha o'chirish
 *     tags: [Destrict]
 *     description: Destrict ID bo'yicha o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan Destrict ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Destrict muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Destrict topilmadi
 *       '500':
 *         description: Server xatosi
 */
destricts.delete("/deleteDestrict/:id", deleteDestrict);


/**
 * @swagger
 * /destricts/searchDestrict:
 *   get:
 *     summary: Destrict qidirish
 *     tags: [Destrict]
 *     description: Destrict ni nom bo'yicha qidirish
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidiruv so'zi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Destrict muvaffaqiyatli topildi
 *       '400':
 *         description: Qidiruv so'zi kiritilmagan
 *       '404':
 *         description: Destrict topilmadi
 *       '500':
 *         description: Server xatosi
 */
destricts.get("/searchDestrict", searchDestrict);

module.exports = { destricts };