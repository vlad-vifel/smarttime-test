import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useSelector } from "react-redux";

const App = () => {
  const routes = useSelector((state) => state.global.routes);
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
