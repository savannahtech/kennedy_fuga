import NextLink, { LinkProps as NextLinkProps } from "next/link";

const Link: React.FC<
  NextLinkProps & {
    children: React.ReactNode;
    className?: string;
    title?: string;
  }
> = ({ href, children, ...props }) => {
  return (
    <NextLink href={href}>
      <Link href={""} {...props}>{children}</Link>
    </NextLink>
  );
};

export default Link;
