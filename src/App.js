import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./Components/AppRouter";
import { useEffect, useState } from "react";
import { AuthContext } from "./context";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <BrowserRouter>
        <AppRouter></AppRouter>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
