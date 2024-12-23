<script lang="ts">
  import SectionList from "$lib/components/section-list/SectionList.svelte";
  import type { MediaType } from "$lib/models/MediaType";
  import MediaItem from "./components/MediaItem.svelte";
  import { useWatchlistList } from "./stores/useWatchlistList";
  import { mediaListHeightResolver } from "./utils/mediaListHeightResolver";

  type WatchlistListProps = {
    title: string;
    type: MediaType;
    emptyMessage: string;
  };

  const { title, type, emptyMessage }: WatchlistListProps = $props();

  const { list, isLoading } = useWatchlistList({ type });
</script>

{#snippet empty()}
  <p class="small secondary">
    {emptyMessage}
  </p>
{/snippet}

<SectionList
  items={$list}
  empty={$isLoading ? null : empty}
  {title}
  --height-list={mediaListHeightResolver(type)}
>
  {#snippet item(media)}
    <MediaItem {type} {media} />
  {/snippet}
</SectionList>
