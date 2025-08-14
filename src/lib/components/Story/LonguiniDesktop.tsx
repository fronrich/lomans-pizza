import longuiniDesktop from "$lib/assets/longuiniDesktop.png";

const LonguiniDesktop = () => {
  return (
    <div className="lg:flex w-full justify-center items-center drop-shadow-lg">
      <img
        className="h-full max-w-xl bg-fixed"
        src={longuiniDesktop}
        alt="Longuini Manchini"
      />
    </div>
  );
};

export default LonguiniDesktop;
