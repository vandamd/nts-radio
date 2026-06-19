import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { n } from "@/utils/scaling";
import { HapticPressable } from "./HapticPressable";
import { StyledText } from "./StyledText";

export interface HeaderAction {
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  show?: boolean;
}

interface HeaderProps {
  headerTitle?: string;
  hideBackButton?: boolean;
  onBackPress?: () => void;
  rightAction?: HeaderAction;
}

export function Header({
  headerTitle,
  hideBackButton = false,
  onBackPress,
  rightAction,
}: HeaderProps) {
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={styles.header}>
      {hideBackButton ? (
        <View style={styles.button} />
      ) : (
        <HapticPressable onPress={handleBack}>
          <View style={styles.button}>
            <MaterialIcons color="white" name="arrow-back-ios" size={n(28)} />
          </View>
        </HapticPressable>
      )}
      <View style={styles.titleWrapper}>
        <StyledText numberOfLines={1} style={styles.title}>
          {headerTitle}
        </StyledText>
      </View>
      {rightAction?.show !== false && rightAction?.icon ? (
        <HapticPressable onPress={rightAction.onPress}>
          <View style={styles.button}>
            <MaterialIcons color="white" name={rightAction.icon} size={n(28)} />
          </View>
        </HapticPressable>
      ) : (
        <View style={styles.button} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: n(22),
    paddingVertical: n(5),
    zIndex: 1,
  },
  title: {
    fontFamily: "PublicSans-Regular",
    fontSize: n(20),
    maxWidth: "100%",
    paddingTop: n(2),
  },
  titleWrapper: {
    alignItems: "center",
    flex: 1,
  },
  button: {
    alignItems: "center",
    height: n(32),
    paddingTop: n(6),
    paddingRight: n(4),
    width: n(32),
  },
});
