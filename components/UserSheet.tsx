import { LogOut } from "@tamagui/lucide-icons";
import { Avatar, Button, H2, Image, Sheet, Text, YStack } from "tamagui";

import GameBanner from "./GameBanner";

const UserBanner = (props) => {
  const { userImage } = props;

  return (
    <YStack>
      <GameBanner url="https://images.unsplash.com/photo-1533654238074-8841f6e8e610?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" />

      <Avatar
        circular
        size="$11"
        position="absolute"
        bottom={-60}
        left={30}
        borderWidth={7}
        borderColor="$blue3Dark"
      >
        <Avatar.Image src={userImage} />
        <Avatar.Fallback bc="$blue10Dark" />
      </Avatar>
    </YStack>
  );
};

const UserSheet = (props) => {
  const { open, setOpen } = props;

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal={true}
      open={open}
      onOpenChange={setOpen}
      dismissOnSnapToBottom
      zIndex={100_000}
      animation="bouncy"
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Handle theme="blue" />
      <Sheet.Frame theme="blue">
        <UserBanner userImage="https://lh3.googleusercontent.com/pw/ADCreHf9d9U21-ddyd9p0zExeP8-pb4VauZQ3ioadCn3N_Dt4sHAyTOu75plFnxuwfe8nQ_a-GCsKlu7osfLWcfeA6bfBGlsIQrmYXpl8RIP8d2xbyF6FRikV3NLf9g8Q81_dzjxJOSZgw4NLG2G4898WqyeWPMa_KnLTDMx-a7w1VLRjE1QPb3TSrnIt28aSUBMmwbt-sQRtpsJNmooa_n7l-zhgHSpSg9wIv1g-WQlKalCK1nxCzOZs5GmVSqjgOK-sT0Yx7RTydCBqPB_A3V6nxnyUEA-TTA4-wuKhuj4p1P2F3aL1ksx4fFYdXyFYB_R7NIPc-lx09Rb1AtKiKX2s8hU6h1ZTclqZdZxOKCS9bpONXxfb3MY5mwwLQUGM2RBAe0aJDVR5DXhXNgeGVsA8iwgYUuJ4jP1HjXm02M4kuwy8Ccy0EbD54UOkQljyTLi3t7VLjr-jOO0tdxknEbLwcVOaczRvZYRW59IIszOpPhsVVN9TaORARGrzWLvhAeKjt9U_TVAKSiALqWkvh8LP6Yq3R9CCaFB2H5GNzD-fKkQbndPBTaVCSycx3GK7DLManaixkU6SPNoyabdoFeAsB1icFR3Rx0Vkf-BOrpv9iaPsH7zQ1iYpvc7V8id_7CoMqOQPQegGAJAHqG3KXNVoMm5lr8lZeXBIq6LyTjuv52AB9WOw4aEZaWBhkuIp7aziP-khc6JVcOinb_DfGGv-NZtBa7SUjH1TxJdqBqghpCyZ7NVlc7BovFwG-cXgmcFmgG44jd3I7JxtjKzn_ghrw64MLNCZzu-3vcwbWdnNnhEs24VId-jhkj7qqXvq-EyzMyBINz3pQPeI3rS2aiIISFpRun-N9Ktt0JknARfnKUMV07t8K21-oJjoVmimje4ftGFvAyH4gCukFyukBrqkxk=w687-h914-s-no?authuser=0" />

        <YStack
          marginTop={60}
          padding={10}
          gap={10}
        >
          <H2
            textTransform="capitalize"
            color="#fff"
          >
            Brijen makwana
          </H2>

          <Text color="$blue10Dark">brijenma@gmail.com</Text>
        </YStack>

        <Button
          iconAfter={LogOut}
          theme="red"
          marginTop="auto"
          marginHorizontal={20}
          marginBottom={20}
        >
          Logout
        </Button>
      </Sheet.Frame>
    </Sheet>
  );
};

export default UserSheet;
