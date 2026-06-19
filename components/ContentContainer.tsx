import { router } from "expo-router";
import type { ReactNode } from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import { Header } from "@/components/Header";
import { SwipeBackContainer } from "@/components/SwipeBackContainer";
import { n } from "@/utils/scaling";

interface ContentContainerProps {
  children?: ReactNode;
  contentWidth?: "normal" | "playing" | "wide";
  headerTitle?: string;
  hideBackButton?: boolean;
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function ContentContainer({
  children,
  contentWidth = "normal",
  headerTitle,
  hideBackButton = false,
  scrollable = true,
  style,
}: ContentContainerProps) {
  const canSwipeBack = Boolean(headerTitle) && !hideBackButton;
  const horizontalPadding =
    contentWidth === "playing" || contentWidth === "wide" ? n(20) : n(37);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const content = (
    <View
      style={[
        scrollable ? styles.content : styles.staticContent,
        {
          paddingHorizontal: horizontalPadding,
        },
        style,
      ]}
    >
      {children ?? null}
    </View>
  );

  return (
    <SwipeBackContainer enabled={canSwipeBack} onSwipeBack={handleBack}>
      <View style={styles.container}>
        {headerTitle ? (
          <Header
            headerTitle={headerTitle}
            hideBackButton={hideBackButton}
            onBackPress={handleBack}
          />
        ) : null}
        {scrollable ? (
          <View style={styles.scrollPlaceholder}>{content}</View>
        ) : (
          content
        )}
      </View>
    </SwipeBackContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    gap: n(14),
    width: "100%",
  },
  content: {
    alignItems: "flex-start",
    gap: n(47),
    justifyContent: "flex-start",
    paddingBottom: n(20),
    width: "100%",
  },
  scrollPlaceholder: {
    flex: 1,
  },
  staticContent: {
    alignItems: "flex-start",
    flex: 1,
    gap: n(47),
    justifyContent: "flex-start",
    paddingBottom: n(20),
    width: "100%",
  },
});
