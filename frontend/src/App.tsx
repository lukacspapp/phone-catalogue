import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { PhoneListPage } from '@/pages/PhoneListPage';
import { PhoneDetailPage } from '@/pages/PhoneDetailPage';
import { cacheConfig } from '@/config/cache';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...cacheConfig.defaults.queries,
    },
  },
});

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="phone-catalogue-theme">
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <header className="border-b">
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">📱</h1>
                <ModeToggle />
              </div>
            </header>

            <main>
              <Routes>
                <Route path="/" element={<Navigate to="/phones" replace />} />
                <Route path="/phones" element={<PhoneListPage />} />
                <Route path="/phone/:id" element={<PhoneDetailPage />} />
              </Routes>
            </main>
          </div>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
