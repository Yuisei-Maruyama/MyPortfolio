# 便利コマンド

## ディレクトリのツリー構造を表現する

```ts
# treeコマンドの導入
# brewでインストール

$ brew install tree
==> Downloading https://homebrew.bintray.com/bottles/tree-1.7.0.el_capitan.bottl
Already downloaded: /Library/Caches/Homebrew/tree-1.7.0.el_capitan.bottle.1.tar.gz
==> Pouring tree-1.7.0.el_capitan.bottle.1.tar.gz
🍺  /usr/local/Cellar/tree/1.7.0: 7 files, 112.4K

# 以下が動けばインストール成功
$ tree --version
tree v1.7.0 (c) 1996 - 2014 by Steve Baker, Thomas Moore, Francesc Rocher, Florian Sesser, Kyosuke Tokoro 

# 指定したディレクトリ以下を表示
tree ディレクトリ名

# 第2階層まで表示する
$ tree -L 2

# 指定したディレクトリ以下を、ディレクトリのみ、2階層目まで表示
tree -d -L 2 ディレクトリ名

```
