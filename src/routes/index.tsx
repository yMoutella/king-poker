import { createFileRoute } from "@tanstack/react-router";
import DashboardPage from "@/components/Dashboard/dashboard_page";

export const Route = createFileRoute("/")({ component: App });

function App() {
return (
  <DashboardPage />
);
}