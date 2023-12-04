import { useState, useEffect } from "react";

type UsePointerPositionProps = {
  offset: {
    x: number;
    y: number;
  };
};

type UsePointerPosition = {
  position: {
    x: number;
    y: number;
  };
  ctrlKey: boolean;
};

export function usePointerPosition(
  props: UsePointerPositionProps,
): UsePointerPosition {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ctrlKey, setCtrlKey] = useState(false);
  useEffect(() => {
    function handleMove(e: PointerEvent) {
      setPosition({
        x: e.clientX + props.offset.x,
        y: e.clientY + props.offset.y,
      });
      setCtrlKey(e.ctrlKey);
    }
    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, [props.offset.x, props.offset.y]);
  return { position, ctrlKey };
}
