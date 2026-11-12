const {Customer} = require("../model/customerSchema")



// ------------- postCustomer -----
const createCustomer = async (req,res) => {
    try {
        const {
            first_name,
            last_name,
            phone,
            hashed_password,
            email,
            birth_date,
            gender,
            lang_id,
            hashed_refresh_token,
        } = req.body

        const existingCustomer = await Customer.findOne({first_name})
        console.log(existingCustomer);
        if (existingCustomer) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan customer mavjud"
            })
        }else {
            const newCustomer = new Customer({
                first_name,
                last_name,
                phone,
                hashed_password,
                email,
                birth_date,
                gender,
                lang_id,
                hashed_refresh_token,
            })
            await newCustomer.save();

            return res.status(201).json({
                success: true,
                message: "Customer muvaffaqiyatli ro'xatdan otdi ",
                customer: newCustomer,
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

// ------------getCustomer --------


const getCustomer  =  async (req, res) => {
     try {
            const customer = await Customer.find({})
            res.json({
                success: true,
                message: "Barcha Customer ro'yxxatga olingan",
                innerData: customer,
            })
        }catch (error) {
            console,error("Error fetching customer:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi customer olishda  xatolik yuz berdi'

            })
    }
}

// ------ getCustomerById ------

const getCustomerById = async (req,res) => {
    try {
        const customerId =  req.params.id;

        const customer = await Customer.findById(customerId)

        if (!customer) {
            return res.status(404).json({ message: "Customer not faund"})

        }
        return res.status(200).json({message: "Customer faund", customer})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Customer ------

const deleteCustomer = async (req, res) =>{
    try {
        const customerId = req.params.id

    const deteleCustomer =  await Customer.findByIdAndDelete(customerId)
        if (!deleteCustomer) {
            return res.status(404).json({ message: "Customer not faund"})

        }
        res.json({message: "Customer deleled successfully", deleteCustomer})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Customer ---------

const updateCustomer = async (req,res)=> {
    try {
        const {id} = req.params;
        const { first_name, last_name, phone, hashed_password, email, birth_date, gender,  hashed_refresh_token, } = req.body;
        const updateDate = {
            first_name,
            last_name,
            phone,
            hashed_password,
            email,
            birth_date,
            gender,
            hashed_refresh_token,
        }
        const updateCustomer = await Customer.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateCustomer) {
                    return res.status(404).json({
                        success: false,
                        message: "Customer not faund"
                    })
                }

                res.json({
                    success: true,
                    message: "Customer updeted successfully",
                    customer: updateCustomer
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}


const searchCustomer = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv So'sini yozing"})

        }
        const result = await Customer.find({
            $or: [
                {first_name: {$regex: query, $options: "i"}},
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "Ism topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching customers", error);
        res.status(500).json({message: "Server error: Failed to fetch customers"})
        
    }
}

module.exports = {
    createCustomer,
    getCustomer,
    getCustomerById,
    deleteCustomer,
    updateCustomer,
    searchCustomer
}

