import type { CodegenConfig } from "@graphql-codegen/cli";
const config: CodegenConfig = {
  schema: "https://ivy-backend.onrender.com/graphql",
  documents: ["src/**/*.ts"],
  generates: {
    "./src/types/gql/": {
      preset: "client",
    },
  },
};

export default config;
