import User from "../models/UserModel.js";

export const searchContact = async(req, res) => {
    const { searchTerm } = req.body;
    if(searchTerm === undefined || searchTerm === null) {
        return res.status(400).json({
            message: "Search term is required"
        });
    }

    const sanitizedSearchTerm = searchTerm.replace(
        /[.*+?^${}()|[\]\\]/g, '\\$&'
    );
    const regex = new RegExp(sanitizedSearchTerm, 'i');
    const contacts = await User.find({
        $and:[
            {_id: { $ne: req.userId}},
            {
                $or: [
                    { firstName: regex },
                    { lastName: regex },
                    { email: regex },
                ]
            }
        ]
    }).select('-password');
    return res.status(200).json({
        contacts
    });
}