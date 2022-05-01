import { defineSchema } from "@tinacms/cli";
import type { TinaTemplate } from "@tinacms/cli";

const heroBlock : TinaTemplate = {
  name: 'hero',
  label: 'hero',
  fields: [
    {
      type: 'string',
    label: 'Nagłówek',
    name: 'heading',
    }, 
    {
      type: 'string',
      label: 'Subnagłówek',
      name: 'subheading',
    },
    {
      type: 'string',
      label: 'Opis',
      name: 'description',
      ui: {
        component: 'textarea'
      }
    },
  ]
}

export default defineSchema({
  collections: [
    {
      label: "Page Content",
      name: "page",
      path: "content/page",
      format: "mdx",
      fields: [
        {
          type: 'object',
          list: true,
          label: 'Sekcje',
          name: 'blocks',
          templates: [heroBlock]
        }
      ],
    }, // page content
    {
      label: "Blog Posts",
      name: "post",
      path: "content/post",
      format: "mdx",
      fields: [
        {
          type: "string",
          label: "Tytuł",
          name: "title",
        },
        
        {
          type: "string",
          label: "Kategorie",
          name: "categories",
          options: ["1-3", "3-6", "6-8", "8+", "dla wszystkich", "młodzieżowe"],
          list: true,
        },
        {
          type: "string",
          label: "Tagi",
          name: "tags",
          list: true,
          ui: {
            component: 'tags'
          }
        },
        {
          label: "opis pod SEO",
          type: 'string'
          name: "description"
          ui: {
            component: 'textarea'
          }
        }
        {
          type: "image",
          name: "heroImg",
          label: "Okładka",
        },
        {
          type: "rich-text",
          label: "Lead",
          name: "excerpt",
        },
        {
          type: "reference",
          label: "Osoba autorska",
          name: "author",
          collections: ["authors"],
        },
        {
          type: "string",
          label: "Wydawca",
          name: "publisher",
        },
        {
          type: "datetime",
          label: "Data publikacji",
          name: "date",
          ui: {
            dateFormat: "MMMM DD YYYY",
            timeFormat: "hh:mm A",
          },
        },
        {
          type: "rich-text",
          label: "Treść",
          name: "body",
          templates: [
            {
              name: 'BuyBox',
              label: 'BuyBox',
              fields: [
                {
                  type: 'string',
                  name: 'bboid',
                  label: 'buy box oid',
                },
              ],
            },
            {
              name: "YouTube",
              label: "YouTube",
              fields: [
                {
                  type: 'string',
                  name: 'url',
                  label: 'adres url filmu',
                },
              ],
            },
            {
              name: "DateTime",
              label: "Date & Time",
              inline: true,
              fields: [
                {
                  name: "format",
                  label: "Format",
                  type: "string",
                  options: ["utc", "iso", "local"],
                },
              ],
            },
            {
              name: "BlockQuote",
              label: "Block Quote",
              fields: [
                {
                  name: "children",
                  label: "Quote",
                  type: "rich-text",
                },
                {
                  name: "authorName",
                  label: "Author",
                  type: "string",
                },
              ],
            },
          ],
          isBody: true,
        },
      ],
    }, // blogposts
    {
      label: 'Osoby autorskie',
      name: 'authors',
      path: 'content/authors',
      format: 'mdx',
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Avatar",
          name: "avatar",
        },
      ]
    } // authors
  ],
});
