const {Venue} = require("../model/venueSchema")



// ------------- createVenue -----
const createVenue = async (req,res) => {
    try {
        const {
            name,
            address,
            location,
            site,
            phone,
            region_id,
            destrict_id,
        } = req.body

        const existingVenue = await Venue.findOne({name, destrict_id})
        if (existingVenue) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bilan ro'yxatdan o'tgan Venue mavjud"
            })
        }else {
            const newVenue = new Venue({
                name,
                address,
                location,
                site,
                phone,
                region_id,
                destrict_id,
            })
            await newVenue.save();

            return res.status(201).json({
                success: true,
                message: "Venue muvaffaqiyatli ro'yxatdan o'tdi",
                venue: newVenue,
            })
        }

    }catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message,
        })

    }
}

// ------------getVenue --------


const getVenue  =  async (req, res) => {
     try {
            const venue = await Venue.find({})
            res.json({
                success: true,
                message: "Barcha Venue ro'yxati olindi",
                innerData: venue,
            })
        }catch (error) {
            console.error("Error fetching venue:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi: Venue olishda xatolik yuz berdi'

            })
    }
}

// ------ getVenueById ------

const getVenueById = async (req,res) => {
    try {
        const venueId =  req.params.id;

        const venue = await Venue.findById(venueId).populate("region_id destrict_id")

        if (!venue) {
            return res.status(404).json({ message: "Venue topilmadi"})

        }
        return res.status(200).json({message: "Venue topildi", venue})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"})
    }
}


// ------- delete Venue ------

const deleteVenue = async (req, res) =>{
    try {
        const venueId = req.params.id

        const deletedVenue =  await Venue.findByIdAndDelete(venueId)
        if (!deletedVenue) {
            return res.status(404).json({ message: "Venue topilmadi"})

        }
        res.json({message: "Venue muvaffaqiyatli o'chirildi", venue: deletedVenue})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Venue ---------

const updateVenue = async (req,res)=> {
    try {
        const {id} = req.params;
        const {
            name,
            address,
            location,
            site,
            phone,
            geometry,
        } = req.body;
        const updateData = {
            name,
            address,
            location,
            site,
            phone,
            geometry,
        }
        const updatedVenue = await Venue.findByIdAndUpdate(id, updateData, {
            new: true,
        })

        if (!updatedVenue) {
            return res.status(404).json({
                success: false,
                message: "Venue topilmadi"
            })
        }

        res.json({
            success: true,
            message: "Venue muvaffaqiyatli yangilandi",
            venue: updatedVenue
        })

    }catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

// ----------- search Venue -----------

const searchVenue = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv so'zini yozing"})

        }
        const result = await Venue.find({
            $or: [
                {name: {$regex: query, $options: "i"}},
                {address: {$regex: query, $options: "i"}}
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "Venue topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching venue", error);
        res.status(500).json({message: "Server error: Failed to fetch venue"})

    }
}


module.exports = {
    createVenue,
    getVenue,
    getVenueById,
    deleteVenue,
    updateVenue,
    searchVenue
}