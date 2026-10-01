import { a, defineData } from '@aws-amplify/backend';
import type { ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  News: a.model({
    title: a.string().required(),
    date: a.string().required(),
    category: a.string().required(),
  }).authorization((allow) => [allow.guest().to(['read'])]),

  Program: a.model({
    name: a.string().required(),
    icon: a.string().required(),
    count: a.string().required(),
  }).authorization((allow) => [allow.guest().to(['read'])]),

  Application: a.model({
    email: a.string().required(),
    name: a.string().required(),
    phone: a.string().required(),
    program: a.string().required(),
    city: a.string().required(),
    submittedAt: a.datetime().required(),
  })
    .identifier(['email'])
    .authorization((allow) => [allow.guest().to(['create'])]),

  ContactMessage: a.model({
    name: a.string().required(),
    email: a.string().required(),
    message: a.string(),
    submittedAt: a.datetime().required(),
  }).authorization((allow) => [allow.guest().to(['create'])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});