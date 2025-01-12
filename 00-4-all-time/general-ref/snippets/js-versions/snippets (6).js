{
  styles: {
    prefix: "styled-react-native",
    body: [
      "import styled from 'styled-components/native';",
      "",
      "export const ${1:Container} = styled.${2:View}`",
      "  ${3}",
      "`;",
      ""
    ],
    description: "Create React Native Styled Components file"
  },

  componentFunctionalTypescript: {
    prefix: "rnfc",
    body: [
      "import React from 'react';",
      "import { View } from 'react-native';",
      "",
      "// import { Container } from './styles';",
      "",
      "const ${1:${TM_DIRECTORY/^.*(\\/|\\\\)([^(\\/|\\\\)]+)$/$2/}} = () => {",
      "  return <View />;",
      "}",
      "",
      "export default ${1:${TM_DIRECTORY/^.*(\\/|\\\\)([^(\\/|\\\\)]+)$/$2/}};"
    ],
    description: "Create React Native Functional Component"
  }	
}
