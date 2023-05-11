// Source: https://dev.to/abdulsamad/how-to-use-zustands-persist-middleware-in-nextjs-4lb5
// This hook eliminates the issue with hydration mismatch between server side & client side

import { useState, useEffect } from "react";

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export default useStore;
