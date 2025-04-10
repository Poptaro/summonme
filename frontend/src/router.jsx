import { createBrowserRouter } from "react-router-dom"
import App from "./App.jsx"

import HomePage from "./pages/HomePage.jsx"
import StatsPage from "./pages/StatsPage.jsx"
import FragmentsPage from "./pages/FragmentsPage.jsx"

import SignUpPage from "./pages/SignUpPage.jsx"
import LogInPage from "./pages/LogInPage.jsx"

import NotFoundPage from "./pages/NotFoundPage.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/stats",
        element: <StatsPage />
      },
      {
        path: "/fragments",
        element: <FragmentsPage />
      },
      {
        path: "/signup",
        element: <SignUpPage />
      },
      {
        path: "/login",
        element: <LogInPage />
      },
      {
        path: "*",
        element: <NotFoundPage />,
        children: [],
      },
    ],
  },

])

export default router