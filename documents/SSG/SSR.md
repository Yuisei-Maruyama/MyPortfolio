## SSG(Static Site Generator)とは

まず、アプリケーションが完成し、デプロイする際にビルドを行う。  

ビルドでは、HTMLの雛形や必要なデータをデプロイできる形に組み合わせていく作業のことである。  

SSGでは、**ビルドした際に1度だけHTMLのみを生成する仕組み**のことである。(この際にJavaScriptは生成されない)  

<img src=https://nextjs.org/static/images/learn/data-fetching/static-generation.png />


## SSR(Server Side Rendering)とは

**クライアントがリクエストを投げるたびに、サーバー側がHTMLを生成して、クライアントに返却する仕組み**のことである。  

<img src='https://nextjs.org/static/images/learn/data-fetching/server-side-rendering.png' />

## SSG と SSR のメリット　・　デメリット

- SSG

  - メリット
    - 最初にページがロードされる時にすぐHTMLが作成されるため、素のReactと比較して、画面の描画速度が格段に向上する。
  - デメリット
    - ビルドしない限りデータが更新されない。(コンテンツ更新するたびにビルドを行う必要がある)
    - 大量のページがある際には、ビルドに時間を要すため、データの更新から反映までに、タイムラグが発生する可能性がある。

- SSG

  - メリット
    - HTMLを各リクエストの度に生成するため、Pre-rendering されたページを常に最新状態に維持することができる。
  - デメリット
    - リクエストが起こる度にHTMLを生成するので、描画速度がSSGより遅くなる可能性がある。


## SSG と SSR の使い分け

- SSG

**動作がないもの**

  - ブログ
  - ドキュメント
  - ECの商品ページ

- SSR

**動作があるもの**

  - SNSのタイムライン
  - ユーザのプロフィール

**Next.jsではSSGとSSRをページごとで混在して利用することができる**

<img src='https://nextjs.org/static/images/learn/data-fetching/per-page-basis.png' />
