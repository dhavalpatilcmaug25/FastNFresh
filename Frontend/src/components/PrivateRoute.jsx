import { Navigate, Outlet } from "react-router-dom";
import { getRole } from "../services/RoleService";
import { getToken } from "../services/TokenService";
import { AccessDenied } from "./AccessDenied";

export function PrivateRoute(props) {
  const { allowedRoles } = props;
  const token = getToken();
  const role = getRole();

  if (token) {
    if (allowedRoles.includes(role)) {
      return <Outlet />;
    } else {
      return <AccessDenied />;
    }
  } else {
    return <Navigate to={"/"} />;
  }
}
