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
import  Blog  from "@/components/landingpage/pages/BLog"
import { Changelog } from "@/components/landingpage/pages/Changelog";
import SignUp from "./components/landingpage/pages/SignUp";

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

          {/* Catch-all route redirects to Landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
