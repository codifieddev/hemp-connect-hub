import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Participants from "./pages/Participants";
import Events from "./pages/Events";
import { MenteeApplication } from "./pages/apply/MenteeApplication";
import { MentorApplication } from "./pages/apply/MentorApplication";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/participants" element={<Participants />} />
          <Route path="/participants/mentees" element={<Participants />} />
          <Route path="/participants/mentors" element={<Participants />} />
          <Route path="/participants/fellows" element={<Participants />} />
          <Route path="/participants/counselors" element={<Participants />} />
          <Route path="/events" element={<Events />} />
          <Route path="/apply/mentee" element={<MenteeApplication />} />
          <Route path="/apply/mentor" element={<MentorApplication />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
