import { gql } from "../../deps.ts";

export const detect = gql`
  query Detect($src: String) {
    detect(src: $src)
  }
`;
