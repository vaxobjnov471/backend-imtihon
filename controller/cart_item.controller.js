const {cart_Item} = require("../model/cart_itemSchema")



// ------------- createcart_Item -----
const createcart_Item = async (req,res) => {
    try {
        const {
            cart_id,
            ticket_id,
        } = req.body

        const existingcart_Item = await cart_Item.findOne({cart_id, ticket_id})
        if (existingcart_Item) {
            return res.status(400).json({
                success: false,
                message: "Bu cart uchun bunday item allaqachon mavjud"
            })
        }else {
            const newcart_Item = new cart_Item({
                cart_id,
                ticket_id,
            })
            await newcart_Item.save();

            return res.status(201).json({
                success: true,
                message: "cart_Item muvaffaqiyatli ro'yxatdan o'tdi",
                cart_Item: newcart_Item,
            })
        }

    }catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server xatosi",
            error: error.message,
        })

    }
}
// ------------getcart_Item --------


const getcart_Item  =  async (req, res) => {
     try {
            const date = await cart_Item.find({})
            res.json({
                success: true,
                message: "Barcha CartItem ro'yxati olindi",
                innerData: date,
            })
        }catch (error) {
            console.error("Error fetching cart_Item:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi: CartItem olishda xatolik yuz berdi'

            })
    }
}

// ------ getcart_ItemById ------

const getcart_ItemById = async (req,res) => {
    try {
        const cart_ItemId =  req.params.id;

        const cart_Item = await cart_Item.findById(cart_ItemId).populate("cart_id ticket_id")

        if (!cart_Item) {
            return res.status(404).json({ message: "CartItem topilmadi"})

        }
        return res.status(200).json({message: "CartItem topildi", cart_Item})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"})
    }
}


// ------- delete CartItem ------

const deletecart_Item = async (req, res) =>{
    try {
        const cart_ItemId  = req.params.id

        const deletedcart_Item =  await cart_Item.findByIdAndDelete(cart_ItemId)
        if (!deletedcart_Item) {
            return res.status(404).json({ message: "CartItem topilmadi"})

        }
        res.json({message: "CartItem muvaffaqiyatli o'chirildi", cart_Item: deletedcart_Item})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}



module.exports = {
    createcart_Item,
    getcart_Item,
    getcart_ItemById,
    deletecart_Item
}
