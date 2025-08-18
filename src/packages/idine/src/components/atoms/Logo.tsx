import Glyph from "./Glyph";

const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Glyph />
      <span className="font-idine !font-bold text-white">IDine</span>
    </div>
  );
};

export default Logo;
