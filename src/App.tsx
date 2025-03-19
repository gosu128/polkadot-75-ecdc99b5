
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PitchAdvise from "./pages/PitchAdvise";
import EnterprisePitch from "./pages/EnterprisePitch";
import Segments from "./pages/Segments";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PitchAdvise />} />
          <Route path="/enterprise-pitch" element={<EnterprisePitch />} />
          <Route path="/segments" element={<Segments />} />
          <Route path="/resources" element={<Resources />} />
          {/* Redirects for old routes */}
          <Route path="/pmf-scores" element={<Segments />} />
          <Route path="/bd-teams" element={<Resources />} />
          <Route path="/case-studies" element={<Resources />} />
          <Route path="/methodology" element={<Resources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
