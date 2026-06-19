import { router } from "expo-router";
import {
  type FlatListProps,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import Animated from "react-native-reanimated";
import { Header, type HeaderAction } from "@/components/Header";
import { SwipeBackContainer } from "@/components/SwipeBackContainer";
import { useScrollIndicator } from "@/hooks/useScrollIndicator";
import { n } from "@/utils/scaling";

interface ContentListProps<ItemT>
  extends Omit<
    FlatListProps<ItemT>,
    "CellRendererComponent" | "contentContainerStyle" | "data"
  > {
  contentGap?: number;
  data: ItemT[];
  headerTitle: string;
  hideBackButton?: boolean;
  listStyle?: ViewStyle;
  rightAction?: HeaderAction;
}

const handleBack = () => {
  if (router.canGoBack()) {
    router.back();
  }
};

export function ContentList<ItemT>({
  contentGap = 8,
  data,
  headerTitle,
  hideBackButton = false,
  listStyle,
  rightAction,
  ...listProps
}: ContentListProps<ItemT>) {
  const {
    handleScroll,
    scrollIndicatorHeight,
    scrollIndicatorStyle,
    setContentHeight,
    setScrollViewHeight,
  } = useScrollIndicator();
  const canSwipeBack = !hideBackButton;

  return (
    <SwipeBackContainer enabled={canSwipeBack} onSwipeBack={handleBack}>
      <View style={styles.container}>
        <Header
          headerTitle={headerTitle}
          hideBackButton={hideBackButton}
          onBackPress={handleBack}
          rightAction={rightAction}
        />
        <View style={styles.listWrapper}>
          <Animated.FlatList
            contentContainerStyle={[
              styles.content,
              { gap: n(contentGap) },
              listStyle,
            ]}
            data={data}
            initialNumToRender={18}
            maxToRenderPerBatch={18}
            onContentSizeChange={(_, height) => setContentHeight(height)}
            onLayout={(event) =>
              setScrollViewHeight(event.nativeEvent.layout.height)
            }
            onScroll={handleScroll as FlatListProps<ItemT>["onScroll"]}
            overScrollMode="never"
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            style={styles.list}
            windowSize={9}
            {...listProps}
          />
          {scrollIndicatorHeight > 0 ? (
            <View style={styles.scrollIndicatorTrack}>
              <Animated.View
                style={[
                  styles.scrollIndicatorThumb,
                  { height: scrollIndicatorHeight },
                  scrollIndicatorStyle,
                ]}
              />
            </View>
          ) : null}
        </View>
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
    paddingBottom: n(20),
  },
  content: {
    alignItems: "flex-start",
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingLeft: n(20),
    paddingRight: n(32),
    width: "100%",
  },
  list: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
    position: "relative",
    width: "100%",
  },
  scrollIndicatorThumb: {
    backgroundColor: "white",
    position: "absolute",
    right: n(-2),
    width: n(5),
  },
  scrollIndicatorTrack: {
    backgroundColor: "white",
    height: "100%",
    position: "absolute",
    right: n(18),
    width: n(1),
  },
});
