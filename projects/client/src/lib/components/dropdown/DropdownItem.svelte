<script lang="ts">
  import { triggerWithKeyboard } from "$lib/utils/actions/triggerWithKeyboard";
  import { triggerWithTouch } from "$lib/utils/actions/triggerWithTouch";
  import Link from "../link/Link.svelte";

  type DropdownItemProps = {
    color?: "red" | "purple" | "blue";
    tabindex?: number;
  } & ChildrenProps &
    HTMLElementProps;

  type DropdownItemAnchorProps = DropdownItemProps & HTMLAnchorProps;

  const {
    color = "purple",
    children,
    ...props
  }: DropdownItemProps | DropdownItemAnchorProps = $props();

  const hasHandler = $derived(
    Object.keys(props).some((propName) => propName.startsWith("on")),
  );
  const tabIndex = $derived(hasHandler ? 0 : -1);
  const href = $derived((props as DropdownItemAnchorProps).href);
  const target = $derived((props as DropdownItemAnchorProps).target);
</script>

{#snippet text()}
  <p class="small bold uppercase ellipsis">{@render children()}</p>
{/snippet}

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<li
  use:triggerWithKeyboard
  use:triggerWithTouch
  tabindex={tabIndex}
  data-color={color}
  {...props}
>
  {#if href}
    <Link {href} {target} color="inherit">
      {@render text()}
    </Link>
  {:else}
    <p class="small bold uppercase ellipsis">
      {@render text()}
    </p>
  {/if}
</li>

<style lang="scss">
  @use "$style/scss/mixins/index" as *;

  li {
    text-decoration: none;
    list-style-type: none;
    user-select: none;

    padding: 0 var(--ni-12);
    height: calc(var(--ni-20) + var(--ni-12) * 2);
    width: calc(100% - var(--ni-48));
    border-radius: var(--border-radius-m);

    align-content: center;
    justify-self: center;

    cursor: pointer;

    transition: var(--transition-increment) ease-in-out;
    transition-property: background color;

    :global(.trakt-link) {
      display: block;
      color: inherit;
      width: 100%;
      height: 100%;
      align-content: center;
    }

    @mixin color($color, $hover-bg, $active-bg, $outline-color) {
      color: $color;

      @include for-mouse {
        &:hover {
          background: $hover-bg;
        }
      }

      &:active {
        background: $active-bg;
      }

      &:focus-visible,
      &:has(> :global(.trakt-link:focus-visible)) {
        outline: var(--border-thickness-xs) solid $outline-color;
      }
    }

    &[data-color="purple"] {
      @include color(
        var(--purple-800),
        var(--purple-100),
        var(--purple-200),
        var(--purple-800)
      );
    }

    &[data-color="red"] {
      @include color(
        var(--red-600),
        var(--red-100),
        var(--red-200),
        var(--red-600)
      );
    }

    &[data-color="blue"] {
      @include color(
        var(--blue-600),
        var(--blue-100),
        var(--blue-200),
        var(--blue-600)
      );
    }
  }
</style>
