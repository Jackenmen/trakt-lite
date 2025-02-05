<script lang="ts">
  import * as m from "$lib/features/i18n/messages.ts";

  import { GenreIntlProvider } from "$lib/components/summary/GenreIntlProvider";
  import { getLocale, languageTag } from "$lib/features/i18n/index.ts";
  import type { MediaStudio } from "$lib/models/MediaStudio";
  import type { CrewMember, MediaCrew } from "$lib/requests/models/MediaCrew";
  import type { MediaSummary } from "$lib/requests/models/MediaSummary";
  import { toHumanDay } from "$lib/utils/formatting/date/toHumanDay";
  import { toHumanDuration } from "$lib/utils/formatting/date/toHumanDuration";
  import { toCountryName } from "$lib/utils/formatting/intl/toCountryName";
  import { toLanguageName } from "$lib/utils/formatting/intl/toLanguageName";
  import { toTranslatedValue } from "$lib/utils/formatting/string/toTranslatedValue";
  import MediaCollapsableValues from "./MediaCollapsableValues.svelte";
  import YoutubeButton from "./YoutubeButton.svelte";

  export type MediaDetailsProps = {
    media: MediaSummary;
    studios: MediaStudio[];
    crew: MediaCrew;
  };

  const { media, studios, crew }: MediaDetailsProps = $props();

  /*TODO:
    -Differentiate between Show and Movie
  */

  const genres = media.genres.map(GenreIntlProvider.genre);
  const studioNames = studios.map((studio) => studio.name);

  const languages = media.languages?.map((language) =>
    toLanguageName(language, languageTag()),
  );

  const toCrewMemberWithJob = (person: CrewMember) => {
    const jobs = person.jobs.map((job) => toTranslatedValue("job", job));
    return `${person.name} (${jobs.join(", ")})`;
  };

  const mainItemDetail = () => {
    if (media.year) {
      const isUpcomingItem = media.airedDate > new Date();
      return {
        title: isUpcomingItem ? m.expected_premiere() : m.premiered(),
        values: [toHumanDay(media.airedDate, getLocale())],
      };
    }

    return {
      title: m.status(),
      values: [toTranslatedValue("status", media.status)],
    };
  };

  const mediaDetails = [
    mainItemDetail(),
    {
      title: m.runtime(),
      values: [toHumanDuration({ minutes: media.runtime }, languageTag())],
    },
    {
      title: m.director(),
      values: crew.directors.map(toCrewMemberWithJob),
    },
    {
      title: m.writer(),
      values: crew.writers.map(toCrewMemberWithJob),
    },
    {
      title: m.country(),
      values: media.country
        ? [toCountryName(media.country, languageTag())]
        : undefined,
    },
    {
      title: m.language(),
      values: languages,
    },
    {
      title: m.studio(),
      values: studioNames,
    },
    {
      title: m.genre(),
      values: genres,
    },
  ];
</script>

<div class="trakt-summary-details">
  <h5>{m.details()}</h5>
  <div class="trakt-summary-details-content">
    {#each mediaDetails as { title, values }}
      {#if values && values.length > 0}
        <div class="trakt-summary-detail">
          <p class="meta-info secondary">{title}</p>
          <MediaCollapsableValues category={title} {values} />
        </div>
      {/if}
    {/each}
    <div class="trakt-summary-trailers">
      <p class="meta-info secondary">{m.watch_the_trailer()}</p>
      <YoutubeButton trailer={media.trailer} />
    </div>
  </div>
</div>

<style lang="scss">
  @use "$style/scss/mixins/index" as *;

  .trakt-summary-trailers {
    display: flex;
    gap: var(--ni-8);
    flex-direction: column;
  }

  .trakt-summary-details {
    display: flex;
    flex-direction: column;
    gap: var(--ni-24);
  }

  .trakt-summary-details-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--ni-16);

    @include for-mobile {
      grid-template-columns: 1fr;
    }
  }
</style>
