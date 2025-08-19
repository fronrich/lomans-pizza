import { Button } from "flowbite-react";
import { useNavigate } from "@tanstack/react-router";

const MenuButton = () => {
  const nav = useNavigate();
  return (
    <Button
      onClick={() => nav({ to: "/restaurants/lomans-pizza/menu" })}
      className="w-full"
      color="alternative"
    >
      View the Menu
    </Button>
  );
};

export default MenuButton;
