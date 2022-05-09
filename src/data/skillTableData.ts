export const skillTableData = () => {
  const reactSteps = [
    'create-react-app',
    'tsx',
    'react-router-dom',
    'material ui',
    'Custom Hooks',
    'styled-components',
    'React 18.x Features',
    'OAuth',
    'Unit Test',
  ]

  const hooksSteps = ['useState', 'useEffect', 'useRef', 'useCallback', 'useContext', 'useMemo', 'useReducer']

  const reduxSteps = ['flux-flow', 'ducks-pattern', 're-ducks-pattern', 'redux-thunk', 'redux-saga']

  const vueSteps = ['Atomic Design', 'Vuetify', 'Vue-Router', 'Vuex', 'Vue 3.x Features']

  const nodeSteps = ['Connect DB', 'CRUD', 'OAuth', 'NPM Version Management', 'GraphQL', 'Apollo']

  const openApiSteps = ['API Design', 'operationId Definition', 'OpenAPI Extensions']

  const frontEndProps = [
    {
      name: 'React.js',
      steps: reactSteps,
      activeStep: 5,
    },
    {
      name: 'React Hooks',
      steps: hooksSteps,
      activeStep: 5,
    },
    {
      name: 'Redux',
      steps: reduxSteps,
      activeStep: 3,
    },
    {
      name: 'Vue.js',
      steps: vueSteps,
      activeStep: 4,
    },
  ]

  const backEndProps = [
    {
      name: 'Node.js',
      steps: nodeSteps,
      activeStep: 2,
    },
    {
      name: 'OpenAPI',
      steps: openApiSteps,
      activeStep: 1,
    },
  ]

  return {
    reactSteps,
    frontEndProps,
    backEndProps,
  }
}
