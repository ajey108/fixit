/* eslint-disable */
import { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const IssueCard = ({ issue }) => {
  const { title, description, image, location, tags, upvotes = [] } = issue;
  const { token, user } = useAuth();

  // Local state for upvote count and user upvote status
  const [upvoteCount, setUpvoteCount] = useState(upvotes.length);
  const [hasUpvoted, setHasUpvoted] = useState(
    user ? upvotes.includes(user._id) : false
  );
  const [loading, setLoading] = useState(false);

  // Handle upvote action
  const handleUpvote = async () => {
    if (!token) {
      toast.error("Please login to upvote.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/issue/upvote",
        { issueId: issue._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Toggle UI state
      if (hasUpvoted) {
        setUpvoteCount((c) => c - 1);
      } else {
        setUpvoteCount((c) => c + 1);
      }
      setHasUpvoted((v) => !v);
    } catch (err) {
      toast.error("Failed to upvote the complaint");
      console.error("Error upvoting complaint:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-lg">
      <figure className="px-10 pt-10">
        <img
          src={
            image
              ? `http://localhost:5000${image}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0q3u_1gY-5AMD74XArOlxyxhSN_1TFxxhMA&s"
          }
          alt={title}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="flex items-center gap-2">
          <FiMapPin />
          <h4>
            {location?.address ||
              `${location?.city || ""} ${location?.coordinates?.lat || ""}, ${
                location?.coordinates?.lng || ""
              } ${location?.zip || ""}`}
          </h4>
        </div>
        <h4 className="py-1 px-3 border-1 text-white rounded-sm">{tags}</h4>

        <div className="card-actions flex flex-col items-center">
          <button
            onClick={handleUpvote}
            className={`btn btn-soft ${
              hasUpvoted ? "bg-green-600 text-white" : "btn-success"
            }`}
            disabled={loading}
          >
            Upvote ↑ <span className="ml-2">{upvoteCount}</span>
          </button>
          <span className="text-xs text-gray-400">
            Posted: {new Date(issue.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
