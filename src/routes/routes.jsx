import { BrowserRouter, Route, Routes } from "react-router-dom";
import InsertOrder from "../pages/InsertOrder";

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InsertOrder />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
