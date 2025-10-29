
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

// Create an Axios instance with a base URL
const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Add a request interceptor to include the token in headers
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// --- Helper Components & Icons ---
const UploadIcon = () => (
    <svg className="w-8 h-8 mb-4 text-slate-400" aria-hidden="true" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 20 16">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
    </svg>
);

const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export default function AddProperty() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "Surat, Gujarat",
        pricePerNight: "",
        type: "apartment",
        amenities: "Wifi, Air Conditioning",
    });
    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = images.length + files.length;

        if (totalImages > 6) {
            toast.error("You can only upload a maximum of 6 images.");
            return;
        }

        const newImages = [...images, ...files];
        setImages(newImages);

        const newPreviews = files.map(f => URL.createObjectURL(f));
        setPreview(prev => [...prev, ...newPreviews]);
    };

    const handleRemoveImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
        setPreview(preview.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title || !form.location || !form.pricePerNight || images.length === 0) {
            toast.error("Please fill all required fields and upload at least one image.");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            Object.keys(form).forEach(key => formData.append(key, form[key]));
            images.forEach(file => formData.append("images", file));

            const res = await API.post("/properties", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast.success("Property added successfully!");
            navigate("/host/dashboard");

        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Error adding property.");
        } finally {
            setLoading(false);
        }
    };

    const formInputClass = "block w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition";
    const labelClass = "block text-sm font-medium text-slate-300 mb-2";

    return (
        <div className="bg-slate-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-right" toastOptions={{
                style: { background: '#334155', color: '#e2e8f0' }
            }} />
            <div className="max-w-3xl mx-auto bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-white">List Your Property</h2>
                    <p className="mt-2 text-sm text-slate-400">Fill in the details below to get started.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className={labelClass}>Property Title</label>
                        <input id="title" name="title" placeholder="e.g., Cozy Beachfront Villa" value={form.title} onChange={handleChange} className={formInputClass} required />
                    </div>
                    <div>
                        <label htmlFor="description" className={labelClass}>Description</label>
                        <textarea id="description" name="description" rows="4" placeholder="A detailed description of your property..." value={form.description} onChange={handleChange} className={formInputClass} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="location" className={labelClass}>Location</label>
                            <input id="location" name="location" placeholder="e.g., Surat, Gujarat" value={form.location} onChange={handleChange} className={formInputClass} required />
                        </div>
                        <div>
                            <label htmlFor="pricePerNight" className={labelClass}>Price per Night (₹)</label>
                            <input id="pricePerNight" name="pricePerNight" type="number" placeholder="4500" value={form.pricePerNight} onChange={handleChange} className={formInputClass} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="type" className={labelClass}>Property Type</label>
                            <select id="type" name="type" value={form.type} onChange={handleChange} className={formInputClass}>
                                <option value="apartment">Apartment</option>
                                <option value="villa">Villa</option>
                                <option value="cottage">Cottage</option>
                                <option value="room">Room</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="amenities" className={labelClass}>Amenities (comma-separated)</label>
                            <input id="amenities" name="amenities" placeholder="e.g., Wifi, Pool, Air Conditioning" value={form.amenities} onChange={handleChange} className={formInputClass} />
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Property Images (Up to 6)</label>
                        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-600 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <UploadIcon />
                                <div className="flex text-sm text-slate-400">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-slate-700 rounded-md font-medium text-teal-400 hover:text-teal-300 focus-within:outline-none px-2 py-1">
                                        <span>Upload files</span>
                                        <input id="file-upload" name="file-upload" type="file" multiple accept="image/*" onChange={handleImageChange} className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>

                    {preview.length > 0 && (
                        <div>
                            <p className="text-sm font-medium text-slate-300">Image Previews</p>
                            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                                {preview.map((url, idx) => (
                                    <div key={idx} className="relative group">
                                        <img src={url} alt={`preview ${idx + 1}`} className="h-24 w-full object-cover rounded-md shadow-sm" />
                                        <button type="button" onClick={() => handleRemoveImage(idx)} className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-110">
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <button type="submit" disabled={loading} className="w-full mt-6 bg-teal-500 text-slate-900 py-3 rounded-lg font-bold text-lg hover:bg-teal-400 transition-colors duration-300 disabled:bg-teal-800 disabled:text-slate-400 shadow-lg shadow-teal-500/20 flex justify-center items-center">
                            {loading && <Spinner />}
                            {loading ? 'Submitting...' : 'Add Property'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
