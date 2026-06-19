import { router } from "expo-router";
import { useCallback } from "react";
import { ContentList } from "@/components/ContentList";
import { MediaListItem } from "@/components/MediaListItem";
import { usePlayback } from "@/contexts/PlaybackContext";
import { RADIO_STREAMS } from "@/services/nts";
import type { RadioStream } from "@/types/radio";

export default function RadioScreen() {
  const { playStream } = usePlayback();

  const renderStream = useCallback(
    ({ item: stream }: { item: RadioStream }) => (
      <MediaListItem
        artwork={stream.artwork}
        onPress={() => {
          playStream(stream).catch(() => undefined);
          router.push("/playing");
        }}
        title={stream.title}
      />
    ),
    [playStream]
  );

  return (
    <ContentList
      contentGap={8}
      data={RADIO_STREAMS}
      headerTitle="NTS Radio"
      hideBackButton
      keyExtractor={(stream) => stream.id}
      renderItem={renderStream}
      rightAction={{
        icon: "graphic-eq",
        onPress: () => router.push("/playing"),
      }}
    />
  );
}
