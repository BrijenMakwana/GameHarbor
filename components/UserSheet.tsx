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
        <UserBanner userImage="https://lh3.googleusercontent.com/pw/ADCreHerVlCis8ZTamXOe4Cu5eSErcyh0RrW0n3A1zrQq3DpJA5u3UKd-eUY8WD_hrvc_eMz5j-mCTh2eMsCkuXYbGiFkpOaXSNknEbpgF86gBmd6ICLbYQ9ZnUSCkpLWhHeOMzgknfmEp91TqZuuBv0VqykTgb1FcWzfl-Nv6hfZX_NzwOhmgwZZ9UJ-u_WTM92XLf8sr3fb4WZq8AmrbR8u68urXwgutczESI0mvAdtUy7-bsoJaIyhhN2HD-DFfIiAE_2oT6po779n9F4h55jV3z0PsuSyG0TUfpmeGowWgYNN8DAv9qreZCTIEJOPI2z9_JUZWrVBdPDhWQm7a9PMILa9rnAGBIQs4Tf8ScaTqI3XZupuEZdUd1mKswyecrJN_pJg-O50xBxg38QCZ0dfJOALxSVHwtchHdNkErJ_pRRvwVADzIoQoIOz1RRQDyDpGohxiXoCQb-AdT_YW3M0yAHq_b-SyIxEplA2uynExG6UYW08Wj4bKUpIMDqnZfyhfbsEHgwsjuiJemtS2ZWI4LgjxPb--J42feHeN280Bo4rx7WwtaJUdAUM0QRq8I4YbOZl7YZJs3IEGtDqOA9k0SxoRpN8MtFy5z7yWRkK1Cm613Sd6biisiYwlSmtDgL678lEr2app1jjHj96tPflw4ENHLqA6OR63AI95kCipG6JKgvLwmTVo6-kam8h88yB6xwnTSmSh5QHaKd3s24jF4YUcFdQIj7Zzy6ZdYn9UbByHLA0SoHUxv8AMrPXTu7hRjlxNuWpXAdF1pc7tP4PBEr2aKRBvIUYE7tokBoEW6vCiyESlq7PYIoeti9oJKc64L1SLzojKBAZMgWXmHwXi3ddmOkb89DluiJSTy_hsf7q4Cw8aBaH3c012DAMGCixzOE8NqRrsKOvYJ6alTBq9Q=w687-h914-s-no?authuser=0" />

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
