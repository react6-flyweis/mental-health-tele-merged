import { lazy } from "react";
import type { RouteObject } from "react-router";

import AuthLayout from "@/components/layout/AuthLayout";
import DashLayout from "@/components/layout/DashLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PublicRoute from "@/components/auth/PublicRoute";
// import NavigateToMain from "@/components/NavigateToMain";
import { NotFound } from "@/page/NotFound";

const ProviderLoginPage = lazy(() => import("@/page/ProviderLoginPage"));
const ProviderRegisterPage = lazy(() => import("@/page/ProviderRegisterPage"));
const DashboardPage = lazy(() => import("@/page/DashboardPage"));
const AppointmentsPage = lazy(() => import("@/page/AppointmentsPage"));
const VideoSessionsPage = lazy(() => import("@/page/VideoSessionsPage"));
const SingleVideoSessionPage = lazy(
  () => import("@/page/SingleVideoSessionPage"),
);
const PatientRecordsPage = lazy(() => import("@/page/PatientRecordsPage"));
const PrescriptionsPage = lazy(() => import("@/page/PrescriptionsPage"));
const EarningsPage = lazy(() => import("@/page/EarningsPage"));
const AvailabilityPage = lazy(() => import("@/page/AvailabilityPage"));
const MessagesPage = lazy(() => import("@/page/MessagesPage"));
const ProfilePage = lazy(() => import("@/page/ProfilePage"));
const SettingsPage = lazy(() => import("@/page/SettingsPage"));

export const Routes: RouteObject[] = [
  // {
  //   path: "/",
  //   // element: <NavigateToMain />,
  // },
  {
    path: "provider",
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />, // default path is "/"
        children: [
          { path: "login", element: <ProviderLoginPage /> },
          { path: "register", element: <ProviderRegisterPage /> },
        ],
      },
    ],
  },
  {
    path: "/provider",
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <DashLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "appointments", element: <AppointmentsPage /> },
          { path: "video-sessions", element: <VideoSessionsPage /> },
          {
            path: "video-sessions/live/:sessionId",
            element: <SingleVideoSessionPage />,
          },
          { path: "patient-records", element: <PatientRecordsPage /> },
          { path: "prescriptions", element: <PrescriptionsPage /> },
          { path: "earnings", element: <EarningsPage /> },
          { path: "availability", element: <AvailabilityPage /> },
          { path: "messages", element: <MessagesPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "settings", element: <SettingsPage /> },
          // catch-all within dashboard
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
  // global 404 (optional)
  { path: "*", element: <NotFound /> },
];
