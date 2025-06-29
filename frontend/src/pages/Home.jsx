import IssueCard from "../components/IssueCard";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const TAGS = ["All", "Electricity", "Water", "Road", "Garbage", "Other"];

const Home = () => {
  const { issues } = useAuth();
  const issuesArray = Array.isArray(issues) ? issues : issues?.issues || [];
  console.log("issues in home", issues);
  const [selectedTag, setSelectedTag] = useState("All");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const filter = params.get("filter");

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  // 1. Filter by tag
  let filteredIssues =
    selectedTag === "All"
      ? [...issuesArray]
      : issuesArray.filter((issue) => issue.tags?.includes(selectedTag));

  // 2. Sort by upvotes if "hot" filter is active
  if (filter === "hot") {
    filteredIssues.sort(
      (a, b) => (b.upvotes?.length || 0) - (a.upvotes?.length || 0)
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen ">
        <div className="my-10">
          <ul className="flex items-center justify-center gap-3 text-lg font-semibold text-green-700 ">
            {TAGS.map((tag) => (
              <li
                key={tag}
                className={`hover:underline cursor-pointer ${
                  selectedTag === tag ? "text-gray-400 underline" : ""
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap rounded-lg items-center justify-between min-h-[60vh] w-full gap-8 p-8">
          {filteredIssues?.length > 0 ? (
            filteredIssues.map((issue) => (
              <IssueCard key={issue._id} issue={issue} />
            ))
          ) : (
            <p className="text-gray-500">No complaints found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
