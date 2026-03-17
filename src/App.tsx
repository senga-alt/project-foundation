import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Navbar } from '@/components/Navbar';
import Index from './pages/Index';
import Feed from './pages/Feed';
import Leaderboard from './pages/Leaderboard';
import TipPage from './pages/Tip';
import TipDetail from './pages/TipDetail';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => {
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar
              walletConnected={walletConnected}
              onToggleWallet={() => setWalletConnected(prev => !prev)}
            />
            <Routes>
              <Route path="/" element={<Index walletConnected={walletConnected} />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/tip" element={<TipPage walletConnected={walletConnected} />} />
              <Route path="/tip/:id" element={<TipDetail />} />
              <Route path="/profile/:address" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
