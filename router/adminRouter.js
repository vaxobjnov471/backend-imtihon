const { Router } = require("express");
const admin = Router();

const { createAdmin, deleteAdmin, getAdmins, getAdminById, updateAdmin, searchAdmin, } = require("../controller/admin.controller");

const validateSchema = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }

    next();
};

const {
    createValidationSchema,
    updateValidationSchema,
} = require("../validation/adminValidation");

/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Adminlarni boshqarish uchun API endpointlari
 */

/**
 * @swagger
 * /admin/postAdmin:
 *   post:
 *     summary: Yangi admin yaratish
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               login:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_creator:
 *                 type: boolean
 *               hashed_refresh_token:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Admin muvaffaqiyatli yaratildi
 *       '400':
 *         description: Validation xatosi
 *       '500':
 *         description: Server xatosi
 */
admin.post("/postAdmin", validateSchema(createValidationSchema), createAdmin );

/**
 * @swagger
 * /admin/getAdmins:
 *   get:
 *     summary: Barcha adminlarni olish
 *     tags: [Admin]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli
 *       '500':
 *         description: Server xatosi
 */
admin.get("/getAdmins", getAdmins);

/**
 * @swagger
 * /admin/getAdminById/{id}:
 *   get:
 *     summary: ID orqali adminni olish
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Admin topildi
 *       '404':
 *         description: Admin topilmadi
 *       '500':
 *         description: Server xatosi
 */
admin.get("/getAdminById/:id", getAdminById);

/**
 * @swagger
 * /admin/updateAdmin/{id}:
 *   put:
 *     summary: Adminni yangilash
 *     tags: [Admin]
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
 *               login:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_creator:
 *                 type: boolean
 *               hashed_refresh_token:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Admin muvaffaqiyatli yangilandi
 *       '404':
 *         description: Admin topilmadi
 *       '500':
 *         description: Server xatosi
 */
admin.put("/updateAdmin/:id", validateSchema(updateValidationSchema), updateAdmin );

/**
 * @swagger
 * /admin/searchAdmin:
 *   get:
 *     summary: Admin qidirish
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Natijalar qaytarildi
 *       '500':
 *         description: Server xatosi
 */
admin.get("/searchAdmin", searchAdmin);

/**
 * @swagger
 * /admin/deleteAdmin/{id}:
 *   delete:
 *     summary: Adminni o'chirish
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Admin o'chirildi
 *       '404':
 *         description: Admin topilmadi
 *       '500':
 *         description: Server xatosi
 */
admin.delete("/deleteAdmin/:id", deleteAdmin);

module.exports = { admin };