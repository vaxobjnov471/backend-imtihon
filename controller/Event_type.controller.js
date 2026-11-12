const {Event_type} = require("../model/event_typeSchema")



// ------------- postEvent_type -----
const createEvent_type = async (req,res) => {
    try {
        const {
            name,
            payment_id,
        } = req.body

        const existingEvent_type = await Event_type.findOne({name})
        console.log(existingEvent_type);
        if (existingEvent_type) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan ism mavjud"
            })
        }else {
            const newEvent_type = new Event_type({
                name,
                payment_id
            })
            await newEvent_type.save();

            return res.status(201).json({
                success: true,
                message: "Ism muvaffaqiyatli ro'xatdan otdi ",
                event_type: newEvent_type,
            })
        }
        
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            seccuss: false,
            message: "Server xatosi",
            error: error.message,
        })
        
    }
}

// ------------getEvent_type --------


const getEvent_type  =  async (req, res) => {
     try {
            const event_type = await Event_type.find({})
            res.json({
                success: true,
                message: "Barcha ismlar ro'yxxatga olingan",
                innerData: event_type,
            })
        }catch (error) {
            console,error("Error fetching Event_type:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi ism olishda  xatolik yuz berdi'
    
            })
    }
}

// ------ getEvent_typeById ------

const getEvent_typeById = async (req,res) => {
    try {
        const event_typeId =  req.params.id;

        const event_type = await Event_type.findById(event_typeId)

        if (!event_type) {
            return res.status(404).json({ message: "Event_type not faund"})

        }
        return res.status(200).json({message: "Event_type faund", Event_type})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Event_type ------

const deleteEvent_type = async (req, res) =>{
    try {
        const event_typeId = req.params.id

    const deteleEvent_type =  await Event_type.findByIdAndDelete(event_typeId)
        if (!deleteEvent_type) {
            return res.status(404).json({ message: "Event_type not faund"})

        }
        res.json({message: "Event_type deleled successfully", deleteEvent_type})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Event_type ---------

const updateEvent_type = async (req,res)=> {
    try {
        const {id} = req.params;
        const { name, } = req.body;
        const updateDate = {
            name,
        }
        const updateEvent_type = await Event_type.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateEvent_type) {
                    return res.status(404).json({
                        success: false,
                        message: "Event_type not faund"
                    })
                }
        
                res.json({
                    success: true,
                    message: "Event_type updeted successfully",
                    types: updateTypes
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}

// ----------- search Event_type -----------

const searchEvent_type = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv So'sini yozing"})

        }
        const result = await Event_type.find({
            $or: [
                {name: {$regex: query, $options: "i"}}
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "Ism topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching types", error);
        res.status(500).json({message: "Server error: Failed to fetch types"})
        
    }
}


module.exports = { 
    createEvent_type,
    getEvent_type,
    getEvent_typeById,
    deleteEvent_type,
    updateEvent_type,
    searchEvent_type,
} 
