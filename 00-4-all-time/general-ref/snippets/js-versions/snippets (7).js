{
  styles: {
    prefix: "styled-react",
    body: [
      "import styled from 'styled-components';",
      "",
      "export const ${1:Container} = styled.${2:div}`",
      "  ${3}",
      "`;",
      ""
    ],
    description: "Create ReactJS Styled Components file"
  },

  componentFunctionalTypescript: {
    prefix: "rfc",
    body: [
      "import React from 'react';",
      "",
      "// import { Container } from './styles';",
      "",
      "function ${1:${TM_DIRECTORY/^.*(\\/|\\\\)([^(\\/|\\\\)]+)$/$2/}}() {",
      "  return <div />;",
      "}",
      "",
      "export default ${1:${TM_DIRECTORY/^.*(\\/|\\\\)([^(\\/|\\\\)]+)$/$2/}};"
    ],
    description: "Create ReactJS Functional Component Typescript"
  }	
}
