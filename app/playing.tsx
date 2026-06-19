import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import ContentContainer from "@/components/ContentContainer";
import { HapticPressable } from "@/components/HapticPressable";
import { StyledText } from "@/components/StyledText";
import { TrackArtwork } from "@/components/TrackArtwork";
import { usePlayback } from "@/contexts/PlaybackContext";
import type { LiveProgramme } from "@/types/radio";
import { n } from "@/utils/scaling";

const formatClockTime = (timestamp: string) =>
  new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

function useCurrentTime(enabled: boolean) {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    if (!enabled) {
      return;
    }

    setCurrentTime(Date.now());
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [enabled]);

  return currentTime;
}

function ProgressIndicator({ programme }: { programme: LiveProgramme | null }) {
  const currentTime = useCurrentTime(true);
  const progress = useMemo(() => {
    if (!programme) {
      return 0;
    }

    const start = new Date(programme.startTime).getTime();
    const end = new Date(programme.endTime).getTime();
    if (end <= start) {
      return 0;
    }

    return Math.max(0, Math.min(1, (currentTime - start) / (end - start)));
  }, [currentTime, programme]);

  return (
    <View style={styles.timeIndicatorContainer}>
      <View style={styles.progressBarPressable}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarForeground,
              {
                transform: [{ scaleX: progress }],
              },
            ]}
          />
        </View>
      </View>
      <View style={styles.progressBarInfo}>
        <StyledText style={styles.timeText}>
          {programme ? formatClockTime(programme.startTime) : " "}
        </StyledText>
        <StyledText style={styles.timeText}>
          {programme ? formatClockTime(programme.endTime) : " "}
        </StyledText>
      </View>
    </View>
  );
}

export default function PlayingScreen() {
  const {
    activeMixtapeNowPlaying,
    activeProgramme,
    activeStream,
    error,
    isLoading,
    isPlaying,
    togglePlayPause,
  } = usePlayback();

  if (!activeStream) {
    return (
      <ContentContainer
        contentWidth="playing"
        headerTitle=" "
        scrollable={false}
      >
        <View style={styles.content}>
          <View style={styles.mainContent}>
            <View style={styles.placeholderImage} />
            <View style={styles.trackInfoContainer}>
              <StyledText numberOfLines={1} style={styles.trackName}>
                No stream playing
              </StyledText>
              <StyledText numberOfLines={1} style={styles.artistName}>
                Go back and play something!
              </StyledText>
            </View>
            <View style={styles.emptyControls} />
          </View>
        </View>
      </ContentContainer>
    );
  }

  const subtitle =
    activeStream.kind === "live"
      ? (activeProgramme?.title ?? "Live now")
      : (activeMixtapeNowPlaying?.title ?? "NTS Infinite Mixtapes");
  const playingArtworkUrl =
    activeStream.kind === "live"
      ? activeProgramme?.artworkUrl
      : activeStream.playingArtworkUrl;
  const artworkSource = playingArtworkUrl
    ? { uri: playingArtworkUrl }
    : activeStream.artwork;

  return (
    <ContentContainer contentWidth="playing" headerTitle=" " scrollable={false}>
      <View style={styles.content}>
        <View style={styles.mainContent}>
          <TrackArtwork
            size={200}
            source={artworkSource}
            style={styles.albumArt}
          />
          <View style={styles.trackInfoContainer}>
            <StyledText numberOfLines={1} style={styles.trackName}>
              {activeStream.title}
            </StyledText>
            <StyledText numberOfLines={1} style={styles.artistName}>
              {error ?? subtitle}
            </StyledText>
          </View>
          {activeStream.kind === "live" ? (
            <ProgressIndicator programme={activeProgramme} />
          ) : null}
          <View
            style={[
              styles.controlsZone,
              activeStream.kind === "mixtape"
                ? styles.mixtapeControlsZone
                : null,
            ]}
          >
            {isLoading ? (
              <StyledText style={styles.loadingText}>Loading...</StyledText>
            ) : (
              <HapticPressable onPress={togglePlayPause}>
                <MaterialIcons
                  color="white"
                  name={isPlaying ? "pause" : "play-arrow"}
                  size={n(52)}
                />
              </HapticPressable>
            )}
          </View>
        </View>
      </View>
    </ContentContainer>
  );
}

const styles = StyleSheet.create({
  albumArt: {
    height: n(200),
    marginBottom: n(20),
    width: n(200),
  },
  artistName: {
    fontSize: n(14),
    lineHeight: n(16),
    textAlign: "center",
  },
  content: {
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  controlsZone: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  emptyControls: {
    flex: 1,
    width: "100%",
  },
  mainContent: {
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  loadingText: {
    fontSize: n(16),
  },
  mixtapeControlsZone: {
    transform: [{ translateY: n(-4) }],
  },
  placeholderImage: {
    backgroundColor: "#282828",
    height: n(200),
    marginBottom: n(20),
    width: n(200),
  },
  progressBarBackground: {
    backgroundColor: "white",
    height: n(2),
    marginBottom: n(3),
    overflow: "visible",
    width: "100%",
  },
  progressBarForeground: {
    backgroundColor: "white",
    height: n(6),
    position: "absolute",
    top: n(-2),
    transformOrigin: "left center",
    width: "100%",
  },
  progressBarInfo: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: n(6),
    width: "90%",
  },
  progressBarPressable: {
    width: "90%",
  },
  timeIndicatorContainer: {
    alignItems: "center",
    width: "100%",
  },
  timeText: {
    fontSize: n(12),
  },
  trackInfoContainer: {
    alignItems: "center",
    gap: n(2),
    marginBottom: n(20),
    width: "90%",
  },
  trackName: {
    fontSize: n(22),
    lineHeight: n(24),
    textAlign: "center",
  },
});
