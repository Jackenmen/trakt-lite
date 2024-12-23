<script lang="ts">
  import * as m from "$lib/features/i18n/messages.ts";

  import SectionList from "$lib/components/section-list/SectionList.svelte";
  import type { UpNextEntry } from "$lib/requests/queries/sync/upNextQuery";
  import { onMount } from "svelte";
  import FindShowsLink from "./components/FindShowsLink.svelte";
  import NextEpisodeItem from "./components/NextEpisodeItem.svelte";
  import { useStableArray } from "./stores/useStableArray";
  import { useUpNextEpisodes } from "./stores/useUpNextEpisodes";
  import { mediaListHeightResolver } from "./utils/mediaListHeightResolver";

  const { list: unstable, isLoading } = useUpNextEpisodes();
  const { list, set } = useStableArray<UpNextEntry>(
    (l, r) => l.show.id === r.show.id,
  );

  onMount(() => {
    const unsubscribe = unstable.subscribe(set);

    return () => unsubscribe();
  });
</script>

{#snippet empty()}
  <p class="small">{m.up_next_empty()}</p>
  <FindShowsLink />
{/snippet}

<SectionList
  items={$list}
  empty={$isLoading ? null : empty}
  title={m.up_next_title()}
  --height-list={mediaListHeightResolver("episode")}
>
  {#snippet item(episode)}
    <NextEpisodeItem {episode} show={episode.show} />
  {/snippet}
</SectionList>
