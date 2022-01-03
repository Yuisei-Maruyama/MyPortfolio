import React from 'react'
import { SkillTable } from '@/components'

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
  'Apollo-Client',
]

const hooksSteps = ['useState', 'useEffect', 'useRef', 'useCallback', 'useMemo', 'useContext', 'useReducer']

const reduxSteps = ['flux-flow', 'ducks-pattern', 're-ducks-pattern', 'redux-thunk', 'redux-saga']

const vueSteps = ['Atomic Design', 'Vuetify', 'Vue-Router', 'Vuex', 'Vue 3.x Features']

const nodeSteps = ['Connect DB', 'CRUD', 'OAuth', 'NPM Version Management', 'GraphQL', 'Apollo']

const openApiSteps = ['API Design', 'operationId Definition', 'OpenAPI Extensions']

const SkillTables: React.FC = () => {
  const frontEndProps = [
    {
      name: 'React.js',
      steps: reactSteps,
      activeStep: 5,
    },
    {
      name: 'React Hooks',
      steps: hooksSteps,
      activeStep: 4,
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
      activeStep: 1,
    },
    {
      name: 'OpenAPI',
      steps: openApiSteps,
      activeStep: 0,
    },
  ]

  return (
    <>
      {frontEndProps && backEndProps ? (
        <>
          <div style={{ width: '100%' }}>
            <SkillTable title="Front-End Goal Image" frontEndProps={frontEndProps} />
          </div>
          <div style={{ width: '100%', marginTop: 30 }}>
            <SkillTable title="Back-End Goal Image" backEndProps={backEndProps} />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default SkillTables
