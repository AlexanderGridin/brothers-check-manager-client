import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { startProductsMock } from "./products";

export const initMock = (http: AxiosInstance) => {
  const mock = new MockAdapter(http, { delayResponse: 2000 });

  startProductsMock(mock);
};
