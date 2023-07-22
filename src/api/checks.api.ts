import { http } from "./http";
import { routes } from "./routes";

export const createCheckAsync = async (body: any) => {
  const route = routes.checks.create;

  try {
    const response = await http.post(route, body);
    return response.data;
  } catch (e) {
    return null;
  }
};
