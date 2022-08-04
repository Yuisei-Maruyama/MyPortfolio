# CSS(Tips)

## 上下左右中央の配置

> 3行で書く場合(Flexboxでの中央寄せ)

```css
.flex-block-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```
<p class="mt-0">(表示)</p>
<div class="flex-block-center">
  <div class="flex-content">Flexbox</div>
</div>

<br>

> 2行で書く場合(グリッドレイアウトでの中央寄せ)

```css
.grid-block-center {
  display: grid;
  place-items: center;
}
```
<p class="mt-0">(表示)</p>
<div class="grid-block-center">
  <div class="grid-content">Grid Layout</div>
</div>

<br>

## 磨りガラス風表現

[`backdrop-filter`](https://developer.mozilla.org/ja/docs/Web/CSS/backdrop-filter) を用いる！

`backdrop-filter`プロパティは、内部のテキストやその他の要素を変更することなく、要素の背景の色相やコントラストやぼかしを変更することができる。  

下記の例では背景色を設定し、`backdrop-filter: blur(20px);` でぼかし、磨りガラスの効果を与え、さらに、 `saturate(180%)` で背景の彩度も調整している。

```ts
  .bg {
    height: 300px;
    display: grid;
    place-items: center;
    gap: 24px;
    border-radius: 12px;
    background-size: cover;
    background-position: center;
    background-color: #0e354bff;
    background-image: url("https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1788&q=80");
  }
  .backdrop-filter {
    width: min(500px, 100%);
    border-radius: 12px;
    -webkit-backdrop-filter: blur(8px) saturate(180%);
    backdrop-filter: blur(8px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.5);
  }
  .backdrop-filter h2 {
    margin: 0;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 12px 12px 0 0;
    font-size: 16px;
    font-weight: normal;
    padding: 8px 14px;
    color: #333;
  }
  .backdrop-filter p {
    margin: 0;
    padding: 14px;
    color: #000;
  }
```

<p class="mt-0">(表示)</p>
<div class="bg">
  <div class="backdrop-filter">
    <h2>メッセージ</h2>
    <p>磨りガラス風の表現ができるよ👨‍💻</p>
  </div>
</div>

## scroll-behavior