import { Icon } from "@iconify/react";
import scalloping from "$lib/lomans-pizza/assets/scalloping.svg";
import scallopingMobile from "$lib/lomans-pizza/assets/scallopingMobile.svg";

const BottomScalloping = () => {
  return (
    <>
      <img
        src={scallopingMobile}
        alt="bottom-scalloping-mobile-version"
        className="w-screen h-auto absolute bottom-0 left-0 !m-0 p-0 block lg:hidden motion-translate-y-in-75 motion-ease-out-quart motion-duration-500 motion-delay-[3000ms]"
      />
      <img
        src={scalloping}
        alt="bottom-scalloping"
        className="w-screen h-auto absolute bottom-0 left-0 !m-0 p-0 hidden lg:block motion-translate-y-in-75 motion-ease-out-quart motion-duration-500 motion-delay-[3000ms]"
      />
      <div className="w-screen h-auto flex flex-col items-center justify-center absolute bottom-0 left-0 p-2 xl:p-4 motion-scale-in-0 motion-ease-spring-bouncier motion-duration-500 motion-delay-[3200ms]">
        <span className="text-stone-750 text-xl lg:text-3xl font-heading">
          Our Story
        </span>
        <Icon
          icon="carbon:chevron-down"
          className="!text-stone-750 text-xl lg:text-3xl motion-preset-oscillate"
        />
      </div>
    </>
  );
};

export default BottomScalloping;
