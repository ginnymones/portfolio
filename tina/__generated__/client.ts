import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'fb25dafee0dc9f76950b37f7a9471041b2b46ec9', queries,  });
export default client;
  