import classNames from 'classnames';
import { useState, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../enums/authorization-status';
import { AppRoute } from '../../enums/app-route';

type OfferBookmarksButtonProps = {
  authorizationStatus: AuthorizationStatus;
  isActive?: boolean;
  isFullSize?: boolean;
};

type ButtonLayoutVariant = {
  className: string;
  iconWidth: number;
  iconHeight: number;
  activeClassName: string;
  iconClassName: string;
};

const BUTTON_LAYOUT_VARIANTS = {
  card: {
    className: 'place-card__bookmark-button',
    iconWidth: 18,
    iconHeight: 19,
    activeClassName: 'place-card__bookmark-button--active',
    iconClassName: 'place-card__bookmark-icon',
  },
  offer: {
    className: 'offer__bookmark-button',
    iconWidth: 31,
    iconHeight: 33,
    activeClassName: 'offer__bookmark-button--active',
    iconClassName: 'offer__bookmark-icon',
  },
} as const satisfies Record<'card' | 'offer', ButtonLayoutVariant>;

function OfferBookmarksButton({
  authorizationStatus,
  isActive = false,
  isFullSize = false,
}: OfferBookmarksButtonProps): ReactElement {
  const [isInBookmarks, setIsInBookmarks] = useState(isActive);
  const layoutVariant: ButtonLayoutVariant = BUTTON_LAYOUT_VARIANTS[isFullSize ? 'offer' : 'card'];
  const isAuthorized: boolean = authorizationStatus === AuthorizationStatus.Auth;
  const navigate = useNavigate();
  const toggleInBookmarksState = (): void => {
    if (!isAuthorized) {
      navigate(AppRoute.Login);

      return;
    }

    setIsInBookmarks((prevInBookmarks) => !prevInBookmarks);
  };

  return (
    <button
      className={classNames(layoutVariant.className, 'button', {
        [layoutVariant.activeClassName]: isInBookmarks,
      })}
      type="button"
      onClick={toggleInBookmarksState}
    >
      <svg
        className={layoutVariant.iconClassName}
        width={layoutVariant.iconWidth}
        height={layoutVariant.iconHeight}
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
