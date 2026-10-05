import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Application: a
    .model({
      name: a.string().required(),
      email: a.string().required(),
      phone: a.string().required(),
      program: a.string().required(),
      city: a.string().required(),
      submittedAt: a.datetime().required(),
    })
    .authorization((allow) => [allow.publicApiKey().to(["create"])]),
  ContactMessage: a
    .model({
      name: a.string().required(),
      email: a.string().required(),
      message: a.string(),
      createdAt: a.datetime().required(),
    })
    .authorization((allow) => [allow.publicApiKey().to(["create"])]),
  News: a
    .model({
      title: a.string().required(),
      date: a.string().required(),
      category: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey().to(["read"])]),
  Program: a
    .model({
      name: a.string().required(),
      icon: a.string().required(),
      count: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey().to(["read"])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});