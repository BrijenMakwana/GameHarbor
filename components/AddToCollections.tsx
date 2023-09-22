import { useState } from "react";
import { SpeedDial } from "@rneui/themed";
import {
  Check,
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
  const [presentInCollections, setPresentInCollections] = useState(false);
  const [collectionName, setCollectionName] = useState("Played");

  return (
    <SpeedDial
      isOpen={isOpen}
      icon={presentInCollections ? <Check /> : <Plus />}
      openIcon={<ShieldClose />}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      buttonStyle={{
        backgroundColor: darkColors.blue10
      }}
      title={presentInCollections ? collectionName : ""}
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
