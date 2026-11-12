const {Types} = require("../model/typesSchema")



// ------------- postTypes -----
const createTypes = async (req,res) => {
    try {
        const {
            name,
        } = req.body

        const existingTypes = await Types.findOne({name})
        console.log(existingTypes);
        if (existingTypes) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan ism mavjud"
            })
        }else {
            const newTypes = new Types({
                name,
            })
            await newTypes.save();

            return res.status(201).json({
                success: true,
                message: "Ism muvaffaqiyatli ro'xatdan otdi ",
                types: newTypes,
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

// ------------getTypes --------


const getTypes  =  async (req, res) => {
     try {
            const types = await Types.find({})
            res.json({
                success: true,
                message: "Barcha ismlar ro'yxxatga olingan",
                innerData: types,
            })
        }catch (error) {
            console,error("Error fetching types:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi ism olishda  xatolik yuz berdi'
    
            })
    }
}

// ------ getTypesById ------

const getTypesById = async (req,res) => {
    try {
        const typesId =  req.params.id;

        const types = await Types.findById(typesId)

        if (!types) {
            return res.status(404).json({ message: "Types not faund"})

        }
        return res.status(200).json({message: "Types faund", types})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Types ------

const deleteTypes = async (req, res) =>{
    try {
        const typesId = req.params.id

    const deteleTypes =  await Types.findByIdAndDelete(typesId)
        if (!deleteTypes) {
            return res.status(404).json({ message: "Types not faund"})

        }
        res.json({message: "Types deleled successfully", deleteTypes})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Types ---------

const updateTypes = async (req,res)=> {
    try {
        const {id} = req.params;
        const { name, } = req.body;
        const updateDate = {
            name,
        }
        const updateTypes = await Types.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateTypes) {
                    return res.status(404).json({
                        success: false,
                        message: "Types not faund"
                    })
                }
        
                res.json({
                    success: true,
                    message: "Types updeted successfully",
                    types: updateTypes
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}

// ----------- search Types -----------

const searchTypes = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv So'sini yozing"})

        }
        const result = await Types.find({
            $or: [
                {name: {$regex: query, $options: "i"}}
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "Ism topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching types", error);
        res.status(500).json({message: "Server error: Failed to fetch types"})
        
    }
}


module.exports = { 
    createTypes,
    getTypes,
    getTypesById,
    deleteTypes,
    updateTypes,
    searchTypes
} 
