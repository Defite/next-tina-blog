
import { defineSchema, defineConfig } from "tinacms";

export default defineSchema({
  collections: [
    {
      label: 'Blog Posts',
      name: 'post',
      path: '_posts',
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Excerpt',
          name: 'excerpt',
        },
        {
          type: 'image',
          label: 'Cover Image',
          name: 'coverImage',
        },
        {
          type: 'datetime',
          label: 'Date',
          name: 'date',
        },
        {
          type: 'object',
          label: 'Author',
          name: 'author',
          fields: [
            {
              type: 'string',
              label: 'Name',
              name: 'name',
            },
            {
              type: 'string',
              label: 'Picture',
              name: 'picture',
            },
          ],
        },
        {
          type: 'object',
          label: 'OG Image',
          name: 'ogImage',
          fields: [
            {
              type: 'string',
              label: 'Url',
              name: 'url',
            },
          ],
        },
        {
          type: 'rich-text',
          label: 'Body',
          name: 'body',
          isBody: true,
        },
      ],
    },
  ],
});






// Your tina config
// ==============
const branch = 'master'
// When working locally, hit our local filesystem.
// On a Vercel deployment, hit the Tina Cloud API
const apiURL =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:4001/graphql'
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`

export const tinaConfig = defineConfig({
  apiURL,
  mediaStore: async () => {
    // Load media store dynamically so it only loads in edit mode
    const pack = await import("next-tinacms-cloudinary");
    return pack.TinaCloudCloudinaryMediaStore;
  },
  cmsCallback: (cms) => {
    //  add your CMS callback code here (if you want)

    // The Route Mapper
    /**
     * 1. Import `tinacms` and `RouteMappingPlugin`
     **/
    import("tinacms").then(({ RouteMappingPlugin }) => {
      /**
       * 2. Define the `RouteMappingPlugin` see https://tina.io/docs/tinacms-context/#the-routemappingplugin for more details
       **/
      const RouteMapping = new RouteMappingPlugin((collection, document) => {
        return undefined;
      });
      /**
       * 3. Add the `RouteMappingPlugin` to the `cms`.
       **/
      cms.plugins.add(RouteMapping);
    });

    import('react-tinacms-editor').then((field)=> {
      cms.plugins.add(field.MarkdownFieldPlugin)
    });
  },
});
