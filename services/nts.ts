import type {
  LiveProgramme,
  MixtapeNowPlaying,
  RadioStream,
} from "@/types/radio";

const API_URL = "https://www.nts.live/api/v2";
const FIRESTORE_API_KEY = "AIzaSyA4Qp5AvHC8Rev72-10-_DY614w_bxUCJU";
const FIRESTORE_QUERY_URL = `https://firestore.googleapis.com/v1/projects/nts-ios-app/databases/(default)/documents:runQuery?key=${FIRESTORE_API_KEY}`;

export const RADIO_STREAMS: RadioStream[] = [
  {
    artwork: require("@/assets/images/streams/live-1.png"),
    id: "live-1",
    kind: "live",
    liveChannel: 1,
    title: "NTS Live 1",
    url: "https://stream-relay-geo.ntslive.net/stream",
  },
  {
    artwork: require("@/assets/images/streams/live-2.png"),
    id: "live-2",
    kind: "live",
    liveChannel: 2,
    title: "NTS Live 2",
    url: "https://stream-relay-geo.ntslive.net/stream2",
  },
  {
    artwork: require("@/assets/images/streams/poolside.png"),
    id: "mixtape-poolside",
    kind: "mixtape",
    mixtapeAlias: "poolside",
    playingArtworkUrl:
      "https://media2.ntslive.co.uk/resize/800x800/cf5afb01-5a68-4fa0-a1c6-415b35d09ed6_1542931200.jpeg",
    title: "Poolside",
    url: "https://stream-mixtape-geo.ntslive.net/mixtape4",
  },
  {
    artwork: require("@/assets/images/streams/slow-focus.png"),
    id: "mixtape-slow-focus",
    kind: "mixtape",
    mixtapeAlias: "slow-focus",
    playingArtworkUrl:
      "https://media2.ntslive.co.uk/resize/800x800/01f7cbe6-235f-4e33-8f2f-70152c91edf1_1542931200.jpeg",
    title: "Slow Focus",
    url: "https://stream-mixtape-geo.ntslive.net/mixtape",
  },
  {
    artwork: require("@/assets/images/streams/100-percent-hip-hop.png"),
    id: "mixtape-100-percent-hip-hop",
    kind: "mixtape",
    mixtapeAlias: "100-percent-hip-hop",
    playingArtworkUrl:
      "https://media2.ntslive.co.uk/resize/800x800/b667c612-1ef6-4bfd-ae87-0cec0a19629d_1626307200.jpeg",
    title: "Low Key",
    url: "https://stream-mixtape-geo.ntslive.net/mixtape2",
  },
  {
    artwork: require("@/assets/images/streams/memory-lane.png"),
    id: "mixtape-memory-lane",
    kind: "mixtape",
    mixtapeAlias: "memory-lane",
    playingArtworkUrl:
      "https://media2.ntslive.co.uk/resize/800x800/f889399d-6277-46e2-9be9-840bbdd25cc5_1560470400.jpeg",
    title: "Memory Lane",
    url: "https://stream-mixtape-geo.ntslive.net/mixtape6",
  },
  {
    artwork: require("@/assets/images/streams/4-to-the-floor.png"),
    id: "mixtape-4-to-the-floor",
    kind: "mixtape",
    mixtapeAlias: "4-to-the-floor",
    playingArtworkUrl:
      "https://media2.ntslive.co.uk/resize/800x800/c3bad52d-418b-4bf6-aff5-eea3b9ff1186_1542931200.jpeg",
    title: "4 To The Floor",
    url: "https://stream-mixtape-geo.ntslive.net/mixtape5",
  },
  {
    artwork: require("@/assets/images/streams/island-time.png"),
    id: "mixtape-island-time",
    kind: "mixtape",
    mixtapeAlias: "island-time",
    playingArtworkUrl:
      "https://media2.ntslive.co.uk/resize/800x800/68541b02-903c-4caf-bba2-538d0b9bfedc_1590451200.jpeg",
    title: "Island Time",
    url: "https://stream-mixtape-geo.ntslive.net/mixtape21",
  },
  {
    artwork: require("@/assets/images/streams/the-tube.png"),
    id: "mixtape-the-tube",
    kind: "mixtape",
    mixtapeAlias: "the-tube",
    playingArtworkUrl:
      "https://media2.ntslive.co.uk/resize/800x800/f3657c6b-aa6b-4ad9-9c12-d9e9cbe7f68d_1626220800.jpeg",
    title: "The Tube",
    url: "https://stream-mixtape-geo.ntslive.net/mixtape26",
  },
  {
    artwork: require("@/assets/images/streams/sheet-music.png"),
    id: "mixtape-sheet-music",
    kind: "mixtape",
    mixtapeAlias: "sheet-music",
    playingArtworkUrl:
      "https://media2.ntslive.co.uk/resize/800x800/fe3dc346-2549-44cc-96c7-c3117056aa74_1668038400.jpeg",
    title: "Sheet Music",
    url: "https://stream-mixtape-geo.ntslive.net/mixtape35",
  },
  {
    artwork: require("@/assets/images/streams/feelings.png"),
    id: "mixtape-feelings",
    kind: "mixtape",
    mixtapeAlias: "feelings",
    playingArtworkUrl:
      "https://media2.ntslive.co.uk/resize/800x800/53026366-cf7c-4a57-af5c-c894d2375dc6_1626220800.jpeg",
    title: "Feelings",
    url: "https://stream-mixtape-geo.ntslive.net/mixtape27",
  },
  {
    artwork: require("@/assets/images/streams/expansions.png"),
    id: "mixtape-expansions",
    kind: "mixtape",
    mixtapeAlias: "expansions",
    playingArtworkUrl:
      "https://media2.ntslive.co.uk/resize/800x800/acc3ad65-05bd-495d-90cb-f5d81221464b_1542931200.jpeg",
    title: "Expansions",
    url: "https://stream-mixtape-geo.ntslive.net/mixtape3",
  },
  {
    artwork: require("@/assets/images/streams/rap-house.png"),
    id: "mixtape-rap-house",
    kind: "mixtape",
    mixtapeAlias: "rap-house",
    playingArtworkUrl:
      "https://media2.ntslive.co.uk/resize/800x800/916a2aa3-dcc5-4eb6-abea-b2f1914fb49a_1590451200.jpeg",
    title: "Rap House",
    url: "https://stream-mixtape-geo.ntslive.net/mixtape22",
  },
  {
    artwork: require("@/assets/images/streams/labyrinth.png"),
    id: "mixtape-labyrinth",
    kind: "mixtape",
    mixtapeAlias: "labyrinth",
    playingArtworkUrl:
      "https://media2.ntslive.co.uk/resize/800x800/4ce92a36-4942-4f35-9cc4-1d3e6c2be746_1638230400.jpeg",
    title: "Labyrinth",
    url: "https://stream-mixtape-geo.ntslive.net/mixtape31",
  },
  {
    artwork: require("@/assets/images/streams/sweat.png"),
    id: "mixtape-sweat",
    kind: "mixtape",
    mixtapeAlias: "sweat",
    playingArtworkUrl:
      "https://media2.ntslive.co.uk/resize/800x800/f0c77a19-670b-4979-ac6e-e93f6089b5bc_1622592000.png",
    title: "Sweat",
    url: "https://stream-mixtape-geo.ntslive.net/mixtape24",
  },
  {
    artwork: require("@/assets/images/streams/otaku.png"),
    id: "mixtape-otaku",
    kind: "mixtape",
    mixtapeAlias: "otaku",
    playingArtworkUrl:
      "https://media2.ntslive.co.uk/resize/800x800/0c693fdb-544c-4b85-9679-3268afa3a273_1668038400.jpeg",
    title: "Otaku",
    url: "https://stream-mixtape-geo.ntslive.net/mixtape36",
  },
  {
    artwork: require("@/assets/images/streams/the-pit.png"),
    id: "mixtape-the-pit",
    kind: "mixtape",
    mixtapeAlias: "the-pit",
    playingArtworkUrl:
      "https://media2.ntslive.co.uk/resize/800x800/9c9efb53-ce34-4a5e-997b-f8251be464a1_1668038400.jpeg",
    title: "The Pit",
    url: "https://stream-mixtape-geo.ntslive.net/mixtape34",
  },
  {
    artwork: require("@/assets/images/streams/field-recordings.png"),
    id: "mixtape-field-recordings",
    kind: "mixtape",
    mixtapeAlias: "field-recordings",
    playingArtworkUrl:
      "https://media2.ntslive.co.uk/resize/800x800/807d8db6-049d-4eeb-8515-57c02b251e73_1622592000.png",
    title: "Field Recordings",
    url: "https://stream-mixtape-geo.ntslive.net/mixtape23",
  },
];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getString = (record: Record<string, unknown>, key: string) => {
  const value = record[key];
  return typeof value === "string" ? value : null;
};

const getProgrammeArtwork = (programme: Record<string, unknown>) => {
  const embeds = programme.embeds;
  if (!(isRecord(embeds) && isRecord(embeds.details))) {
    return null;
  }

  const media = embeds.details.media;
  if (!isRecord(media)) {
    return null;
  }

  return (
    getString(media, "picture_medium_large") ??
    getString(media, "picture_large")
  );
};

export async function fetchMixtapeNowPlaying(
  alias: string,
  signal?: AbortSignal
): Promise<MixtapeNowPlaying | null> {
  const response = await fetch(FIRESTORE_QUERY_URL, {
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: "mixtape_titles" }],
        limit: 1,
        orderBy: [
          {
            direction: "DESCENDING",
            field: { fieldPath: "started_at" },
          },
        ],
        where: {
          fieldFilter: {
            field: { fieldPath: "mixtape_alias" },
            op: "EQUAL",
            value: { stringValue: alias },
          },
        },
      },
    }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
    signal,
  });
  if (!response.ok) {
    throw new Error(`NTS metadata returned ${response.status}`);
  }

  const payload: unknown = await response.json();
  if (!(Array.isArray(payload) && isRecord(payload[0]))) {
    return null;
  }

  const document = payload[0].document;
  if (!(isRecord(document) && isRecord(document.fields))) {
    return null;
  }

  const titleField = document.fields.title;
  const startedAtField = document.fields.started_at;
  if (!(isRecord(titleField) && isRecord(startedAtField))) {
    return null;
  }

  const title = getString(titleField, "stringValue");
  const startedAt = getString(startedAtField, "timestampValue");
  return title && startedAt ? { startedAt, title } : null;
}

export async function fetchLiveProgrammes(
  signal?: AbortSignal
): Promise<Record<number, LiveProgramme>> {
  const response = await fetch(`${API_URL}/live`, { signal });
  if (!response.ok) {
    throw new Error(`NTS returned ${response.status}`);
  }

  const payload: unknown = await response.json();
  if (!(isRecord(payload) && Array.isArray(payload.results))) {
    throw new Error("NTS returned invalid live metadata");
  }

  const programmes: Record<number, LiveProgramme> = {};
  for (const result of payload.results) {
    if (!(isRecord(result) && isRecord(result.now))) {
      continue;
    }

    const channel = Number(getString(result, "channel_name"));
    const title = getString(result.now, "broadcast_title");
    const startTime = getString(result.now, "start_timestamp");
    const endTime = getString(result.now, "end_timestamp");
    if ((channel === 1 || channel === 2) && title && startTime && endTime) {
      programmes[channel] = {
        artworkUrl: getProgrammeArtwork(result.now),
        channel,
        endTime,
        startTime,
        title,
      };
    }
  }

  return programmes;
}
