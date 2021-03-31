import NextLink from 'next/link';

interface LinkProps {
  href: string;
  children: React.ReactNode | string;
}
export default function Link({ href, children }: LinkProps): JSX.Element {
  const isExternalLink = href.includes('http') || href.includes('/go/');
  const target = isExternalLink ? '_blank' : '_self';

  return (
    <NextLink href={href} passHref>
      <a target={target}>{children}</a>
    </NextLink>
  );
}
