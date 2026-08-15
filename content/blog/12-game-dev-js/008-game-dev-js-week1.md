---
title: "ゲーム制作JavaScript学習｜第1週 hello・calc・omikuji"
description: "JavaScriptが初めてでも、自分のPCでプログラムを書いてブラウザに出せるようになります。フォルダ作成から、こんにちは表示・税込計算・おみくじまで、Cursorの画面を見ながら3つ作ります。書き写して開くだけで、動いたかを自分の画面で確認できます。"
date: 2026-08-15
tags:
  - JavaScript
  - ゲーム制作
  - 初心者
  - Cursor
site: toolarc.jp
target: "この記事を見ながら、自分のPCでプログラムを書く人"
last_update: 2026-08-15
---

# ゲーム制作JavaScript学習｜第1週 hello・calc・omikuji

`week01` に、hello・calc・omikuji の3つを順に作ります。Cursor をまだインストールしていなければ、[公式のダウンロードページ](https://cursor.com/ja/download)から導入してください。ここから先は、Cursor 導入済みを前提とします。

## この記事で作るもの

| 名前    | ファイル                      | やること               |
| ------- | ----------------------------- | ---------------------- |
| hello   | `hello.html` / `hello.js`     | こんにちはを画面に表示 |
| calc    | `calc.html` / `calc.js`       | 税込金額を計算して表示 |
| omikuji | `omikuji.html` / `omikuji.js` | おみくじを引いて表示   |

1. [hello.html と hello.js](#1-hellohtml-と-hellojs) … こんにちはを画面に表示
2. [calc.html と calc.js](#2-calchtml-と-calcjs) … 税込金額を計算して表示
3. [omikuji.html と omikuji.js](#3-omikujihtml-と-omikujijs) … おみくじを引いて表示

## 1. hello.html と hello.js

> **画面に表示される**
>
> `こんにちは`

### ① 任意の場所にフォルダを作成する

![エクスプローラの C:\projects に js-game-toolarc がある画面](week01-01.png)

任意の場所に、これから開くフォルダを作ります。この記事の作業では `C:\projects\js-game-toolarc` です。

### ② Cursorの Open project で作成したフォルダを開く

![Cursorの起動画面で Open project を選ぶところ](week01-02.png)

`Open project` を選びます。

![Open project が無く、右上に IDE がある画面](week01-02-02.png)

`Open project` が出ず、この画面のときは、右上の `IDE` をクリックします。

![フォルダーを開くで js-game-toolarc を選ぶ画面](week01-03.png)

`Open project` で、作成した `js-game-toolarc` を選びます。

![Cursorに js-game-toolarc が開いた画面](week01-04.png)

赤枠の場所に、作成したフォルダ名（例: `js-game-toolarc`）が出ていれば開けています。

### ③ 1週目のプロジェクトフォルダを作成する

![新しいフォルダーから week01 を作る画面](week01-05.png)

`新しいフォルダー` を選び、名前を `week01` にします。`week1` ではありません。

![空白を右クリックして新しいフォルダーを作る画面](week01-05-02.png)

空白を右クリックして、新しいフォルダー `week01` を作っても構いません。

![左の一覧に week01 がある画面](week01-06.png)

左の一覧に `week01` が出ていればできています。

### ④ hello.html を作成する

![新しいファイルから hello.html を作る画面](week01-07.png)

`新しいファイル` を選び、ファイル名を `hello.html` にします。

![Cursorで hello.html を開いた画面](week01-08.png)

次のコードを、そのまま書き写します。このファイルはページの入れ物です。出したい文字は、ここには書きません。

ファイル: `hello.html`

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <title>こんにちは</title>
  </head>
  <body>
    <pre id="log"></pre>
    <script src="hello.js"></script>
  </body>
</html>
```

- `<title>` は、ブラウザのタブに出る名前です
- `<pre id="log">` は、文字を出す空の枠です。`id="log"` は、hello.js がこの枠を見つけるための名前です
- `<script src="hello.js">` は、同じフォルダの hello.js を読み込みます

### ⑤ hello.js を作成する

![Cursorで hello.js を開いた画面](week01-09.png)

新しいファイルで `hello.js` を作り、次のコードをそのまま書き写します。このファイルが、枠に文字を出します。

ファイル: `hello.js`

```javascript
const logEl = document.getElementById("log");

function log(message) {
  logEl.textContent += message + "\n";
}

log("こんにちは");
```

- 1行目は、html の `id="log"` の枠を探しています
- `function log` は、その枠に1行足す処理です
- 最後の `log("こんにちは")` が、画面に出る文字です

### ⑥ ブラウザで hello.html を開く

![hello.html と hello.js を保存した画面](week01-10.png)

`hello.html` と `hello.js` が保存されていることを確認します。ファイル名の横に白い丸が残っていたら、まだ保存できていません。

![Chromeで hello.html を開き、こんにちはが出た画面](week01-11.png)

エクスプローラで `hello.html` をダブルクリックします。開くのは HTML です。`hello.js` は開きません。ページに「こんにちは」と出れば成功です。

### ⑦ さらにもう一歩（タイトル名と画面に表示する文字を変える）

![hello.html の title を変えた画面](week01-12.png)

`hello.html` の `<title>...</title>` の文字を、好きな文字に変えます。

![hello.js の log の文字を変えた画面](week01-12-02.png)

`hello.js` の `log(...);` の文字を、好きな文字に変えます。

![変更した文字がページに出た画面](week01-12-03.png)

`hello.html` と `hello.js` の両方を保存し、`hello.html` を開き直して、変えた文字が出るか確認します。

### うまくいかないとき

**ページが白い** : 保存していないか、ファイル名に引用符やバッククォートが付いて、HTML の `src` と違うことがあります。

**文字化け** : `<meta charset="UTF-8" />` が無いときです。

## 2. calc.html と calc.js

同じ `week01` に、`calc.html` と `calc.js` の2ファイルを作ります。

> **画面に表示される**
>
> `税込 1100 円`

### ① calc.html を書く

![Cursorで calc.html を開いた画面](week01-21.png)

同じ内容を、`week01\calc.html` に書きます。入れ物の形は hello.html と同じ。違うのは `title` と `script src` だけです。

ファイル: `calc.html`

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <title>税込計算</title>
  </head>
  <body>
    <pre id="log"></pre>
    <script src="calc.js"></script>
  </body>
</html>
```

### ② calc.js を書く

![Cursorで calc.js を開いた画面](week01-22.png)

同じ内容を、`week01\calc.js` に書きます。本体 1000 円に税率 0.1 をかけて、税込を表示します。

ファイル: `calc.js`

```javascript
const logEl = document.getElementById("log");

function log(message) {
  logEl.textContent += message + "\n";
}

const price = 1000;
const taxRate = 0.1;
const total = price * (1 + taxRate);
log("本体 " + price + " 円");
log("税率 " + taxRate);
log("税込 " + total + " 円");
```

- `price` は本体、`taxRate` は税率、`total` は税込です
- `log` は hello.js と同じ。枠に1行足す処理
- `log` の中の `+` は足し算ではありません。`"本体 "` と数字と `" 円"` を、1本の文字列につなぐ記号です

### ③ 保存してブラウザで calc.html を開く

![税込 1100 円が出た画面](week01-23.png)

`calc.html` と `calc.js` を保存します。エクスプローラで `calc.html` をダブルクリック。ページに「税込 1100 円」が出ていれば成功です。

![Cursorの拡張機能を開くところ](week01-25.png)

必須ではないですが、「拡張機能」から `Open in Browser` を検索して入れると、Cursor 上で動作確認できます。保存しただけで表示が更新される `Live Server` も入れると便利です。

## 3. omikuji.html と omikuji.js

同じ `week01` に、`omikuji.html` と `omikuji.js` の2ファイルを作ります。

> **画面に表示される**
>
> `おみくじ: 大吉`

### ① omikuji.html を書く

![Cursorで omikuji.html を開いた画面](week01-31.png)

同じ内容を、`week01\omikuji.html` に書きます。入れ物の形は hello.html と同じです。

ファイル: `omikuji.html`

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <title>おみくじ</title>
  </head>
  <body>
    <pre id="log"></pre>
    <script src="omikuji.js"></script>
  </body>
</html>
```

### ② omikuji.js を書く

![Cursorで omikuji.js を開いた画面](week01-32.png)

同じ内容を、`week01\omikuji.js` に書きます。配列は使いません。

ファイル: `omikuji.js`

```javascript
const logEl = document.getElementById("log");

function log(message) {
  logEl.textContent += message + "\n";
}

const n = Math.random();
let result;

if (n < 0.25) {
  result = "大吉";
} else if (n < 0.5) {
  result = "中吉";
} else if (n < 0.75) {
  result = "小吉";
} else {
  result = "凶";
}

log("おみくじ: " + result);
```

- `Math.random()` は、0 以上 1 未満の小数を1つ返します。実行するたびに値が変わります
- その値を `n` に入れ、`if` で大きさを見ます。0.25 未満なら大吉、0.5 未満なら中吉、0.75 未満なら小吉、それ以外は凶です
- `result` は、どの `if` に入るかで中身が決まる。先に空の箱を用意し、あとから入れ直すので `let` を使います。`const` は、入れたあとに変えられない

### ③ 保存してブラウザで omikuji.html を開く

![omikuji.html を開いた画面](week01-33.png)

`omikuji.html` と `omikuji.js` を保存します。エクスプローラで `omikuji.html` をダブルクリック。`Open in Browser` を入れているときは、`omikuji.html` を右クリックして `Open in Browser` を選ぶと、Cursor 上で確認できます。

![再読み込みでおみくじの表示が変わった画面](week01-33-2.png)

ブラウザを再読み込みすると、おみくじの文言が変わることがあります。`Math.random()` の値が、前回と同じ `if` の範囲に入ると、表示は同じままです。

### ④ さらにもう一歩（Math.random の値を画面に出す）

![omikuji.js に Math.random の log を足した画面](week01-34.png)

[1. hello.html と hello.js](#1-hellohtml-と-hellojs) と同じく、`log` で画面に出します。値はすでに `n` に入っているので、`log("おみくじ: " + result);` の次に次の1行を足します。

ファイル: `omikuji.js`

```javascript
log("Math.random(): " + n);
```

![ページに Math.random の値が出た画面](week01-34-02.png)

`Math.random()` の値が出れば成功です。その数と、大吉・中吉・小吉・凶の対応が合っているかを見てください。

## まとめ

この記事で作ったのは、hello・calc・omikujiの3つです。

画面に「こんにちは」が出る。税込 1100 円が計算される。再読み込みでおみくじの文言が変わる。ブラウザでそれが確認できていれば、最初のプログラムは動いています。

フォルダを開き、HTMLとJSを書き、保存して開く。次に作るものも、この手順の繰り返しです。

1か月目の進め方は、[ゲーム制作JavaScript学習｜1か月目のスケジュールと進め方](/blog/game-dev-schedule-month1)で確認できます。

---

本記事の画面と操作名は執筆時点（2026-08-15）の Cursor / ブラウザ表示に基づきます。仕様は変更される可能性があります。
