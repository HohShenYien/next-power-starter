import React from "react";
import styles from "./NiceLink.module.scss";
import Link from "next/link";

type NiceLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: React.ReactNode;
  href: string;
};

const NiceLink = ({ children, href, ...props }: NiceLinkProps) => {
  return (
    <Link href={href} className={styles["nice-link"]} {...props}>
      <span color="brand.400" className={styles["link-txt"]}>
        {children}
      </span>
    </Link>
  );
};

export default NiceLink;
