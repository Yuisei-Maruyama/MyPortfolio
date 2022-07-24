export const skillTableData = () => {
  const demoSteps = ['step1', 'step2', 'step3', 'step4']

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

  const reduxSteps = ['flux-flow', 'ducks-pattern', 're-ducks-pattern', 'redux toolkit', 'redux-thunk', 'redux-saga']

  const vueSteps = ['Atomic Design', 'Vuetify', 'Vue-Router', 'Vuex', 'Composition API']

  const nodeSteps = ['Connect DB', 'CRUD', 'File Operations', 'OAuth', 'NPM Version Management', 'GraphQL', 'Apollo']

  const openApiSteps = ['API Design', 'operationId Definition', 'OpenAPI Extensions']

  const frontEndProps = [
    {
      name: 'React.js',
      steps: reactSteps,
      activeStep: 6,
    },
    {
      name: 'React Hooks',
      steps: hooksSteps,
      activeStep: 6,
    },
    {
      name: 'Redux',
      steps: reduxSteps,
      activeStep: 3,
    },
    {
      name: 'Vue.js',
      steps: vueSteps,
      activeStep: 5,
    },
  ]

  const backEndProps = [
    {
      name: 'Node.js',
      steps: nodeSteps,
      activeStep: 3,
    },
    {
      name: 'OpenAPI',
      steps: openApiSteps,
      activeStep: 1,
    },
  ]

  return {
    demoSteps,
    reactSteps,
    frontEndProps,
    backEndProps,
  }
}
