import User from "../models/UserModel.js";

export const searchContact = async (req, res, next) => {
  try {
    const { searchTerm } = req.body;

    if (searchTerm === undefined || searchTerm === null) {
      return res.status(400).send("Please provide a searchTerm");
    }

    const sanitizedSearchTerm = searchTerm
      .trim()
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape special characters
    const regex = new RegExp(sanitizedSearchTerm, "i"); // case-insensitive search

    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.userId } }, // exclude the current user
        {
          $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
        },
      ],
    });
    return res.status(200).json({ contacts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
