import { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Avatar, Card, Image, XStack, YStack } from "tamagui";

import GameCarousel from "../../components/GameCarousel";
import GameConsoleCarousel from "../../components/GameConsoleCarousel";
import GameGenres from "../../components/GameGenres";
import { MyStack } from "../../components/MyStack";
import UserSheet from "../../components/UserSheet";
import { GameContext } from "../../context/context";
import { db, doc, getDoc } from "../../firebase/firebase";

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
        <Avatar.Image src="https://lh3.googleusercontent.com/pw/ADCreHf9d9U21-ddyd9p0zExeP8-pb4VauZQ3ioadCn3N_Dt4sHAyTOu75plFnxuwfe8nQ_a-GCsKlu7osfLWcfeA6bfBGlsIQrmYXpl8RIP8d2xbyF6FRikV3NLf9g8Q81_dzjxJOSZgw4NLG2G4898WqyeWPMa_KnLTDMx-a7w1VLRjE1QPb3TSrnIt28aSUBMmwbt-sQRtpsJNmooa_n7l-zhgHSpSg9wIv1g-WQlKalCK1nxCzOZs5GmVSqjgOK-sT0Yx7RTydCBqPB_A3V6nxnyUEA-TTA4-wuKhuj4p1P2F3aL1ksx4fFYdXyFYB_R7NIPc-lx09Rb1AtKiKX2s8hU6h1ZTclqZdZxOKCS9bpONXxfb3MY5mwwLQUGM2RBAe0aJDVR5DXhXNgeGVsA8iwgYUuJ4jP1HjXm02M4kuwy8Ccy0EbD54UOkQljyTLi3t7VLjr-jOO0tdxknEbLwcVOaczRvZYRW59IIszOpPhsVVN9TaORARGrzWLvhAeKjt9U_TVAKSiALqWkvh8LP6Yq3R9CCaFB2H5GNzD-fKkQbndPBTaVCSycx3GK7DLManaixkU6SPNoyabdoFeAsB1icFR3Rx0Vkf-BOrpv9iaPsH7zQ1iYpvc7V8id_7CoMqOQPQegGAJAHqG3KXNVoMm5lr8lZeXBIq6LyTjuv52AB9WOw4aEZaWBhkuIp7aziP-khc6JVcOinb_DfGGv-NZtBa7SUjH1TxJdqBqghpCyZ7NVlc7BovFwG-cXgmcFmgG44jd3I7JxtjKzn_ghrw64MLNCZzu-3vcwbWdnNnhEs24VId-jhkj7qqXvq-EyzMyBINz3pQPeI3rS2aiIISFpRun-N9Ktt0JknARfnKUMV07t8K21-oJjoVmimje4ftGFvAyH4gCukFyukBrqkxk=w687-h914-s-no?authuser=0" />
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

  const { setGameCollections } = useContext(GameContext);

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

  const getGamesFromCollections = async () => {
    try {
      const docRef = doc(db, "games", "brijenma@gmail.com");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setGameCollections(docSnap.data()?.collection);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getGamesFromCollections();
  }, []);

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
