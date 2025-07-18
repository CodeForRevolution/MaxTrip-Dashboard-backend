const Enquiry = require("../models/Enquiry");

const createEnquiry = async (req, res) => {
    const { fullName, email, mobile,distination,members,date ,packageName} = req.body;
    try {
        const data = await Enquiry.create({ fullName, email, mobile,distination,members,date,packageName });
        res.status(200).json({
            success: true,
            message: "Enquiry created successfully",
            data,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Enquiry not created",
            error,
        });
    }
}

const deleteEnquiry = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Enquiry.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Enquiry deleted successfully",
            data,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Enquiry not deleted",
            error,
        });
    }
}
const getEnquiry = async (req, res) => {
    try {
        const data = await Enquiry.find();
        res.status(200).json({
            success: true,
            message: "Enquiry fetched successfully",
            data,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Enquiry not fetched",
            error,
        });
    }
}

module.exports={createEnquiry,deleteEnquiry,getEnquiry}