const { Router } = require("express")
const region = Router();

const {
    createRegion,
    getRegion,
    getRegionById,
    updateRegion,
    deleteRegion,
    searchRegion
} = require('../controller/region.controller')

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
} = require('../validation/regionValidation');


/**
 * @swagger
 * tags:
 *   name: Region
 *   description: "Region ni boshqarish uchun API endpointlar"
 */

/**
 * @swagger
 * /region/createRegion:
 *   post:
 *     summary: "Yangi Region ro'yxatdan o'tkazish"
 *     tags: [Region]
 *     description: "Yangi Region yaratish"
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
 *                  example: "Toshkent viloyati"
 *     responses:
 *       "201":
 *         description: "Region muvaffaqiyatli ro'yxatdan o'tdi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "500":
 *         description: "Server xatosi"
 */
region.post('/createRegion', validateSchema(createValidationSchema), createRegion)


/**
 * @swagger
 * /region/getRegion:
 *   get:
 *     summary: "Region olish"
 *     tags: [Region]
 *     description: "Barcha Region larni olish"
 *     responses:
 *       "200":
 *         description: "Region muvaffaqiyatli olindi"
 *       "500":
 *         description: "Server xatosi"
 */
region.get('/getRegion', getRegion)


/**
 * @swagger
 * /region/getRegionById/{id}:
 *   get:
 *     summary: "Region ID bo'yicha olish"
 *     tags: [Region]
 *     description: "Region ID bo'yicha olish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Region muvaffaqiyatli olindi"
 *       "404":
 *         description: "Region topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
region.get('/getRegionById/:id', getRegionById)


/**
 * @swagger
 * /region/deleteRegion/{id}:
 *   delete:
 *     summary: "Region ID bo'yicha o'chirish"
 *     tags: [Region]
 *     description: "Region ID bo'yicha o'chirish"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Region muvaffaqiyatli o'chirildi"
 *       "404":
 *         description: "Region topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
region.delete('/deleteRegion/:id', deleteRegion)


/**
 * @swagger
 * /region/updateRegionById/{id}:
 *   put:
 *     summary: "Region yangilash"
 *     tags: [Region]
 *     description: "Region ID bo'yicha yangilash"
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
 *                 example: "Toshkent viloyati"
 *     responses:
 *       "200":
 *         description: "Region muvaffaqiyatli yangilandi"
 *       "400":
 *         description: "Yomon so'rov, validatsiya xatolari"
 *       "404":
 *         description: "Region topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
region.put('/updateRegionById/:id', validateSchema(updateValidationSchema), updateRegion)


/**
 * @swagger
 * /region/searchRegion:
 *   get:
 *     summary: "Region qidirish"
 *     tags: [Region]
 *     description: "Region ni nom bo'yicha qidirish"
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: "Region muvaffaqiyatli topildi"
 *       "404":
 *         description: "Region topilmadi"
 *       "500":
 *         description: "Server xatosi"
 */
region.get('/searchRegion', searchRegion)

module.exports = {region}