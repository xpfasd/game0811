function CGameOver(iMoney) {
    var _oButToMenu;
    var _oFade;
    var _oMoneyDisplay;
    var _oAudioToggle;
    var _pStartPosAudio;
    var _oTextGameOver;
    var _oTextGameOverCont;
    var _oTextScore;
    var _oTextScoreCont;
    var _oGameOver;
    var _oBg;

    this._init = function () {
        var oAudioX;

        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(_oBg);
        
        $(s_oMain).trigger("save_score", s_oGame.getMoney());
        
        var _oGameOver = createBitmap(s_oSpriteLibrary.getSprite('bg_gameover'));
        s_oStage.addChild(_oGameOver); //Draws on canvas

        var oSpriteMoney = s_oSpriteLibrary.getSprite('money_panel');
        _oMoneyDisplay = new CTextButton(CANVAS_WIDTH / 2 + 200, CANVAS_HEIGHT / 2, oSpriteMoney, iMoney, PRIMARY_FONT, "#ffffff", 50, -8,s_oStage);
        _oMoneyDisplay.block(true);
        _oMoneyDisplay.setScale(1);

        var oSpriteGameOver = s_oSpriteLibrary.getSprite('but_menu');
        _oButToMenu = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 270, oSpriteGameOver);
        _oButToMenu.addEventListener(ON_MOUSE_UP, this._onButToMenuRelease, this);

        _oTextGameOver = new createjs.Text(TEXT_GAMEOVER, "bold " + 136 + "px " + PRIMARY_FONT, "#ff21fe");
        _oTextGameOver.textAlign = "center";
        _oTextGameOver.textBaseline = "alphabetic";
        _oTextGameOver.x = CANVAS_WIDTH / 2;
        _oTextGameOver.y = CANVAS_HEIGHT / 2 - 170;

        s_oStage.addChild(_oTextGameOver);

        _oTextGameOverCont = new createjs.Text(TEXT_GAMEOVER, "bold " + 136 + "px " + PRIMARY_FONT, "#ffffff");
        _oTextGameOverCont.textAlign = "center";
        _oTextGameOverCont.textBaseline = "alphabetic";
        _oTextGameOverCont.x = CANVAS_WIDTH / 2;
        _oTextGameOverCont.y = CANVAS_HEIGHT / 2 - 170;
        _oTextGameOverCont.outline = 4;

        s_oStage.addChild(_oTextGameOverCont);

        var pTextScore = {x: CANVAS_WIDTH / 2 - 180, y: CANVAS_HEIGHT / 2 +25};

        _oTextScore = new createjs.Text(TEXT_SCORE, "bold " + 96 + "px " + PRIMARY_FONT, "#ff21fe");
        _oTextScore.textAlign = "center";
        _oTextScore.textBaseline = "alphabetic";
        _oTextScore.x = pTextScore.x;
        _oTextScore.y = pTextScore.y;
        
        s_oStage.addChild(_oTextScore);

        _oTextScoreCont = new createjs.Text(TEXT_SCORE, "bold " + 96 + "px " + PRIMARY_FONT, "#ffffff");
        _oTextScoreCont.textAlign = "center";
        _oTextScoreCont.textBaseline = "alphabetic";
        _oTextScoreCont.x = pTextScore.x;
        _oTextScoreCont.y = pTextScore.y;
        _oTextScoreCont.outline = 4;

        s_oStage.addChild(_oTextScoreCont);


        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            oAudioX = CANVAS_WIDTH - (oSprite.width / 2) - 100;
            _pStartPosAudio = {x: oAudioX - 15, y: (oSprite.height / 2) + 110};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);
        createjs.Tween.get(_oFade).to({alpha: 0}, 1000).call(function () {
            _oFade.visible = false;
        });
    };

    this.unload = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        _oMoneyDisplay.unload();
        _oMoneyDisplay = null;

        _oButToMenu.unload();
        _oButToMenu = null;

        s_oStage.removeChild(_oGameOver, _oBg, _oTextGameOverCont, _oTextGameOverCont, _oTextScore, _oTextScoreCont);
        _oGameOver = null;
        _oBg = null;
        _oTextGameOver = null;
        _oTextGameOverCont = null;
        _oTextScore = null;
        _oTextScoreCont = null;
        
        s_oGameOver = null;
    };

    this._onButToMenuRelease = function () {
        $(s_oMain).trigger("show_interlevel_ad");
        this.unload();

        
        s_oMain.gotoMenu();
    };

    s_oGameOver = this;
    this._init();
}

var s_oGameOver;

