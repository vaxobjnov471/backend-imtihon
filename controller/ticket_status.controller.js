const {Ticket_status} = require("../model/ticket_statusSchema")



// ------------- postTicket_status -----
const createTicket_status = async (req,res) => {
    try {
        const {
            name,
        } = req.body

        const existingTicket_status = await Ticket_status.findOne({name})
        console.log(existingTicket_status);
        if (existingTicket_status) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan ism mavjud"
            })
        }else {
            const newTicket_status = new Ticket_status({
                name,
            })
            await newTicket_status.save();

            return res.status(201).json({
                success: true,
                message: "Ism muvaffaqiyatli ro'xatdan otdi ",
                Ticket_status: newTicket_status,
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

// ------------getTicket_status--------


const getTicket_status  =  async (req, res) => {
     try {
            const Ticket_status = await Ticket_status.find({})
            res.json({
                success: true,
                message: "Barcha ismlar ro'yxxatga olingan",
                innerData: Ticket_status,
            })
        }catch (error) {
            console,error("Error fetching Ticket_status:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi ism olishda  xatolik yuz berdi'
    
            })
    }
}

// ------ getTicket_statusById ------

const getTicket_statusById = async (req,res) => {
    try {
        const Ticket_statusId =  req.params.id;

        const Ticket_status = await Ticket_status.findById(Ticket_statusId)

        if (!Ticket_status) {
            return res.status(404).json({ message: "Ticket_status not faund"})

        }
        return res.status(200).json({message: "Ticket_status faund", Ticket_status})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Ticket_status ------

const deleteTicket_status = async (req, res) =>{
    try {
        const Ticket_statusId = req.params.id

    const deteleTicket_status =  await Ticket_status.findByIdAndDelete(Ticket_statusId)
        if (!deleteTicket_status) {
            return res.status(404).json({ message: "Ticket_status not faund"})

        }
        res.json({message: "Ticket_status deleled successfully", deleteTicket_status})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Ticket_status ---------

const updateTicket_status = async (req,res)=> {
    try {
        const {id} = req.params;
        const { name, } = req.body;
        const updateDate = {
            name,
        }
        const updateTicket_status= await Ticket_status.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateTicket_status) {
                    return res.status(404).json({
                        success: false,
                        message: "Ticket_status not faund"
                    })
                }
        
                res.json({
                    success: true,
                    message: "Ticket_status updeted successfully",
                    Ticket_status: updateTicket_status
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}

// ----------- search Ticket_status-----------

const searchTicket_status = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv So'sini yozing"})

        }
        const result = await Ticket_status.find({
            $or: [
                {name: {$regex: query, $options: "i"}}
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "Ism topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching Ticket_status", error);
        res.status(500).json({message: "Server error: Failed to fetch Ticket_status"})
        
    }
}


module.exports = { 
    createTicket_status,
    getTicket_status,
    getTicket_statusById,
    updateTicket_status,
    deleteTicket_status,
    searchTicket_status
} 
