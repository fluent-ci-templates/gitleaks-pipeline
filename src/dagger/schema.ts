import {
  queryType,
  makeSchema,
  dirname,
  join,
  resolve,
  stringArg,
} from "../../deps.ts";

import { detect } from "./jobs.ts";

const Query = queryType({
  definition(t) {
    t.string("detect", {
      args: {
        src: stringArg(),
      },
      resolve: async (_root, args, _ctx) => await detect(args.src!),
    });
  },
});

const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: resolve(join(dirname(".."), dirname(".."), "schema.graphql")),
    typegen: resolve(join(dirname(".."), dirname(".."), "gen", "nexus.ts")),
  },
});

schema.description = JSON.stringify({
  "detect.src": "directory",
  detect: "file",
});

export { schema };
