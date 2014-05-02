MarkDownImageTrim
=================

Markdown原稿中のイメージのトリミング指定をする

#何もの？

Markdownで原稿を書いていて、元画像そのものはトリミングしたくない、でもDTPオペレータ向けに大まかなトリミング指示はしたい……というときに使うスクリプトです。画像表示に使う`![alt](image.png)`にちょっと追記してやるだけで、書き出したHTML上でトリミングされます。

適宜LiveReloadなどと組み合わせて使ってください。

ちょっと不具合があります（後述）。

#使い方

Markdownの先頭でスクリプトとCSSを読み込みます。
```
<script src="../cssjs/jquery-2.0.3.min.js"></script>
<script src="../cssjs/addimagename.js"></script>
<link rel="stylesheet" href="../cssjs/myrule.css"> 

```

以下のように画像を読み込むと……
```
![キャプションなし](docimg/c03-01-06.png)

```
そのまま表示されます。一応文章で上にトリミング指示を書いていますがわかりにくいですね。

![クリッピング前](img/marktrim-1.png)

画像ファイル名の後にクエリ文字列風の「`?clip=0+0+600+300`」という文字列を足してやります。
```
![キャプションなし](docimg/c03-01-06.png?clip=0+0+600+300)

```
はい、トリミングされました。

![クリッピング後](img/marktrim-1.png)


#しくみ
ファイル名の後に`?clip= x + y + width + height`という具合に、トリミングの左上座標と幅、高さを指定すると、img要素をbackground-image付きのdiv要素に置き換えます。

CSSでimg要素にｍax-widthを設定しており、その幅は超えないように縮小します。


#注意
x1が0のときは正しく動作しますが、x1を0以上にする（左側をトリミングする）と、指定した数値と結果が合わなくなります。

addimagename.jsの中でゴチャゴチャと拡大／縮小しているのですが、
background-sizeとbackground-positionを組み合わせたときの状況を考慮していないので
倍率計算がおかしくなっています。
