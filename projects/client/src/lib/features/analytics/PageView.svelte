<script lang="ts">
  import { page } from "$app/state";
  import RenderFor from "$lib/guards/RenderFor.svelte";
  import AnonymousAnalytics from "./AnonymousAnalytics.svelte";
  import { useAnalytics } from "./useAnalytics";
  import UserAnalytics from "./UserAnalytics.svelte";

  const eventName = "page_view";

  const analytics = useAnalytics();

  const record = async () =>
    analytics.record(eventName, {
      page_location: page.url.href,
      page_path: page.url.pathname,
    });
</script>

<RenderFor audience="authenticated">
  <UserAnalytics onload={record} />
</RenderFor>

<RenderFor audience="public">
  <AnonymousAnalytics onload={record} />
</RenderFor>
