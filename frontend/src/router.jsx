import { createBrowserRouter } from "react-router-dom"
import App from "./App.jsx"

import HomePage from "./pages/HomePage.jsx"
import StatsPage from "./pages/StatsPage.jsx"
import FragmentsPage from "./pages/FragmentsPage.jsx"
import FragmentChampPage from "./pages/FragmentChampPage.jsx"
import FragmentCreationPage from "./pages/FragmentCreationPage.jsx"

import SignUpPage from "./pages/SignUpPage.jsx"
import LogInPage from "./pages/LogInPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"

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
        path: "/fragments/:champion_key",
        element: <FragmentChampPage />
      },
      {
        path: "/fragments/:champion_key/create",
        element: <FragmentCreationPage />
      },
      {
        path: "/fragments/:champion_key/create/:fragment_id",
        element: <FragmentCreationPage />
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
        path: "/profile",
        element: <ProfilePage />
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