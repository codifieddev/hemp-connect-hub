import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Participants from "./pages/Participants";
import Events from "./pages/Events";
import { MenteeApplication } from "./pages/apply/MenteeApplication";
import { MentorApplication } from "./pages/apply/MentorApplication";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/admin/AdminPanel";
import Profile from "./pages/profile/Profile";

const queryClient = new QueryClient();


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/participants", element: <Participants /> },
  { path: "/participants/mentees", element: <Participants /> },
  { path: "/participants/mentors", element: <Participants /> },
  { path: "/participants/fellows", element: <Participants /> },
  { path: "/participants/counselors", element: <Participants /> },
  { path: "/events", element: <Events /> },
  { path: "/apply/mentee", element: <MenteeApplication /> },
  { path: "/apply/mentor", element: <MentorApplication /> },
  { path: "/profile/:id", element: <Profile /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/admin", element: <AdminPanel /> },
  // ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE
  { path: "*", element: <NotFound /> },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }}
        />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
