const {Booking} = require("../model/bookingSchema")


// ------------- postBooking -----
const createBooking = async (req,res) => {
    try {
        const {
            cart_id,
            createdAt,
            fineshed,
            payment_method_id,
            delivery_method_id,
            status_id,
        } = req.body

        const existingBooking = await Booking.findOne({createdAt, fineshed, cart_id, payment_method_id, delivery_method_id, status_id})
        console.log(existingBooking);
        if (existingBooking) {
            return res.status(400).json({
                success: false,
                message: "Bu date bn ro'yxtadan otgan booking mavjud"
            })
        }else {
            const newBooking = new Booking({
                cart_id,
                createdAt,
                fineshed,
                payment_method_id,
                delivery_method_id,
                status_id,
            })
            await newBooking.save();

            return res.status(201).json({
                success: true,
                message: "Booking muvaffaqiyatli ro'xatdan otdi ",
                booking: newBooking,
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

// ------------getBooking --------


const getBooking  =  async (req, res) => {
     try {
            const booking = await Booking.find({})
            res.json({
                success: true,
                message: "Barcha Booking ro'yxxatga olingan",
                innerData: booking,
            })
        }catch (error) {
            console,error("Error fetching booking:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi booking olishda  xatolik yuz berdi'

            })
    }
}

// ------ getBookingById ------

const getBookingById = async (req,res) => {
    try {
        const bookingId =  req.params.id;

        const booking = await Booking.findById(bookingId)

        if (!booking) {
            return res.status(404).json({ message: "Booking not faund"})

        }
        return res.status(200).json({message: "Booking faund", booking})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Booking ------

const deleteBooking = async (req, res) =>{
    try {
        const bookingId = req.params.id

    const deteleBooking =  await Booking.findByIdAndDelete(bookingId)
        if (!deleteBooking) {
            return res.status(404).json({ message: "Booking not faund"})

        }
        res.json({message: "Booking deleled successfully", deleteBooking})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Booking ---------

const updateBooking = async (req,res)=> {
    try {
        const {id} = req.params;
        const {  createdAt, fineshed, } = req.body;
        const updateDate = {
            createdAt,
            fineshed,
        }
        const updateBooking = await Booking.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateBooking) {
                    return res.status(404).json({
                        success: false,
                        message: "Booking not faund"
                    })
                }

                res.json({
                    success: true,
                    message: "Booking updeted successfully",
                    booking: updateBooking
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}


module.exports = {
    createBooking,
    getBooking,
    getBookingById,
    deleteBooking,
    updateBooking,
}