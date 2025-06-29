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
    const issues = await Issue.find();
    res.status(200).json({ issues });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};

//get my issues
export const myIssue = async (req, res) => {
  console.log(req.user);
  try {
    const userId = req.user.id;
    console.log("userId from mycompliats", userId);
    const issues = await Issue.find({ user: userId });
    res.json({ issues });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//Upvote

export const toggleUpvote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { issueId } = req.body; // complaint ID

    console.log("User ID:", userId);

    const issue = await Issue.findById(issueId);
    console.log("complaint from upvote:", issue);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    const hasUpvoted = issue.upvotes.includes(userId);

    if (hasUpvoted) {
      // remove upvote
      issue.upvotes = issue.upvotes.filter(
        (uid) => uid.toString() !== userId.toString()
      );
    } else {
      // add upvote
      issue.upvotes.push(userId);
    }

    await issue.save();
    console.log("updated issue:", issue);

    res.status(200).json({
      message: hasUpvoted ? "Upvote removed" : "Upvote added",
      totalUpvotes: issue.upvotes.length,
      upvoted: !hasUpvoted,
    });
  } catch (err) {
    console.error("Toggle upvote error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//delete complaint #Admin
export const deleteComplaint = async (req, res) => {
  console.log(req.params);
  try {
    const { id } = req.params;

    const issue = await Issue.findByIdAndDelete(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.status(200).json({ message: "Issue deleted successfully", issue });
  } catch (err) {
    console.error("Delete issue error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
