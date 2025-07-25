import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import Board from "./pages/Board";
import RootLayout from "./pages/Root";
import Error from "./pages/Error";
import Auth from "./pages/Auth";
import { protectedLoader } from "./loaders/protectedLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Auth /> },
      { path: "/signup", element: <Auth /> },
      { path: "/workspace", element: <Workspace />, loader: protectedLoader },
      { path: "/board/:id", element: <Board />, loader: protectedLoader },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
