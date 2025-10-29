// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
//         <h1 className="text-2xl font-bold text-indigo-600">MyApp</h1>
//         <div className="space-x-4">
//           <Link className="text-gray-700 hover:text-indigo-600" to="/">Home</Link>
//           {!token ? (
//             <>
//               <Link className="text-gray-700 hover:text-indigo-600" to="/signup">Signup</Link>
//               <Link className="text-gray-700 hover:text-indigo-600" to="/login">Login</Link>
//             </>
//           ) : (
//             <>
//               <Link className="text-gray-700 hover:text-indigo-600" to="/profile">Profile</Link>
//               <Link className="text-gray-700 hover:text-indigo-600" to="/dashboard">Dashboard</Link>
//               <button
//                 onClick={handleLogout}
//                 className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Import the custom hook

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ✅ Get user and logout from context

  const handleLogout = () => {
    logout(); // ✅ Clears both token & user from localStorage
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <h1 className="text-2xl font-bold text-indigo-600">MyApp</h1>
        <div className="space-x-4">
          <Link className="text-gray-700 hover:text-indigo-600" to="/">Home</Link>

          {!user ? (
            <>
              <Link className="text-gray-700 hover:text-indigo-600" to="/signup">
                Signup
              </Link>
              <Link className="text-gray-700 hover:text-indigo-600" to="/login">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link className="text-gray-700 hover:text-indigo-600" to="/profile">
                Profile
              </Link>

              {/* Optional: role-based link */}
              {user.role === "host" && (
                <Link className="text-gray-700 hover:text-indigo-600" to="/host/dashboard">
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
