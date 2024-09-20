import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import CompanyDashboard from "./pages/CompanyDashboard";
function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationPage />} />

          {/* COmpany */}
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
