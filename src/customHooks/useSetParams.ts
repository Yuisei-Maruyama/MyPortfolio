import { useState } from 'react'

const useSetParams = () => {
  const [params, setParam] = useState<string | string[]>('')

  const getParams = (params: string) => {
    setParam(params)
  }

  return {
    getParams,
    params
  }
}

export default useSetParams
