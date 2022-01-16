# react-router-dom

## URLパラメータの取得方法

- useLocation()： URL path や パラメータなど。JSのlocationと同じ
- useParams()： URLのパスパラメータを取得。ex.) /text/xxx なら、`xxx` の部分を取得
- useHistory()： historyオブジェクトを取得

```ts
import React from 'react'
import {
  useParams,
  useHistory,
  useLocation
} from 'react-router-dom'

export default function UrlParameter(){
  const location = useLocation()
  const params = useParams()
  const history = useHistory()

  return(
    <p>ロケーション：{location}</p>
    <p>パスパラメーター：{params}</p>
    <p>履歴：{history}</p>
  )

}
```
