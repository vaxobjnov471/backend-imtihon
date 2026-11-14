const {Customer_address} = require("../model/customer_addressSchema")



// ------------- postCustomer_address -----
const createCustomer_address = async (req,res) => {
    try {
        const {
            customer_id,
            name,
            region_id,
            destrict_id,
            street,
            house,
            flat,
            location,
            post_index,
            info,
        } = req.body

        const existingCustomer_address = await Customer_address.findOne({ name})
        console.log(existingCustomer_address);
        if (existingCustomer_address) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan customer_address mavjud"
            })
        }else {
            const newCustomer_address = new Customer_address({
                customer_id,
                name,
                region_id,
                destrict_id,
                street,
                house,
                flat,
                location,
                post_index,
                info,
            })
            await newCustomer_address.save();

            return res.status(201).json({
                success: true,
                message: "Customer_address muvaffaqiyatli ro'xatdan otdi ",
                customer_address: newCustomer_address,
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

// ------------getCustomer_address --------


const getCustomer_address  =  async (req, res) => {
     try {
            const customer_address = await Customer_address.find({})
            res.json({
                success: true,
                message: "Barcha Customer_address ro'yxxatga olingan",
                innerData: customer_address,
            })
        }catch (error) {
            console.error("Error fetching customer_address:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi customer_address olishda  xatolik yuz berdi'

            })
    }
}

// ------ getCustomer_addressById ------

const getCustomer_addressById = async (req,res) => {
    try {
        const customer_addressId =  req.params.id;

        const customer_address = await Customer_address.findById(customer_addressId)

        if (!customer_address) {
            return res.status(404).json({ message: "Customer_address not faund"})

        }
        return res.status(200).json({message: "Customer_address faund", customer_address})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Customer_address ------

const deleteCustomer_address = async (req, res) =>{
    try {
        const customer_addressId = req.params.id

    const deteleCustomer_address =  await Customer_address.findByIdAndDelete(customer_addressId)
        if (!deleteCustomer_address) {
            return res.status(404).json({ message: "Customer_address not faund"})

        }
        res.json({message: "Customer_address deleled successfully", deleteCustomer_address})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Customer_address ---------

const updateCustomer_address = async (req,res)=> {
    try {
        const {id} = req.params;
        const {  name,   street, house, flat, location, post_index, info, } = req.body;
        const updateDate = {
            name,
            street,
            house,
            flat,
            location,
            post_index,
            info,
        }
        const updateCustomer_address = await Customer_address.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateCustomer_address) {
                    return res.status(404).json({
                        success: false,
                        message: "Customer_address not faund"
                    })
                }

                res.json({
                    success: true,
                    message: "Customer_address updeted successfully",
                    customer_address: updateCustomer_address
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}



const searchCustomer_address = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv So'sini yozing"})

        }
        const result = await Customer_address.find({
            $or: [
                {name: {$regex: query, $options: "i"}},
                {street: {$regex: query, $options: "i"}},
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "Customer address topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching customer addresses", error);
        res.status(500).json({message: "Server error: Failed to fetch customer addresses"})
        
    }
}


module.exports = {
    createCustomer_address,
    getCustomer_address,
    getCustomer_addressById,
    deleteCustomer_address,
    updateCustomer_address,
    searchCustomer_address
}