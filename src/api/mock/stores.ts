import { AxiosRequestConfig } from "axios";
import MockAdapter from "axios-mock-adapter/types";
import { generateId } from "../../utils";
import { routes } from "../routes";
import { mockStores } from "./static-data";

export const startStoresMock = (mock: MockAdapter) => {
  mock.onGet(routes.stores.getAll).reply((config: AxiosRequestConfig) => {
    console.log(`[GET]: ${config.baseURL}${config.url}`, mockStores);
    return [200, mockStores];
  });

  mock.onPost(routes.stores.create).reply((config: AxiosRequestConfig) => {
    const payload = JSON.parse(config.data);
    const response = { ...payload, id: generateId() };
    console.log(`[POST]: ${config.baseURL}${config.url}`, payload);
    return [200, response];
  });

  mock.onPut(routes.stores.update).reply((config: AxiosRequestConfig) => {
    const response = JSON.parse(config.data);
    console.log(`[PUT]: ${config.baseURL}${config.url}`, response);
    return [200, response];
  });

  mock.onDelete(/\/stores/).reply((config: AxiosRequestConfig) => {
    console.log(`[DELETE]: ${config.baseURL}${config.url}`);
    return [200, {}];
  });
};
