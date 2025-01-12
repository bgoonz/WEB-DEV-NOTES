{
  forOf: {
    prefix: "forof",
    body: ["for (const ${2:element} of ${1:array}) {", "\t$0", "}"],
    description: "Nam-For Of"
  },
  forIn: {
    prefix: "forin",
    body: ["for (const ${2:element} in ${1:array}) {", "\t$0", "}"],
    description: "Nam-For In "
  },
  forEach: {
    prefix: "fore",
    body: "forEach(${1:currentItem} => {\n\t${0}\n})",
    description: "Nam-Creates a forEach statement in ES6 syntax"
  },
  for: {
    prefix: "for",
    body: ["for (const ${1:i} = 0; ${1:i} < ${2:iterable}.length; ${1:i}++) {", "${0}", "}"],
    description: "Nam-For Loop"
  },
  functionArrow: {
    prefix: "f",
    body: ["(${1:argument}) => {${0}}"],
    description: "Nam-Arrow function"
  },
  functionNormal: {
    prefix: "fn",
    body: ["function ${1:name}(${2:argument}) {", "\t", "$0}"],
    description: "Nam-Function normal"
  },
  functionAsync: {
    prefix: "fan",
    body: ["async function ${1:name}(${2:argument}) {", "\t", "$0}"],
    description: "Nam-Function async"
  },
  functionArrowAsync: {
    prefix: "fa",
    body: ["async (${1:argument}) => {${0}}"],
    description: "Nam-Async Arrow function"
  },
  Console_log: {
    prefix: "clg",
    body: ["console.log(${0})"],
    description: "Nam-console log normal"
  },
  Console_log_message: {
    prefix: "clo",
    body: ["console.log('${1:variable}: ', ${1:variable})"],
    description: "Nam-console log with message"
  },
  Console: {
    prefix: "c",
    body: ["console.${1}(${2})"],
    description: "Nam-console"
  },
  import: {
    prefix: "imp",
    body: "import ${1:moduleName} from '${2:module}'$0",
    description: "Nam-Imports entire module statement in ES6 syntax"
  },
  require: {
    prefix: "rqr",
    body: "require('${1:package}')",
    description: "Nam-Require a package"
  },
  exportNamed: {
    prefix: "ex",
    body: "export const ${1:name}",
    description: "Nam-Export const named"
  },
  exportDefault: {
    prefix: "exd",
    body: "export default ${1:name}",
    description: "Nam-Export default"
  },
  exportClass: {
    prefix: "exc",
    body: "export default class ${1:className} {\n\t$0\n}",
    description: "Nam-Export default class in ES6 syntax"
  },
  setInterval: {
    prefix: "setinterval",
    body: "setInterval(() => {\n\t${2}\n}, ${0:time})",
    description: "Nam-Executes the given function at specified intervals in ES6 syntax"
  },
  setTimeOut: {
    prefix: "settimeOut",
    body: "setTimeout(() => {\n\t${2}\n}, ${1:time})",
    description: "Nam-Executes the given function after the specified delay in ES6 syntax"
  },
  then: {
    prefix: "then",
    body: "then((${1:rs}) => {\n\t${0}\n})",
    description: "Nam-then promise"
  }
}
