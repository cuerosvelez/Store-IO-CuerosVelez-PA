declare module '*.gql' {
  import { DocumentNode } from 'graphql';

  const value: DocumentNode;
  export default value;
}

declare module '*.css' {
  const css: any;
  export default css;
}
