<script lang="ts">
  import MediaItem from "$lib/sections/lists/components/MediaItem.svelte";
  import { useTrendingItems } from "../useTrendingItems";
  import Phones from "./Phones.svelte";

  const { shows, movie, show } = $derived(useTrendingItems());
</script>

<div class="trakt-landing-preview">
  <div class="trakt-landing-media-wrapper">
    {#each $shows as show}
      <MediaItem type="show" media={show} />
    {/each}
  </div>
  <div class="trakt-landing-phones">
    <Phones />
  </div>
  <div class="trakt-landing-media-wrapper">
    {#if $show}
      <MediaItem type="show" media={$show} />
    {/if}
    {#if $movie}
      <MediaItem type="movie" media={$movie} />
    {/if}
  </div>
</div>

<style>
  .trakt-landing-preview {
    display: grid;
    grid-template-columns: 1fr minmax(0, 1fr) 1fr;
    position: relative;
    margin-top: var(--ni-112);
    gap: var(--ni-24);
    container-type: inline-size;

    .trakt-landing-media-wrapper {
      z-index: 2;
      display: grid;
      width: 100%;
      justify-content: center;
      gap: var(--ni-16);

      :global(.trakt-preview-item:first-child) {
        margin-left: var(--ni-56);
      }
    }

    .trakt-landing-phones {
      display: flex;
      align-items: center;
      z-index: 1;
    }
  }
</style>
