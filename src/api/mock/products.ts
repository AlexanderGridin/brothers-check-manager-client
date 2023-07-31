import { AxiosRequestConfig } from "axios";
import MockAdapter from "axios-mock-adapter/types";
import { generateId } from "../../utils";
import { routes } from "../routes";
import { mockProducts } from "./static-data";

export const startProductsMock = (mock: MockAdapter) => {
  mock.onGet(routes.products.getAll).reply((config: AxiosRequestConfig) => {
    console.log(`[GET]: ${config.baseURL}${config.url}`, mockProducts);
    return [200, mockProducts];
  });

  mock.onDelete(/\/products/).reply((config: AxiosRequestConfig) => {
    console.log(`[DELETE]: ${config.baseURL}${config.url}`);
    return [200, {}];
  });

  mock.onPut(routes.products.update).reply((config: AxiosRequestConfig) => {
    const response = JSON.parse(config.data);
    console.log(`[PUT]: ${config.baseURL}${config.url}`, response);
    return [200, response];
  });

  mock.onPost(routes.products.create).reply((config: AxiosRequestConfig) => {
    const payload = JSON.parse(config.data);
    const response = { ...payload, id: generateId() };
    console.log(`[POST]: ${config.baseURL}${config.url}`, payload);
    return [200, response];
  });
};
