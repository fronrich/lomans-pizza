import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { useIDine } from "../../../../packages/idine";
import { Link } from "@tanstack/react-router";

const Navigation = () => {
  const {
    currentUser,
    restaurant,
    display: {
      atoms: { Glyph },
      organisms: { AuthUI },
    },
  } = useIDine();
  return (
    <Navbar
      fluid
      className="fixed top-0 left-0 w-screen not-prose bg-surface-50 shadow-lg border-b-[1px] border-surface-300"
    >
      <div className="flex">
        <NavbarToggle />
        <Link to="/">
          <NavbarBrand>
            <Glyph fill="fill-primary-500" />
            <span className="font-semibold text-3xl">IDine</span>
          </NavbarBrand>
        </Link>
      </div>
      <div className="flex md:order-2">
        <AuthUI />
      </div>
      <NavbarCollapse>
        <Link to="/">Explore</Link>
        {currentUser && <Link to="/dashboard">My Reservations</Link>}
        {currentUser && restaurant?.adminIds.includes(currentUser?.id) && (
          <Link className="font-bold" to="/dashboard/admin">
            Manage {restaurant.name} 🔓
          </Link>
        )}
      </NavbarCollapse>
    </Navbar>
  );
};

export default Navigation;
