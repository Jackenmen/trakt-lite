<script lang="ts">
  import SectionList from "$lib/components/section-list/SectionList.svelte";
  import * as m from "$lib/features/i18n/messages.ts";
  import FindShowsLink from "./components/FindShowsLink.svelte";
  import UpcomingEpisodeItem from "./components/UpcomingEpisodeItem.svelte";
  import { useCalendarEpisodes } from "./stores/useCalendarEpisodes";
  import { mediaListHeightResolver } from "./utils/mediaListHeightResolver";

  const { calendar, isLoading } = useCalendarEpisodes();
</script>

<SectionList
  id="upcoming-list"
  items={$calendar}
  title={m.upcoming_schedule_title()}
  --height-list={mediaListHeightResolver("episode")}
>
  {#snippet item(entry)}
    <UpcomingEpisodeItem episode={entry} show={entry.show} />
  {/snippet}
  {#snippet empty()}
    {#if !$isLoading}
      <p class="small">{m.upcoming_schedule_empty()}</p>
      <FindShowsLink />
    {/if}
  {/snippet}
</SectionList>
