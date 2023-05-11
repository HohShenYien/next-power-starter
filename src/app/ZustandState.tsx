"use client";

import Button from "@/components/buttons/Button";
import useBearStore from "@/stores/useBearStore";

const ZustandState = () => {
  const { bears, increase } = useBearStore();

  return (
    <div className="flex space-x-2">
      <Button onClick={() => increase(1)}>Add Bear</Button>
      <div>{bears} bear</div>
    </div>
  );
};

export default ZustandState;
