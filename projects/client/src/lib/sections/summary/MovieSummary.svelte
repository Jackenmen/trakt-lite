<script lang="ts">
  import * as m from "$lib/features/i18n/messages";

  import type { MediaStats } from "$lib/models/MediaStats";
  import type { MediaStudio } from "$lib/models/MediaStudio";
  import type { MediaCrew } from "$lib/requests/models/MediaCrew";
  import type { MovieSummary } from "$lib/requests/models/MovieSummary";
  import CastList from "../lists/CastList.svelte";
  import RelatedList from "../lists/RelatedList.svelte";
  import MediaSummary from "./components/MediaSummary.svelte";
  import type { MediaSummaryProps } from "./components/MediaSummaryProps";

  const {
    media,
    ratings,
    stats,
    watchers,
    studios,
    intl,
    crew,
  }: MediaSummaryProps<MovieSummary> & {
    stats: MediaStats;
    studios: MediaStudio[];
    crew: MediaCrew;
  } = $props();
</script>

<MediaSummary
  {media}
  {ratings}
  {stats}
  {watchers}
  {studios}
  {crew}
  {intl}
  type="movie"
/>

<CastList title={m.actors()} cast={crew.cast} />

<RelatedList title={m.related_movies_title()} slug={media.slug} type="movie" />
