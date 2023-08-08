import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { startProductsMock } from "./products";
import { startStoresMock } from "./stores";

export const initMock = (http: AxiosInstance) => {
  const mock = new MockAdapter(http, { delayResponse: 2000 });

  startProductsMock(mock);
  startStoresMock(mock);
};
