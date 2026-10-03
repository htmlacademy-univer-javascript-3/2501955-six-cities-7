import type { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';

function NotFoundPage(): ReactElement {
  return (
    <div>
      <Helmet>
        <title>6 cities | Not Found</title>
      </Helmet>

      <span>404</span>
      <span>Page not found :(</span>
    </div>
  );
}

export default NotFoundPage;
