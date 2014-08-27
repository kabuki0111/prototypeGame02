//カメラの前に板を立てて、一定時間視界を遮るスクリプト
//フェード用のゲームオブジェクトに付加して使用する

//最適化の為の定義(負荷の軽減に役立つが、スクリプトの文法チェックが厳しくなる)
#pragma strict

//プロパティ
var time : float = 4;   //フェードに要する時間
var color0 : Color = Color.clear;   //視界を遮る板の初期色(透明)
var ColorPropertyName : String = "_TintColor";  //色に関するシェーダーのプロパティ

//Update関数がはじめて実行される前に一度だけ呼ばれる
//このゲームオブジェクトが使用されるまでの間、不活性化する
function Start(){
    gameObject.active = false;  //ゲームオブジェクトを不活性化する
}

//板のフェードイン、フェードアウトを開始する(この関数は他のスクリプトから呼ばれる)
//引数のfadeColorはフェードインしたときの色(通常は黒)。messageReceiverは、
//フェードイン・フェードアウトしたときにメッセージを通知するゲームオブジェクト
function StartFade( fadeColor : Color, messageReceiver : GameObject )
{
    gameObject.active = true;   //ゲームオブジェクトを活性化する
    
    //フェードの関数(コルーチン)を(再)開始する
    StopCoroutine("Fade");
    StartCoroutine(Fade( fadeColor, messageReceiver));
}

//板のフェードイン・フェードアウトを実行する関数(コルーチン)
//引数のfadeColorはフェードインしたときの色(通常は黒)。messageReceiverは、
//フェードイン・フェードアウトしたときにメッセージを通知するゲームオブジェクト
private function Fade( color1 : Color, messageReceiver : GameObject )
{
    var mat : Material = renderer.material; //マテリアルの参照を代入

    //
    //フェードイン
    //
    var nTime : float = 1 / time;   //経過率(1で100%)で計算するための係数を算出する
    var t : float = 0;  //時間の経過率。経過時間が経ったら1になる
    var color :Color;   //色の変更で使用する変数
    
    //フェードの時間が経つまで毎フレーム繰り返す
    while (t <= 1.0)
    {
        color = Color.Lerp(color0, color1, t);  //経過辺りの現在の色を計算する。Color.Lerp関数は、時間に対応する引数(t)が0以下でColor0に該当する色、1以上でColor1に該当する色を返す。0~1の間の色も計算される。
        mat.SetColor(ColorPropertyName, color); //マテリアルの色を変更

        t += nTime * Time.deltaTime;    //経過時間と係数を掛け合わせて、経過率を加える

        yield;
    }

    //メッセージを通知するゲームオブジェクトが指定されている場合にFadein関数を実行する
    if (messageReceiver)
    {
        messageReceiver.SendMessage("Fadein", SendMessageOptions.DontRequireReceiver );
    }

    //
    //フェードアウト
    //
    t = 0;  //経過率をリセット
    
    //フェードの時間が経つまで毎フレーム繰り返す。
    while (t <= 1.0)
    {
        color = Color.Lerp(color1, color0, t);  //経過辺りの現在の色を計算する。Color.Lerp関数は、時間に対応する引数(t)が0以下でColor1に該当する色、1以上でColor0に該当する色を返す。0~1の間の色も計算される。
        mat.SetColor(ColorPropertyName, color);  //マテリアルの色を変更

        t += nTime * Time.deltaTime;    //経過時間と係数を掛け合わせて、経過率を加える

        yield;
    }

    //メッセージを通知するゲームオブジェクトが指定されている場合にFadeout関数を実行する
    if (messageReceiver)
    {
        messageReceiver.SendMessage("Fadeout", SendMessageOptions.DontRequireReceiver );    //ゲームオブジェクトにFadeoutメッセージを通知する(ゲームオブジェクトに付加されているスクリプト コンポーネントのFadeout
    }
    
    gameObject.active = false;  //ゲームオブジェクトを不活性化
}
