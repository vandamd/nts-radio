export type RadioStreamKind = "live" | "mixtape";

export interface RadioStream {
  artwork: number;
  id: string;
  kind: RadioStreamKind;
  liveChannel?: 1 | 2;
  mixtapeAlias?: string;
  playingArtworkUrl?: string | null;
  title: string;
  url: string;
}

export interface MixtapeNowPlaying {
  startedAt: string;
  title: string;
}

export interface LiveProgramme {
  artworkUrl: string | null;
  channel: 1 | 2;
  endTime: string;
  startTime: string;
  title: string;
}
