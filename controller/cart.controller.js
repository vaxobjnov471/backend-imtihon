const {Cart} = require("../model/cartSchema")


// ------------- postCart -----
const createCart = async (req,res) => {
    try {
        const {
            createdAt,
            finishedAt,
        } = req.body

        const existingCart = await Cart.findOne({createdAt, finishedAt})
        console.log(existingCart);
        if (existingCart) {
            return res.status(400).json({
                success: false,
                message: "Bu date bn ro'yxtadan otgan cart mavjud"
            })
        }else {
            const newCart = new Cart({
                createdAt,
                finishedAt,
            })
            await newCart.save();

            return res.status(201).json({
                success: true,
                message: "Cart muvaffaqiyatli ro'xatdan otdi ",
                cart: newCart,
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

// ------------getCart --------


const getCart  =  async (req, res) => {
     try {
            const cart = await Cart.find({})
            res.json({
                success: true,
                message: "Barcha Cart ro'yxxatga olingan",
                innerData: cart,
            })
        }catch (error) {
            console.error("Error fetching cart:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi cart olishda  xatolik yuz berdi'

            })
    }
}

// ------ getCartById ------

const getCartById = async (req,res) => {
    try {
        const cartId =  req.params.id;

        const cart = await Cart.findById(cartId)

        if (!cart) {
            return res.status(404).json({ message: "Cart not faund"})

        }
        return res.status(200).json({message: "Cart faund", cart})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Cart ------

const deleteCart = async (req, res) =>{
    try {
        const cartId = req.params.id

    const deteleCart =  await Cart.findByIdAndDelete(cartId)
        if (!deleteCart) {
            return res.status(404).json({ message: "Cart not faund"})

        }
        res.json({message: "Cart deleled successfully", deleteCart})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Cart ---------

const updateCart = async (req,res)=> {
    try {
        const {id} = req.params;
        const { createdAt, finishedAt, } = req.body;
        const updateDate = {
            createdAt,
            finishedAt,
        }
        const updateCart = await Cart.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateCart) {
                    return res.status(404).json({
                        success: false,
                        message: "Cart not faund"
                    })
                }

                res.json({
                    success: true,
                    message: "Cart updeted successfully",
                    cart: updateCart
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}


module.exports = {
    createCart,
    getCart,
    getCartById,
    deleteCart,
    updateCart,
}