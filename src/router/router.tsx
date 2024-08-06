import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout/AppLayout";
import Login from "../pages/Login/Login";
import AddSecretCode from "../pages/Add Secret Code/AddSecretCode";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
    
          {
            path: "/secret-code",
            element: <AddSecretCode />,
          },

    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
