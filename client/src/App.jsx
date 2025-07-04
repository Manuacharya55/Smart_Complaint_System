import NavBar from "./components/NavBar";
import AdminLayout from "./layouts/AdminLayout";
import Complaint from "./pages/admin/Complaint";
import DashBoard from "./pages/admin/DashBoard";
import Department from "./pages/admin/Department";
import Place from "./pages/admin/Place";
import Users from "./pages/admin/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {BrowserRouter,Routes,Route} from "react-router-dom"

const App = () => {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Register/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>


    <Route path="/department" element={<AdminLayout><Department/></AdminLayout>}/>
    <Route path="/places" element={<AdminLayout><Place/></AdminLayout>}/>
    <Route path="/users" element={<AdminLayout><Users/></AdminLayout>}/>
    <Route path="/dashboard" element={<AdminLayout><DashBoard/></AdminLayout>}/>
    <Route path="/complaints" element={<AdminLayout><Complaint/></AdminLayout>}/>



  </Routes>
  </BrowserRouter>
};

export default App;
