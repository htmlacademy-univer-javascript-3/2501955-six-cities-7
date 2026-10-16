import classNames from 'classnames';
import { useState, type ReactElement } from 'react';

type OfferBookmarksButtonProps = {
  isActive?: boolean;
  isFullSize?: boolean;
};

type OfferBookmarksButtonVariant = {
  className: string;
  iconWidth: number;
  iconHeight: number;
  activeClassName: string;
  iconClassName: string;
};

const OFFER_BOOKMARKS_BUTTON_VARIANTS = {
  card: {
    className: 'place-card__bookmark-button',
    iconWidth: 18,
    iconHeight: 19,
    activeClassName: 'place-card__bookmark-button--active',
    iconClassName: 'place-card__bookmark-icon'
  },
  offer: {
    className: 'offer__bookmark-button',
    iconWidth: 31,
    iconHeight: 33,
    activeClassName: 'offer__bookmark-button--active',
    iconClassName: 'offer__bookmark-icon'
  },
} as const satisfies Record<'card' | 'offer', OfferBookmarksButtonVariant>;

function OfferBookmarksButton({ isActive = false, isFullSize = false }: OfferBookmarksButtonProps): ReactElement {
  const [isInBookmarks, setIsInBookmarks] = useState(isActive);
  const variant: OfferBookmarksButtonVariant = OFFER_BOOKMARKS_BUTTON_VARIANTS[
    isFullSize ? 'offer' : 'card'
  ];

  return (
    <button
      className={classNames(variant.className, 'button', {
        [variant.activeClassName]: isInBookmarks
      })}
      type="button"
      onClick={() => setIsInBookmarks((prevInBookmarks) => !prevInBookmarks)}
    >
      <svg
        className={variant.iconClassName}
        width={variant.iconWidth}
        height={variant.iconHeight}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">
        {isInBookmarks ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
}

export default OfferBookmarksButton;
