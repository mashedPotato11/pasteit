import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "./Homepage";
import ShowPaste from "./ShowPaste";
import Login from "./login";
import NotFoundPage from "./404NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route path="/:key" element={<ShowPaste />} exact />
        <Route path="/error/error404" element={<NotFoundPage />} exact />
      </Routes>
    </div>
  );
}

export default App;
