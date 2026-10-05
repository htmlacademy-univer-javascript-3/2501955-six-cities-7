import type { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route';

function NotFoundPage(): ReactElement {
  return (
    <div className='page page--gray'>
      <Helmet>
        <title>6 cities | Not found</title>
      </Helmet>

      <main className='page__main page--gray'>
        <div className='container'>
          <section>
            <h1>404. Page not found</h1>
            <Link to={AppRoute.Root}>Go to main page</Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
