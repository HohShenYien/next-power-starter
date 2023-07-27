import { useMemo, useState } from "react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

const useNavStyles = () => {
  const [{ prev, cur }, setScrollPos] = useState({
    prev: 0,
    cur: 0,
  });

  useScrollPosition(
    ({ prevPos, currPos }) => {
      setScrollPos({
        prev: prevPos.y,
        cur: currPos.y,
      });
    },
    [],
    undefined,
    true
  );

  const { scrollAfter100, goingDown } = useMemo(() => {
    return {
      scrollAfter100: cur > 100,
      goingDown: cur > prev,
    };
  }, [prev, cur]);

  const scrollAffectedStyles = useMemo(() => {
    return {
      backdropFilter: `blur(${scrollAfter100 ? 8 : 0}px)`,
      transform: `translateY(${goingDown && scrollAfter100 ? "-100%" : "0"})`,
      backgroundColor: scrollAfter100
        ? "rgb(224, 231, 255, 0.5)"
        : "transparent",
      shadow: scrollAfter100 ? "md" : "none",
      paddingTop: scrollAfter100 ? "20px" : "16px",
      paddingBottom: scrollAfter100 ? "20px" : "16px",
    };
  }, [scrollAfter100, goingDown]);

  const zIndex = 1500;

  return {
    ...scrollAffectedStyles,
    transition: "all ease-in 200ms",
  };
};
export default useNavStyles;
