import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import DashboardLayout from "./components/dashboard/DashboardLayout.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminCourses from "./pages/admin/AdminCourses.jsx";
import Home from "./pages/Home.jsx";
import Programs from "./pages/Programs.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import CategoryCourses from "./pages/CategoryCourses.jsx";
import Pricing from "./pages/Pricing.jsx";
import Trainers from "./pages/Trainers.jsx";
import Contact from "./pages/Contact.jsx";
import Faq from "./pages/Faq.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ComingSoon from "./pages/ComingSoon.jsx";
import UnderConstruction from "./pages/UnderConstruction.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DashboardPlaceholder from "./pages/DashboardPlaceholder.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      {/* Public marketing site */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/category/:category" element={<CategoryCourses />} />
        <Route path="/internship" element={<UnderConstruction title="Internship Program" />} />
        <Route path="/talent" element={<UnderConstruction title="Talent Marketplace" />} />
        <Route path="/services" element={<UnderConstruction title="Services" />} />
        <Route path="/success-stories" element={<UnderConstruction title="Success Stories" />} />
        <Route path="/about" element={<UnderConstruction title="About Us" />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Auth pages — no header/footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/coming-soon" element={<ComingSoon />} />

      {/* Protected dashboard */}
      <Route
        path="/dashboard"
        element={
          <AdminRoute>
            <DashboardLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="reports" element={<DashboardPlaceholder title="Reports" />} />
        <Route path="settings" element={<DashboardPlaceholder title="Settings" />} />
      </Route>
    </Routes>
    </>
  );
}
