import { createBrowserRouter } from "react-router-dom"
import App from "./App.jsx"

import HomePage from "./pages/HomePage.jsx"
import StatsPage from "./pages/StatsPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import LogInPage from "./pages/LogInPage.jsx"

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
        path: "/signup",
        element: <SignUpPage />
      },
      {
        path: "/login",
        element: <LogInPage />
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <>404</>,
  //   children: [],
  // }
])

export default router