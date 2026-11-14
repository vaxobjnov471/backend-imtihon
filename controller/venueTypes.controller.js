const {VenueTypes} = require('../model/venue_typesSchema')

const postVenueTypes = async (req, res) => {
    try {
        const {
            venue_id,
            types_id,
        } = req.body;
        const existingVenueTypes = await VenueTypes.findOne({ venue_id, types_id});
        console.log(existingVenueTypes)
        if (existingVenueTypes) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yhatdan otgan Id  mavjud",
            })
        }else {
            const newVenueTypes = new VenueTypes({
                venue_id,
                types_id
            })
            await newVenueTypes.save();

            return res.status(201).json({
                success: true,
                message: "Id muvaffaqiyatli ro'yxatdan o'tdi",
                VenueTypes: newVenueTypes,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message,
        });
    }
}

// --------get VenueTypes .................


const getVenueTypes = async (req, res) => {
    try {
        const VenueTypes = await VenueTypes.find({});
        res.json({
            success: true,
            message: 'barcha Id royxati olingan',
            innerData: VenueTypes
        });
    } catch (error) {
        console.error("Error fetching Id:", error);
        res.status(500).json({
            success: false,
            message: 'Serverda xatosi: Id olishda xatolik yuz berdi',

        });
    }
}

// ---------------- getVenueTypesById---------

const getStuff_RoleById = async (req, res) => {
    try {
        const VenueTypesId = req.params.id;

        const venueTypes = await VenueTypes.findById(VenueTypesId).populate("types_id, venue_id")

        if (!venueTypes) {
            return res.status(404).json({ message: "VenueTypes not faund" });
        }
        return res.status(200).json({ message: "VenueTypes faund", venueTypes });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
};

// --------- deleteVenueTypes
const deleteVenueTypes = async (req, res) => {
    try {
        const VenueTypesId = req.params.id;

        const deletedVenueTypes = await VenueTypes.findByIdAndDelete(VenueTypesId);

       if (!deletedVenueTypes) {
            return res.status(404).json({ message: "VenueTypes not found" });
        }   

        res.json({ message: "VenueTypes deleted successfully", deleteVenueTypes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
       
};

module.exports = {postVenueTypes, getStuff_RoleById,getVenueTypes,deleteVenueTypes}