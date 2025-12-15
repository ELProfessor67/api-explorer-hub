import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CreateAgent from "./pages/agent/CreateAgent";
import GetAgent from "./pages/agent/GetAgent";
import UpdateAgent from "./pages/agent/UpdateAgent";
import DeleteAgent from "./pages/agent/DeleteAgent";
import GetCalls from "./pages/calls/GetCalls";
import MakeCall from "./pages/calls/MakeCall";
import GetCallStats from "./pages/calls/GetCallStats";
import GetNumbers from "./pages/calls/GetNumbers";
import DeleteNumbers from "./pages/calls/DeleteNumbers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/agent/create" element={<CreateAgent />} />
          <Route path="/agent/get" element={<GetAgent />} />
          <Route path="/agent/update" element={<UpdateAgent />} />
          <Route path="/agent/delete" element={<DeleteAgent />} />
          <Route path="/calls/get" element={<GetCalls />} />
          <Route path="/calls/make" element={<MakeCall />} />
          <Route path="/calls/stats" element={<GetCallStats />} />
          <Route path="/calls/numbers" element={<GetNumbers />} />
          <Route path="/calls/delete-numbers" element={<DeleteNumbers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
