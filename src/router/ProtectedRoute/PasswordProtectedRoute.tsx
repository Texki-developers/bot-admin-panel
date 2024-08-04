import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logout } from "../../features/manageAuth/manageAuthSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../app/axiosInstance";

export default function PasswordProtectedRoute() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isValid, setValidity] = useState<boolean>(true);

  useEffect(() => {
    checkUserAuthenticated();
  }, []);

  const checkUserAuthenticated = async () => {
    try {
      const data = await axiosInstance.get("user/admin/check");

      if (data?.data?.status) {
        setValidity(true);
      } else {
        dispatch(logout());
        setValidity(false);
        navigate("/login");
      }
    } catch (err) {
      dispatch(logout());
      setValidity(false);
      navigate("/login");
    }
  };
  return <>{isValid && <Outlet />}</>;
}
