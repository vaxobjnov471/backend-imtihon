const {Human} = require("../model/human_categorySchema")



// ------------- postHuman_category -----
const createHuman_category = async (req,res) => {
    try {
        const {
            name,
            start_age,
            finish_age,
            gender,
        } = req.body

        const existingHuman_category = await Human.findOne({name })
        console.log(existingHuman_category);
        if (existingHuman_category) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan human_category mavjud"
            })
        }else {
            const newHuman_category = new Human({
                name,
                start_age,
                finish_age,
                gender,
            })
            await newHuman_category.save();

            return res.status(201).json({
                success: true,
                message: "Human_category muvaffaqiyatli ro'xatdan otdi ",
                human_category: newHuman_category,
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

// ------------getHuman_category --------


const getHuman_category  =  async (req, res) => {
     try {
            const human_category = await Human.find({})
            res.json({
                success: true,
                message: "Barcha Human_category ro'yxxatga olingan",
                innerData: human_category,
            })
        }catch (error) {
            console.error("Error fetching human_category:", error)
            res.status(500).json({
                success: false,
                message: 'Serverda xatosi human_category olishda  xatolik yuz berdi'

            })
    }
}

// ------ getHuman_categoryById ------

const getHuman_categoryById = async (req,res) => {
    try {
        const human_categoryId =  req.params.id;

        const human_category = await Human.findById(human_categoryId)

        if (!human_category) {
            return res.status(404).json({ message: "Human_category not faund"})

        }
        return res.status(200).json({message: "Human_category faund", human_category})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Human_category ------

const deleteHuman_category = async (req, res) =>{
    try {
        const human_categoryId = req.params.id

    const deteleHuman_category =  await Human.findByIdAndDelete(human_categoryId)
        if (!deleteHuman_category) {
            return res.status(404).json({ message: "Human_category not faund"})

        }
        res.json({message: "Human_category deleled successfully", deleteHuman_category})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Human_category ---------

const updateHuman_category = async (req,res)=> {
    try {
        const {id} = req.params;
        const { name, start_age, finish_age, gender, } = req.body;
        const updateDate = {
            name,
            start_age,
            finish_age,
            gender,
        }
        const updateHuman_category = await Human.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateHuman_category) {
                    return res.status(404).json({
                        success: false,
                        message: "Human_category not faund"
                    })
                }

                res.json({
                    success: true,
                    message: "Human_category updeted successfully",
                    human_category: updateHuman_category
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}



const searchHuman_category = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv So'sini yozing"})

        }
        const result = await Human_category.find({
            $or: [
                {name: {$regex: query, $options: "i"}}
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "Ism topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching human categories", error);
        res.status(500).json({message: "Server error: Failed to fetch human categories"})
        
    }
}



module.exports = {
    createHuman_category,
    getHuman_category,
    getHuman_categoryById,
    deleteHuman_category,
    updateHuman_category,
    searchHuman_category
}