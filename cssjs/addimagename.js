$(function(){
	$('img').each(function(){
		//alt属性をキャプションとして画像の下に付ける
		var t = $(this);
		t.after('<p class="caption">▲：'+ t.attr('alt') + '</p>');
		//src属性からファイル名を取り出し、画像の上に括弧付きで表示
		var s = t.attr('src');
		if(s.indexOf('?')>=0){
			//トリミング用クラス
			t.before('<p>（'+ s.substring(0, s.lastIndexOf('?')) + '）</p>');
			if(s.indexOf('?clip=')>=0){
				imageClipping(t, s.substr(s.indexOf('=')+1));
			}
		} else {
			t.before('<p>（'+ s.substr(s.lastIndexOf('/')+1) + '）</p>');
		}
	});
	//prettyprint対応のclass指定（HTMLでprettyprintを読み込んで実行してください）
	$('code').each(function(){
		var c = $(this).attr('class');
		var p = $(this).parent('pre');
		p.addClass('prettyprint');
		p.addClass(c);
		//p.addClass('linenums')
	});
});

//クリッピング
function imageClipping(targ, qry){
	var param = qry.split('+');	//パラメータ分割
	var repelem = $('<div class="trimbase"></div>');	//置き換えるdiv要素
	var maxwidth = parseFloat(targ.css('max-width'));	//最大幅
	var contwidth = targ[0].naturalWidth;	//実画像サイズ(webkitのみ)
	var zoom = 1;	//パラメータの拡大率
	var piczoom = 1;	//画像の拡大率（div要素の幅に対する倍率）

	//トリミング対象の幅がmax-widthを超える？
	if(parseFloat(param[2]) > maxwidth){
		// console.log(contwidth);
		// console.log(maxwidth);
		// console.log(param[2]);
		//max-width÷トリミング幅で各パラメータを調整
		zoom = maxwidth / param[2];
		param[0] *= zoom;
		param[1] *= zoom;
		param[2] *= zoom;
		param[3] *= zoom;
		// console.log(zoom);
		//画像の倍率を求める
		piczoom = (contwidth*zoom) / maxwidth;
	} else {
		//トリミング対象の幅がmax-width未満
		piczoom = contwidth / param[2];
	}

	repelem.css({
		backgroundImage: 'url(' + targ.attr('src') +')',
		'background-position': -param[0] + 'px ' + -param[1] + 'px',
		'background-size': piczoom * 100 + '%', 
		width: param[2], height: param[3],
		'background-repeat': 'no-repeat'
	});
	targ.replaceWith(repelem);
}