import { FlatList } from "react-native";

import GameCarousel from "../components/GameCarousel";
import { MyStack } from "../components/MyStack";

export default function Home() {
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
      />
    </MyStack>
  );
}
