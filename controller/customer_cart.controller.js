const {Customer_cart} = require("../model/customer_cartSchema")



// ------------- postCustomer_cart -----
const createCustomer_cart = async (req,res) => {
    try {
        const {
            customer_id,
            name,
            phone,
            number,
            year,
            month,
            is_active,
            is_main,
        } = req.body

        const existingCustomer_cart = await Customer_cart.findOne({ name })
        console.log(existingCustomer_cart);
        if (existingCustomer_cart) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan customer_cart mavjud"
            })
        }else {
            const newCustomer_cart = new Customer_cart({
                customer_id,
                name,
                phone,
                number,
                year,
                month,
                is_active,
                is_main,
            })
            await newCustomer_cart.save();

            return res.status(201).json({
                success: true,
                message: "Customer_cart muvaffaqiyatli ro'xatdan otdi ",
                customer_cart: newCustomer_cart,
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

// ------------getCustomer_cart --------


const getCustomer_cart  =  async (req, res) => {
     try {
            const customer_cart = await Customer_cart.find({})
            res.json({
                success: true,
                message: "Barcha Customer_cart ro'yxxatga olingan",
                innerData: customer_cart,
            })
        }catch (error) {
            console,error("Error fetching customer_cart:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi customer_cart olishda  xatolik yuz berdi'

            })
    }
}

// ------ getCustomer_cartById ------

const getCustomer_cartById = async (req,res) => {
    try {
        const customer_cartId =  req.params.id;

        const customer_cart = await Customer_cart.findById(customer_cartId)

        if (!customer_cart) {
            return res.status(404).json({ message: "Customer_cart not faund"})

        }
        return res.status(200).json({message: "Customer_cart faund", customer_cart})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Customer_cart ------

const deleteCustomer_cart = async (req, res) =>{
    try {
        const customer_cartId = req.params.id

    const deteleCustomer_cart =  await Customer_cart.findByIdAndDelete(customer_cartId)
        if (!deleteCustomer_cart) {
            return res.status(404).json({ message: "Customer_cart not faund"})

        }
        res.json({message: "Customer_cart deleled successfully", deleteCustomer_cart})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Customer_cart ---------

const updateCustomer_cart   = async (req,res)=> {
    try {
        const {id} = req.params;
        const { customer_id, name, phone, number, year, month, is_active, is_main, } = req.body;
        const updateDate = {
            name,
            phone,
            number,
            year,
            month,
            is_active,
            is_main,
        }
        const updateCustomer_cart = await Customer_cart.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateCustomer_cart) {
                    return res.status(404).json({
                        success: false,
                        message: "Customer_cart not faund"
                    })
                }

                res.json({
                    success: true,
                    message: "Customer_cart updeted successfully",
                    customer_cart: updateCustomer_cart
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}



const searchCustomer_cart = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv So'sini yozing"})

        }
        const result = await Customer_cart.find({
            $or: [
                {name: {$regex: query, $options: "i"}}
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "Ism topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching customer carts", error);
        res.status(500).json({message: "Server error: Failed to fetch customer carts"})
        
    }
}


module.exports = {
    createCustomer_cart,
    getCustomer_cart,
    getCustomer_cartById,
    deleteCustomer_cart,
    updateCustomer_cart,
    searchCustomer_cart
}