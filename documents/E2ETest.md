# E2E Test

## E2E Testとは？

## E2E Testの主要パッケージ

- [Cypress](https://github.com/cypress-io/cypress)
  - メリット
    - テストできるフレームワークで最も利用者と知見が多いフレームワーク
    - テストのセットアップ、作成、実行、デバッグを1パッケージで可能にする
  - デメリット
    - SafariやIEでは使用不可
    - 異なるオリジン間へのアクセスが不可能
    - 別タブを開いた動作確認が出来ない

- [TestCafe](https://github.com/DevExpress/testcafe)
  - メリット
    - 唯一実機でテストできるフレームワーク
    - PCのブラウザだけでなくタブレットやスマホのブラウザでもテストが可能
    - Chrome、IE(2022年終了)、Edge、Safari、FireFoxなど主要なブラウザでテスト可能
  - デメリット
    - ブラウザが立ち上がるまでに時間がかかる

- [Playwright](https://github.com/microsoft/playwright)
  - メリット
    - Microsoft製のテストフレームワーク
    - Chromium, Chrome, Edge, Firefox, Webkit (Safari)と多くのブラウザに対応している
    - React,Vue.js,Svelte のコンポーネントに対してテストを実行できる

## E2E Testを書く際の注意点

ReactなどのフレームワークでフロントのDOMを構築し、E2Eテストを書く場合、  
テキスト入力やボタンクリックといったユーザアクションの対象となる DOM の指定に CSS セレクタ を用いる。  

普段、何も考えずにCSS セレクタの措定を行うと、下記のような **class, id, html** 要素名あたりを使いがちになってしまう。  

- .foo
- .foo .bar
- .foo .bar > .baz
- #target
- #target > span

しかし、上記の**class, id, html** 要素名の指定には問題がある。  

その問題として、下記の２点が考えられる。  

- class や id は一般的にプロダクションコード内部でのみ参照されるためのものなので、外部の存在である E2E のテストコードがその存在を認識・参照出来てしまうのはコードの関心が混合して可読性・保守性が低下すること。

- `button`といったタグ名の指定 や `#target > span` のようなネスト記法による指定はDOM ツリー構造に強く依存するため、テストコードが壊れるリスクに繋がること。

例として、下記のようなDOM構造があったとする。  

```ts
<form onSubmit={this.handleSubmit}>
<div className="field">
  <div className="control">
    <input type="text" className="input email-field" placeholder="Email" />
  </div>
</div>

<div className="field">
  <div className="control">
    <input
      type="password"
      className="input password-field"
      placeholder="Password"
    />
  </div>
</div>

<div className="field is-grouped">
  <p className="control">
    <button type="submit" className="button is-primary">
      Login
    </button>
  </p>
</div>
</form>
```

(テストコード)
```ts
describe("フォームのDOM表示の確認", () => {
  it('Eメール入力欄が表示されていること', () => {
    cy.get(".email-field")
      .its("length")
      .should("eq", 1)
  });
  it('パスワード入力欄が表示されていること', () => {
    cy.get(".password-field")
      .its("length")
      .should("eq", 1)
  });
  it('ボタンが表示されていること', () => {
    cy.get(".button")
      .its("length")
      .should("eq", 1)
  });
});
```

この時点では問題にはならないが、新たに「ログアウト」ボタンが追加された場合・・・

```ts
<p className="control">
  <button type="submit" className="button is-primary">
    Login
  </button>
</p>

<p className="control">
  <button type="submit" className="button">
    Logout
  </button>
</p>
```

元々記述されていたテストコードの下記部分でテストが落ちる。  
```ts
describe("フォームのDOM表示の確認", () => {
  ・・・
  it('ボタンが表示されていること', () => {
    cy.get(".button")
      .its("length")
      .should("eq", 1) // ← ここで検出される個数が 2 になり、テストが落ちる
  });
});
```
そんな時には・・・  
### DOM セレクタには専用の data 属性を使う  

```ts
<form onSubmit={this.handleSubmit}>
    <div className="field">
      <div className="control">
        <input
+         data-test-id="email"
          type="text"
          className="input"
          placeholder="Email"
        />
      </div>
    </div>

    <div className="field">
      <div className="control">
        <input
+         data-test-id="password"
          type="password"
          className="input"
          placeholder="Password"
        />
      </div>
    </div>

    <div className="field is-grouped">
      <p className="control">
+        <button type="submit" className="button" data-test-id="log-in">
          Login
        </button>
      </p>

      <p className="control">
+        <button type="submit" className="button is-primary" data-test-id="logout">
          Logout
        </button>
      </p>
    </div>
  </form>
```

(テストコード)
```ts
describe("フォームのDOM表示の確認", () => {
  it('Eメール入力欄が表示されていること', () => {
    cy.get('[data-test-id="email"]').should('have.length', 1)
  });
  it('パスワード入力欄が表示されていること', () => {
    cy.get('[data-test-id="password"]').should('have.length', 1)
  });
  it('「ログイン」ボタンが表示されていること', () => {
    cy.get('[data-test-id="login"]').should('have.length', 1)
  });
  it('「ログアウト」ボタンが表示されていること', () => {
    cy.get('[data-test-id="logout"]').should('have.length', 1)
  });
});
```

`data-test-id`というテストのための属性を使うことで、何をテストするのかを明示的にする。  

上記のように、`テストのためのカスタムデータ属性を使用する`ことで、関心の分離を行う！！

[属性セレクタ - CSS: カスケーディングスタイルシート | MDN](https://developer.mozilla.org/ja/docs/Web/CSS/Attribute_selectors)

### プロダクションビルドではカスタムデータ属性を取り除く

プロダクションに `data-test-id` の属性は残す必要はないので、下記プラグインで取り除く！！

[babel-plugin-react-remove-properties](https://github.com/oliviertassinari/babel-plugin-react-remove-properties)

