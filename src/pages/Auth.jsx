import { useLocation } from "react-router-dom";
import signUpPageBg from "../assets/images/signup-img.png";
import authDecoration from "../assets/images/polygonUnderline.svg";
import SignUp from "../components/SignUp";
import Login from "../components/Login";

export default function Auth() {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";

  return (
    <section className="relative h-full md:h-screen w-full bg-gradient-to-r from-[#f9f9f9] via-[#fcb9f3] to-[#845AB1] -mt-[60px]">
      <img
        src={signUpPageBg}
        alt="signup image"
        className="absolute bottom-0 left-0"
      />
      <div className="container flex justify-end items-center p-5 h-screen mx-auto">
        <div className="bg-white  min-h-[400px] max-w-[600px] shadow-2xl rounded-lg p-5 relative">
          <img
            src={authDecoration}
            alt="underline image"
            className="absolute top-[80px] max-w-[300px] left-1/2 -translate-1/2"
          />
          <h1 className="text-center font-bold text-2xl mb-5 text-purple">
            {(isSignup && "Sign Up") || "Login"}
          </h1>
          {(isSignup && <SignUp />) || <Login />}
        </div>
      </div>
    </section>
  );
}
