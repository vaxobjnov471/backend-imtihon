const {Seat_Type} = require("../model/seat_typeSchema")



// ------------- postSeat_Type -----
const createSeat_Type = async (req,res) => {
    try {
        const {
            name,
        } = req.body

        const existingSeat_Type = await Seat_Type.findOne({name})
        console.log(existingSeat_Type);
        if (existingSeat_Type) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan ism mavjud"
            })
        }else {
            const newSeat_Type = new Seat_Type({
                name,
            })
            await newSeat_Type.save();

            return res.status(201).json({
                success: true,
                message: "Ism muvaffaqiyatli ro'xatdan otdi ",
                seat_type: newSeat_Type,
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

// ------------getSeat_Type --------


const getSeat_Type  =  async (req, res) => {
     try {
            const seat_type = await Seat_Type.find({})
            res.json({
                success: true,
                message: "Barcha ismlar ro'yxxatga olingan",
                innerData: seat_type,
            })
        }catch (error) {
            console.error("Error fetching Seat_Type:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi ism olishda  xatolik yuz berdi'
    
            })
    }
}

// ------ getSeat_TypeById ------

const getSeat_TypeById = async (req,res) => {
    try {
        const Seat_TypeId =  req.params.id;

        const seat_Type = await Seat_Type.findById(Seat_TypeId)

        if (!Seat_Type) {
            return res.status(404).json({ message: "Seat_Type not faund"})

        }
        return res.status(200).json({message: "Seat_Type faund", seat_Type})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Seat_Type ------

const deleteSeat_Type = async (req, res) =>{
    try {
        const Seat_TypeId = req.params.id

    const deleteSeat_Type =  await Seat_Type.findByIdAndDelete(Seat_TypeId)
        if (!deleteSeat_Type) {
            return res.status(404).json({ message: "Seat_Type not faund"})

        }
        res.json({message: "Seat_Type deleled successfully", deleteSeat_Type})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Seat_Type ---------

const updateSeat_Type = async (req,res)=> {
    try {
        const {id} = req.params;
        const { name, } = req.body;
        const updateDate = {
            name,
        }
        const updateSeat_Type = await Seat_Type.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateSeat_Type) {
                    return res.status(404).json({
                        success: false,
                        message: "Seat_Type not faund"
                    })
                }
        
                res.json({
                    success: true,
                    message: "Seat_Type updeted successfully",
                    Seat_Type: updateSeat_Type
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}

// ----------- search Seat_Type-----------

const searchSeat_Type = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv So'sini yozing"})

        }
        const result = await Seat_Type.find({
            $or: [
                {name: {$regex: query, $options: "i"}}
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "Ism topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching Seat_Type", error);
        res.status(500).json({message: "Server error: Failed to fetch Seat_Type"})
        
    }
}


module.exports = { 
    createSeat_Type,
    getSeat_Type,
    getSeat_TypeById,
    deleteSeat_Type,
    searchSeat_Type,
    updateSeat_Type
} 
