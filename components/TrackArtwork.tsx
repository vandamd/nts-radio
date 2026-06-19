import { Image, type ImageSource } from "expo-image";
import { memo } from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import { n } from "@/utils/scaling";

interface TrackArtworkProps {
  size: number;
  source?: ImageSource | number | null;
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
        <Image contentFit="cover" source={source} style={styles.image} />
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
    width: "100%",
  },
});
