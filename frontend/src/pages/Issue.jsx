import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const Issue = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    city: "",
    zip: "",
    lat: "",
    lng: "",
    tags: [],
    image: null,
  });

  const { token } = useAuth();

  //handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //file change
  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  //tagchange
  const handleTagChange = (e) => {
    const tag = e.target.value;
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);

      const location = {
        city: form.city,
        zip: form.zip,
        coordinates: {
          lat: parseFloat(form.lat),
          lng: parseFloat(form.lng),
        },
      };
      formData.append("location", JSON.stringify(location));
      formData.append("tags", JSON.stringify(form.tags));

      if (form.image) {
        formData.append("image", form.image);
      }

      const res = await axios.post(
        "http://localhost:5000/api/issue/createissue",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", res.data);
      toast.success("Complaint created successfully!");
      setForm({
        title: "",
        description: "",
        city: "",
        zip: "",
        lat: "",
        lng: "",
        tags: [],
        image: null,
      });
    } catch (err) {
      console.error("Error submitting complaint:", err);
      alert(err.response?.data?.error || "Submission failed");
    }
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mt-10 p-8  rounded-lg shadow-lg flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Submit a Complaint
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          rows={3}
        />

        <div className="flex gap-3">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={form.zip}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex gap-3">
          <input
            type="number"
            name="lat"
            placeholder="Latitude"
            value={form.lat}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            name="lng"
            placeholder="Longitude"
            value={form.lng}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <fieldset className="border border-gray-200 rounded p-4">
          <legend className="font-semibold text-gray-700 mb-2">
            Select Tags:
          </legend>
          <div className="flex flex-wrap gap-4">
            {["Electricity", "Water", "Road", "Garbage", "Other"].map((tag) => (
              <label key={tag} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={tag}
                  checked={form.tags.includes(tag)}
                  onChange={handleTagChange}
                  className="accent-blue-500"
                />
                {tag}
              </label>
            ))}
          </div>
        </fieldset>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded px-4 py-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
        >
          Submit Complaint
        </button>
      </form>
    </>
  );
};

export default Issue;
