import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  console.log("token from dashboard", token);

  const [complaints, setComplaints] = useState([]);
  console.log("complaints for dashboard", complaints);

  //fetch complaints
  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/issue/allIssues");
      setComplaints(res.data.issues);
    } catch (err) {
      console.error("Error fetching complaints", err);
    }
  };

  // Fetch complaints when component mounts
  useEffect(() => {
    fetchComplaints();
  }, []);

  // Handle status change
  const handleStatusChange = async (id, status) => {
    console.log("id from handleStatusChange", id);
    console.log("status from handleStatusChange", status);
    if (!token) {
      toast.error(" not authorized to perform this action!");
      return;
    }
    try {
      await axios.put(
        `http://localhost:5000/api/admin/update/${id}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(" status updated successfully!");
      fetchComplaints();
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  //delete handler
  const handleDelete = async (id) => {
    console.log("id from handleDelete", id);
    if (!token) {
      toast.error(" not authorized to perform this action!");
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/admin/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Complaint deleted successfully!");
      fetchComplaints(); // refresh list
    } catch (err) {
      toast.error("Error deleting complaint!");
      console.error("Error deleting complaint", err);
    }
  };

  //logout

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
    toast.success("Logged out successfully!");
  };

  return (
    <div className="min-h-screen  px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-900"
        >
          Logout
        </button>
      </div>

      <div className="space-y-4">
        {complaints.length === 0 ? (
          <p>No complaints found.</p>
        ) : (
          complaints.map((c) => (
            <div
              key={c._id}
              className="bg-gray-700 p-4 rounded shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-green-600 ">
                  {c.title}
                </h2>
                <p className="">{c.description}</p>
                <p className="text-sm mt-1 ">
                  Status:{" "}
                  <span className="font-medium text-gray-900">{c.status}</span>
                </p>
                <p className="text-sm mt-1 ">
                  City: <span className="font-medium ">{c.location.city}</span>
                </p>
                <span className="text-xs text-yellow-600">
                  Posted: {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="flex gap-2 flex-col sm:flex-row">
                <select
                  value={c.status}
                  onChange={(e) => handleStatusChange(c._id, e.target.value)}
                  className="border bg-gray-800 px-2 py-1 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>

                <button
                  onClick={() => handleDelete(c._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
