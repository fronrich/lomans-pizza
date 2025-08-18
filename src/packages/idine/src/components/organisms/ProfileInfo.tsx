import { FC } from "react";
import { TextInput } from "flowbite-react";
import { Icon } from "@iconify/react";
import { UseFormRegister } from "react-hook-form";
import Reservation from "../../types/Reservation";

interface ProfileInfoProps {
  register: UseFormRegister<Reservation>;
}

const ProfileInfo: FC<ProfileInfoProps> = ({ register }) => {
  return (
    <section className="flex flex-col flex-wrap lg:flex-row gap-4 lg:justify-between">
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
        icon={() => (
          <Icon
            icon="carbon:phone-filled"
            className="text-surface-500 text-lg"
          />
        )}
        required
        placeholder="Phone Number"
        id="phone"
        type="tel"
        {...register("phone")}
      />

      <TextInput
        className="w-full lg:w-[calc(50%-0.5rem)]"
        icon={() => (
          <Icon icon="carbon:email" className="text-surface-500 text-lg" />
        )}
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
