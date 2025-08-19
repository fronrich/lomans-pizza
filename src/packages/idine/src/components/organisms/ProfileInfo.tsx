import { FC } from "react";
import { TextInput } from "flowbite-react";
import { UseFormRegister } from "react-hook-form";
import Reservation from "../../types/Reservation";
import useIcon from "../../hooks/render/useIcon";

interface ProfileInfoProps {
  register: UseFormRegister<Reservation>;
}

const ProfileInfo: FC<ProfileInfoProps> = ({ register }) => {
  const phoneIcon = useIcon("carbon:phone-filled");
  const emailIcon = useIcon("carbon:email");
  return (
    <section className="flex flex-col flex-wrap lg:flex-row gap-2 lg:justify-between">
      <TextInput
        className="w-full lg:w-[calc(50%-0.5rem)]"
        required
        placeholder="First Name"
        id="firstName"
        {...register("firstName")}
      />

      <TextInput
        className="w-full lg:w-[calc(50%-0.5rem)]"
        required
        placeholder="Last Name"
        id="lastName"
        {...register("lastName")}
      />

      <TextInput
        className="w-full lg:w-[calc(50%-0.5rem)]"
        icon={phoneIcon}
        required
        placeholder="Phone Number"
        id="phone"
        type="tel"
        {...register("phone")}
      />

      <TextInput
        className="w-full lg:w-[calc(50%-0.5rem)]"
        icon={emailIcon}
        required
        placeholder="Email"
        id="email"
        type="email"
        {...register("email")}
      />
    </section>
  );
};

export default ProfileInfo;
