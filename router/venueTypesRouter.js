const { Router } = require('express');
const venue_types = Router();

const {postVenueTypes, getVenueTypesById,getVenueTypes,deleteVenueTypes
} = require("../controller/venueTypes.controller")

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
    postValidateSchema
} = require("../validation/venueTypesValidation")


/**
 * @swagger
 * tags:
 *   name: VenueTypes
 *   description: VenueTypes boshqarish uchun API endpointlari
 */


/**
 * @swagger
 * /venue_types/postVenue_Types:
 *   post:
 *     summary: Yangi VenueTypes ro'yxatdan o'tkazish
 *     tags: [VenueTypes]
 *     description: Yangi VenueTypes yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venue_id:
 *                 type: string
 *               types_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: VenueTypes muvaffaqiyatli ro'yxatdan o'tdi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatolari
 *       '500':
 *         description: Server xatosi
 */
venue_types.post("/postVenue_Types", validateSchema(postValidateSchema), postVenueTypes);


/**
 * @swagger
 * /venue_types/getVenue_Types:
 *   get:
 *     summary: Barcha VenueTypes olish
 *     tags: [VenueTypes]
 *     description: Barcha VenueTypes olish
 *     responses:
 *       '200':
 *         description: Barcha VenueTypes muvaffaqiyatli olindi
 *       '500':
 *         description: Server xatosi
 */
venue_types.get("/getVenue_Types", getVenueTypes);


/**
 * @swagger
 * /venue_types/getVenue_TypesById/{id}:
 *   get:
 *     summary: VenueTypes ID bo'yicha olish
 *     tags: [VenueTypes]
 *     description: VenueTypes ID bo'yicha olish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: VenueTypes ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: VenueTypes muvaffaqiyatli olindi
 *       '404':
 *         description: VenueTypes topilmadi
 *       '500':
 *         description: Server xatosi
 */
venue_types.get("/getVenue_TypesById/:id", getVenueTypesById);


/**
 * @swagger
 * /venue_types/deletVenue_Types/{id}:
 *   delete:
 *     summary: VenueTypes ID bo'yicha o'chirish
 *     tags: [VenueTypes]
 *     description: VenueTypes ID bo'yicha o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan VenueTypes ID si
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: VenueTypes muvaffaqiyatli o'chirildi
 *       '404':
 *         description: VenueTypes topilmadi
 *       '500':
 *         description: Server xatosi
 */
venue_types.delete("/deleteVenue_Types/:id", deleteVenueTypes);

module.exports = { venue_types };