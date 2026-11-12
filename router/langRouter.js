const { Router } = require("express")
const lang = Router();

const {
    createLang,
    getLang,
    getLangById,
    updateLang,
    deleteLang,
    searchLang
} = require('../controller/lang.controller')

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
} = require('../validation/langValidation');


/**
 * @swagger
 * tags:
 *   name: Lang
 *   description: "Lang ni boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /lang/createLang:
 *   post:
 *     summary: "Yangi Lang ro'yxatdan o'tkazish"
 *     tags: [Lang]
 *     description: "Yangi Lang yaratish"
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
 *                  example: "O'zbek tili"
 *     responses:
 *       "201":
 *         description: "Lang muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
lang.post('/createLang', validateSchema(createValidationSchema), createLang)


/**
 * @swagger
 * /lang/getLang:
 *   get:
 *     summary: "Lang olish"
 *     tags: [Lang]
 *     description: "Barcha Lang larni olish"
 *     responses:
 *       "200":
 *         description: "Lang muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
lang.get('/getLang', getLang)


/**
 * @swagger
 * /lang/getLangById/{id}:
 *   get:
 *     summary: "Lang ID bo'yicha olish"
 *     tags: [Lang]
 *     description: "Lang ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Lang muvaffaqiyatli olindi"
 *       "404":
 *         description: "Lang topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
lang.get('/getLangById/:id', getLangById)


/**
 * @swagger
 * /lang/deleteLang/{id}:
 *   delete:
 *     summary: "Lang ID bo'yicha o'chirish"
 *     tags: [Lang]
 *     description: "Lang ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Lang muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Lang topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
lang.delete('/deleteLang/:id', deleteLang)


/**
 * @swagger
 * /lang/updateLangById/{id}:
 *   put:
 *     summary: "Lang yangilash"
 *     tags: [Lang]
 *     description: "Lang ID bo'yicha yangilash"
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
 *                 example: "O'zbek tili"
 *     responses:
 *       "200":
 *         description: "Lang muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Lang topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
lang.put('/updateLangById/:id', validateSchema(updateValidationSchema), updateLang)


/**
 * @swagger
 * /lang/searchLang:
 *   get:
 *     summary: "Lang qidirish"
 *     tags: [Lang]
 *     description: "Lang ni nom bo'yicha qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Lang muvaffaqiyatli topildi"
 *       "404":
 *         description: "Lang topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
lang.get('/searchLang', searchLang)

module.exports = {lang}