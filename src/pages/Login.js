import React from "react";
import logolight from "../assets/logo-light.png";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-rose-50 p-4">
      <div className="flex flex-col bg-white rounded-lg p-4 w-full sm:w-[400px]">
        <img src={logolight} className="w-full mb-12 object-cover" alt="" />
        <form className="flex flex-col">
          <label
            className="translate-y-3 translate-x-2 bg-white w-fit px-2 text-gray-700"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            className="border border-gray-300 p-2 outline-none mb-4 rounded-md "
            type="text"
            name=""
            id="email"
          />
          <label
            className="translate-y-3 translate-x-2 bg-white w-fit px-2 text-gray-700"
            htmlFor="email"
          >
            Password
          </label>
          <input
            className="border border-gray-300 p-2 outline-none mb-4 rounded-md"
            type="password"
            name=""
            id=""
          />
          <button className="bg-rose-300 rounded-md p-2 mt-2 hover:bg-rose-400">
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500">
          Not registered yet? Click here to register
        </p>
      </div>
    </div>
  );
};

export default Login;
