import { useEffect, useState } from "react";
import getRandomColor from "../../utils/getRandomColor";
import { CircleType, ElementCoordinateType } from "./DetectOverLappingCircleTypes";

const DetectOverLappingCircle = () => {
  const [elementsCoordinates, setElementsCoordinates] = useState<ElementCoordinateType[]>([]);

  function elementsOverlap(circle1: ElementCoordinateType, circle2: ElementCoordinateType): boolean {
    const collide = !(
      circle1.top > circle2.bottom ||
      circle1.right < circle2.left ||
      circle1.bottom < circle2.top ||
      circle1.left > circle2.right
    );

    return collide;
  };

  function handleClick(e: MouseEvent) {
    const { clientX, clientY } = e;
    setElementsCoordinates((prevElements) => {
      const current = {
        id: Date.now(),
        top: clientY - 100,
        left: clientX - 100,
        right: clientX - 100 + 200,
        bottom: clientY - 100 + 200,
        background: "red",
      };

      for (let i = 0; i < prevElements.length; i++) {
        if (elementsOverlap(current, prevElements[i])) {
          current.background = getRandomColor();
          break;
        }
      }

      return [...prevElements, current];
    });
  };

  function Circle({ top, left, background }: CircleType) {
    return (
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          opacity: "0.5",
          background,
          top,
          left,
        }}
      ></div>
    );
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  console.log(elementsCoordinates);

  return (
    <div>
      <h1 className="text-4xl">Detect OverLapping Circle</h1>
      {elementsCoordinates.map((e) => (
        <Circle {...e} key={e?.id} />
      ))}
    </div>
  );
};

export default DetectOverLappingCircle;
