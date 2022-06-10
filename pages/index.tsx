import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({
  allPostsData,
}: {
  allPostsData: { date: string; title: string; id: string }[];
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p className="text-xl w-full">
          Hello, I&apos;m Mind0Bender. I&apos;m a Web Developer. You can contact
          me via <a href="mailto:mrcircuit1234@gmail.com">mail</a>
        </p>
        <br />
        <p className="text-xl">
          (This is a sample website - I built this site for learning Next.js)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg + " font-bold text-2xl"}>Blogs</h2>
        <ul
          className={"flex flex-col justify-between items-baseline gap-4 py-2"}
        >
          {allPostsData.map(({ id, date, title }) => (
            <li
              className={
                "border-2 py-2 w-full transform duration-300 hover:scale-105 px-4 rounded-lg border-blue-100"
              }
              key={id}
            >
              <Link href={`/posts/${id}`}>
                <a className={utilStyles.listItemLink}>{title}</a>
              </Link>
              <br />
              <Date dateString={date} />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
