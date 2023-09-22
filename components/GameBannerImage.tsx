import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image, View } from "tamagui";

const GameBannerImage = (props) => {
  const { image } = props;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={styles.image}
      />
      <LinearGradient
        colors={["transparent", "#111111"]}
        style={styles.overlay}
      />
    </View>
  );
};

export default GameBannerImage;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject
  }
});
