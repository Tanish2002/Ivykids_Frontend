import type { CodegenConfig } from "@graphql-codegen/cli";
const config: CodegenConfig = {
  schema: "http://localhost:9090/graphql",
  documents: ["src/**/*.ts"],
  generates: {
    "./src/types/gql/": {
      preset: "client",
    },
  },
};

export default config;
