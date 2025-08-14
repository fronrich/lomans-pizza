import paperOverlay from "$lib/assets/paperOverlay.jpg";

const PaperTextureOverlay = () => {
  return (
    <img
      className="w-screen h-screen absolute top-0 left-0 pointer-events-none mix-blend-soft-light opacity-50"
      src={paperOverlay}
      alt="paper overlay"
    />
  );
};

export default PaperTextureOverlay;
