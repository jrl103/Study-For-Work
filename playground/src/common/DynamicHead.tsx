import { Helmet } from 'react-helmet-async';

interface Props {
  description: string;
  title: string;
}

export default function DynamicHead({ description, title }: Props) {
  return (
    <Helmet>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
