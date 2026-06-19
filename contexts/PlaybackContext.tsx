import { Asset } from "expo-asset";
import {
  createContext,
  type ReactNode,
  use,
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { AppState } from "react-native";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  State,
  usePlaybackState,
} from "react-native-track-player";
import { fetchLiveProgrammes, fetchMixtapeNowPlaying } from "@/services/nts";
import type {
  LiveProgramme,
  MixtapeNowPlaying,
  RadioStream,
} from "@/types/radio";

interface PlaybackContextValue {
  activeMixtapeNowPlaying: MixtapeNowPlaying | null;
  activeProgramme: LiveProgramme | null;
  activeStream: RadioStream | null;
  error: string | null;
  isLoading: boolean;
  isPlaying: boolean;
  playStream: (stream: RadioStream) => Promise<void>;
  togglePlayPause: () => Promise<void>;
}

const PlaybackContext = createContext<PlaybackContextValue | null>(null);
let setupPromise: Promise<void> | null = null;

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : String(error);

const getArtworkUri = (stream: RadioStream) =>
  Asset.fromModule(stream.artwork).uri;

interface PlaybackData {
  activeStream: RadioStream | null;
  error: string | null;
  isStarting: boolean;
  mixtapeNowPlaying: MixtapeNowPlaying | null;
  programmes: Record<number, LiveProgramme>;
}

const initialPlaybackData: PlaybackData = {
  activeStream: null,
  error: null,
  isStarting: false,
  mixtapeNowPlaying: null,
  programmes: {},
};

function playbackDataReducer(
  state: PlaybackData,
  update: Partial<PlaybackData>
): PlaybackData {
  return { ...state, ...update };
}

const ensurePlayerReady = async () => {
  if (!setupPromise) {
    setupPromise = (async () => {
      try {
        await TrackPlayer.setupPlayer({ autoHandleInterruptions: true });
      } catch (error) {
        if (!getErrorMessage(error).toLowerCase().includes("already")) {
          setupPromise = null;
          throw error;
        }
      }

      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [Capability.Play, Capability.Pause],
        compactCapabilities: [Capability.Play, Capability.Pause],
        notificationCapabilities: [Capability.Play, Capability.Pause],
      });
    })();
  }

  await setupPromise;
};

export function PlaybackProvider({ children }: { children: ReactNode }) {
  const [playbackData, updatePlaybackData] = useReducer(
    playbackDataReducer,
    initialPlaybackData
  );
  const { activeStream, error, isStarting, mixtapeNowPlaying, programmes } =
    playbackData;
  const activeStreamRef = useRef(activeStream);
  const playbackState = usePlaybackState();

  activeStreamRef.current = activeStream;

  useEffect(() => {
    if (playbackState.state === State.Playing) {
      updatePlaybackData({ isStarting: false });
    }
  }, [playbackState.state]);

  const updateLiveMetadata = useCallback(
    async (nextProgrammes: Record<number, LiveProgramme>) => {
      const stream = activeStreamRef.current;
      if (stream?.kind !== "live" || !stream.liveChannel) {
        return;
      }

      const programme = nextProgrammes[stream.liveChannel];
      if (!programme) {
        return;
      }

      try {
        await ensurePlayerReady();
        const activeIndex = await TrackPlayer.getActiveTrackIndex();
        if (activeIndex !== undefined) {
          await TrackPlayer.updateMetadataForTrack(activeIndex, {
            artist: programme.title,
            artwork: programme.artworkUrl ?? getArtworkUri(stream),
            title: stream.title,
          });
        }
      } catch {
        // Programme metadata must never interrupt a playing stream.
      }
    },
    []
  );

  const refreshLiveProgrammes = useCallback(async () => {
    try {
      const nextProgrammes = await fetchLiveProgrammes();
      if (Object.keys(nextProgrammes).length > 0) {
        updatePlaybackData({ programmes: nextProgrammes });
      }
      await updateLiveMetadata(nextProgrammes);
    } catch {
      // Keep the last successful programme metadata during network failures.
    }
  }, [updateLiveMetadata]);

  const refreshMixtapeNowPlaying = useCallback(async () => {
    const stream = activeStreamRef.current;
    if (stream?.kind !== "mixtape" || !stream.mixtapeAlias) {
      return;
    }

    try {
      const nextNowPlaying = await fetchMixtapeNowPlaying(stream.mixtapeAlias);
      if (!nextNowPlaying) {
        return;
      }

      updatePlaybackData({ mixtapeNowPlaying: nextNowPlaying });
      await ensurePlayerReady();
      const activeIndex = await TrackPlayer.getActiveTrackIndex();
      if (activeIndex !== undefined) {
        await TrackPlayer.updateMetadataForTrack(activeIndex, {
          artist: nextNowPlaying.title,
          artwork: stream.playingArtworkUrl ?? getArtworkUri(stream),
          title: stream.title,
        });
      }
    } catch {
      // Keep the last successful mixtape metadata during network failures.
    }
  }, []);

  const refreshMixtapeOnAppActive = useEffectEvent(() => {
    refreshMixtapeNowPlaying();
  });

  useEffect(() => {
    refreshLiveProgrammes();
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        refreshLiveProgrammes();
        refreshMixtapeOnAppActive();
      }
    });

    return () => subscription.remove();
  }, [refreshLiveProgrammes]);

  useEffect(() => {
    if (activeStream?.kind !== "live") {
      return;
    }

    const interval = setInterval(refreshLiveProgrammes, 60_000);
    return () => clearInterval(interval);
  }, [activeStream?.kind, refreshLiveProgrammes]);

  useEffect(() => {
    if (activeStream?.kind !== "mixtape") {
      updatePlaybackData({ mixtapeNowPlaying: null });
      return;
    }

    refreshMixtapeNowPlaying();
    const interval = setInterval(refreshMixtapeNowPlaying, 60_000);
    return () => clearInterval(interval);
  }, [activeStream, refreshMixtapeNowPlaying]);

  const activeProgramme =
    activeStream?.kind === "live" && activeStream.liveChannel
      ? (programmes[activeStream.liveChannel] ?? null)
      : null;

  useEffect(() => {
    if (!activeProgramme) {
      return;
    }

    const delay = new Date(activeProgramme.endTime).getTime() - Date.now();
    if (delay <= 0) {
      refreshLiveProgrammes();
      return;
    }

    const timeout = setTimeout(refreshLiveProgrammes, delay + 1000);
    return () => clearTimeout(timeout);
  }, [activeProgramme, refreshLiveProgrammes]);

  const playStream = useCallback(
    async (stream: RadioStream) => {
      updatePlaybackData({
        activeStream: stream,
        error: null,
        isStarting: true,
      });
      try {
        await ensurePlayerReady();
        await TrackPlayer.reset();
        const programme =
          stream.liveChannel === undefined
            ? null
            : (programmes[stream.liveChannel] ?? null);
        const currentMixtapeNowPlaying =
          stream.kind === "mixtape" && activeStream?.id === stream.id
            ? mixtapeNowPlaying
            : null;
        await TrackPlayer.add({
          album: "NTS Radio",
          artist:
            stream.kind === "live"
              ? (programme?.title ?? "Live now")
              : (currentMixtapeNowPlaying?.title ?? "NTS Infinite Mixtapes"),
          artwork:
            programme?.artworkUrl ??
            stream.playingArtworkUrl ??
            getArtworkUri(stream),
          contentType: "audio/mpeg",
          id: stream.id,
          isLiveStream: true,
          title: stream.title,
          url: stream.url,
        });
        await TrackPlayer.play();
      } catch (playbackError) {
        updatePlaybackData({
          error: getErrorMessage(playbackError),
          isStarting: false,
        });
        throw playbackError;
      }
    },
    [activeStream?.id, mixtapeNowPlaying, programmes]
  );

  const isLoading =
    isStarting ||
    playbackState.state === State.Buffering ||
    playbackState.state === State.Loading;
  const isPlaying = playbackState.state === State.Playing;

  const togglePlayPause = useCallback(async () => {
    updatePlaybackData({ error: null });
    try {
      await ensurePlayerReady();
      if (isPlaying) {
        await TrackPlayer.pause();
      } else if (activeStream) {
        await playStream(activeStream);
      }
    } catch (playbackError) {
      updatePlaybackData({ error: getErrorMessage(playbackError) });
    }
  }, [activeStream, isPlaying, playStream]);

  const value = useMemo(
    () => ({
      activeProgramme,
      activeMixtapeNowPlaying: mixtapeNowPlaying,
      activeStream,
      error,
      isLoading,
      isPlaying,
      playStream,
      togglePlayPause,
    }),
    [
      activeProgramme,
      activeStream,
      error,
      isLoading,
      isPlaying,
      mixtapeNowPlaying,
      playStream,
      togglePlayPause,
    ]
  );

  return (
    <PlaybackContext.Provider value={value}>
      {children}
    </PlaybackContext.Provider>
  );
}

export function usePlayback() {
  const context = use(PlaybackContext);
  if (!context) {
    throw new Error("usePlayback must be used within PlaybackProvider");
  }
  return context;
}
