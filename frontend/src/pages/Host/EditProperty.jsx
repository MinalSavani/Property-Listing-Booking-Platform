
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/axios";

export default function EditProperty() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    pricePerNight: "",
    type: "apartment",
    amenities: "",
  });
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await API.get("/properties");
        const prop = res.data.find((p) => p._id === id);
        if (!prop) return navigate("/host/dashboard");

        setForm({
          title: prop.title,
          description: prop.description,
          location: prop.location,
          pricePerNight: prop.pricePerNight,
          type: prop.type,
          amenities: prop.amenities.join(","),
        });
        setPreview(prop.images);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperty();
  }, [id, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreview(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in form) formData.append(key, form[key]);
      images.forEach((file) => formData.append("images", file));

      await API.patch(`/properties/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Property updated successfully!");
      navigate("/host/dashboard");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error updating property");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900 font-sans px-4">
      <div className="w-full max-w-2xl bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700">
        <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-400">
          Edit Property
        </h2>

        {message && (
          <p className="text-center text-teal-400 mb-4 font-medium">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-slate-300 mb-2">Title</label>
            <input
              name="title"
              placeholder="Property Title"
              value={form.title}
              onChange={handleChange}
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Describe your property"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Location</label>
            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Price per Night</label>
            <input
              name="pricePerNight"
              type="number"
              placeholder="₹"
              value={form.pricePerNight}
              onChange={handleChange}
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Property Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            >
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="cottage">Cottage</option>
              <option value="room">Room</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Amenities</label>
            <input
              name="amenities"
              placeholder="Comma separated"
              value={form.amenities}
              onChange={handleChange}
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-slate-300"
            />
          </div>

          {preview.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {preview.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt="preview"
                  className="h-24 w-32 object-cover rounded-lg border border-slate-600 shadow-md"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-teal-500 text-slate-900 py-3 rounded-lg font-semibold text-lg hover:bg-teal-400 transition-colors duration-300 shadow-lg shadow-teal-500/20"
          >
            Update Property
          </button>
        </form>
      </div>
    </div>
  );
}

