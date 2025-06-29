import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const IssueStatus = () => {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/issue/myIssues",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setComplaints(res.data.issues);
      } catch (err) {
        toast.error("Failed to fetch your complaints");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-start p-8">
        <h2 className="text-2xl font-bold mb-6 text-green-700">
          Your Complaints Status
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : complaints.length === 0 ? (
          <p className="text-gray-500">
            You have not posted any complaints yet.
          </p>
        ) : (
          <div className="w-full max-w-2xl space-y-4">
            {complaints.map((complaint) => (
              <div
                key={complaint._id}
                className="border rounded-lg p-4 shadow  flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-amber-600">
                    {complaint.title}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      complaint.status === "Resolved"
                        ? "bg-green-200 text-green-800"
                        : complaint.status === "In Progress"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {complaint.status}
                  </span>
                </div>
                <p className="">{complaint.description}</p>
                <span className="text-xs text-gray-400">
                  Posted: {new Date(complaint.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default IssueStatus;
