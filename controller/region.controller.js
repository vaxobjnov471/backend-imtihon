const {Region} = require("../model/regionSchema")



// ------------- postRegion -----
const createRegion = async (req,res) => {
    try {
        const {
            name,
        } = req.body

        const existingRegion = await Region.findOne({name})
        console.log(existingRegion);
        if (existingRegion) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan ism mavjud"
            })
        }else {
            const newRegion = new Region({
                name,
            })
            await newRegion.save();

            return res.status(201).json({
                success: true,
                message: "Ism muvaffaqiyatli ro'xatdan otdi ",
                Region: newRegion,
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

// ------------getRegion --------


const getRegion  =  async (req, res) => {
     try {
            const region = await Region.find({})
            res.json({
                success: true,
                message: "Barcha ismlar ro'yxxatga olingan",
                innerData: region,
            })
        }catch (error) {
            console.error("Error fetching Region:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi ism olishda  xatolik yuz berdi'
    
            })
    }
}

// ------ getRegionById ------

const getRegionById = async (req,res) => {
    try {
        const regionId =  req.params.id;

        const region = await Region.findById(regionId)

        if (!region) {
            return res.status(404).json({ message: "Region not faund"})

        }
        return res.status(200).json({message: "Region faund", Region})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Region ------

const deleteRegion = async (req, res) =>{
    try {
        const regionId = req.params.id

    const deteleRegion =  await Region.findByIdAndDelete(regionId)
        if (!deleteRegion) {
            return res.status(404).json({ message: "Region not faund"})

        }
        res.json({message: "Region deleled successfully", deleteRegion})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Region ---------

const updateRegion = async (req,res)=> {
    try {
        const {id} = req.params;
        const { name, } = req.body;
        const updateDate = {
            name,
        }
        const updateRegion = await Region.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateRegion) {
                    return res.status(404).json({
                        success: false,
                        message: "Region not faund"
                    })
                }
        
                res.json({
                    success: true,
                    message: "Region updeted successfully",
                    region: updateRegion
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}

// ----------- search Region -----------

const searchRegion = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv So'sini yozing"})

        }
        const result = await Region.find({
            $or: [
                {name: {$regex: query, $options: "i"}}
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "Ism topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching Region", error);
        res.status(500).json({message: "Server error: Failed to fetch Region"})
        
    }
}


module.exports = { 
    createRegion,
    getRegion,
    getRegionById,
    deleteRegion,
    updateRegion,
    searchRegion
} 
