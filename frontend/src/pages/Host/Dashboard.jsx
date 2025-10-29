// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Toaster, toast } from "react-hot-toast";
// import { Search, Plus, LogOut, BarChart } from "lucide-react";

// // --- Axios Instance with Interceptor ---
// const API = axios.create({
//     baseURL: "https://property-listing-booking-platform.onrender.com/api",
// });

// API.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );


// // --- Reusable Components (Styled for Dark Theme) ---

// const LoadingSpinner = () => (
//     <div className="flex justify-center items-center py-20">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
//     </div>
// );

// const EmptyState = ({ onAddProperty }) => (
//     <div className="text-center bg-slate-800 rounded-lg shadow-lg border border-slate-700 p-12 mt-6">
//         <svg className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//             <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//         </svg>
//         <h3 className="mt-4 text-xl font-semibold text-white">No Properties Yet</h3>
//         <p className="mt-2 text-sm text-slate-400">It looks like you haven't listed any properties. Let's add your first one!</p>
//         <div className="mt-6">
//             <button onClick={onAddProperty} type="button" className="inline-flex items-center gap-2 px-4 py-2 border border-transparent shadow-lg text-sm font-medium rounded-md text-slate-900 bg-teal-500 hover:bg-teal-400 transition-all">
//                 <Plus size={18} />
//                 Add New Property
//             </button>
//         </div>
//     </div>
// );

// const PropertyCard = ({ property, onEdit, onDelete }) => (
//     <div key={property._id} className="bg-slate-800 rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-1.5 transition-all duration-300 border border-slate-700 hover:shadow-teal-400/20">
//         <div className="relative">
//             <img src={property.images?.[0] || "https://placehold.co/600x400/1e293b/94a3b8?text=Property"} alt={property.title} className="h-56 w-full object-cover" />
//             <div className="absolute top-0 right-0 bg-teal-500 text-slate-900 px-3 py-1 text-xs font-bold rounded-bl-lg tracking-wide">
//                 ₹{property.pricePerNight}<span className="font-normal">/night</span>
//             </div>
//             <div className="absolute top-2 left-2 bg-green-500/20 text-green-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
//                 Published
//             </div>
//         </div>
//         <div className="p-5">
//             <p className="text-sm font-semibold text-teal-400 uppercase tracking-wider">{property.type}</p>
//             <h3 className="text-xl font-bold text-white mt-1 truncate group-hover:text-teal-400 transition-colors">{property.title}</h3>
//             <p className="text-slate-400 mt-2 text-sm flex items-center gap-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
//                 {property.location}
//             </p>
//             <div className="mt-5 pt-4 border-t border-slate-700 flex justify-end items-center gap-3">
//                 <button onClick={() => onEdit(property._id)} className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors px-3 py-1 rounded-md hover:bg-slate-700">Edit</button>
//                 <button onClick={() => onDelete(property._id)} className="text-sm font-medium text-red-400 hover:text-white hover:bg-red-500 transition-all px-3 py-1 rounded-md border border-red-500/30 hover:border-red-500">Delete</button>
//             </div>
//         </div>
//     </div>
// );

// const Pagination = ({ currentPage, totalPages, onPageChange }) => (
//     <div className="flex justify-center items-center mt-12 gap-2">
//         <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 text-sm font-medium rounded-md transition-colors bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed">
//             Previous
//         </button>
//         {Array.from({ length: totalPages }, (_, i) => (
//             <button key={i} onClick={() => onPageChange(i + 1)} className={`w-10 h-10 text-sm font-medium rounded-md transition-colors border ${ currentPage === i + 1 ? "bg-teal-500 text-slate-900 border-teal-500 shadow-md" : "bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700" }`}>
//                 {i + 1}
//             </button>
//         ))}
//         <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 text-sm font-medium rounded-md transition-colors bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed">
//             Next
//         </button>
//     </div>
// );

// // --- Main HostDashboard Component ---
// export default function HostDashboard() {
//     const [user, setUser] = useState(null);
//     const [properties, setProperties] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [filter, setFilter] = useState({ location: "", type: "" });
//     const [page, setPage] = useState(1);
//     const perPage = 6;
//     const navigate = useNavigate();
//     const location = useLocation();

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const userRes = await API.get("/user/profile");
//             setUser(userRes.data);

//             const propsRes = await API.get("/properties/my-properties", { params: filter });
//             setProperties(propsRes.data);
//         } catch (err) {
//             console.error("Failed to fetch data:", err);
//             toast.error("Your session may have expired. Please log in again.");
//             localStorage.removeItem("token");
//             navigate("/login");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, [filter]);

//     useEffect(() => {
//         if (location.state?.newProperty) {
//             fetchData();
//             toast.success("New property added successfully!");
//             navigate(location.pathname, { replace: true, state: {} });
//         }
//     }, [location.state]);

//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this property?")) return;
//         try {
//             await API.delete(`/properties/${id}`);
//             setProperties(properties.filter((p) => p._id !== id));
//             toast.success("Property deleted successfully!");
//         } catch (err) {
//             console.error(err);
//             toast.error("Failed to delete property.");
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         toast.success("Logged out successfully!");
//         navigate("/login");
//     };

//     const totalPages = Math.ceil(properties.length / perPage);
//     const paginatedProperties = properties.slice((page - 1) * perPage, page * perPage);

//     return (
//         <div className="bg-slate-900 min-h-screen text-slate-300">
//             <Toaster position="top-right" toastOptions={{ style: { background: '#334155', color: '#e2e8f0' } }} />
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-700">
//                     <div>
//                         <h1 className="text-3xl font-bold text-white tracking-tight">Host Dashboard</h1>
//                         <p className="mt-1 text-md text-slate-400">
//                             Welcome back, {user ? <span className="font-semibold text-teal-400">{user.name}</span> : "Host"}!
//                         </p>
//                     </div>
//                     <div className="flex items-center gap-x-3">
//                         <button onClick={() => navigate("/host/add-property")} className="flex items-center justify-center gap-2 bg-teal-500 text-slate-900 px-4 py-2 rounded-md font-bold hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20">
//                             <Plus size={18} />
//                             Add Property
//                         </button>
//                         <button onClick={() => navigate("/host/analytics")} className="flex items-center justify-center gap-2 bg-slate-800 text-slate-300 px-4 py-2 rounded-md font-semibold hover:bg-slate-700 transition-colors shadow-sm border border-slate-700">
//                             <BarChart size={16} />
//                             Analytics
//                         </button>
//                         <button onClick={handleLogout} className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">
//                             <LogOut size={16} />
//                             Logout
//                         </button>
//                     </div>
//                 </header>

//                 <div className="bg-slate-800 rounded-lg shadow-lg p-4 mb-8 flex items-center gap-4 border border-slate-700">
//                     <p className="font-semibold text-slate-300">Filter by:</p>
//                     <div className="relative w-full sm:w-56">
//                         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                             <Search className="h-5 w-5 text-slate-400" />
//                         </div>
//                         <input
//                             placeholder="Location..."
//                             value={filter.location}
//                             onChange={(e) => setFilter({ ...filter, location: e.target.value })}
//                             className="block w-full rounded-md border-slate-600 bg-slate-700 pl-10 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm py-2"
//                         />
//                     </div>
//                     <select
//                         value={filter.type}
//                         onChange={(e) => setFilter({ ...filter, type: e.target.value })}
//                         className="w-full sm:w-48 rounded-md border-slate-600 bg-slate-700 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm py-2"
//                     >
//                         <option value="">All Types</option>
//                         <option value="apartment">Apartment</option>
//                         <option value="villa">Villa</option>
//                         <option value="cottage">Cottage</option>
//                         <option value="room">Room</option>
//                     </select>
//                 </div>

//                 {loading ? (
//                     <LoadingSpinner />
//                 ) : properties.length > 0 ? (
//                     <>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                             {paginatedProperties.map((p) => (
//                                 <PropertyCard
//                                     key={p._id}
//                                     property={p}
//                                     onEdit={(id) => navigate(`/host/edit-property/${id}`)}
//                                     onDelete={handleDelete}
//                                 />
//                             ))}
//                         </div>
//                         {totalPages > 1 && (
//                             <Pagination
//                                 currentPage={page}
//                                 totalPages={totalPages}
//                                 onPageChange={(p) => setPage(p)}
//                             />
//                         )}
//                     </>
//                 ) : (
//                     <EmptyState onAddProperty={() => navigate("/host/add-property")} />
//                 )}
//             </div>
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { Search, Plus, LogOut, BarChart } from "lucide-react";

// --- Axios Instance with Interceptor ---
const API = axios.create({
    baseURL: "https://property-listing-booking-platform.onrender.com/api",
});

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

// --- Reusable Components ---
const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
    </div>
);

const EmptyState = ({ onAddProperty }) => (
    <div className="text-center bg-slate-800 rounded-lg shadow-lg border border-slate-700 p-12 mt-6">
        <svg className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="mt-4 text-xl font-semibold text-white">No Properties Yet</h3>
        <p className="mt-2 text-sm text-slate-400">It looks like you haven't listed any properties. Let's add your first one!</p>
        <div className="mt-6">
            <button onClick={onAddProperty} type="button" className="inline-flex items-center gap-2 px-4 py-2 border border-transparent shadow-lg text-sm font-medium rounded-md text-slate-900 bg-teal-500 hover:bg-teal-400 transition-all">
                <Plus size={18} />
                Add New Property
            </button>
        </div>
    </div>
);

const PropertyCard = ({ property, onEdit, onDelete }) => {
    // Handle local vs Cloudinary images
    const imageUrl = property.images?.[0]
        ? property.images[0].startsWith("http")
            ? property.images[0]
            : `https://property-listing-booking-platform.onrender.com/${property.images[0]}`
        : "https://placehold.co/600x400/1e293b/94a3b8?text=Property";

    return (
        <div key={property._id} className="bg-slate-800 rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-1.5 transition-all duration-300 border border-slate-700 hover:shadow-teal-400/20">
            <div className="relative">
                <img src={imageUrl} alt={property.title} className="h-56 w-full object-cover" />
                <div className="absolute top-0 right-0 bg-teal-500 text-slate-900 px-3 py-1 text-xs font-bold rounded-bl-lg tracking-wide">
                    ₹{property.pricePerNight}<span className="font-normal">/night</span>
                </div>
                <div className="absolute top-2 left-2 bg-green-500/20 text-green-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Published
                </div>
            </div>
            <div className="p-5">
                <p className="text-sm font-semibold text-teal-400 uppercase tracking-wider">{property.type}</p>
                <h3 className="text-xl font-bold text-white mt-1 truncate group-hover:text-teal-400 transition-colors">{property.title}</h3>
                <p className="text-slate-400 mt-2 text-sm flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                    {property.location}
                </p>
                <div className="mt-5 pt-4 border-t border-slate-700 flex justify-end items-center gap-3">
                    <button onClick={() => onEdit(property._id)} className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors px-3 py-1 rounded-md hover:bg-slate-700">Edit</button>
                    <button onClick={() => onDelete(property._id)} className="text-sm font-medium text-red-400 hover:text-white hover:bg-red-500 transition-all px-3 py-1 rounded-md border border-red-500/30 hover:border-red-500">Delete</button>
                </div>
            </div>
        </div>
    );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex justify-center items-center mt-12 gap-2">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 text-sm font-medium rounded-md transition-colors bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed">
            Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => onPageChange(i + 1)} className={`w-10 h-10 text-sm font-medium rounded-md transition-colors border ${ currentPage === i + 1 ? "bg-teal-500 text-slate-900 border-teal-500 shadow-md" : "bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700" }`}>
                {i + 1}
            </button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 text-sm font-medium rounded-md transition-colors bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed">
            Next
        </button>
    </div>
);

// --- Main HostDashboard Component ---
export default function HostDashboard() {
    const [user, setUser] = useState(null);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({ location: "", type: "" });
    const [page, setPage] = useState(1);
    const perPage = 6;
    const navigate = useNavigate();
    const location = useLocation();

    const fetchData = async () => {
        setLoading(true);
        try {
            const userRes = await API.get("/user/profile");
            setUser(userRes.data);

            const propsRes = await API.get("/properties/my-properties", { params: filter });
            setProperties(propsRes.data);
        } catch (err) {
            console.error("Failed to fetch data:", err);
            toast.error("Your session may have expired. Please log in again.");
            localStorage.removeItem("token");
            navigate("/login");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filter]);

    useEffect(() => {
        if (location.state?.newProperty) {
            fetchData();
            toast.success("New property added successfully!");
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;
        try {
            await API.delete(`/properties/${id}`);
            setProperties(properties.filter((p) => p._id !== id));
            toast.success("Property deleted successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete property.");
        }
    };

    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // ✅ Remove stored user too
    toast.success("Logged out successfully!");
    navigate("/login");
};


    const totalPages = Math.ceil(properties.length / perPage);
    const paginatedProperties = properties.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="bg-slate-900 min-h-screen text-slate-300">
            <Toaster position="top-right" toastOptions={{ style: { background: '#334155', color: '#e2e8f0' } }} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-700">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Host Dashboard</h1>
                        <p className="mt-1 text-md text-slate-400">
                            Welcome back, {user ? <span className="font-semibold text-teal-400">{user.name}</span> : "Host"}!
                        </p>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <button onClick={() => navigate("/host/add-property")} className="flex items-center justify-center gap-2 bg-teal-500 text-slate-900 px-4 py-2 rounded-md font-bold hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20">
                            <Plus size={18} />
                            Add Property
                        </button>
                        <button onClick={() => navigate("/host/analytics")} className="flex items-center justify-center gap-2 bg-slate-800 text-slate-300 px-4 py-2 rounded-md font-semibold hover:bg-slate-700 transition-colors shadow-sm border border-slate-700">
                            <BarChart size={16} />
                            Analytics
                        </button>
                        <button onClick={handleLogout} className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </header>

                <div className="bg-slate-800 rounded-lg shadow-lg p-4 mb-8 flex items-center gap-4 border border-slate-700">
                    <p className="font-semibold text-slate-300">Filter by:</p>
                    <div className="relative w-full sm:w-56">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            placeholder="Location..."
                            value={filter.location}
                            onChange={(e) => setFilter({ ...filter, location: e.target.value })}
                            className="block w-full rounded-md border-slate-600 bg-slate-700 pl-10 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm py-2"
                        />
                    </div>
                    <select
                        value={filter.type}
                        onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                        className="w-full sm:w-48 rounded-md border-slate-600 bg-slate-700 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm py-2"
                    >
                        <option value="">All Types</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="cottage">Cottage</option>
                        <option value="room">Room</option>
                    </select>
                </div>

                {loading ? (
                    <LoadingSpinner />
                ) : properties.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {paginatedProperties.map((p) => (
                                <PropertyCard
                                    key={p._id}
                                    property={p}
                                    onEdit={(id) => navigate(`/host/edit-property/${id}`)}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={(p) => setPage(p)}
                            />
                        )}
                    </>
                ) : (
                    <EmptyState onAddProperty={() => navigate("/host/add-property")} />
                )}
            </div>
        </div>
    );
}
