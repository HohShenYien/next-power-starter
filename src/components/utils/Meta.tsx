import Head from "next/head";

type MetaProps = {
  title?: string;
  description?: string;
  image?: string;
  nested?: boolean;
};

const titleGenerator = (title?: string) => {
  return title ? `${title} | Next Power Starter` : "Next Power Starter";
};

const Meta = ({ title, description, image, nested = false }: MetaProps) => {
  return (
    <Head>
      <title>{titleGenerator(title)}</title>
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta property="twitter:description" content={description} />
        </>
      )}
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="twitter:image" content={image} />
        </>
      )}

      {/* Don't feel like jamming up the header */}
      {nested && (
        <>
          <meta property="og:type" content="website" />
          <meta property="twitter:card" content="summary_large_image" />
          <link rel="icon" href="/favicon.ico" />
        </>
      )}

      <meta property="og:title" content={titleGenerator(title)} />
      <meta property="twitter:title" content={titleGenerator(title)} />
    </Head>
  );
};

export default Meta;
