
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../api/axios";

// // ✨ Mock icons for demonstration purposes. In a real app, use an SVG icon library.
// const BedIcon = () => <span role="img" aria-label="Bed">🛏️</span>;
// const BathIcon = () => <span role="img" aria-label="Bath">🛁</span>;
// const LocationIcon = () => <span role="img" aria-label="Location">📍</span>;

// export default function Home() {
//   const [properties, setProperties] = useState([]);
//   const [filter, setFilter] = useState({ location: "", type: "" });
//   const [page, setPage] = useState(1);
//   const perPage = 6;
//   const navigate = useNavigate();

//   // ✅ Fetching logic remains the same
//   const fetchProperties = async () => {
//     try {
//       const res = await API.get("/properties", { params: filter });
//       setProperties(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchProperties();
//   }, [filter]);

//   const totalPages = Math.ceil(properties.length / perPage);
//   const paginated = properties.slice((page - 1) * perPage, page * perPage);

//   // ✅ Logout logic remains the same
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     // ✨ New dark theme for a more premium feel
//     <div className="bg-slate-900 text-white min-h-screen">
//       {/* 🌟 Navbar - Frosted glass effect */}
//       <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             {/* Brand / Logo */}
//             <h1
//               onClick={() => navigate("/")}
//               className="text-3xl font-bold text-teal-400 cursor-pointer tracking-wider"
//             >
//               Estately
//             </h1>

//             {/* Right Buttons */}
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => navigate("/bookings")}
//                 className="font-medium text-slate-300 hover:text-teal-400 transition-colors"
//               >
//                 My Bookings
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* 🏡 Hero Section with Integrated Filters */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="relative pt-24 pb-20 text-center">
//             <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-400">
//                 Discover Your Perfect Home
//             </h1>
//             <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
//                 The best properties, curated just for you. Find your next chapter with us.
//             </p>

//             {/* ✨ Filters are now integrated into the hero section */}
//             <div className="mt-8 bg-slate-800/50 p-4 rounded-xl shadow-2xl backdrop-blur-md border border-slate-700 flex flex-wrap gap-4 justify-center items-center max-w-2xl mx-auto">
//                 <input
//                     placeholder="Search by location..."
//                     value={filter.location}
//                     onChange={(e) => setFilter({ ...filter, location: e.target.value })}
//                     className="p-3 bg-slate-700 text-white border border-slate-600 rounded-lg w-full sm:w-60 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition placeholder-slate-400"
//                 />
//                 <select
//                     value={filter.type}
//                     onChange={(e) => setFilter({ ...filter, type: e.target.value })}
//                     className="p-3 bg-slate-700 text-white border border-slate-600 rounded-lg w-full sm:w-48 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
//                 >
//                     <option value="">All Types</option>
//                     <option value="apartment">Apartment</option>
//                     <option value="villa">Villa</option>
//                     <option value="cottage">Cottage</option>
//                     <option value="room">Room</option>
//                 </select>
//             </div>
//         </div>


//         {/* 💎 Premium Property Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
//           {paginated.map((p) => (
//             <div
//               key={p._id}
//               className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 transition-all duration-300 hover:shadow-teal-400/20 hover:-translate-y-2 flex flex-col group"
//             >
//               <div className="relative">
//                 <img
//                   src={p.images[0]}
//                   alt={p.title}
//                   className="h-60 w-full object-cover"
//                 />
//                 <div className="absolute top-0 right-0 m-3 px-3 py-1 bg-slate-900/70 text-teal-300 text-sm font-bold rounded-full capitalize backdrop-blur-sm">
//                     {p.type}
//                 </div>
//               </div>
              
//               <div className="p-6 flex flex-col flex-grow">
//                 <div className="flex-grow">
//                   <h2 className="text-2xl font-bold text-white group-hover:text-teal-400 transition-colors">{p.title}</h2>
//                   <div className="flex items-center gap-2 mt-2 text-slate-400">
//                     <LocationIcon />
//                     <span>{p.location}</span>
//                   </div>

//                   {/* Mock data for amenities */}
//                   <div className="flex items-center gap-6 mt-4 text-slate-300 border-t border-slate-700 pt-4">
//                       <div className="flex items-center gap-2"><BedIcon /> 3 Beds</div>
//                       <div className="flex items-center gap-2"><BathIcon /> 2 Baths</div>
//                   </div>
//                 </div>

//                 <div className="mt-5 pt-5 border-t border-slate-700 flex justify-between items-center">
//                   <p className="text-2xl text-white font-bold">
//                     ${p.pricePerNight}
//                     <span className="text-sm font-normal text-slate-400">/night</span>
//                   </p>
//                   <button
//                     onClick={() => navigate(`/properties/${p._id}`)}
//                     className="bg-teal-500 text-slate-900 px-6 py-2 rounded-lg font-bold hover:bg-teal-400 transition-colors transform hover:scale-105"
//                   >
//                     Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ✨ Pagination - Styled to match the new dark theme */}
//         <div className="flex justify-center items-center pb-12 gap-2">
//           <button
//             onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//             disabled={page === 1}
//             className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Previous
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => setPage(i + 1)}
//               className={`px-4 py-2 rounded-lg border border-slate-700 ${
//                 page === i + 1
//                   ? "bg-teal-500 text-slate-900 font-bold border-teal-500"
//                   : "bg-slate-800 text-slate-300 hover:bg-slate-700"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button
//             onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={page === totalPages || totalPages === 0}
//             className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../api/axios";

// // --- Safe property image component ---
// const PropertyImage = ({ images, title }) => {
//   let src = "https://placehold.co/600x400/1e293b/94a3b8?text=Property"; // default placeholder
//   if (images?.[0]) {
//     src = images[0].startsWith("http")
//       ? images[0]                     // Cloudinary or full URL
//       : `http://localhost:5000/${images[0]}`; // local backend path
//   }
//   return <img src={src} alt={title} className="h-60 w-full object-cover" />;
// };

// export default function Home() {
//   const [properties, setProperties] = useState([]);
//   const [filter, setFilter] = useState({ location: "", type: "" });
//   const [page, setPage] = useState(1);
//   const perPage = 6;
//   const navigate = useNavigate();

//   // --- Fetch properties from backend ---
//   const fetchProperties = async () => {
//     try {
//       const res = await API.get("/properties", { params: filter });
//       setProperties(res.data);
//       setPage(1); // Reset to first page when filter changes
//     } catch (err) {
//       console.error("Failed to fetch properties:", err);
//     }
//   };

//   useEffect(() => {
//     fetchProperties();
//   }, [filter]);

//   const totalPages = Math.ceil(properties.length / perPage);
//   const paginated = properties.slice((page - 1) * perPage, page * perPage);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className="bg-slate-900 text-white min-h-screen">
//       {/* Navbar */}
//       <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <h1
//               onClick={() => navigate("/")}
//               className="text-3xl font-bold text-teal-400 cursor-pointer tracking-wider"
//             >
//               Estately
//             </h1>
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => navigate("/bookings")}
//                 className="font-medium text-slate-300 hover:text-teal-400 transition-colors"
//               >
//                 My Bookings
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero & Filters */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="relative pt-24 pb-20 text-center">
//           <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-400">
//             Discover Your Perfect Home
//           </h1>
//           <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
//             The best properties, curated just for you. Find your next chapter with us.
//           </p>

//           <div className="mt-8 bg-slate-800/50 p-4 rounded-xl shadow-2xl backdrop-blur-md border border-slate-700 flex flex-wrap gap-4 justify-center items-center max-w-2xl mx-auto">
//             <input
//               placeholder="Search by location..."
//               value={filter.location}
//               onChange={(e) => setFilter({ ...filter, location: e.target.value })}
//               className="p-3 bg-slate-700 text-white border border-slate-600 rounded-lg w-full sm:w-60 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition placeholder-slate-400"
//             />
//             <select
//               value={filter.type}
//               onChange={(e) => setFilter({ ...filter, type: e.target.value })}
//               className="p-3 bg-slate-700 text-white border border-slate-600 rounded-lg w-full sm:w-48 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
//             >
//               <option value="">All Types</option>
//               <option value="apartment">Apartment</option>
//               <option value="villa">Villa</option>
//               <option value="cottage">Cottage</option>
//               <option value="room">Room</option>
//             </select>
//           </div>
//         </div>

//         {/* Property Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
//           {paginated.length > 0 ? (
//             paginated.map((p) => (
//               <div
//                 key={p._id}
//                 className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 transition-all duration-300 hover:shadow-teal-400/20 hover:-translate-y-2 flex flex-col group"
//               >
//                 <div className="relative">
//                   <PropertyImage images={p.images} title={p.title} />
//                   <div className="absolute top-0 right-0 m-3 px-3 py-1 bg-slate-900/70 text-teal-300 text-sm font-bold rounded-full capitalize backdrop-blur-sm">
//                     {p.type}
//                   </div>
//                 </div>

//                 <div className="p-6 flex flex-col flex-grow">
//                   <h2 className="text-2xl font-bold text-white group-hover:text-teal-400 transition-colors">{p.title}</h2>
//                   <p className="mt-2 text-slate-400 flex items-center gap-2">
//                     📍 {p.location}
//                   </p>

//                   <div className="mt-5 pt-5 border-t border-slate-700 flex justify-between items-center">
//                     <p className="text-2xl text-white font-bold">
//                       ${p.pricePerNight}
//                       <span className="text-sm font-normal text-slate-400">/night</span>
//                     </p>
//                     <button
//                       onClick={() => navigate(`/properties/${p._id}`)}
//                       className="bg-teal-500 text-slate-900 px-6 py-2 rounded-lg font-bold hover:bg-teal-400 transition-colors transform hover:scale-105"
//                     >
//                       Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-slate-400 col-span-full mt-12">No properties found.</p>
//           )}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center pb-12 gap-2">
//             <button
//               onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//               disabled={page === 1}
//               className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Previous
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setPage(i + 1)}
//                 className={`px-4 py-2 rounded-lg border border-slate-700 ${
//                   page === i + 1
//                     ? "bg-teal-500 text-slate-900 font-bold border-teal-500"
//                     : "bg-slate-800 text-slate-300 hover:bg-slate-700"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={page === totalPages || totalPages === 0}
//               className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

// --- Safe property image component ---
const PropertyImage = ({ images, title }) => {
  let src = "https://placehold.co/600x400/1e293b/94a3b8?text=Property"; // default placeholder
  if (images?.[0]) {
    src = images[0].startsWith("http")
      ? images[0]                     // Cloudinary or full URL
      : `http://localhost:5000/${images[0]}`; // local backend path
  }
  return <img src={src} alt={title} className="h-60 w-full object-cover" />;
};

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState({ location: "", type: "" });
  const [page, setPage] = useState(1);
  const perPage = 6;
  const navigate = useNavigate();

  // --- Fetch properties from backend ---
  const fetchProperties = async () => {
    try {
      const res = await API.get("/properties", { params: filter });
      setProperties(res.data);
      setPage(1); // Reset to first page when filter changes
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filter]);

  const totalPages = Math.ceil(properties.length / perPage);
  const paginated = properties.slice((page - 1) * perPage, page * perPage);

  // ✅ FIXED LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // <-- very important
    navigate("/login");
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1
              onClick={() => navigate("/")}
              className="text-3xl font-bold text-teal-400 cursor-pointer tracking-wider"
            >
              Estately
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/bookings")}
                className="font-medium text-slate-300 hover:text-teal-400 transition-colors"
              >
                My Bookings
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* (rest of your Home.jsx unchanged) */}
      {/* Hero, Filters, Cards, Pagination — all same as before */}
    </div>
  );
}
