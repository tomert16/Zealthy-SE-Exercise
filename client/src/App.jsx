import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";


function App() {
  const router = createBrowserRouter([
    {
      path: '*',
      element: <div>404 Not Found</div>
    },
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/admin_login',
      element: <AdminLogin />
    },
    {
      path: '/admin',
      element: <Admin />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
