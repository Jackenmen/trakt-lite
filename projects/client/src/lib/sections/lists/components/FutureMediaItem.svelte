<script lang="ts">
  import * as m from "$lib/features/i18n/messages";

  import WatchlistButton from "$lib/components/buttons/watchlist/WatchlistButton.svelte";
  import CardFooter from "$lib/components/card/CardFooter.svelte";
  import EpisodeCard from "$lib/components/episode/card/EpisodeCard.svelte";
  import Link from "$lib/components/link/Link.svelte";
  import MediaCover from "$lib/components/media/card/MediaCover.svelte";
  import PosterCard from "$lib/components/media/card/PosterCard.svelte";
  import DurationTag from "$lib/components/media/tags/DurationTag.svelte";
  import RenderFor from "$lib/guards/RenderFor.svelte";

  import { getLocale } from "$lib/features/i18n";
  import type { MediaType } from "$lib/models/MediaType";
  import type { EpisodeCount } from "$lib/requests/models/EpisodeCount";
  import type { MovieSummary } from "$lib/requests/models/MovieSummary";
  import type { ShowSummary } from "$lib/requests/models/ShowSummary";
  import { useWatchlist } from "$lib/stores/useWatchlist";
  import { toHumanETA } from "$lib/utils/formatting/date/toHumanETA";
  import { UrlBuilder } from "$lib/utils/url/UrlBuilder";

  type MediaItemProps = {
    media: MovieSummary | (ShowSummary & EpisodeCount);
    type: MediaType;
  };

  const { type, media }: MediaItemProps = $props();

  const {
    isWatchlistUpdating,
    isWatchlisted,
    addToWatchlist,
    removeFromWatchlist,
  } = $derived(
    useWatchlist({
      type,
      media,
    }),
  );
</script>

{#snippet content(mediaCoverImageUrl: string)}
  <Link focusable={false} href={UrlBuilder.media(type, media.slug)}>
    <MediaCover src={mediaCoverImageUrl} alt={`${media.title} poster`}>
      {#snippet tags()}
        <DurationTag>
          {#if media.year == null}
            {m.tba_label()}
          {:else}
            {toHumanETA(new Date(), media.airedDate, getLocale())}
          {/if}
        </DurationTag>
      {/snippet}
    </MediaCover>
  </Link>

  <CardFooter>
    <Link href={UrlBuilder.media(type, media.slug)}>
      <p class="recommendation-title small ellipsis">
        {media.title}
      </p>
    </Link>
    {#snippet actions()}
      <RenderFor audience="authenticated">
        <WatchlistButton
          type="action"
          title={media.title}
          onAdd={addToWatchlist}
          onRemove={removeFromWatchlist}
          isWatchlisted={$isWatchlisted}
          isWatchlistUpdating={$isWatchlistUpdating}
        />
      </RenderFor>
    {/snippet}
  </CardFooter>
{/snippet}

{#if type === "movie"}
  <PosterCard>
    {@render content(media.poster.url.thumb)}
  </PosterCard>
{/if}

{#if type === "show"}
  <EpisodeCard>
    {@render content(media.thumb.url)}
  </EpisodeCard>
{/if}

<style>
  .recommendation-title {
    margin: 0;
    padding: 0;

    color: var(--color-text-secondary);

    font-weight: 500;
  }
</style>
