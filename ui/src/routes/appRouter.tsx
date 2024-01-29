import {
  createBrowserRouter, createRoutesFromElements, Route,
} from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import Coaches from '../pages/Coaches';
import Layout from '../Layout';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="/coaches" element={<Coaches />} />
  </Route>
));

export default router;
