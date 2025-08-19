import { useIDine } from "../../../../packages/idine";
import lomanGlyph from "$lib/lomans-pizza/assets/lomanGlyph.svg";
import { Link } from "@tanstack/react-router";

const Navigation = () => {
  const {
    display: {
      organisms: { AuthUI },
    },
  } = useIDine();
  return (
    <section className="pointer-events-none w-screen p-4 flex justify-between items-center fixed top-0 left-0">
      <Link to="/restaurants/lomans-pizza" className="pointer-events-auto">
        <img src={lomanGlyph} alt="glyph" className="w-12 !m-0 drop-shadow" />
      </Link>
      <div className="pointer-events-auto">
        <AuthUI />
      </div>
    </section>
  );
};

export default Navigation;
