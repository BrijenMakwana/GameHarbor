import { Image } from "tamagui";

const ESRBRating = (props) => {
  const { slug } = props;

  const ageRatingIcons = {
    mature: require("../assets/images/ageRatingIcons/mature.png"),
    teen: require("../assets/images/ageRatingIcons/teen.png"),
    "adults-only": require("../assets/images/ageRatingIcons/adults.png"),
    "early-childhood": require("../assets/images/ageRatingIcons/early-childhood.png"),
    "everyone-10-plus": require("../assets/images/ageRatingIcons/everyone-10-plus.png"),
    "rating-pending": require("../assets/images/ageRatingIcons/rating-pending.png"),
    everyone: require("../assets/images/ageRatingIcons/everyone.png")
  };

  return (
    <Image
      source={ageRatingIcons[slug]}
      resizeMode="contain"
      style={{
        height: 65,
        width: 45
      }}
      position="absolute"
      zIndex={10}
      top={10}
      right={10}
    />
  );
};

export default ESRBRating;
