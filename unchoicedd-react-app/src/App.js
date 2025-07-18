import React, { useState, useCallback, useMemo } from "react"; // Removed useEffect, added useMemo

// Main App Component
function App() {
  // --- State Management ---
  const [currentScreen, setCurrentScreen] = useState("login");
  const [user, setUser] = useState(null);
  const [authMessage, setAuthMessage] = useState({ text: "", type: "" });
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [currentFoodType, setCurrentFoodType] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);

  // Food Data with type property for filtering
  // Wrapped foodData in useMemo to prevent it from being re-created on every render
  const foodData = useMemo(
    () => [
      {
        id: "chole-bhature",
        category: "Chole Bhature",
        placeName: "Sita Ram Diwan Chand",
        why: "Perfectly spiced chole, fluffy yet substantial bhature. A decades-old institution.",
        address: "2243, Chuna Mandi, Paharganj, New Delhi",
        source: "Local food expert consensus",
        mapsLink: "https://maps.app.goo.gl/Fj777C2M472L6S3S7",
        type: "veg",
      },
      {
        id: "butter-chicken",
        category: "Butter Chicken",
        placeName: "Moti Mahal",
        why: "The legendary birthplace of the dish. Creamy, tangy, and unapologetically rich.",
        address: "3703, Netaji Subhash Marg, Daryaganj, New Delhi",
        source: "Historical food records",
        mapsLink: "https://maps.app.goo.gl/Gk888D3N583M7T4T8",
        type: "non-veg",
      },
      {
        id: "aloo-tikki",
        category: "Aloo Tikki Chaat",
        placeName: "Prabhu Chaat Bhandar",
        why: "Crispy on the outside, soft on the inside. Drowned in a perfect blend of sweet and spicy chutneys.",
        address: "Dholpur House, Shahjahan Road, Man Singh Road, New Delhi",
        source: "Street food connoisseur network",
        mapsLink: "https://maps.app.goo.gl/Hl999E4O694N8U5U9",
        type: "veg",
      },
      {
        id: "kulfi",
        category: "Kulfi",
        placeName: "Kuremal Mohan Lal Kulfi Wale",
        why: "Inventive fruit-stuffed kulfis and intensely flavored classics. A unique, frozen delight.",
        address:
          "Shop No. 526, Kucha Pati Ram, Sitaram Bazar, Chawri Bazar, New Delhi",
        source: "Generational family recommendation",
        mapsLink: "https://maps.app.goo.gl/Im000F5P705O9V6V0",
        type: "veg",
      },
      {
        id: "shahi-paneer",
        category: "Shahi Paneer",
        placeName: "Kake Da Hotel",
        why: "Rich, creamy, and authentic Mughlai Shahi Paneer with perfectly soft paneer cubes. A Delhi classic.",
        address: "67, Municipal Market, Connaught Place, New Delhi",
        source: "Local food blogger favorite",
        mapsLink: "https://maps.app.goo.gl/ShahiPaneerKakeDaHotel",
        type: "veg",
      },
      {
        id: "dal-makhani",
        category: "Dal Makhani",
        placeName: "Bukhara (ITC Maurya)",
        why: "Slow-cooked to perfection, this iconic Dal Makhani is renowned for its smoky flavor and velvety texture.",
        address: "ITC Maurya, Diplomatic Enclave, Sardar Patel Marg, New Delhi",
        source: "Globally acclaimed restaurant",
        mapsLink: "https://maps.app.goo.gl/DalMakhaniBukhara",
        type: "veg",
      },
      {
        id: "chicken-biryani",
        category: "Chicken Biryani",
        placeName: "Andhra Bhavan",
        why: "Spicy, aromatic, and packed with flavor, their Hyderabadi-style Chicken Biryani offers a fiery kick.",
        address: "1, Ashoka Road, Feroze Shah Road, New Delhi",
        source: "Authentic regional cuisine",
        mapsLink: "https://maps.app.goo.gl/ChickenBiryaniAndhraBhavan",
        type: "non-veg",
      },
      {
        id: "momos",
        category: "Momos",
        placeName: "Dolma Aunty Momos",
        why: "A legendary street food joint famous for its juicy, flavorful momos served with spicy red chutney.",
        address: "Shop No. 39, Central Market, Lajpat Nagar II, New Delhi",
        source: "Delhi's favorite momo spot",
        mapsLink: "https://maps.app.goo.gl/MomosDolmaAunty",
        type: "non-veg",
      },
      {
        id: "jalebi",
        category: "Jalebi",
        placeName: "Old Famous Jalebi Wala",
        why: "Crispy, syrupy, and made fresh, these jalebis are a sweet delight from Old Delhi's culinary heritage.",
        address: "Dariba Kalan, Chandni Chowk, Old Delhi, New Delhi",
        source: "Historic sweet shop",
        mapsLink: "https://maps.app.goo.gl/JalebiOldFamous",
        type: "veg",
      },
      {
        id: "nihari",
        category: "Nihari",
        placeName: "Jawahar Hotel",
        why: "A traditional slow-cooked meat stew, rich and flavorful, perfect for a hearty breakfast.",
        address: "Matia Mahal Road, Near Jama Masjid, Old Delhi, New Delhi",
        source: "Old Delhi's culinary gems",
        mapsLink: "https://maps.app.goo.gl/NihariJawaharHotel",
        type: "non-veg",
      },
      {
        id: "parathas",
        category: "Parathas",
        placeName: "Paranthe Wali Gali",
        why: "A historic lane dedicated to various stuffed parathas, deep-fried and served with chutneys and pickles.",
        address: "Paranthe Wali Gali, Chandni Chowk, Old Delhi, New Delhi",
        source: "Iconic street food lane",
        mapsLink: "https://maps.app.goo.gl/ParathasGali",
        type: "veg",
      },
      {
        id: "golgappe",
        category: "Golgappe/Pani Puri",
        placeName: "Prince's Paan & Chaat",
        why: "Crispy puris filled with spicy tangy water and chickpeas, a burst of flavor in every bite.",
        address: "M Block Market, Greater Kailash 1, New Delhi",
        source: "Popular chaat vendor",
        mapsLink: "https://maps.app.goo.gl/GolgappePrince",
        type: "veg",
      },
      {
        id: "kebabs",
        category: "Kebabs",
        placeName: "Khan Chacha",
        why: "Famous for its succulent seekh and kakori kebabs, wrapped in soft rumali rotis.",
        address: "Shop No. 50, Middle Lane, Khan Market, New Delhi",
        source: "Delhi's kebab institution",
        mapsLink: "https://maps.app.goo.gl/KebabsKhanChacha",
        type: "non-veg",
      },
      {
        id: "pizza",
        category: "Pizza",
        placeName: "Leo's Pizzeria",
        why: "Known for its authentic Neapolitan-style pizzas with fresh ingredients and a perfect crust.",
        address: "28, Basant Lok Market, Vasant Vihar, New Delhi",
        source: "Highly-rated pizzeria",
        mapsLink: "https://maps.app.goo.gl/PizzaLeosPizzeria",
        type: "veg",
      },
      {
        id: "samosa",
        category: "Samosa",
        placeName: "Annapurna Sweets",
        why: "Crispy, flaky pastry filled with spiced potatoes and peas, a perfect tea-time snack.",
        address: "Multiple locations across Delhi",
        source: "Local snack favorite",
        mapsLink: "https://maps.app.goo.gl/SamosaAnnapurna",
        type: "veg",
      },
      {
        id: "rogan-josh",
        category: "Rogan Josh",
        placeName: "Corbett's Cafe",
        why: "A rich, aromatic Kashmiri lamb curry, slow-cooked to tender perfection.",
        address: "35, Hauz Khas Village, New Delhi",
        source: "North Indian cuisine specialist",
        mapsLink: "https://maps.app.goo.gl/RoganJoshCorbetts",
        type: "non-veg",
      },
      {
        id: "rajma-chawal",
        category: "Rajma Chawal",
        placeName: "Baba Nagpal Corner",
        why: "Comfort food at its best: creamy kidney beans curry served with fluffy rice.",
        address: "7/25, Old Rajinder Nagar Market, New Delhi",
        source: "Student and local favorite",
        mapsLink: "https://maps.app.goo.gl/RajmaChawalNagpal",
        type: "veg",
      },
    ],
    [] // Empty dependency array means foodData will only be created once
  );

  // --- Authentication Handlers (Dummy Logic Only) ---
  const handleAuthSubmit = async (event) => {
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

    setAuthMessage({ text: "", type: "" });

    const userId = `${email.split("@")[0] || "user"}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    setUser({ uid: userId, email: email });
    setAuthMessage({
      text: `${isLoginMode ? "Login" : "Registration"} successful!`,
      type: "success",
    });
    setCurrentScreen("home");
    setCurrentFoodType(null);
    console.log(
      `Simulated ${
        isLoginMode ? "login" : "registration"
      } completed for user: ${email}`
    );
  };

  const handleLogout = () => {
    console.log("Simulated logout initiated.");
    setUser(null);
    setCurrentFoodType(null);
    setCurrentScreen("login");
    setAuthMessage({
      text: "Logged out successfully.",
      type: "info",
    });
  };

  // --- Navigation Handlers ---
  const showDishPage = useCallback(
    (dishId) => {
      const dish = foodData.find((d) => d.id === dishId);
      if (dish) {
        setSelectedDish(dish);
        setCurrentScreen("dish");
      } else {
        console.error("Dish not found for ID:", dishId);
      }
    },
    [foodData]
  );

  const handleBackToHome = useCallback(() => {
    setCurrentScreen("home");
    setSelectedDish(null);
    setCurrentFoodType(null);
  }, []);

  const handleBackToPreferences = useCallback(() => {
    setCurrentFoodType(null);
    setCurrentScreen("home");
  }, []);

  const handlePreferenceSelect = useCallback((type) => {
    setCurrentFoodType(type);
  }, []);

  // --- Render Functions for different screens ---

  const renderLoginScreen = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 text-center w-full max-w-md">
        <h1 className="text-4xl font-bold text-red-500 mb-2">Unchoiced</h1>
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

  const renderHomeScreen = () => (
    <div className="min-h-screen flex flex-col max-w-xl mx-auto p-6 bg-gray-100">
      <header className="flex justify-between items-center mb-5 pb-4 border-b border-gray-200 flex-wrap gap-2">
        <span className="font-bold text-xl text-red-500">Unchoiced</span>
        <div className="flex items-center gap-4 flex-wrap justify-end">
          <span className="text-gray-500 text-sm">
            You are in <strong className="text-gray-800">New Delhi</strong>
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-md text-sm hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="text-gray-500 text-sm mb-5 pb-4 border-b border-dashed border-gray-300">
        <p>User ID: {user ? user.uid : "Not signed in"}</p>
      </div>

      {currentFoodType === null ? (
        // Preference Selection Section: Shown when no food type is selected
        <div
          className="text-center mb-10 flex-grow flex flex-col justify-center items-center bg-cover bg-center rounded-2xl p-12 shadow-2xl relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://img.freepik.com/free-photo/top-view-circular-food-frame_23-2148723455.jpg?semt=ais_hybrid&w=740')`,
          }}
        >
          <h2 className="text-white text-4xl font-bold mb-10 text-shadow-md">
            What are you craving today?
          </h2>
          <div className="flex gap-5 flex-wrap justify-center">
            <button
              onClick={() => handlePreferenceSelect("veg")}
              className="bg-red-500 text-white py-4 px-8 rounded-xl text-xl font-bold cursor-pointer hover:bg-red-600 active:bg-red-700 transition-all min-w-[180px] shadow-lg"
            >
              Vegetarian
            </button>
            <button
              onClick={() => handlePreferenceSelect("non-veg")}
              className="bg-red-500 text-white py-4 px-8 rounded-xl text-xl font-bold cursor-pointer hover:bg-red-600 active:bg-red-700 transition-all min-w-[180px] shadow-lg"
            >
              Non-Vegetarian
            </button>
          </div>
        </div>
      ) : (
        // Category List Section: Shown after a food type is selected
        <>
          <main className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
            {foodData
              .filter((dish) => dish.type === currentFoodType) // Filter dishes by selected type
              .map((dish) => (
                <button
                  key={dish.id} // Unique key for React list rendering
                  onClick={() => showDishPage(dish.id)} // Navigate to dish detail on click
                  className="w-full bg-white border border-gray-200 rounded-lg p-5 text-left text-lg font-medium cursor-pointer transition-all hover:translate-y-[-3px] hover:shadow-lg flex items-center justify-between"
                >
                  {dish.category}
                  <span className="text-gray-400 text-2xl transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              ))}
            {/* Message if no dishes are found for the selected category */}
            {foodData.filter((dish) => dish.type === currentFoodType).length ===
              0 && (
              <p className="col-span-full text-center text-gray-500">
                No dishes found for this category.
              </p>
            )}
          </main>
          {/* Button to go back to preference selection */}
          <button
            onClick={handleBackToPreferences}
            className="mt-6 bg-transparent border-none text-gray-800 text-lg cursor-pointer py-2 px-4 rounded-md hover:bg-gray-100 transition-colors self-start"
          >
            ← Back to Preferences
          </button>
        </>
      )}
    </div>
  );

  const renderDishScreen = () => (
    <div className="min-h-screen flex flex-col max-w-xl mx-auto p-6 bg-gray-100">
      <nav className="mb-8 pb-4 border-b border-gray-200">
        <button
          onClick={handleBackToHome}
          className="bg-transparent border-none text-gray-800 text-lg cursor-pointer py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
        >
          ← Back
        </button>
      </nav>
      <main className="flex justify-center items-center flex-grow pb-5">
        <div className="w-full bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-scale">
          <div className="p-8 text-center">
            <h1 className="text-5xl font-bold text-red-500 mb-4 leading-tight">
              {selectedDish.placeName}
            </h1>
            <p className="text-gray-800 text-xl italic mb-8 leading-relaxed">
              {selectedDish.why}
            </p>
            <div className="text-gray-500 text-base leading-relaxed border-t border-dashed border-gray-300 pt-5 mt-8">
              <p>{`Address: ${selectedDish.address}`}</p>
              <p>{`Source: ${selectedDish.source}`}</p>
            </div>
          </div>
          <a
            href={selectedDish.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-red-500 text-white font-bold py-5 text-xl text-center uppercase tracking-wider cursor-pointer hover:bg-red-600 active:bg-red-700 transition-all rounded-b-2xl"
          >
            GET DIRECTIONS
          </a>
        </div>
      </main>
    </div>
  );

  // --- Main Render Logic ---
  // Render the appropriate screen based on the 'currentScreen' state
  switch (currentScreen) {
    case "login":
      return renderLoginScreen();
    case "home":
      return renderHomeScreen();
    case "dish":
      return renderDishScreen();
    default:
      // Fallback for any unexpected screen state
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <p className="text-red-600 text-lg">An unexpected error occurred.</p>
        </div>
      );
  }
}

export default App; // Export the App component for ReactDOM to render
