import paperOverlay from "$lib/lomans-pizza/assets/paperOverlay.jpg";

const PaperTextureOverlay = () => {
  return (
    <img
      className="w-screen h-screen absolute top-0 left-0 pointer-events-none mix-blend-overlay opacity-15"
      src={paperOverlay}
      alt="paper overlay"
    />
  );
};

export default PaperTextureOverlay;
