const {Lang} = require("../model/langSchema")



// ------------- postLang -----
const createLang = async (req,res) => {
    try {
        const {
            name,
        } = req.body

        const existingLang = await Lang.findOne({name})
        console.log(existingLang);
        if (existingLang) {
            return res.status(400).json({
                success: false,
                message: "Bu nom bn ro'yxtadan otgan ism mavjud"
            })
        }else {
            const newLang = new Lang({
                name,
            })
            await newLang.save();

            return res.status(201).json({
                success: true,
                message: "Ism muvaffaqiyatli ro'xatdan otdi ",
                lang: newLang,
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

// ------------getLang --------


const getLang  =  async (req, res) => {
     try {
            const lang = await Lang.find({})
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

// ------ getLangById ------

const getLangById = async (req,res) => {
    try {
        const langId =  req.params.id;

        const lang = await Lang.findById(langId)

        if (!lang) {
            return res.status(404).json({ message: "Lang not faund"})

        }
        return res.status(200).json({message: "Lang faund", lang})

    }catch(error) {
        console.error(error);
        res.status(500).json({message: "Inter Server Error"})
    }
}


// ------- delete Lang ------

const deleteLang = async (req, res) =>{
    try {
        const langId = req.params.id

    const deteleLang =  await Lang.findByIdAndDelete(langId)
        if (!deleteLang) {
            return res.status(404).json({ message: "Lang not faund"})

        }
        res.json({message: "Lang deleled successfully", deleteLang})
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

// ------ update Lang ---------

const updateLang = async (req,res)=> {
    try {
        const {id} = req.params;
        const { name, } = req.body;
        const updateDate = {
            name,
        }
        const updateLang = await Lang.findByIdAndUpdate(id, updateDate, {
            new: true,
        })

        if (!updateLang) {
                    return res.status(404).json({
                        success: false,
                        message: "Lang not faund"
                    })
                }
        
                res.json({
                    success: true,
                    message: "Lang updeted successfully",
                    lang: updateLang
                })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Interval server Error"
        })
    }
}

// ----------- search Types -----------

const searchLang = async (req,res) => {
    try {
        const { query } = req.query;

        if (!query  || typeof query !== "string") {
            return res.status(400).json({message: "Qidiruv So'sini yozing"})

        }
        const result = await Lang.find({
            $or: [
                {name: {$regex: query, $options: "i"}}
            ]
        })

        if (result.length === 0) {
            return res.json({ message: "Ism topilmadi"})
        }
        res.json({result});
    }catch (error) {
        console.error("error fetching lang", error);
        res.status(500).json({message: "Server error: Failed to fetch lang"})
        
    }
}


module.exports = { 
   createLang,
   getLang,
   getLangById,
   updateLang,
   deleteLang,
   searchLang
} 
