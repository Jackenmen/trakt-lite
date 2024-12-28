<script lang="ts">
  import CardCover from "$lib/components/card/CardCover.svelte";
  import type { CardCoverProps } from "$lib/components/card/CardCoverProps";

  const props: CardCoverProps = $props();
</script>

<CardCover {...props}></CardCover>
