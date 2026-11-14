const {Seat} = require("../model/seatSchema")



// ------------- postSeat -----
const createSeat = async (req,res) => {
    try {
        const {
            sector,
            row_number,
            number,
            venue_id,
            seat_type_id,
            location_in_schema,
        } = req.body

        const existingSeat = await Seat.findOne({number})
        console.log(existingSeat);
        if (existingSeat) {
            return res.status(400).json({
                success: false,
                message: "Bu number bn ro'yxtadan otgan seat mavjud"
            })
        }else {
            const newSeat = new Seat({
                sector,
                row_number,
                number,
                venue_id,
                seat_type_id,
                location_in_schema,
            })
            await newSeat.save();

            return res.status(201).json({
                success: true,
                message: "Seat muvaffaqiyatli ro'xatdan otdi ",
                seat: newSeat,
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

// ------------getSeat --------


const getSeat  =  async (req, res) => {
     try {
            const seat = await Seat.find({})
            res.json({
                success: true,
                message: "Barcha Seat ro'yxxatga olingan",
                innerData: seat,
            })
        }catch (error) {
            console.error("Error fetching seat:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi seat olishda  xatolik yuz berdi'

            })
    }
}

// ------ getSeatById ------

const getSeatById = async (req,res) => {
    try {
        const seatId =  req.params.id;

        const seat = await Seat.findById(seatId)

        if (!seat) {
            return res.status(404).json({ message: "Seat not faund"})

        }
        return res.status(200).json({message: "Seat faund", seat})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Seat ------

const deleteSeat = async (req, res) =>{
    try {
        const seatId = req.params.id

    const deteleSeat =  await Seat.findByIdAndDelete(seatId)
        if (!deleteSeat) {
            return res.status(404).json({ message: "Seat not faund"})

        }
        res.json({message: "Seat deleled successfully", deleteSeat})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Seat ---------

const updateSeat = async (req,res)=> {
    try {
        const {id} = req.params;
        const { sector, row_number, number, venue_id, seat_type_id, location_in_schema, } = req.body;
        const updateDate = {
            sector,
            row_number,
            number,
            location_in_schema,
        }
        const updateSeat = await Seat.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateSeat) {
                    return res.status(404).json({
                        success: false,
                        message: "Seat not faund"
                    })
                }

                res.json({
                    success: true,
                    message: "Seat updeted successfully",
                    seat: updateSeat
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}



const searchSeat = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv So'sini yozing"})

        }
        const result = await Seat.find({
            $or: [
                {location_in_schema: {$regex: query, $options: "i"}}
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "Seat topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching seats", error);
        res.status(500).json({message: "Server error: Failed to fetch seats"})
        
    }
}


module.exports = {
    createSeat,
    getSeat,
    getSeatById,
    deleteSeat,
    updateSeat,
    searchSeat
}