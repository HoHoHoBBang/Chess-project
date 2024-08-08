import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PiecesContextProvider } from "./components/Context/PiecesContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PiecesContextProvider>
    <App />
  </PiecesContextProvider>,
);
