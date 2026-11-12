const { Router } = require("express")
const types = Router();

const { createTypes,getTypes,getTypesById,updateTypes,deleteTypes,searchTypes} = require('../controller/types.controller')

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
} = require('../validation/typesValidation');


/**
 * @swagger
 * tags:
 *   name: Types
 *   description: "Ismlarni boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /types/createTypes:
 *   post:
 *     summary: "Yangi Ism ro'yxatdan o'tgazish"
 *     tags: [Types]
 *     description: "Yangi Ism yaratish"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                  type: string
 *     responses:
 *       "201":
 *         description: "Ism muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
types.post('/createTypes', validateSchema(createValidationSchema), createTypes)


/**
 * @swagger
 * /types/getTypes:
 *   get:
 *     summary: "Ism olish"
 *     tags: [Types]
 *     description: "Ism olish"
 *     responses:
 *       "200":
 *         description: "Ism muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
types.get('/getTypes', getTypes)


/**
 * @swagger
 * /types/getTypesById/{id}:
 *   get:
 *     summary: "Ism ID bo'yicha olish"
 *     tags: [Types]
 *     description: "Ism ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Ism muvaffaqiyatli olindi"
 *       "404":
 *         description: "Ism topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
types.get('/getTypesById/:id', getTypesById)


/**
 * @swagger
 * /types/deleteTypes/{id}:
 *   delete:
 *     summary: "Ism ID bo'yicha o'chirish"
 *     tags: [Types]
 *     description: "Ism ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Ism muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Ism topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
types.delete('/deleteTypes/:id', deleteTypes)



/**
 * @swagger
 * /types/updateTypesById/{id}:
 *   put:
 *     summary: "Ism yangilash"
 *     tags: [Types]
 *     description: "Ism ID bo'yicha yangilash"
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
 *     responses:
 *       "200":
 *         description: "Ism muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Ism topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
types.put('/updateTypesById/:id', validateSchema(updateValidationSchema), updateTypes)

/**
 * @swagger
 * /types/searchTypes:
 *   get:
 *     summary: "Ism qidirish"
 *     tags: [Types]
 *     description: "Ism qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Ism muvaffaqiyatli topildi"
 *       "404":
 *         description: "Ism topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
types.get('/searchTypes', searchTypes)

module.exports = {types}


