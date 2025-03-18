import "./scss/app.scss";
import Mainlayout from "./layouts/Mainlayout";
import FullPizza from "./components/FullPizza";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { Routes, Route } from "react-router";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Mainlayout />}>
        <Route path="" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="pizza/:id" element={<FullPizza />} />

        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
