import { BrowserRouter, Route, Routes } from "react-router";
import { Signup } from "./pages/signup.page";
import { Signin } from "./pages/signin.page";
import { Home } from "./pages/home.page";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Signin />} path="/signin" />
        <Route element={<Signup />} path="/signup" />
      </Routes>
    </BrowserRouter>
  );
};
