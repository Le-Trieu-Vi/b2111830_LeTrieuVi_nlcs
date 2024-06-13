import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import AppRoutes from "./components/AppRouter";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Navigation />
        <AppRoutes />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
