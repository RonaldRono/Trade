import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TelegramButton from "@/components/telegram-button";
import Home from "@/pages/home";
import Terminal from "@/pages/terminal";
import Indicators from "@/pages/indicators";
import Signals from "@/pages/signals";
import Challenge from "@/pages/challenge";
import CalculatorPage from "@/pages/calculator";
import Account from "@/pages/account";
import Contact from "@/pages/contact";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Router>
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-200">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/terminal" element={<Terminal />} />
              <Route path="/indicators" element={<Indicators />} />
              <Route path="/signals" element={<Signals />} />
              <Route path="/challenge" element={<Challenge />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/account" element={<Account />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <TelegramButton />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
