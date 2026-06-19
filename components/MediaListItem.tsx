import { memo } from "react";
import type { ImageSourcePropType } from "react-native";
import { StyleSheet, View } from "react-native";
import { HapticPressable } from "@/components/HapticPressable";
import { StyledText } from "@/components/StyledText";
import { TrackArtwork } from "@/components/TrackArtwork";
import { n } from "@/utils/scaling";

interface MediaListItemProps {
  artwork: ImageSourcePropType;
  onPress: () => void;
  title: string;
}

function MediaListItemComponent({
  artwork,
  onPress,
  title,
}: MediaListItemProps) {
  return (
    <HapticPressable onPress={onPress} style={styles.container}>
      <TrackArtwork size={50} source={artwork} style={styles.imageContainer} />
      <View style={styles.textContainer}>
        <StyledText numberOfLines={1} style={styles.primaryText}>
          {title}
        </StyledText>
      </View>
    </HapticPressable>
  );
}

export const MediaListItem = memo(MediaListItemComponent);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: n(50),
    paddingVertical: n(0),
    width: "100%",
  },
  imageContainer: {
    marginRight: n(15),
  },
  primaryText: {
    fontSize: n(22),
    lineHeight: n(24),
  },
  textContainer: {
    flex: 1,
    paddingRight: n(10),
  },
});
