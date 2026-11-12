const { Router } = require('express');
const venue_photos = Router();

const {
    createVenue_photo,
    getVenue_photo,
    getVenue_photoById,
    updateVenue_photo,
    deleteVenue_photo,
    searchVenue_photo
} = require("../controller/venue_photo.controller")

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
} = require("../validation/venue_photoValidation")

/**
 * @swagger
 * tags:
 *   name: VenuePhoto
 *   description: VenuePhoto boshqarish uchun API endpointlari
 */


/**
 * @swagger
 * /venue_photos/createVenue_photo:
 *   post:
 *     summary: Yangi VenuePhoto ro'yxatdan o'tkazish
 *     tags: [VenuePhoto]
 *     description: Yangi VenuePhoto yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venue_id:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       '201':
 *         description: VenuePhoto muvaffaqiyatli ro'yxatdan o'tdi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatolari
 *       '500':
 *         description: Server xatosi
 */
venue_photos.post("/createVenue_photo", validateSchema(createValidationSchema), createVenue_photo);


/**
 * @swagger
 * /venue_photos/getVenue_photo:
 *   get:
 *     summary: Barcha VenuePhoto olish
 *     tags: [VenuePhoto]
 *     description: Barcha VenuePhoto olish
 *     responses:
 *       '200':
 *         description: Barcha VenuePhoto muvaffaqiyatli olindi
 *       '500':
 *         description: Server xatosi
 */
venue_photos.get("/getVenue_photo", getVenue_photo);


/**
 * @swagger
 * /venue_photos/getVenue_photoById/{id}:
 *   get:
 *     summary: VenuePhoto ID bo'yicha olish
 *     tags: [VenuePhoto]
 *     description: VenuePhoto ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: VenuePhoto ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: VenuePhoto muvaffaqiyatli olindi
 *       '404':
 *         description: VenuePhoto topilmadi
 *       '500':
 *         description: Server xatosi
 */
venue_photos.get("/getVenue_photoById/:id", getVenue_photoById);


/**
 * @swagger
 * /venue_photos/updateVenue_photoById/{id}:
 *   put:
 *     summary: VenuePhoto yangilash
 *     tags: [VenuePhoto]
 *     description: VenuePhoto ID bo'yicha yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Yangilanadigan VenuePhoto ID si
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
 *               url:
 *                 type: string
 *     responses:
 *       '200':
 *         description: VenuePhoto muvaffaqiyatli yangilandi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatolari
 *       '404':
 *         description: VenuePhoto topilmadi
 *       '500':
 *         description: Server xatosi
 */
venue_photos.put("/updateVenue_photoById/:id", validateSchema(updateValidationSchema), updateVenue_photo);


/**
 * @swagger
 * /venue_photos/deleteVenue_photo/{id}:
 *   delete:
 *     summary: VenuePhoto ID bo'yicha o'chirish
 *     tags: [VenuePhoto]
 *     description: VenuePhoto ID bo'yicha o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan VenuePhoto ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: VenuePhoto muvaffaqiyatli o'chirildi
 *       '404':
 *         description: VenuePhoto topilmadi
 *       '500':
 *         description: Server xatosi
 */
venue_photos.delete("/deleteVenue_photo/:id", deleteVenue_photo);


/**
 * @swagger
 * /venue_photos/searchVenue_photo:
 *   get:
 *     summary: VenuePhoto qidirish
 *     tags: [VenuePhoto]
 *     description: VenuePhoto ni url bo'yicha qidirish
 *     parameters:
 *       - in: query
 *         name: query
 *         description: Qidiruv so'zi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: VenuePhoto muvaffaqiyatli topildi
 *       '400':
 *         description: Qidiruv so'zi kiritilmagan
 *       '404':
 *         description: VenuePhoto topilmadi
 *       '500':
 *         description: Server xatosi
 */
venue_photos.get("/searchVenue_photo", searchVenue_photo);

module.exports = { venue_photos };