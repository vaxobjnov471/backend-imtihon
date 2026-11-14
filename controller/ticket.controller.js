const {Ticket} = require("../model/ticketSchema")



// ------------- postTicket -----
const createTicket = async (req,res) => {
    try {
        const {
            event_id,
            seat_id,
            price,
            service_fee,
            status_id,
            ticket_type,
        } = req.body

        const existingTicket = await Ticket.findOne({ price})
        console.log(existingTicket);
        if (existingTicket) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan ticket mavjud"
            })
        }else {
            const newTicket = new Ticket({
                event_id,
                seat_id,
                price,
                service_fee,
                status_id,
                ticket_type,
            })
            await newTicket.save();

            return res.status(201).json({
                success: true,
                message: "Ticket muvaffaqiyatli ro'xatdan otdi ",
                ticket: newTicket,
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

// ------------getTicket --------


const getTicket  =  async (req, res) => {
     try {
            const ticket = await Ticket.find({})
            res.json({
                success: true,
                message: "Barcha Ticket ro'yxxatga olingan",
                innerData: ticket,
            })
        }catch (error) {
            console.error("Error fetching ticket:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi ticket olishda  xatolik yuz berdi'

            })
    }
}

// ------ getTicketById ------

const getTicketById = async (req,res) => {
    try {
        const ticketId =  req.params.id;

        const ticket = await Ticket.findById(ticketId)

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not faund"})

        }
        return res.status(200).json({message: "Ticket faund", ticket})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Ticket ------

const deleteTicket = async (req, res) =>{
    try {
        const ticketId = req.params.id

    const deleteTicket =  await Ticket.findByIdAndDelete(ticketId)
        if (!deleteTicket) {
            return res.status(404).json({ message: "Ticket not faund"})

        }
        res.json({message: "Ticket deleled successfully", deleteTicket})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Ticket ---------

const updateTicket = async (req,res)=> {
    try {
        const {id} = req.params;
        const { event_id, seat_id, price, service_fee, status_id, ticket_type, } = req.body;
        const updateDate = {
            price,
            service_fee,
            ticket_type,
        }
        const updateTicket = await Ticket.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateTicket) {
                    return res.status(404).json({
                        success: false,
                        message: "Ticket not faund"
                    })
                }

                res.json({
                    success: true,
                    message: "Ticket updeted successfully",
                    ticket: updateTicket
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}



module.exports = {
    createTicket,
    getTicket,
    getTicketById,
    deleteTicket,
    updateTicket
}