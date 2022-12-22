import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  const auth = Boolean(useSelector((store) => store.auth.token));
  return auth ? <Outlet /> : <Navigate to="/" />;
}
