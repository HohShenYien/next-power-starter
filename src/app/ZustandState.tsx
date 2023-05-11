"use client";

import Button from "@/components/buttons/Button";
import useBearStore from "@/stores/useBearStore";
import useStore from "@/utils/hooks/useStore";

const ZustandState = () => {
  const { bears, increase } = useStore(useBearStore, (state) => state) ?? {
    bears: 0,
    increase: () => null,
  };

  return (
    <div className="flex space-x-2">
      <Button onClick={() => increase(1)}>Add Bear</Button>
      <div>{bears} bear</div>
    </div>
  );
};

export default ZustandState;
