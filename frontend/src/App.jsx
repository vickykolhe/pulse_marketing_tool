import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CampaignCreate from "./pages/CampaignCreate";
import CampaignList from "./pages/CampaignList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/campaigns/new" element={<CampaignCreate />} />
        <Route path="/campaigns" element={<CampaignList />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
