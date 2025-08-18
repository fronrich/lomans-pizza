import invertedScalloping from "$lib/lomans-pizza/assets/invertedScalloping.svg";
const TopScalloping = () => {
  return (
    <>
      <img
        src={invertedScalloping}
        alt="bottom-scalloping"
        className="w-screen h-auto absolute top-0 left-0 !m-0 p-0 hidden lg:block"
      />
    </>
  );
};

export default TopScalloping;
