import { useEffect, useState } from "react";
import Tile from "../../components/Tile";
import QuickLinks from "../../components/QuickLinks";
import { BsBuilding } from "react-icons/bs";
import { TbUsers } from "react-icons/tb";
import { TbLocation } from "react-icons/tb";
import { TbListDetails } from "react-icons/tb";
import Banner from "../../components/Banner";
import { useAuth } from "../../context/UserContext";
import { toast } from "react-hot-toast";
import { getRequest } from "../../services/Api";
import Loader from "../../components/Loader";

const DashBoard = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboard = async () => {
    if (!user?.token) return;

    const response = await getRequest("dashboard/", user?.token);
    if (response.success) {
      setIsLoading(false);
      setData(response.data);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (user?.token) fetchDashboard();
  }, [user?.token]);

  return isLoading ? (
   <Loader/>
  ) : (
    <div id="container">
      <Banner text={"Dashboard"} />
      <div id="tile-container">
        <Tile name={"Total Users"} count={data?.totalUsers} />
        <Tile name={"Total Department"} count={data?.totalDepartments} />
        <Tile name={"Total Places"} count={data?.totalPlaces} />
      </div>

      <div id="tile-container">
        <Tile name={"Pending Complaints"} count={data.complaints.Pending} />
        <Tile name={"Processing Complaints"} count={data.complaints.Processing} />
        <Tile name={"Solved Complaint"} count={data.complaints.Resolved} />
      </div>

      <div id="dashbaord-links">
        <QuickLinks icon={<TbUsers />} text={"Users"} link={"/users"} />
        <QuickLinks
          icon={<BsBuilding />}
          text={"Departments"}
          link={"/department"}
        />
        <QuickLinks icon={<TbLocation />} text={"Locations"} link={"/places"} />
        <QuickLinks
          icon={<TbListDetails />}
          text={"Complaints"}
          link={"/complaints"}
        />
      </div>
    </div>
  );
};

export default DashBoard;
