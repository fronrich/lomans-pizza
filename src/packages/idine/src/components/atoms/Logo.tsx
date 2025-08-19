import Glyph from "./Glyph";

const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Glyph fill="fill-surface-950" />
      <span className="font-idine !font-bold text-black">IDine</span>
    </div>
  );
};

export default Logo;
