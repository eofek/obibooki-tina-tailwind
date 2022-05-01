import { staticRequest } from "tinacms";
import { Layout } from "../components/Layout";
import { useTina } from "tinacms/dist/edit-state";
import { BlogPost } from "../components/blogPost";

const query = `query getPost($relativePath: String!) {
  getPostDocument(relativePath: $relativePath) {
    data {
      title
      categories
      tags
      description
      heroImg
      excerpt
      publisher
      date
      body
    }
  }
}
`;

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout>
        <BlogPost post={data.getPostDocument.data} />  
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const postsResponse = await staticRequest({
    query: `{
        getPostList{
          edges {
            node {
              sys {
                filename
              }
            }
          }
        }
      }`,
    variables: {},
  });
  const paths = postsResponse.getPostList.edges.map((x) => {
    return { params: { slug: x.node.sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps = async (ctx) => {
  const variables = {
    relativePath: ctx.params.slug + ".mdx",
  };
  let data = {};
  try {
    data = await staticRequest({
      query,
      variables,
    });
  } catch (error) {
    // swallow errors related to document creation
  }

  return {
    props: {
      data,
      variables,
    },
  };
};
