import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Страница не существует',
  robots: { index: false, follow: false },
};

const NotFoundPage = () => {
  return <div>NotFoundPage</div>;
};

export default NotFoundPage;
