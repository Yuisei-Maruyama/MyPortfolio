import React from 'react'
import { SkillTable } from '@/components'

const reactSteps = [
  'create-react-app',
  'rooting',
  'tsx',
  'styled-components',
  'ver18 Features',
  'OAuth',
  'Unit Test',
  'Apollo-Client',
]

const hooksSteps = ['useState', 'useEffect', 'useRef', 'useCallback', 'useMemo', 'useContext', 'useReducer']

const reduxSteps = ['flux-flow', 'ducks-pattern', 're-ducks-pattern', 'redux-thunk', 'redux-saga']

const nodeSteps = ['Connect DB', 'CRUD', 'OAuth', 'NPM Version Management', 'GraphQL', 'Apollo']

const openApiSteps = ['API Design', 'operationId Definition', 'OpenAPI Extensions']

const SkillTables: React.FC = () => {
  const frontEndProps = [
    {
      name: 'React.js',
      steps: reactSteps,
      activeStep: 3,
    },
    {
      name: 'React Hooks',
      steps: hooksSteps,
      activeStep: 3,
    },
    {
      name: 'Redux',
      steps: reduxSteps,
      activeStep: 3,
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
          <SkillTable title="Front-End Goal Image" frontEndProps={frontEndProps} />
          <SkillTable title="Back-End Goal Image" backEndProps={backEndProps} />
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default SkillTables
