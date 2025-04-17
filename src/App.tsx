import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Landing } from "./Landing";
import Blog from "@/components/landingpage/pages/BLog";
import { Changelog } from "@/components/landingpage/pages/Changelog";
import SignUp from "./components/landingpage/pages/SignUp";
import { createClient } from "@supabase/supabase-js";
import PrivacyPolicy from "./components/landingpage/pages/PrivacyPolicy";

const supabase = createClient(
  "https://qhydmtfzqutlroodbjhr.supabase.co",
  "<eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoeWRtdGZ6cXV0bHJvb2RiamhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMzU4NjAsImV4cCI6MjA1NzcxMTg2MH0.vrWuGzVvkDHhAVogvjMC7ZXKjvtFfCkbrXbg2CVXKaQ>"
);

const queryClient = new QueryClient();

const LandingWrapper = () => (
  <div>
    <Landing />
    <Outlet />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default route to Landing */}
          <Route path="/" element={<LandingWrapper />} />
          <Route path="Blog" element={<Blog />} />
          <Route path="Changelog" element={<Changelog />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />

          {/* Catch-all route redirects to Landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
