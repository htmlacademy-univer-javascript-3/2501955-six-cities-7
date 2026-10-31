import classNames from 'classnames';
import { useState, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../enums/authorization-status';
import { AppRoute } from '../../enums/app-route';
import { OFFER_BOOKMARKS_BUTTON_LAYOUT_VARIANTS } from './constants/offer-bookmarks-button-layout-variants';
import type { OfferBookmarksButtonLayoutVariant } from './types/offer-bookmarks-button-layout-variant';

type OfferBookmarksButtonProps = {
  authorizationStatus: AuthorizationStatus;
  isActive?: boolean;
  isFullSize?: boolean;
};

function OfferBookmarksButton({
  authorizationStatus,
  isActive = false,
  isFullSize = false,
}: OfferBookmarksButtonProps): ReactElement {
  const [isInBookmarks, setIsInBookmarks] = useState(isActive);
  const layoutVariant: OfferBookmarksButtonLayoutVariant = OFFER_BOOKMARKS_BUTTON_LAYOUT_VARIANTS[isFullSize ? 'offer' : 'card'];
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
