import { FC } from "react";

interface GlpyhProps {
  fill?: string;
  stroke?: string;
}

const Glyph: FC<GlpyhProps> = ({ fill }) => {
  return (
    <>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="motion-preset-slide-right-lg motion-delay-200"
      >
        <path
          d="M28 16C28 22.6274 22.6274 28 16 28V24C20.4183 24 24 20.4183 24 16H8C8 20.4183 11.5817 24 16 24V28C9.37258 28 4 22.6274 4 16V14C4 12.8954 4.89543 12 6 12H26C27.1046 12 28 12.8954 28 14V16Z"
          className={`stroke-[0.5rem] ${fill ?? "fill-surface-50"} motion-scale-in-0 motion-ease-spring-bouncier motion-duration-500`}
        />
        <rect
          x="24"
          y="4"
          width="4"
          height="4"
          rx="2"
          className={`${fill ?? "fill-surface-50"} motion-scale-in-0 motion-ease-spring-bouncier motion-duration-300 motion-delay-1000`}
        />
        <rect
          x="4"
          y="4"
          width="16"
          height="4"
          rx="2"
          className={`${fill ?? "fill-surface-50"} motion-scale-in-0 motion-ease-spring-bouncier motion-duration-300 motion-delay-1500`}
        />
      </svg>
    </>
  );
};

export default Glyph;
