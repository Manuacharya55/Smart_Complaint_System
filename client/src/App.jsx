import NavBar from "./components/NavBar";
import Image from "./components/user/Image";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import Complaint from "./pages/admin/Complaint";
import DashBoard from "./pages/admin/DashBoard";
import Department from "./pages/admin/Department";
import Place from "./pages/admin/Place";
import Users from "./pages/admin/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import UploadComplaint from "./pages/user/UploadComplaint";
import UserComplaints from "./pages/user/UserComplaints";

const App = () => {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Register/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/image" element={<Image/>}/>


    <Route path="/department" element={<AdminLayout><Department/></AdminLayout>}/>
    <Route path="/places" element={<AdminLayout><Place/></AdminLayout>}/>
    <Route path="/users" element={<AdminLayout><Users/></AdminLayout>}/>
    <Route path="/dashboard" element={<AdminLayout><DashBoard/></AdminLayout>}/>
    <Route path="/complaints" element={<AdminLayout><Complaint/></AdminLayout>}/>

    
    <Route path="/upload-complaint" element={<UserLayout><UploadComplaint/></UserLayout>}/>
    <Route path="/user-complaints" element={<UserLayout><UserComplaints/></UserLayout>}/>

  </Routes>
  </BrowserRouter>
};

export default App;
