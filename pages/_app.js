import dynamic from "next/dynamic";
import { TinaEditProvider } from "tinacms/dist/edit-state";
import '../styles/globals.css'

// @ts-ignore FIXME: default export needs to be 'ComponentType<{}>
const TinaCMS = dynamic(() => import("tinacms"), { ssr: false });

const branch = "main";
// When working locally, hit our local filesystem.
// On a Vercel deployment, hit the Tina Cloud API
const apiURL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:4001/graphql"
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;

const App = ({ Component, pageProps }) => {
  return (
    <>
      <TinaEditProvider
        showEditButton={true}
        editMode={
          <TinaCMS
            cmsCallback={(cms) => {
              cms.flags.set("tina-admin", true);
            }}
            apiURL={apiURL}
            mediaStore={async() => {
              const pack = await import('next-tinacms-cloudinary')
              return pack.TinaCloudCloudinaryMediaStore
            }}
          >
            <Component {...pageProps} />
          </TinaCMS>
        }
      >
        <Component {...pageProps} />
      </TinaEditProvider>
    </>
  );
};

export default App;
