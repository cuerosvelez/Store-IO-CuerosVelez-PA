import React, { useEffect } from "react";
import { useCountUp } from "react-countup";
import { useInView } from "react-intersection-observer";

import { index as RichText } from "vtex.rich-text";
import iOMessage from "../hooks/ioMessage";

interface Props {
  end: number;
  text?: string;
  start?: number;
  delay?: number;
  duration?: number;
}

const EffectNumber = ({
  end,
  text,
  delay = 1000,
  duration = 5,
  start: to = 0,
}: Props) => {
  const [ref, inView] = useInView();
  const { countUp, start, reset } = useCountUp({
    end: end,
    start: to,
    delay: delay,
    duration: duration,
    onStart: ({ pauseResume }) => console.log(pauseResume),
  });

  useEffect(() => {
    if (inView) {
      start();
    } else {
      reset();
    }
  }, [inView]);

  return (
    <div>
      <div ref={ref}>
        <RichText
          text={
            iOMessage({
              id: text ?? "{ count }",
              values: {
                count: parseFloat(`${countUp}`).toLocaleString("es-CO"),
              },
            })?.message
          }
        />
      </div>
    </div>
  );
};

EffectNumber.schema = {
  title: "Effect Number",
  type: "object",
  properties: {
    end: {
      default: 10,
      type: "number",
      title: "Número a contar",
    },
    start: {
      default: 0,
      type: "number",
      title: "Número de inicio del contador",
    },
    duration: {
      default: 5,
      type: "number",
      title: "Duración de la animación en segundos",
    },
    delay: {
      default: 1000,
      type: "number",
      title: "Retraso de la animación en milisegundos",
    },
    text: {
      title: "Texto",
      type: "string",
      widget: { "ui:widget": "textarea" },
    },
  },
  description: "Agrega en el texto { count } para la visualización del contador",
};

export default EffectNumber;
