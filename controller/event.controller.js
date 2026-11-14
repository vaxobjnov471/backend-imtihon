const {Event} = require("../model/eventSchema")



// ------------- postEvent -----
const createEvent = async (req,res) => {
    try {
        const {
            name,
            photo,
            start_date,
            start_time,
            finish_date,
            finish_time,
            info,
            event_type_id,
            human_category_id,
            venue_id,
            lang_id,
            release_date,
        } = req.body

        const existingEvent = await Event.findOne({ name })
        console.log(existingEvent);
        if (existingEvent) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan event mavjud"
            })
        }else {
            const newEvent = new Event({
                name,
                photo,
                start_date,
                start_time,
                finish_date,
                finish_time,
                info,
                event_type_id,
                human_category_id,
                venue_id,
                lang_id,
                release_date,
            })
            await newEvent.save();

            return res.status(201).json({
                success: true,
                message: "Event muvaffaqiyatli ro'xatdan otdi ",
                event: newEvent,
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

// ------------getEvent --------


const getEvent  =  async (req, res) => {
     try {
            const event = await Event.find({})
            res.json({
                success: true,
                message: "Barcha Event ro'yxxatga olingan",
                innerData: event,
            })
        }catch (error) {
            console.error("Error fetching event:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi event olishda  xatolik yuz berdi'

            })
    }
}

// ------ getEventById ------

const getEventById = async (req,res) => {
    try {
        const eventId =  req.params.id;

        const event = await Event.findById(eventId)

        if (!event) {
            return res.status(404).json({ message: "Event not faund"})

        }
        return res.status(200).json({message: "Event faund", event})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Event ------

const deleteEvent = async (req, res) =>{
    try {
        const eventId = req.params.id

    const deleteEvent =  await Event.findByIdAndDelete(eventId)
        if (!deleteEvent) {
            return res.status(404).json({ message: "Event not faund"})

        }
        res.json({message: "Event deleled successfully", deleteEvent})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Event ---------

const updateEvent = async (req,res)=> {
    try {
        const {id} = req.params;
        const { name, photo, start_date, start_time, finish_date, finish_time, info,  release_date, } = req.body;
        const updateDate = {
            name,
            photo,
            start_date,
            start_time,
            finish_date,
            finish_time,
            info,
            release_date,
        }
        const updateEvent = await Event.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateEvent) {
                    return res.status(404).json({
                        success: false,
                        message: "Event not faund"
                    })
                }

                res.json({
                    success: true,
                    message: "Event updeted successfully",
                    event: updateEvent
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}



const searchEvent = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv So'sini yozing"})

        }
        const result = await Event.find({
            $or: [
                {name: {$regex: query, $options: "i"}}
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "Ism topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching events", error);
        res.status(500).json({message: "Server error: Failed to fetch events"})
        
    }
}



module.exports = {
    createEvent,
    getEvent,
    getEventById,
    deleteEvent,
    updateEvent,
    searchEvent,

}