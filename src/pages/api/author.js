// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fetch from 'node-fetch'
import { GraphQLClient, gql } from "graphql-request"

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
const graphcmsToken = process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN


export default async function author(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`
    }
  })

  const query = gql`
      mutation createAuthor($name: String!, $email: String!, $bio: String!) {
        createAuthor(data: { name: $name, email: $email, bio: $bio }) {
          name
          email
          bio
        }
      }
    `

  try {
    await fetch(`${process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `url=${encodeURIComponent(
        req.body.url,
      )}`,
    }).then((data) => console.log(JSON.stringify(data, null, 2)));

    const result = await graphQLClient.request(query, req.body);
    return res.status(200).send(result);

  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
}

// Name
// Photo
// Bio