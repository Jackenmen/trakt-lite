<script lang="ts">
  import * as m from "$lib/features/i18n/messages";

  import CoverImageSetter from "$lib/components/background/CoverImageSetter.svelte";
  import MarkAsWatchedButton from "$lib/components/buttons/mark-as-watched/MarkAsWatchedButton.svelte";
  import type { MarkAsWatchedButtonProps } from "$lib/components/buttons/mark-as-watched/MarkAsWatchedButtonProps";
  import Link from "$lib/components/link/Link.svelte";
  import GenreList from "$lib/components/summary/GenreList.svelte";
  import SummaryPoster from "$lib/components/summary/SummaryPoster.svelte";
  import RenderFor from "$lib/guards/RenderFor.svelte";
  import { useMarkAsWatched } from "$lib/stores/useMarkAsWatched";
  import { UrlBuilder } from "$lib/utils/url/UrlBuilder";
  import SeasonList from "../lists/SeasonList.svelte";
  import type { EpisodeSummaryProps } from "./components/EpisodeSummaryProps";
  import MediaMetaInfo from "./components/MediaMetaInfo.svelte";
  import MediaOverview from "./components/MediaOverview.svelte";
  import MediaSummaryActions from "./components/MediaSummaryActions.svelte";
  import MediaSummaryContainer from "./components/MediaSummaryContainer.svelte";
  import MediaSummaryHeader from "./components/MediaSummaryHeader.svelte";
  import MediaTitle from "./components/MediaTitle.svelte";

  const {
    episode,
    show,
    seasons,
    ratings,
    intl,
    stats,
    watchers,
  }: EpisodeSummaryProps = $props();
  const type = "episode";

  const { markAsWatched, removeWatched, isMarkingAsWatched, isWatched } =
    $derived(
      useMarkAsWatched({
        type,
        media: episode,
        episode,
        show,
      }),
    );

  const title = $derived(intl.title ?? episode.title);

  const markWasWatchedProps: MarkAsWatchedButtonProps = $derived({
    type: "normal",
    title,
    isMarkingAsWatched: $isMarkingAsWatched,
    isWatched: $isWatched,
    onWatch: markAsWatched,
    onRemove: removeWatched,
  });
</script>

{#snippet mediaActions()}
  <MarkAsWatchedButton {...markWasWatchedProps} />
{/snippet}

<CoverImageSetter src={episode.cover.url ?? ""} type="show" />

<MediaSummaryContainer>
  {#snippet poster()}
    <SummaryPoster
      href={UrlBuilder.show(show.slug)}
      src={show.poster.url.medium}
      alt={title}
    >
      {#snippet actions()}
        <RenderFor device={["tablet-lg", "desktop"]} audience="authenticated">
          {@render mediaActions()}
        </RenderFor>
      {/snippet}
    </SummaryPoster>
  {/snippet}

  <MediaSummaryHeader {title}>
    <MediaTitle {title} />
    <Link href={UrlBuilder.show(show.slug)}>
      <h6>{show.title}</h6>
    </Link>
    <p class="meta-info">{m.season_episode_number_label(episode)}</p>
    <GenreList genres={show.genres} />
  </MediaSummaryHeader>

  <MediaMetaInfo
    certification={show.certification}
    year={episode.year}
    {ratings}
    {stats}
    {watchers}
  />

  <MediaOverview {title} overview={intl.overview ?? episode.overview} />

  <RenderFor device={["mobile", "tablet-sm"]} audience="authenticated">
    <MediaSummaryActions>
      {@render mediaActions()}
    </MediaSummaryActions>
  </RenderFor>
</MediaSummaryContainer>

<SeasonList {show} {seasons} />
