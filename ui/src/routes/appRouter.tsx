import {
  createBrowserRouter, createRoutesFromElements, Route,
} from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import Layout from '../Layout';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Dashboard />} />
  </Route>
));

export default router;
