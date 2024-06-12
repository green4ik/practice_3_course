import { useRef, useEffect } from "react";

const useDraggable = (draggableId: string) => {
  const isClicked = useRef<boolean>(false);
  const coordinates = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const draggable = document.getElementById(draggableId);
    if (!draggable) {
      throw new Error("Draggable element with given id does not exist.");
    }

    const container = draggable?.parentElement;
    if (!container) {
      throw new Error("Draggable element must have a parent.");
    }

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coordinates.current.startX = e.clientX;
      coordinates.current.startY = e.clientY;
      draggable.setAttribute("disabled", "true");
    };

    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
      coordinates.current.lastX = draggable.offsetLeft;
      coordinates.current.lastY = draggable.offsetTop;
      draggable.setAttribute("disabled", "false");
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) {
        return;
      }
      const nextX =
        e.clientX - coordinates.current.startX + coordinates.current.lastX;
      const nextY =
        e.clientY - coordinates.current.startY + coordinates.current.lastY;

      draggable.style.top = `${nextY}px`;
      draggable.style.left = `${nextX}px`;
    };

    draggable.addEventListener("mousedown", onMouseDown);
    draggable.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      draggable.removeEventListener("mousedown", onMouseDown);
      draggable.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };
    return cleanup;
  }, [draggableId]);
};

export default useDraggable;
