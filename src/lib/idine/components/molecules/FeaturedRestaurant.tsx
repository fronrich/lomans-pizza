import { Card } from "flowbite-react";
import { Link } from "@tanstack/react-router";
import lomansInterior from "$lib/idine/assets/lomansInterior.jpg";
import { Icon } from "@iconify/react";

const FeaturedRestaurant = () => {
  return (
    <Link to="/restaurants/lomans-pizza">
      <Card
        className="not-prose font-idine border-[1px] border-surface-300 cursor-pointer group"
        imgSrc={lomansInterior}
        imgAlt="Loman's Pizza"
      >
        <div className="flex w-full justify-between items-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            Featured Restaurant
          </h2>
          <div className="flex items-center gap-2 group-hover:motion-preset-rebound-right opacity-0 transition-all group-hover:opacity-100">
            <span className="text-4xl text-primary-500 font-semibold ">
              Explore
            </span>
            <Icon
              icon="carbon:play-filled"
              className="text-4xl text-primary-500 "
            />
          </div>
        </div>
        <h3 className="text-2xl">Loman's Pizza</h3>
        <span>
          Where Austin meets Italy. Check out Executive Chef Longuini Manchini's
          hand-crafted menu, featuring flavors from the old world and and
          ensemble of ingredients from the Live Music Capital of the world.
        </span>
      </Card>
    </Link>
  );
};

export default FeaturedRestaurant;
