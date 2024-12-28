import type { Snippet } from 'svelte';

type CardCoverNormalProps = {
  src: string;
  alt: string;
  tags?: Snippet;
  isLoading?: boolean;
};
type CardCoverLinkProps = HTMLAnchorProps & CardCoverNormalProps;

export type CardCoverProps = CardCoverNormalProps | CardCoverLinkProps;
