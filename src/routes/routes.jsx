import { BrowserRouter, Route, Routes } from "react-router-dom";
import InsertOrder from "../pages/InsertOrder";
import { DetailsOrder } from "../pages/DetailsOrder";

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InsertOrder />}></Route>
        <Route path="/Details/:id" element={<DetailsOrder />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
