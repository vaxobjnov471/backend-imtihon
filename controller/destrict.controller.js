const { Destrict } = require('../model/destrictSchema')

// -------- create Destrict --------

const createDestrict = async (req, res) => {
    try {
        const { name, region_id } = req.body;

        const existingDestrict = await Destrict.findOne({ name, });
        if (existingDestrict) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yxatdan o'tgan Destrict mavjud",
            });
        }

        const newDestrict = new Destrict({ name, region_id });
        await newDestrict.save();

        return res.status(201).json({
            success: true,
            message: "Destrict muvaffaqiyatli ro'yxatdan o'tdi",
            destrict: newDestrict,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message,
        });
    }
}

// -------- get Destrict --------

const getDestrict = async (req, res) => {
    try {
        const destricts = await Destrict.find({})
        res.json({
            success: true,
            message: "Barcha Destrict ro'yxati olindi",
            innerData: destricts,
        });
    } catch (error) {
        console.error("Error fetching Destrict:", error);
        res.status(500).json({
            success: false,
            message: "Serverda xatosi: Destrict olishda xatolik yuz berdi",
            error: error.message,
        });
    }
}

// -------- getDestrictById --------

const getDestrictById = async (req, res) => {
    try {
        const destrictId = req.params.id;

        const destrict = await Destrict.findById(destrictId).populate('region_id');

        if (!destrict) {
            return res.status(404).json({
                success: false,
                message: "Destrict topilmadi",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Destrict topildi",
            destrict,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message,
        });
    }
};

// -------- updateDestrict --------

const updateDestrict = async (req, res) => {
    try {
        const destrictId = req.params.id;
        const { name, region_id } = req.body;

        const updatedDestrict = await Destrict.findByIdAndUpdate(
            destrictId,
            { name, region_id },
            { new: true, runValidators: true }
        )

        if (!updatedDestrict) {
            return res.status(404).json({
                success: false,
                message: "Destrict topilmadi",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Destrict muvaffaqiyatli yangilandi",
            destrict: updatedDestrict,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message,
        });
    }
};

// -------- deleteDestrict --------

const deleteDestrict = async (req, res) => {
    try {
        const destrictId = req.params.id;

        const deletedDestrict = await Destrict.findByIdAndDelete(destrictId);

        if (!deletedDestrict) {
            return res.status(404).json({
                success: false,
                message: "Destrict topilmadi",
            });
        }

        res.json({
            success: true,
            message: "Destrict muvaffaqiyatli o'chirildi",
            destrict: deletedDestrict,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message,
        });
    }
};

// -------- searchDestrict --------

const searchDestrict = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Qidiruv so'zi (query) kiritilmagan",
            });
        }


        const destricts = await Destrict.find({
            name: { $regex: query, $options: 'i' },
        })

        if (destricts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Destrict topilmadi",
            });
        }

        res.status(200).json({
            success: true,
            message: "Destrict muvaffaqiyatli topildi",
            innerData: destricts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message,
        });
    }
};

module.exports = {
    createDestrict,
    getDestrict,
    getDestrictById,
    updateDestrict,
    deleteDestrict,
    searchDestrict,
}