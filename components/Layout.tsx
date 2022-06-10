import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

const name = "MIND0BENDER";
export const siteTitle = "Next.js Sample Website";

export default function Layout({
  children,
  home = false,
}: {
  children: ReactNode;
  home?: boolean;
}) {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const scrollPercent =
      ((window.innerHeight + window.scrollY) * 100) /
      document.body.scrollHeight;
    console.log(scrollPercent);
    setScrollPercent(scrollPercent);
    const handleScroll = () => {
      const scrollPercent =
        ((window.innerHeight + window.scrollY) * 100) /
        document.body.scrollHeight;
      console.log(scrollPercent);

      setScrollPercent(scrollPercent);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex">
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className={styles.header}>
          {home ? (
            <>
              <img
                src="/images/profile.jpeg"
                className={
                  "rounded-full ring-2 hover:ring-8 duration-300 ring-blue-200"
                }
                height={144}
                width={144}
                alt={name}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          ) : (
            <>
              <Link href="/">
                <a>
                  <img
                    src="/images/profile.jpeg"
                    className={
                      "rounded-full ring-2 hover:ring-8 duration-300 ring-blue-200"
                    }
                    height={144}
                    width={144}
                    alt={name}
                  />
                </a>
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/">
                  <a className={"font-bold text-2xl text-black"}>{name}</a>
                </Link>
              </h2>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a className="text-xl p-2 rounded-md border border-blue-100 hover:border-blue-400 duration-100 font-bold">
                ← Back to home
              </a>
            </Link>
          </div>
        )}
      </div>
      <div className="w-full fixed h-2">
        <div
          style={{
            width: scrollPercent + "%",
          }}
          className={`h-full bg-gradient-to-r from-blue-400 to-purple-400 via-green-400 duration-200`}
        />
      </div>
    </div>
  );
}
