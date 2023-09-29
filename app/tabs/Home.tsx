import { useState } from "react";
import { FlatList } from "react-native";
import { Avatar, Card, Image, XStack, YStack } from "tamagui";

import GameCarousel from "../../components/GameCarousel";
import GameConsoleCarousel from "../../components/GameConsoleCarousel";
import GameGenres from "../../components/GameGenres";
import { MyStack } from "../../components/MyStack";
import UserSheet from "../../components/UserSheet";

const UserAvatar = () => {
  const [userSheetIsOpen, setUserSheetIsOpen] = useState(false);

  const openUserSheet = () => {
    setUserSheetIsOpen(true);
  };

  return (
    <>
      <Avatar
        circular
        size="$5"
        onPress={openUserSheet}
      >
        <Avatar.Image src="https://lh3.googleusercontent.com/pw/ADCreHerVlCis8ZTamXOe4Cu5eSErcyh0RrW0n3A1zrQq3DpJA5u3UKd-eUY8WD_hrvc_eMz5j-mCTh2eMsCkuXYbGiFkpOaXSNknEbpgF86gBmd6ICLbYQ9ZnUSCkpLWhHeOMzgknfmEp91TqZuuBv0VqykTgb1FcWzfl-Nv6hfZX_NzwOhmgwZZ9UJ-u_WTM92XLf8sr3fb4WZq8AmrbR8u68urXwgutczESI0mvAdtUy7-bsoJaIyhhN2HD-DFfIiAE_2oT6po779n9F4h55jV3z0PsuSyG0TUfpmeGowWgYNN8DAv9qreZCTIEJOPI2z9_JUZWrVBdPDhWQm7a9PMILa9rnAGBIQs4Tf8ScaTqI3XZupuEZdUd1mKswyecrJN_pJg-O50xBxg38QCZ0dfJOALxSVHwtchHdNkErJ_pRRvwVADzIoQoIOz1RRQDyDpGohxiXoCQb-AdT_YW3M0yAHq_b-SyIxEplA2uynExG6UYW08Wj4bKUpIMDqnZfyhfbsEHgwsjuiJemtS2ZWI4LgjxPb--J42feHeN280Bo4rx7WwtaJUdAUM0QRq8I4YbOZl7YZJs3IEGtDqOA9k0SxoRpN8MtFy5z7yWRkK1Cm613Sd6biisiYwlSmtDgL678lEr2app1jjHj96tPflw4ENHLqA6OR63AI95kCipG6JKgvLwmTVo6-kam8h88yB6xwnTSmSh5QHaKd3s24jF4YUcFdQIj7Zzy6ZdYn9UbByHLA0SoHUxv8AMrPXTu7hRjlxNuWpXAdF1pc7tP4PBEr2aKRBvIUYE7tokBoEW6vCiyESlq7PYIoeti9oJKc64L1SLzojKBAZMgWXmHwXi3ddmOkb89DluiJSTy_hsf7q4Cw8aBaH3c012DAMGCixzOE8NqRrsKOvYJ6alTBq9Q=w687-h914-s-no?authuser=0" />
        <Avatar.Fallback bc="$blue10Dark" />
      </Avatar>

      {userSheetIsOpen && (
        <UserSheet
          open={userSheetIsOpen}
          setOpen={setUserSheetIsOpen}
        />
      )}
    </>
  );
};

const Header = () => {
  return (
    <Card
      theme="blue"
      padding={10}
    >
      <XStack
        alignItems="center"
        justifyContent="space-between"
      >
        <Image
          source={require("../../assets/images/logo.png")}
          resizeMode="contain"
          style={{
            aspectRatio: 16 / 9,
            width: 140
          }}
        />
        <UserAvatar />
      </XStack>
    </Card>
  );
};

const Home = () => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const gameCategories = [
    {
      id: "2",
      title: "upcoming games",
      apiEndpoint: `https://api.rawg.io/api/games?dates=${nextYear}-01-01,${nextYear}-12-31&ordering=-added`
    },
    {
      id: "3",
      title: `highest rated games of ${currentYear}`,
      apiEndpoint: `https://api.rawg.io/api/games?dates=${currentYear}-01-01,${currentYear}-12-31&ordering=-rating`
    },
    {
      id: "4",
      title: "most popular",
      apiEndpoint: "https://api.rawg.io/api/games?ordering=-metacritic"
    }
  ];

  return (
    <MyStack>
      <FlatList
        data={gameCategories}
        renderItem={({ item }) => <GameCarousel {...item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <Header />}
        ListFooterComponent={() => (
          <YStack gap={15}>
            <GameConsoleCarousel />
            <GameGenres />
          </YStack>
        )}
        contentContainerStyle={{
          gap: 15,
          paddingHorizontal: 5
        }}
      />
    </MyStack>
  );
};

export default Home;
