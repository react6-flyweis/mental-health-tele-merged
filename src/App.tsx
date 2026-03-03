import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Routes } from "@/routes/routes";
import { Loading } from "@/components/Loading";

const router = createBrowserRouter(Routes);

export function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
