
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import API from "../../api/axios";

// const LocationIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
//     <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//   </svg>
// );

// export default function PropertyDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [property, setProperty] = useState(null);
//   const [dates, setDates] = useState({ checkIn: "", checkOut: "" });
//   const [message, setMessage] = useState("");
//   const [activeImage, setActiveImage] = useState(0);

//   const token = localStorage.getItem("token");

//   // ✅ Proper image URL helper
//   const getImageUrl = (img) => {
//     if (!img) return "https://placehold.co/600x400/1e293b/94a3b8?text=Property";
//     return img.startsWith("http") ? img : `http://localhost:5000/${img}`;
//   };

//   const fetchProperty = async () => {
//     try {
//       const res = await API.get(`/properties/${id}`);
//       setProperty(res.data);
//     } catch (err) {
//       console.error(err);
//       setMessage("Property not found");
//     }
//   };

//   useEffect(() => {
//     if (id) fetchProperty();
//   }, [id]);

//   const getNights = () => {
//     if (!dates.checkIn || !dates.checkOut) return 0;
//     const diff = new Date(dates.checkOut) - new Date(dates.checkIn);
//     return Math.ceil(diff / (1000 * 60 * 60 * 24));
//   };

//   const handleBooking = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (!dates.checkIn || !dates.checkOut) {
//       return setMessage("Please select both check-in and check-out dates.");
//     }

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const checkInDate = new Date(dates.checkIn);
//     const checkOutDate = new Date(dates.checkOut);

//     if (checkInDate < today) return setMessage("Check-in date cannot be in the past.");
//     if (checkOutDate <= checkInDate) return setMessage("Check-out must be after check-in.");

//     const nights = getNights();
//     const totalAmount = nights * property.pricePerNight;

//     try {
//       await API.post(
//         "/bookings",
//         { propertyId: property._id, checkIn: dates.checkIn, checkOut: dates.checkOut, totalAmount },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Booking successful! Navigating to your bookings.");
//       navigate(`/bookings`);
//     } catch (err) {
//       const errMsg = err.response?.data?.message || "Booking failed!";
//       setMessage(errMsg);
//       toast.error(errMsg);
//     }
//   };

//   if (!property) {
//     return (
//       <div className="bg-slate-900 min-h-screen flex items-center justify-center">
//         <p className="text-xl text-slate-500">{message || "Loading property details..."}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-slate-900 text-slate-300">
//       <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <h1 onClick={() => navigate("/")} className="text-3xl font-bold text-teal-400 cursor-pointer tracking-wider">Estately</h1>
//           <button onClick={() => navigate("/")} className="text-sm font-medium text-slate-300 hover:text-teal-400"> &larr; Back to Listings</button>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
//         <div className="mb-8">
//           <h1 className="text-4xl font-extrabold text-white tracking-tight">{property.title}</h1>
//           <div className="mt-2 flex items-center gap-2 text-md text-slate-400">
//             <LocationIcon />
//             <span>{property.location}</span>
//           </div>
//         </div>

//         {/* Image Gallery */}
//         <div className="mb-12">
//           <div className="w-full h-[550px] mb-3">
//             <img src={getImageUrl(property.images[activeImage])} alt="Main property view" className="w-full h-full object-cover rounded-xl shadow-lg"/>
//           </div>
//           <div className="flex gap-3">
//             {property.images.map((img, idx) => (
//               <div key={idx} className="w-1/5 h-28 cursor-pointer" onClick={() => setActiveImage(idx)}>
//                 <img src={getImageUrl(img)} alt={`Thumbnail ${idx+1}`} className={`w-full h-full object-cover rounded-md transition-all duration-200 ${activeImage === idx ? 'ring-4 ring-teal-400' : 'opacity-60 hover:opacity-100'}`}/>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
//           <div className="lg:col-span-2">
//             <div className="pb-8">
//               <h2 className="text-3xl font-bold text-white capitalize">{property.type} Details</h2>
//               <p className="mt-4 text-slate-400 leading-relaxed">{property.description}</p>
//             </div>
//           </div>

//           <div className="mt-8 lg:mt-0">
//             <div className="sticky top-28">
//               <form onSubmit={handleBooking} className="bg-slate-800 p-6 rounded-xl shadow-2xl border border-slate-700 space-y-6">
//                 <p className="text-3xl text-white font-bold">
//                   ${property.pricePerNight}{" "}
//                   <span className="text-base font-normal text-slate-400">/ night</span>
//                 </p>
                
//                 {message && <p className="text-center text-red-400 text-sm bg-red-500/10 p-2 rounded-md border border-red-500/30">{message}</p>}

//                 <div className="bg-slate-700 border border-slate-600 rounded-lg p-3">
//                   <div className="grid grid-cols-2">
//                     <div className="pr-3 border-r border-slate-600">
//                       <label className="block text-xs font-semibold text-slate-400">CHECK-IN</label>
//                       <input type="date" value={dates.checkIn} onChange={(e) => setDates({ ...dates, checkIn: e.target.value })} className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-200" required/>
//                     </div>
//                     <div className="pl-3">
//                       <label className="block text-xs font-semibold text-slate-400">CHECK-OUT</label>
//                       <input type="date" value={dates.checkOut} onChange={(e) => setDates({ ...dates, checkOut: e.target.value })} className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-200" required/>
//                     </div>
//                   </div>
//                 </div>
                
//                 {getNights() > 0 && (
//                   <div className="border-t border-slate-700 pt-4 space-y-2 text-slate-300">
//                     <div className="flex justify-between"><span>${property.pricePerNight} x {getNights()} nights</span> <span>${getNights() * property.pricePerNight}</span></div>
//                     <div className="flex justify-between font-bold text-white text-lg"><span>Total</span> <span>${getNights() * property.pricePerNight}</span></div>
//                   </div>
//                 )}
                
//                 <button type="submit" className="w-full bg-teal-500 text-slate-900 py-3 rounded-lg font-bold text-lg hover:bg-teal-400 transition-all transform hover:scale-105 shadow-lg shadow-teal-500/20">
//                   Reserve
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../../api/axios";

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [dates, setDates] = useState({ checkIn: "", checkOut: "" });
  const [message, setMessage] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  const token = localStorage.getItem("token");

  // ✅ Helper for image URLs
  const getImageUrl = (img) => {
    if (!img) return "https://placehold.co/600x400/1e293b/94a3b8?text=Property";
    return img.startsWith("http") ? img : `http://localhost:5000/${img}`;
  };

  // ✅ Fetch property details
  const fetchProperty = async () => {
    try {
      const res = await API.get(`/properties/${id}`);
      setProperty(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Property not found");
    }
  };

  useEffect(() => {
    if (id) fetchProperty();
  }, [id]);

  // ✅ Calculate number of nights
  const getNights = () => {
    if (!dates.checkIn || !dates.checkOut) return 0;
    const diff = new Date(dates.checkOut) - new Date(dates.checkIn);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // ✅ Handle Booking
  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!dates.checkIn || !dates.checkOut) {
      return setMessage("Please select both check-in and check-out dates.");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkInDate = new Date(dates.checkIn);
    const checkOutDate = new Date(dates.checkOut);

    if (checkInDate < today) return setMessage("Check-in date cannot be in the past.");
    if (checkOutDate <= checkInDate) return setMessage("Check-out must be after check-in.");

    const nights = getNights();
    const totalAmount = nights * property.pricePerNight;

    try {
      await API.post(
        "/bookings",
        { propertyId: property._id, checkIn: dates.checkIn, checkOut: dates.checkOut, totalAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Success message + toast (No redirect)
      toast.success("Booking successful! Confirmation email sent. Please check your inbox.");
      setMessage("Booking successful! Confirmation email sent. Please check your inbox.");
    } catch (err) {
      const errMsg = err.response?.data?.message || "Booking failed!";
      setMessage(errMsg);
      toast.error(errMsg);
    }
  };

  if (!property) {
    return (
      <div className="bg-slate-900 min-h-screen flex items-center justify-center">
        <p className="text-xl text-slate-500">{message || "Loading property details..."}</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-slate-300">
      {/* Navbar */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1
            onClick={() => navigate("/")}
            className="text-3xl font-bold text-teal-400 cursor-pointer tracking-wider"
          >
            Estately
          </h1>
          <button
            onClick={() => navigate("/home")}
            className="text-sm font-medium text-slate-300 hover:text-teal-400"
          >
            &larr; Back to Listings
          </button>
        </div>
      </nav>

      {/* Main Section */}
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">{property.title}</h1>
          <div className="mt-2 flex items-center gap-2 text-md text-slate-400">
            <LocationIcon />
            <span>{property.location}</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-12">
          <div className="w-full h-[550px] mb-3">
            <img
              src={getImageUrl(property.images[activeImage])}
              alt="Main property view"
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
          </div>
          <div className="flex gap-3">
            {property.images.map((img, idx) => (
              <div
                key={idx}
                className="w-1/5 h-28 cursor-pointer"
                onClick={() => setActiveImage(idx)}
              >
                <img
                  src={getImageUrl(img)}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`w-full h-full object-cover rounded-md transition-all duration-200 ${
                    activeImage === idx ? "ring-4 ring-teal-400" : "opacity-60 hover:opacity-100"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details + Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="pb-8">
              <h2 className="text-3xl font-bold text-white capitalize">{property.type} Details</h2>
              <p className="mt-4 text-slate-400 leading-relaxed">{property.description}</p>
            </div>
          </div>

          {/* Booking Card */}
          <div className="mt-8 lg:mt-0">
            <div className="sticky top-28">
              <form
                onSubmit={handleBooking}
                className="bg-slate-800 p-6 rounded-xl shadow-2xl border border-slate-700 space-y-6"
              >
                <p className="text-3xl text-white font-bold">
                  ${property.pricePerNight}{" "}
                  <span className="text-base font-normal text-slate-400">/ night</span>
                </p>

                {message && (
                  <p className="text-center text-red-400 text-sm bg-red-500/10 p-2 rounded-md border border-red-500/30">
                    {message}
                  </p>
                )}

                <div className="bg-slate-700 border border-slate-600 rounded-lg p-3">
                  <div className="grid grid-cols-2">
                    <div className="pr-3 border-r border-slate-600">
                      <label className="block text-xs font-semibold text-slate-400">CHECK-IN</label>
                      <input
                        type="date"
                        value={dates.checkIn}
                        onChange={(e) =>
                          setDates({ ...dates, checkIn: e.target.value })
                        }
                        className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-200"
                        required
                      />
                    </div>
                    <div className="pl-3">
                      <label className="block text-xs font-semibold text-slate-400">CHECK-OUT</label>
                      <input
                        type="date"
                        value={dates.checkOut}
                        onChange={(e) =>
                          setDates({ ...dates, checkOut: e.target.value })
                        }
                        className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-200"
                        required
                      />
                    </div>
                  </div>
                </div>

                {getNights() > 0 && (
                  <div className="border-t border-slate-700 pt-4 space-y-2 text-slate-300">
                    <div className="flex justify-between">
                      <span>
                        ${property.pricePerNight} x {getNights()} nights
                      </span>
                      <span>${getNights() * property.pricePerNight}</span>
                    </div>
                    <div className="flex justify-between font-bold text-white text-lg">
                      <span>Total</span>
                      <span>${getNights() * property.pricePerNight}</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-teal-500 text-slate-900 py-3 rounded-lg font-bold text-lg hover:bg-teal-400 transition-all transform hover:scale-105 shadow-lg shadow-teal-500/20"
                >
                  Reserve
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
