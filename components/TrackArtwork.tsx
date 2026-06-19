import { memo } from "react";
import {
  Image,
  type ImageSourcePropType,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import { n } from "@/utils/scaling";

interface TrackArtworkProps {
  size: number;
  source?: ImageSourcePropType | null;
  style?: StyleProp<ViewStyle>;
}

function TrackArtworkComponent({ size, source, style }: TrackArtworkProps) {
  return (
    <View
      style={[
        styles.container,
        {
          height: n(size),
          width: n(size),
        },
        style,
      ]}
    >
      {source ? (
        <Image fadeDuration={0} source={source} style={styles.image} />
      ) : null}
    </View>
  );
}

export const TrackArtwork = memo(TrackArtworkComponent);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    height: "100%",
    resizeMode: "cover",
    width: "100%",
  },
});
