import React from "react";
import { TbListDetails, TbLogout } from "react-icons/tb";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const DepartmentLayout = ({ children }) => {
  const routes = [
    {
      path: "/department-complaints",
      icon: <TbListDetails />,
      label: "Complaints",
    },
    {
      path: "/logout",
      icon: <TbLogout />,
      label: "Logout",
    },
  ];

  const { user } = useAuth();
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (!user) return;

    if (user.role !== "authority") {
      navigate(-1, { replace: true });
    } else {
      setChecked(true);
    }
  }, [user, navigate]);

  if (!checked) {
    return <h1>...loading</h1>;
  }

  return (
    <div id="wrapper">
      <div id="dot"></div>
      <div id="sub-wrapper">
        <NavBar routes={routes} />
        {children}
      </div>
    </div>
  );
};

export default DepartmentLayout;