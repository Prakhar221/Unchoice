// src/components/LoginScreen.js
import React from "react";

function LoginScreen({
  handleAuthSubmit,
  authMessage,
  isLoginMode,
  setIsLoginMode,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 text-center w-full max-w-md">
        {/* --- NAME CHANGED HERE --- */}
        <h1 className="text-4xl font-bold text-red-500 mb-2">EatHere</h1>
        <p className="text-gray-500 text-lg mb-8">
          Your daily decision helper.
        </p>

        <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4 mb-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            autoComplete="username"
            className="p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            className="p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
          />
          <button
            type="submit"
            className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg text-xl hover:bg-red-600 active:bg-red-700 transition-all shadow-md"
          >
            {isLoginMode ? "Login" : "Sign Up"}
          </button>
        </form>

        {authMessage.text && (
          <p
            className={`text-sm mt-2 ${
              authMessage.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {authMessage.text}
          </p>
        )}

        <div className="mt-6 pt-5 border-t border-dashed border-gray-300">
          <p className="text-gray-700">
            {isLoginMode
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-red-500 font-semibold text-lg underline hover:text-red-600 transition-colors"
          >
            {isLoginMode ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
