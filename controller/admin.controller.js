const { Admin } = require("../model/adminSchema");

const createAdmin = async (req, res) => {
  try {
    const {
      name,
      login,
      hashed_password,
      is_active,
      is_creator,
      hashed_refresh_token,
    } = req.body;

    const newAdmin = new Admin({
      name,
      login,
      hashed_password,
      is_active,
      is_creator,
      hashed_refresh_token,
    });

    await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "Admin muvaffaqiyatli yaratildi.",
      innerData: newAdmin,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});

    res.status(200).json({
      success: true,
      innerData: admins,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin topilmadi.",
      });
    }

    res.status(200).json({
      success: true,
      innerData: admin,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin topilmadi.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin yangilandi.",
      innerData: updatedAdmin,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin topilmadi.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin o'chirildi.",
      innerData: deletedAdmin,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const searchAdmin = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query parameter required.",
      });
    }

    const result = await Admin.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { login: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      innerData: result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  searchAdmin,
};