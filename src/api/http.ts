import axios from "axios";
import { initMock } from "./mock";

export const http = axios.create({
  baseURL: "http://localhost:8080",
});

initMock(http);
