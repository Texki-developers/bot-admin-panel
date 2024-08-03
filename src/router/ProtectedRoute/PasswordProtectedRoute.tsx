import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logout } from "../../features/manageAuth/manageAuthSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { validateJWTExpiration } from "../../utils/validateJWTExpiration/validateJWTExpiration";
import { axiosInstance } from "../../app/axiosInstance";

export default function PasswordProtectedRoute() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isValid, setValidity] = useState<boolean>(true);

  useEffect(() => {
    checkUserAuthenticated();
  }, []);

  const checkUserAuthenticated = async () => {
    const data = await axiosInstance.post("user/admin/check");
    console.log(data);

    // if (valid) {
    //   setValidity(true);
    // } else {
    //   dispatch(logout());
    //   setValidity(false);
    //   navigate("/login");
    // }
  };
  return <>{isValid && <Outlet />}</>;
}
