

import AdminLayout from "./layouts/AdminLayout"
import UserLayout from "./layouts/UserLayout";
import DepartmentLayout from "./layouts/DepartmentLayout";
import Complaint from "./pages/admin/Complaint";
import DashBoard from "./pages/admin/DashBoard";
import Department from "./pages/admin/Department";
import Place from "./pages/admin/Place";
import Users from "./pages/admin/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadComplaint from "./pages/user/UploadComplaint";
import UserComplaints from "./pages/user/UserComplaints";
import Complaints from "./pages/department/Complaints";
import Complaintdetails from "./pages/admin/Complaintdetails";
import SingleComplaint from "./pages/department/SingleComplaint";
import Logout from "./pages/Logout";
import ComplaintDescription from "./pages/user/ComplaintDescription";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route
          path="/department"
          element={
            <AdminLayout>
              <Department />
            </AdminLayout>
          }
        />
        <Route
          path="/places"
          element={
            <AdminLayout>
              <Place />
            </AdminLayout>
          }
        />
        <Route
          path="/users"
          element={
            <AdminLayout>
              <Users />
            </AdminLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AdminLayout>
              <DashBoard />
            </AdminLayout>
          }
        />
        <Route
          path="/complaints"
          element={
            <AdminLayout>
              <Complaint />
            </AdminLayout>
          }
        />
        <Route
          path="/complaint/:id"
          element={
            <AdminLayout>
              <Complaintdetails />
            </AdminLayout>
          }
        />

        <Route
          path="/upload-complaint"
          element={
            <UserLayout>
              <UploadComplaint />
            </UserLayout>
          }
        />
        <Route
          path="/user-complaints"
          element={
            <UserLayout>
              <UserComplaints />
            </UserLayout>
          }
        />

<Route
          path="/user-complaint/:id"
          element={
            <UserLayout>
              <ComplaintDescription />
            </UserLayout>
          }
        />
        <Route
          path="/department-complaints"
          element={
            <DepartmentLayout>
              <Complaints />
            </DepartmentLayout>
          }
        />
        <Route
          path="/department-complaint/:id"
          element={
            <DepartmentLayout>
              <SingleComplaint />
            </DepartmentLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
