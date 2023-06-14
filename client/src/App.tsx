import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Watch from "./pages/Watch";
import Pages404 from "./pages/Pages404";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home type="random" />} />
          <Route path="trends" element={<Home type="trend" />} />
          <Route path="subscriptions" element={<Home type="sub" />} />
          <Route path="/search" element={<Search />} />
          <Route path="/watch/:videoId" element={<Watch />} />
          <Route path="*" element={<Pages404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
