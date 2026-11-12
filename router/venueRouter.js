const { Router } = require('express');
const venues = Router();

const {
    createVenue, getVenue, getVenueById, updateVenue, deleteVenue, searchVenue } = require("../controller/venue.controller")


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
} = require("../validation/venueValidation")



/**
 * @swagger
 * tags:
 *   name: Venue
 *   description: Venue boshqarish uchun API endpointlari
 */


/**
 * @swagger
 * /venues/createVenue:
 *   post:
 *     summary: Yangi Venue ro'yxatdan o'tkazish
 *     tags: [Venue]
 *     description: Yangi Venue yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               location:
 *                 type: string
 *               site:
 *                 type: string
 *               phone:
 *                 type: string
 *               region_id:
 *                 type: string
 *               destrict_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Venue muvaffaqiyatli ro'yxatdan o'tdi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatolari
 *       '500':
 *         description: Server xatosi
 */
venues.post("/createVenue", validateSchema(createValidationSchema), createVenue);


/**
 * @swagger
 * /venues/getVenue:
 *   get:
 *     summary: Barcha Venue olish
 *     tags: [Venue]
 *     description: Barcha Venue olish
 *     responses:
 *       '200':
 *         description: Barcha Venue muvaffaqiyatli olindi
 *       '500':
 *         description: Server xatosi
 */
venues.get("/getVenue", getVenue);


/**
 * @swagger
 * /venues/getVenueById/{id}:
 *   get:
 *     summary: Venue ID bo'yicha olish
 *     tags: [Venue]
 *     description: Venue ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Venue ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Venue muvaffaqiyatli olindi
 *       '404':
 *         description: Venue topilmadi
 *       '500':
 *         description: Server xatosi
 */
venues.get("/getVenueById/:id", getVenueById);


/**
 * @swagger
 * /venues/updateVenueById/{id}:
 *   put:
 *     summary: Venue yangilash
 *     tags: [Venue]
 *     description: Venue ID bo'yicha yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Yangilanadigan Venue ID si
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
 *                 type: string\\
 *               address:
 *                 type: string
 *               location:
 *                 type: string
 *               site:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Venue muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatolari
 *       '404':
 *         description: Venue topilmadi
 *       '500':
 *         description: Server xatosi
 */
venues.put("/updateVenueById/:id", validateSchema(updateValidationSchema), updateVenue);


/**
 * @swagger
 * /venues/deleteVenue/{id}:
 *   delete:
 *     summary: Venue ID bo'yicha o'chirish
 *     tags: [Venue]
 *     description: Venue ID bo'yicha o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan Venue ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Venue muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Venue topilmadi
 *       '500':
 *         description: Server xatosi
 */
venues.delete("/deleteVenue/:id", deleteVenue);


/**
 * @swagger
 * /venues/searchVenue:
 *   get:
 *     summary: Venue qidirish
 *     tags: [Venue]
 *     description: Venue ni nom yoki manzil bo'yicha qidirish
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidiruv so'zi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Venue muvaffaqiyatli topildi
 *       '400':
 *         description: Qidiruv so'zi kiritilmagan
 *       '404':
 *         description: Venue topilmadi
 *       '500':
 *         description: Server xatosi
 */
venues.get("/searchVenue", searchVenue);

module.exports = { venues };