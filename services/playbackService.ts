import TrackPlayer, { Event } from "react-native-track-player";

const safely = (action: () => Promise<unknown>) => {
  action().catch(() => undefined);
};

const resumeAtLiveEdge = async () => {
  const track = await TrackPlayer.getActiveTrack();
  if (!track) {
    return;
  }

  await TrackPlayer.reset();
  await TrackPlayer.add(track);
  await TrackPlayer.play();
};

export const PlaybackService = () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    safely(resumeAtLiveEdge);
  });

  TrackPlayer.addEventListener(Event.RemotePause, () => {
    safely(() => TrackPlayer.pause());
  });

  return Promise.resolve();
};
