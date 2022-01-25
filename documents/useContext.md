## useContextとは

通常親コンポーネントから子コンポーネントにデータを渡す際は、propsを介して行う。  
しかし、孫やひ孫のように複数のコンポーネントを介してデータを受け渡さなくてはいけない場合、propsのバケツリレーが発生してしまう。  

上記の親の配下にある多重構造のコンポーネントのデータを渡すには、  
Reactの `Context API` を利用することでpropsを利用することなく下の階層のコンポーネントとデータの共有を行うことができる。  

## useContextの使い方

1. 下記のような形でContextの作成する。  

> const ThemeContext = React.createContext(themes.light)

2. ThemeContext.Providerコンポーネントで数字を渡したいコンポーネントが入っているComponentAを囲みます。

```ts
<ThemeContext.Provider value={themes.dark}>
  <Toolbar />
</ThemeContext.Provider>
```

3. 値を受け取るコンポーネントで `useContext` を使用し、データを取得する。

> const theme = useContext(ThemeContext)

(useContext使用例)

```ts
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

## useContextのメリット
- React Hooks に標準で入っているため、導入が容易である
- 更新頻度の低い状態の管理に最適で、Reduxよりもシンプルに記述できる  

## useContextのデメリット

- useContextで管理しているプロパティのどれか一つでも変更があった場合、<Provider>配下のコンポーネントが再レンダリングされてしまうため、パフォーマンスに影響が出てしまう恐れがある  

- <Provider>をどこに配置するのかが重要になってくるため、値をどこからでも参照できるというわけではない
