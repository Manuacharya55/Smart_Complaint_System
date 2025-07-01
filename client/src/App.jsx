import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import ImageUpload from "./components/ImageUpload";
import UserLayout from "./Layouts/UserLayout";
import UploadComplaint from "./pages/user/UploadComplaint";
import AllComplaints from "./pages/user/AllComplaints";
import Department from "./pages/admin/Department";
import State from "./pages/admin/State";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nav" element={<ImageUpload />} />

        <Route path="/upload-complaint" element={<UserLayout />}>
          <Route index element={<UploadComplaint />} />
        </Route>

        <Route path="/all-complaint" element={<UserLayout />}>
          <Route index element={<AllComplaints />} />
        </Route>

        <Route path="/department" element={<Department />} />
        <Route path="/state" element={<State />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
