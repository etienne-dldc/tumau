import React from 'react';
import { NextPage } from 'next';
import { PageContent } from '../../data';
import { MarkdownNodeRenderer } from '../../components/MarkdownNodeRenderer';
import { PAGES } from '../../data/pages';
import { BasePageProps } from '../_app';

type Props = BasePageProps & {
  content: PageContent;
};

const Post: NextPage<Props> = ({ content }) => {
  return <MarkdownNodeRenderer node={content} />;
};

// eslint-disable-next-line @typescript-eslint/camelcase
export async function unstable_getStaticPaths() {
  return PAGES.filter(pkg => pkg.page === '/package/[slug]').map((pkg): { params: { slug: string } } => {
    const slug = pkg.slug.substring('/package/'.length);
    console.log({ slug });

    return { params: { slug } };
  });
}

// eslint-disable-next-line @typescript-eslint/camelcase
export async function unstable_getStaticProps({ params }: { params: { slug: string } }) {
  const { packagePageData } = await import('../../data');
  console.log(params.slug);

  const { content, page } = await packagePageData(`/package/${params.slug}` as any);

  const props: Props = {
    content,
    page,
  };

  return {
    props,
  };
}

export default Post;