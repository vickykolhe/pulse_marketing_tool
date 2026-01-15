import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import CampaignCreate from "./pages/CampaignCreate";
import CampaignList from "./pages/CampaignList";
import SubscriberList from "./pages/SubscriberList";
import AddSubscriber from "./pages/AddSubscriber";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaigns/new" element={<CampaignCreate />} />
          <Route path="/campaigns/edit/:id" element={<CampaignCreate />} />

          <Route path="/campaigns" element={<CampaignList />} />
          <Route path="/subscribers" element={<SubscriberList />} />
          <Route path="/subscribers/add" element={<AddSubscriber />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
