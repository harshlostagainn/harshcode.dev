import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Helmet from "react-helmet"

interface SiteQueryResult {
  site: {
    siteMetadata: {
      title: string
      description: string
      author: string
      navigationString: string
      coverImage: string
      siteUrl: string
    }
  }
}

interface MetaTag {
  name?: string
  property?: string
  content: string
}

export interface SEOProps {
  title: string
  description?: string
  lang?: string
  meta?: MetaTag[]
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = "",
  lang = "en",
  meta = [],
}) => {
  const { site } = useStaticQuery<SiteQueryResult>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          navigationString
          coverImage
          siteUrl
        }
      }
    }
  `)

  const metaDescription = description || site.siteMetadata.description
  const siteUrl = site.siteMetadata.siteUrl || "https://harshcode.dev"
  const ogImage = site.siteMetadata.coverImage

  const metaTags: MetaTag[] = [
    // Basic SEO
    {
      name: "description",
      content: metaDescription,
    },

    // Open Graph
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: metaDescription,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: siteUrl,
    },
    {
      property: "og:image",
      content: ogImage,
    },

    // Twitter
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:creator",
      content: site.siteMetadata.author,
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: metaDescription,
    },
    {
      name: "twitter:image",
      content: ogImage,
    },

    ...meta,
  ]

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`${site.siteMetadata.navigationString}%s`}
      meta={metaTags}
    />
  )
}

export default SEO
