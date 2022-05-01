import { staticRequest } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../components/Layout";
import { useTina } from "tinacms/dist/edit-state";
import { Fragment } from "react";
import { PostTile } from '../components/postTile'

const query = `{
  getPageDocument(relativePath: "home.mdx"){id
    data{
  		blocks{
        __typename
        ... on PageBlocksHero{
          heading
          subheading
          description
        }
      }
    }
  }
  getPostList{
    edges {
      node {
        id
        data{
          title
          tags
          description
          date
          categories
          excerpt
          heroImg
          publisher
          body
        }
        sys {
          filename
        }
      }
    }
  }
}`;

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query,
    variables: {},
    data: props.data,
  });

  const postsList = data.getPostList.edges;
  const sortedPosts = postsList.sort((a,b) => {
    return new Date(b.node.data.date) - new Date(a.node.data.date)
  })

  return (
    <Layout>
      {data && data.getPageDocument.data.blocks ? data.getPageDocument.data.blocks.map
        (function (block, i){
          switch(block.__typename){
            case 'PageBlocksHero':
              return (
                <Fragment key={i + block.__typename}>
                  <div>{block.heading}</div>
                  <div>{block.subheading}</div>
                  <div>{block.description}</div>
                </Fragment>
              );
          }
        })
        : null  
      }

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {sortedPosts.map((post) => <PostTile post={post} />)}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const variables = {};
  let data = {};
  try {
    data = await staticRequest({
      query,
      variables,
    });
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      data,
      //myOtherProp: 'some-other-data',
    },
  };
};
