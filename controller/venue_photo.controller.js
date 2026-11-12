const {venue_Photo} = require("../model/venue_photoSchema")



// ------------- createVenue_photo -----
const createVenue_photo = async (req,res) => {
    try {
        const {
            venue_id,
            url,
        } = req.body

        const existingVenue_photo = await venue_Photo.findOne({venue_id, url})
        if (existingVenue_photo) {
            return res.status(400).json({
                success: false,
                message: "Bu Venue uchun bunday rasm allaqachon mavjud"
            })
        }else {
            const newVenue_photo = new venue_Photo({
                venue_id,
                url,
            })
            await newVenue_photo.save();

            return res.status(201).json({
                success: true,
                message: "VenuePhoto muvaffaqiyatli ro'yxatdan o'tdi",
                venue_photo: newVenue_photo,
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

// ------------getVenue_photo --------


const getVenue_photo  =  async (req, res) => {
     try {
            const venue_photo = await venue_Photo.find({}).populate("venue_id")
            res.json({
                success: true,
                message: "Barcha VenuePhoto ro'yxati olindi",
                innerData: venue_photo,
            })
        }catch (error) {
            console.error("Error fetching venue_photo:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi: VenuePhoto olishda xatolik yuz berdi'

            })
    }
}

// ------ getVenue_photoById ------

const getVenue_photoById = async (req,res) => {
    try {
        const venue_photoId =  req.params.id;

        const venue_photo = await venue_Photo.findById(venue_photoId).populate("venue_id")

        if (!venue_photo) {
            return res.status(404).json({ message: "VenuePhoto topilmadi"})

        }
        return res.status(200).json({message: "VenuePhoto topildi", venue_photo})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"})
    }
}


// ------- delete Venue_photo ------

const deleteVenue_photo = async (req, res) =>{
    try {
        const venue_photoId = req.params.id

        const deletedVenue_photo =  await venue_Photo.findByIdAndDelete(venue_photoId)
        if (!deletedVenue_photo) {
            return res.status(404).json({ message: "VenuePhoto topilmadi"})

        }
        res.json({message: "VenuePhoto muvaffaqiyatli o'chirildi", venue_photo: deletedVenue_photo})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Venue_photo ---------

const updateVenue_photo = async (req,res)=> {
    try {
        const {id} = req.params;
        const { venue_id, url, } = req.body;
        const updateData = {
            url,
        }
        const updatedVenue_photo = await venue_Photo.findByIdAndUpdate(id, updateData, {
            new: true,
        }).populate("venue_id")

        if (!updatedVenue_photo) {
            return res.status(404).json({
                success: false,
                message: "VenuePhoto topilmadi"
            })
        }

        res.json({
            success: true,
            message: "VenuePhoto muvaffaqiyatli yangilandi",
            venue_photo: updatedVenue_photo
        })

    }catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

// ----------- search Venue_photo -----------

const searchVenue_photo = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv so'zini yozing"})

        }
        const result = await venue_Photo.find({
            $or: [
                {url: {$regex: escapedQuery, $options: "i"}}
            ]
        }).populate("venue_id")

        if (result.length === 0) {
            return res.status(404).json({ message: "VenuePhoto topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching venue_photo", error);
        res.status(500).json({message: "Server error: Failed to fetch venue_photo"})

    }
}


module.exports = {
    createVenue_photo,
    getVenue_photo,
    getVenue_photoById,
    deleteVenue_photo,
    updateVenue_photo,
    searchVenue_photo
}