import gql from 'graphql-tag'
import { print } from 'graphql';

export default print(gql`
  {
    entries(section: "about", limit: 1) {
      title,
      slug,
      id
    }
  }
`);
