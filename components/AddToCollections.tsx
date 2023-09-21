import { useState } from "react";
import { SpeedDial } from "@rneui/themed";
import {
  Gamepad,
  Heart,
  Plus,
  ShieldClose,
  Trophy
} from "@tamagui/lucide-icons";
import { darkColors } from "@tamagui/themes";

const SpeedDialAction = (props) => {
  const { Icon, title } = props;

  return (
    <SpeedDial.Action
      icon={<Icon />}
      title={title}
      onPress={() => console.log("Do Something")}
      buttonStyle={{
        backgroundColor: darkColors.blue10
      }}
    />
  );
};

const AddToCollections = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SpeedDial
      isOpen={isOpen}
      icon={<Plus />}
      openIcon={<ShieldClose />}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      buttonStyle={{
        backgroundColor: darkColors.blue10
      }}
    >
      <SpeedDialAction
        title="Own"
        Icon={Gamepad}
      />
      <SpeedDialAction
        title="Want to Play"
        Icon={Heart}
      />
      <SpeedDialAction
        title="Played"
        Icon={Trophy}
      />
    </SpeedDial>
  );
};

export default AddToCollections;
