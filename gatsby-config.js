const dotenv = require("dotenv")
const path = require("path")

dotenv.config({
  path: `.env`,
})

const cspDirectives = [
  "script-src 'self' 'unsafe-inline' *.cloudfront.net unpkg.com www.google-analytics.com www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' fonts.googleapis.com fonts.gstatic.com",
  "img-src 'self' data: https:",
  "font-src 'self' data: fonts.googleapis.com fonts.gstatic.com",
  "worker-src 'self' blob: data:",
  "connect-src 'self' 'unsafe-inline' github-contributions-api.jogruber.de www.google-analytics.com stats.g.doubleclick.net www.googletagmanager.com",
  "object-src 'none'",
]

module.exports = {
  siteMetadata: {
    title: "Harsh Dubey",
    description:
      "AI/ML student focused on building practical, data-driven systems. Exploring NLP, machine learning, and real-world problem solving through hands-on projects.",
    navigationString: "Harsh Dubey | ",
    author: "@iamharshdubey",
    siteUrl: "https://harshcode.dev",
    coverImage: "https://harshcode.dev/square.png",
    social: [
      {
        name: "X",
        url: "https://x.com/chessinorbit",
      },
      {
        name: "GitHub",
        url: "https://github.com/harshlostagainn",
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/iamharshdubey",
      },
    ],
  },

  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.tsx`),
      },
    },

    {
      resolve: "gatsby-plugin-alias-imports",
      options: {
        alias: {
          "@components": path.resolve(__dirname, "./src/components"),
          "@utils": path.resolve(__dirname, "./src/utils"),
        },
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },

    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,

    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["UA-37968445-2"],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Harsh Dubey",
        short_name: "harshcode.dev",
        start_url: "/",
        background_color: "#0f172a",
        theme_color: "#2563eb",
        display: "minimal-ui",
        icon: "src/images/square.png",
      },
    },

    {
      resolve: "gatsby-plugin-netlify",
      options: {
        headers: {
          "/*": [
            `Content-Security-Policy: ${cspDirectives.join(";")}`,
            "X-Frame-Options: DENY",
            "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload",
            "Upgrade-Insecure-Requests: 1",
            "X-XSS-Protection: 1; mode=block",
            "X-Content-Type-Options: nosniff",
            "Referrer-Policy: no-referrer-when-downgrade",
          ],
        },
      },
    },
  ],
}
