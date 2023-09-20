import { Delete, Search } from "@tamagui/lucide-icons";
import { Button, Input, XStack } from "tamagui";

const SearchBar = (props) => {
  const { searchedGame, setSearchedGame, onSearch, onClear } = props;

  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal={10}
      paddingVertical={5}
      gap={10}
    >
      <Input
        theme="blue"
        placeholder="Search your games here..."
        value={searchedGame}
        onChangeText={(text) => setSearchedGame(text)}
        onSubmitEditing={onSearch}
        flex={1}
      />

      {searchedGame && (
        <Button
          theme="red"
          icon={Delete}
          onPress={onClear}
        />
      )}

      <Button
        theme="blue"
        icon={Search}
        disabled={!searchedGame}
        onPress={onSearch}
        opacity={searchedGame ? 1 : 0.5}
      />
    </XStack>
  );
};

export default SearchBar;
