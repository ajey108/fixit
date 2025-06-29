import Issue from "../models/issueModel.js";

//create issue controller
export const createIssue = async (req, res) => {
  console.log("Incoming body:", req.body);
  console.log("Incoming file:", req.file);
  try {
    const { title, description, location, tags } = req.body;

    if (!title || !description || !location || !tags) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userId = req.user.id;

    let imageUrl = "";
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const validTags = ["Electricity", "Water", "Road", "Garbage", "Other"];
    const parsedTags = JSON.parse(tags).filter((tag) =>
      validTags.includes(tag)
    );

    // Validate location format
    const parsedLocation = JSON.parse(location);
    console.log("Parsed location:", parsedLocation);

    // create a new issue
    const issue = new Issue({
      title,
      description,
      location: parsedLocation,
      tags: parsedTags,
      image: imageUrl,
      user: userId,
    });

    await issue.save();

    res.status(201).json({ message: "Issue created", issue });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};

//get all issues
export const allIssues = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json({ complaints });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};
