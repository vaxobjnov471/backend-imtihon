const {Payment_method} = require("../model/payment_methodSchema")



// ------------- postPayment_method -----
const createPayment_method = async (req,res) => {
    try {
        const {
            name,
        } = req.body

        const existingPayment_method = await Payment_method.findOne({name})
        console.log(existingPayment_method);
        if (existingPayment_method) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan ism mavjud"
            })
        }else {
            const newPayment_method = new Payment_method({
                name,
            })
            await newPayment_method.save();

            return res.status(201).json({
                success: true,
                message: "Ism muvaffaqiyatli ro'xatdan otdi ",
                payment_method: newPayment_method,
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

// ------------getPayment_method --------


const getPayment_method  =  async (req, res) => {
     try {
            const payment_method = await Payment_method.find({})
            res.json({
                success: true,
                message: "Barcha ismlar ro'yxxatga olingan",
                innerData: payment_method,
            })
        }catch (error) {
            console,error("Error fetching Payment_method:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi ism olishda  xatolik yuz berdi'
    
            })
    }
}

// ------ getPayment_methodById ------

const getPayment_methodById = async (req,res) => {
    try {
        const payment_methodId =  req.params.id;

        const payment_method = await Payment_method.findById(payment_methodId)

        if (!payment_method) {
            return res.status(404).json({ message: "Payment_method not faund"})

        }
        return res.status(200).json({message: "Payment_method faund", payment_method})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Payment_method ------

const deletePayment_method = async (req, res) =>{
    try {
        const payment_methodId = req.params.id

    const detelePayment_method =  await Payment_method.findByIdAndDelete(payment_methodId)
        if (!deletePayment_method) {
            return res.status(404).json({ message: "Payment_method not faund"})

        }
        res.json({message: "Payment_method deleled successfully", deletePayment_method})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Payment_method ---------

const updatePayment_method = async (req,res)=> {
    try {
        const {id} = req.params;
        const { name, } = req.body;
        const updateDate = {
            name,
        }
        const updatePayment_method = await Payment_method.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updatePayment_method) {
                    return res.status(404).json({
                        success: false,
                        message: "Payment_method not faund"
                    })
                }
        
                res.json({
                    success: true,
                    message: "Payment_method updeted successfully",
                    payment_method: updatePayment_method
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}

// ----------- search Payment_method-----------

const searchPayment_method = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv So'sini yozing"})

        }
        const result = await Payment_method.find({
            $or: [
                {name: {$regex: query, $options: "i"}}
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "Ism topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching Payment_method", error);
        res.status(500).json({message: "Server error: Failed to fetch Payment_method"})
        
    }
}


module.exports = { 
    createPayment_method,
    getPayment_method,
    getPayment_methodById,
    updatePayment_method,
    deletePayment_method,
    searchPayment_method
} 
