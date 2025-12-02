import "reflect-metadata";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";

import "@/assets/styles/main.css";
import App from "./App";
import { runInversifyDemo } from "@/di/inversify";
import { runTsyringeDemo } from "@/di/tsyringe";
import { runTypeDiDemo } from "@/di/typedi";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </BrowserRouter>
);

// Minimal console demonstrations for the three DI libraries
runInversifyDemo().then((msg) => console.log("[Inversify]", msg));
runTsyringeDemo().then((msg) => console.log("[TSyringe]", msg));
runTypeDiDemo().then((msg) => console.log("[TypeDI]", msg));
