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
        <Avatar.Image src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" />
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
