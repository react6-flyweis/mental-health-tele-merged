import type { RouteObject } from "react-router";

// (auth) auth/MainAuthLayout
// forgot-password
// reset-password
// login

// (full) full/FullLayout
// appointment
//    // confirm
//   // medical-intake
//        // success
//    // payment
//        // confirmation
//        // failure
//
// onboarding
//    // profile

// (marketing) marketing/MarketingLayout

// blog
// blog/slug
// conditions/slug
// services/slug
// faqs

// (company)
// about
// careers
// contact
// providers
// reviews

// (footer)
// ai-consent
// consent
// dea
// editorial-policy
// hipaa-notice
// hipaa-privacy-policy
// payment-terms
// privacy-policy
// refund-policy
// sitemap
// terms-of-use

// /dashboard dashboard/DashboardLayout
// appointments
// messages
// payments
// prescriptions
// providers
// settings
// support
// video-sessions

import { lazy } from "react";
import MainLayout from "./pages/MainLayout";

import AuthLayout from "./pages/auth/MainAuthLayout";

const ForgotPasswordPage = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPassword"));

import FullLayout from "./pages/full/FullLayout";
const AppointmentPage = lazy(() => import("./pages/full/Appointment"));
const AppointmentConfirmationPage = lazy(
  () => import("./pages/full/AppointmentConfirmation"),
);
const MedicalIntakePage = lazy(() => import("./pages/full/MedicalIntake"));
const MedicalIntakeSuccessPage = lazy(
  () => import("./pages/full/MedicalIntakeSuccess"),
);
const PaymentConfirmationPage = lazy(
  () => import("./pages/full/PaymentConfirmation"),
);
const PaymentFailurePage = lazy(() => import("./pages/full/PaymentFailure"));

import MarketingLayout from "./pages/marketing/MarketingLayout";
const MarketingPage = lazy(() => import("./pages/marketing/Marketing"));

const SignupRolePage = lazy(() => import("@/page/RoleSelectionPage"));

const PatientLoginPage = lazy(() => import("./pages/auth/PatientLogin"));

const BlogsPage = lazy(() => import("./pages/marketing/Blogs"));
const BlogDetailPage = lazy(() => import("./pages/marketing/BlogDetail"));
const ConditionDetailPage = lazy(
  () => import("./pages/marketing/ConditionsDetail"),
);
const ServiceDetailPage = lazy(
  () => import("./pages/marketing/ServicesDetail"),
);
const FAQsPage = lazy(() => import("./pages/marketing/FAQs"));

const AboutPage = lazy(() => import("./pages/marketing/company/About"));
const CareersPage = lazy(() => import("./pages/marketing/company/Careers"));
const ContactPage = lazy(() => import("./pages/marketing/company/Contact"));
const ProvidersPage = lazy(() => import("./pages/marketing/company/Providers"));
const ReviewsPage = lazy(() => import("./pages/marketing/company/Reviews"));

const AIConsentPage = lazy(() => import("./pages/marketing/footer/AiConsent"));
const ConsentPage = lazy(() => import("./pages/marketing/footer/Consent"));
const DEAPage = lazy(() => import("./pages/marketing/footer/DEA"));
const EditorialPolicyPage = lazy(
  () => import("./pages/marketing/footer/EditorialPolicy"),
);
const HIPAANoticePage = lazy(
  () => import("./pages/marketing/footer/HipaaNotice"),
);
const HIPAAPrivacyPolicyPage = lazy(
  () => import("./pages/marketing/footer/HipaaPrivacyPolicy"),
);
const PaymentTermsPage = lazy(
  () => import("./pages/marketing/footer/PaymentTerms"),
);
const PrivacyPolicyPage = lazy(
  () => import("./pages/marketing/footer/PrivacyPolicy"),
);
const RefundPolicyPage = lazy(
  () => import("./pages/marketing/footer/RefundPolicy"),
);
const SitemapPage = lazy(() => import("./pages/marketing/footer/Sitemap"));
const TermsOfUsePage = lazy(
  () => import("./pages/marketing/footer/TermsOfUse"),
);

import DashboardLayout from "./pages/dashboard/DashboardLayout";

const DashboardPage = lazy(() => import("./pages/dashboard/Dashboard"));
const AppointmentsPage = lazy(() => import("./pages/dashboard/Appointments"));
const MessagesPage = lazy(() => import("./pages/dashboard/Messages"));
const PaymentsPage = lazy(() => import("./pages/dashboard/Payments"));
const PrescriptionsPage = lazy(() => import("./pages/dashboard/Prescriptions"));
const DashProvidersPage = lazy(() => import("./pages/dashboard/Providers"));
const SettingsPage = lazy(() => import("./pages/dashboard/Settings"));
const SupportPage = lazy(() => import("./pages/dashboard/Support"));
const VideoSessionsPage = lazy(() => import("./pages/dashboard/VideoSessions"));

export const mainRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          // role
          {
            path: "/login",
            element: <SignupRolePage />,
          },
          {
            path: "patient-login",
            element: <PatientLoginPage />,
          },
          // login
          { path: "forgot-password", element: <ForgotPasswordPage /> },
          { path: "reset-password", element: <ResetPasswordPage /> },
        ],
      },
      {
        element: <FullLayout />,
        children: [
          { path: "appointment", element: <AppointmentPage /> },
          {
            path: "appointment/confirm",
            element: <AppointmentConfirmationPage />,
          },
          { path: "medical-intake", element: <MedicalIntakePage /> },
          {
            path: "medical-intake/success",
            element: <MedicalIntakeSuccessPage />,
          },
          { path: "payment/confirm", element: <PaymentConfirmationPage /> },
          { path: "payment/failure", element: <PaymentFailurePage /> },
        ],
      },
      {
        element: <MarketingLayout />,
        children: [
          {
            index: true,
            element: <MarketingPage />,
          },
          {
            path: "blogs",
            element: <BlogsPage />,
          },
          {
            path: "blog/:id",
            element: <BlogDetailPage />,
          },
          {
            path: "conditions/:id",
            element: <ConditionDetailPage />,
          },
          {
            path: "services/:id",
            element: <ServiceDetailPage />,
          },
          {
            path: "faqs",
            element: <FAQsPage />,
          },

          // company
          {
            path: "about",
            element: <AboutPage />,
          },
          {
            path: "careers",
            element: <CareersPage />,
          },
          {
            path: "contact",
            element: <ContactPage />,
          },
          {
            path: "providers",
            element: <ProvidersPage />,
          },
          {
            path: "reviews",
            element: <ReviewsPage />,
          },
          // footer
          {
            path: "ai-consent",
            element: <AIConsentPage />,
          },
          {
            path: "consent",
            element: <ConsentPage />,
          },
          {
            path: "dea",
            element: <DEAPage />,
          },
          {
            path: "editorial-policy",
            element: <EditorialPolicyPage />,
          },
          {
            path: "hipaa-notice",
            element: <HIPAANoticePage />,
          },
          {
            path: "hipaa-privacy-policy",
            element: <HIPAAPrivacyPolicyPage />,
          },
          {
            path: "payment-terms",
            element: <PaymentTermsPage />,
          },
          {
            path: "privacy-policy",
            element: <PrivacyPolicyPage />,
          },
          {
            path: "refund-policy",
            element: <RefundPolicyPage />,
          },
          {
            path: "sitemap",
            element: <SitemapPage />,
          },
          {
            path: "terms-of-use",
            element: <TermsOfUsePage />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          {
            path: "appointments",
            element: <AppointmentsPage />,
          },
          {
            path: "messages",
            element: <MessagesPage />,
          },
          {
            path: "payments",
            element: <PaymentsPage />,
          },
          {
            path: "prescriptions",
            element: <PrescriptionsPage />,
          },
          {
            path: "providers",
            element: <DashProvidersPage />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
          {
            path: "support",
            element: <SupportPage />,
          },
          {
            path: "video-sessions",
            element: <VideoSessionsPage />,
          },
        ],
      },
    ],
  },
];
