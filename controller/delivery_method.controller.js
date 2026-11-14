const {Delivery_method} = require("../model/delivery_methodSchema")



// ------------- postDelivery_method -----
const createDelivery_method = async (req,res) => {
    try {
        const {
            name,
        } = req.body

        const existingDelivery_method = await Delivery_method.findOne({name})
        console.log(existingDelivery_method);
        if (existingDelivery_method) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan ism mavjud"
            })
        }else {
            const newDelivery_method = new Delivery_method({
                name,
            })
            await newDelivery_method.save();

            return res.status(201).json({
                success: true,
                message: "Ism muvaffaqiyatli ro'xatdan otdi ",
                delivery_method: newDelivery_method,
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

// ------------getDelivery_method --------


const getDelivery_method  =  async (req, res) => {
     try {
            const delivery_method = await Delivery_method.find({})
            res.json({
                success: true,
                message: "Barcha ismlar ro'yxxatga olingan",
                innerData: delivery_method,
            })
        }catch (error) {
            console.error("Error fetching types:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi ism olishda  xatolik yuz berdi'
    
            })
    }
}

// ------ getDelivery_methodById ------

const getDelivery_methodById = async (req,res) => {
    try {
        const delivery_methodId =  req.params.id;

        const delivery_method = await Delivery_method.findById(delivery_methodId)

        if (!delivery_method) {
            return res.status(404).json({ message: "Delivery_method not faund"})

        }
        return res.status(200).json({message: "Delivery_method faund", delivery_method})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Delivery_method ------

const deleteDelivery_method = async (req, res) =>{
    try {
        const Delivery_methodId = req.params.id

    const deleteDelivery_method =  await Delivery_method.findByIdAndDelete(Delivery_methodId)
        if (!deleteDelivery_method) {
            return res.status(404).json({ message: "Types not faund"})

        }
        res.json({message: "Types deleled successfully", deleteDelivery_method})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Delivery_method ---------

const updateDelivery_method = async (req,res)=> {
    try {
        const {id} = req.params;
        const { name, } = req.body;
        const updateDate = {
            name,
        }
        const updateDelivery_method = await Delivery_method.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateDelivery_method) {
                    return res.status(404).json({
                        success: false,
                        message: "Delivery_method not faund"
                    })
                }
        
                res.json({
                    success: true,
                    message: "Delivery_method updeted successfully",
                    delivery_method: updateDelivery_method
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}

// ----------- searchDelivery_method -----------

const searchDelivery_method = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv So'zini yozing"})

        }
        const result = await Delivery_method.find({
            $or: [
                {name: {$regex: query, $options: "i"}}
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "Ism topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching Delivery_method", error);
        res.status(500).json({message: "Server error: Failed to fetch Delivery_method"})
        
    }
}


module.exports = { 
    createDelivery_method,
    getDelivery_method,
    getDelivery_methodById,
    deleteDelivery_method,
    updateDelivery_method,
    searchDelivery_method
} 
