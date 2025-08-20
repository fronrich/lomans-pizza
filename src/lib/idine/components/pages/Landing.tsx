import PageContentWrapper from "../elements/PageContentWrapper";
import Navigation from "../organisms/Navigation";
import { useIDine } from "../../../../packages/idine";
import FeaturedRestaurant from "../molecules/FeaturedRestaurant";

const Landing = () => {
  const { currentUser } = useIDine();

  return (
    <>
      <PageContentWrapper>
        <h1 className="font-semibold lg:!text-7xl">
          {currentUser
            ? `Welcome Back, ${currentUser.firstName}!`
            : "Hey There!"}
        </h1>
        <FeaturedRestaurant />
        <h3 className="font-semibold text-2xl">Explore Eateries</h3>
        <div className="w-full h-48 bg-surface-200 border-[1px] border-surface-300 flex items-center justify-center rounded-lg animate-pulse">
          <span>🚧 More Restaurants coming soon! 🚧</span>
        </div>
      </PageContentWrapper>
      <Navigation />
    </>
  );
};

export default Landing;
