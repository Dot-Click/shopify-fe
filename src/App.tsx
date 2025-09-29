import { Router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NotificationProvider } from "./providers/notification.provider";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <Router />
          <Toaster />
          <ReactQueryDevtools />
        </NotificationProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
