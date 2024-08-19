import { Helmet } from 'react-helmet-async';

interface IMetaProps {
  siteName: string;
  title: string;
  siteUrl: string;
  desc: string;
}

export default function PageMetaComponents({ siteName, title, siteUrl, desc }: IMetaProps) {
  return (
    <Helmet>
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:description" content={desc} />
    </Helmet>
  );
}
