import { LogOut } from "@tamagui/lucide-icons";
import { Avatar, Button, H2, Image, Sheet, Text, YStack } from "tamagui";

const UserBanner = (props) => {
  const { userImage } = props;

  return (
    <YStack>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1533654238074-8841f6e8e610?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        }}
        aspectRatio={16 / 9}
        resizeMode="cover"
        blurRadius={2}
      />

      <Avatar
        circular
        size="$11"
        position="absolute"
        bottom={-60}
        left={30}
        borderWidth={7}
        borderColor="$backgroundStrong"
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
        <UserBanner userImage="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" />

        <YStack
          marginTop={60}
          padding={10}
          gap={10}
        >
          <H2
            textTransform="capitalize"
            color="$blue10Dark"
          >
            Brijen makwana
          </H2>

          <Text>brijenma@gmail.com</Text>
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
