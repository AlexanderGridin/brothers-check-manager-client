import { useRef } from "react";

export const useNegativeCounter = () => {
  const counter = useRef(-1);

  const getValue = () => {
    const currentCounter = counter.current;
    counter.current = counter.current - 1;

    return currentCounter;
  };

  return { getValue };
};
