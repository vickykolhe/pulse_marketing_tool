import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CampaignCreate from "./pages/CampaignCreate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/campaigns/new" element={<CampaignCreate />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
