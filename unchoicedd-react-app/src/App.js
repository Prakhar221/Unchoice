// src/App.js
import React, { useState, useCallback, useMemo, useEffect } from "react";

// --- NEW: Import EmailJS ---
import emailjs from "@emailjs/browser";

import LoadingScreen from "./components/LoadingScreen";
import LoginScreen from "./components/LoginScreen";
import HomePage from "./components/HomePage";
import DishDetailPage from "./components/DishDetailPage";
import rawFoodData from "./data/foodData";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState("login");
  const [user, setUser] = useState(null);
  const [authMessage, setAuthMessage] = useState({ text: "", type: "" });
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [currentFoodType, setCurrentFoodType] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);

  const foodData = useMemo(() => rawFoodData, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAuthSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const email = event.target.email.value.trim();
      const password = event.target.password.value.trim();
      if (!email || !password) {
        setAuthMessage({
          text: "Please enter both email and password.",
          type: "error",
        });
        return;
      }

      // --- NEW: EmailJS Logic ---
      // Prepare the dynamic variables for your email template
      const templateParams = {
        user_name: email.split("@")[0], // Takes the part before the @ as the name
        user_email: email,
      };

      // Use your actual keys from the EmailJS website
      emailjs
        .send(
          "service_z82rq6o", // Paste your Service ID here
          "template_a7t9glg", // Paste your Template ID here
          templateParams,
          "xRcPd6yCwxc1R7XDw" // Paste your Public Key here
        )
        .then((response) => {
          console.log("SUCCESS! Email sent.", response.status, response.text);
        })
        .catch((error) => {
          console.log("FAILED to send email...", error);
        });
      // --- End of EmailJS Logic ---

      // The rest of the function continues as before
      const userId = `${email.split("@")[0] || "user"}-${Math.random()
        .toString(36)
        .substring(2, 9)}`;
      setUser({ uid: userId, email: email });
      setAuthMessage({
        text: `${
          isLoginMode ? "Login" : "Registration"
        } successful! A welcome email has been sent.`,
        type: "success",
      });
      setCurrentScreen("home");
      setCurrentFoodType(null);
    },
    [isLoginMode]
  );

  // ... (the rest of your handler functions: handleLogout, showDishPage, etc., are unchanged)
  const handleLogout = useCallback(() => {
    setUser(null);
    setCurrentFoodType(null);
    setCurrentScreen("login");
    setAuthMessage({ text: "Logged out successfully.", type: "info" });
  }, []);

  const showDishPage = useCallback(
    (dishId) => {
      const dish = foodData.find((d) => d.id === dishId);
      if (dish) {
        setSelectedDish(dish);
        setCurrentScreen("dish");
      }
    },
    [foodData]
  );

  const handleBackToHome = useCallback(() => {
    setCurrentScreen("home");
    setSelectedDish(null);
  }, []);

  const handleBackToPreferences = useCallback(() => {
    setCurrentFoodType(null);
  }, []);

  const handlePreferenceSelect = useCallback((type) => {
    setCurrentFoodType(type);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // The switch statement for rendering screens remains unchanged
  switch (currentScreen) {
    case "login":
      return (
        <LoginScreen
          handleAuthSubmit={handleAuthSubmit}
          authMessage={authMessage}
          isLoginMode={isLoginMode}
          setIsLoginMode={setIsLoginMode}
        />
      );
    case "home":
      return (
        <HomePage
          user={user}
          handleLogout={handleLogout}
          currentFoodType={currentFoodType}
          handlePreferenceSelect={handlePreferenceSelect}
          foodData={foodData}
          showDishPage={showDishPage}
          handleBackToPreferences={handleBackToPreferences}
        />
      );
    case "dish":
      return (
        <DishDetailPage
          selectedDish={selectedDish}
          handleBackToHome={handleBackToHome}
        />
      );
    default:
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <p className="text-red-600 text-lg">An unexpected error occurred.</p>
        </div>
      );
  }
}

export default App;
