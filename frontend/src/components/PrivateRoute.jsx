import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Logged in but wrong role
    return <Navigate to="/" replace />;
  }

  return children;
}
// import { Navigate } from "react-router-dom";

// export default function PrivateRoute({ children, role }) {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   if (!token || !user) {
//     // Not logged in
//     return <Navigate to="/login" replace />;
//   }

//   if (role && user.role.toLowerCase() !== role.toLowerCase()) {
//     // Logged in but wrong role
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }
