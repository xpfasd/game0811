function CInterface(iMoney) {
    var _oBg;
    var _oAudioToggle;
    var _oButExit;
    var _oHelpPanel;
    var _oLevelText;
    var _oLevelCont;
    var _oLevelBg;
    var _oLevelContainer;
    var _oMoneyDisplay;
    var _pStartPosExit;
    
    var _pStartPosAudio;
    var _pStartPosLogo;
    var _pStartPosFullscreen;
    
    var _oTimeDisplay;
    var _iCount;
    var _bStoppedTime;
    var _oMoneyText;
    var _oTimeText;
    var _oLevelText;
    var _oShadowImg;
    var _oHelpText;
    var _oHelpCont;
    var _oLogo;
    var _oButNext;
    var _oButAddALetter;
    var _oButDelSomeLetters;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    this._init = function () {
        var oExitX;

        _iCount = TIME_FOR_EVERY_WORD;

        _bStoppedTime = true;

        var oSpriteLogoSmall = s_oSpriteLibrary.getSprite('logo_small');
        _pStartPosLogo = {x: CANVAS_WIDTH / 2 - 540 + PADDING, y: CANVAS_HEIGHT / 2 - 840 + PADDING};
        _oLogo = createBitmap(oSpriteLogoSmall);
        _oLogo.x = _pStartPosLogo.x;
        _oLogo.y = _pStartPosLogo.y;
        _oLogo.regX = oSpriteLogoSmall.width / 2;
        _oLogo.regY = oSpriteLogoSmall.height / 2;
        s_oStage.addChild(_oLogo);

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height / 2) - PADDING, y: (oSprite.height / 2) + PADDING};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, true);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        oExitX = CANVAS_WIDTH - (oSprite.width / 2) - 10;
        
	
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _pStartPosAudio = {x: oExitX - 165 - PADDING, y: (oSprite.height / 2) + PADDING};
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
			
            _pStartPosFullscreen = {x:_pStartPosAudio.x - oSprite.width/2 - 10,y:_pStartPosAudio.y};
        }else{
            _pStartPosFullscreen = {x: oExitX - 165 - PADDING, y: (oSprite.height / 2) + PADDING};
        }
		
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        var oSpriteShadow = s_oSpriteLibrary.getSprite('shadow');
        _oShadowImg = createBitmap(oSpriteShadow);
        _oShadowImg.x = CANVAS_WIDTH / 2
        _oShadowImg.y = CANVAS_HEIGHT / 2 + GAME_ELEMENT_HEIGHT + 50;
        _oShadowImg.regX = oSpriteShadow.width / 2;
        _oShadowImg.regY = oSpriteShadow.height / 2;

        s_oStage.addChild(_oShadowImg);

        _oLevelText = new createjs.Text(TEXT_LEVEL+"/n1", "bold " + 60 + "px " + PRIMARY_FONT, "#ff21fe");
        _oLevelText.textAlign = "center";
        _oLevelText.textBaseline = "alphabetic";
        _oLevelText.y = -15;

        _oLevelCont = new createjs.Text(TEXT_LEVEL+"/n1", "bold " + 60 + "px " + PRIMARY_FONT, "#ffffff");
        _oLevelCont.textAlign = "center";
        _oLevelCont.textBaseline = "alphabetic";
        _oLevelCont.outline = 6;
        _oLevelCont.y = -15;

        var oSpriteLPanel = s_oSpriteLibrary.getSprite('level_panel');

        _oLevelBg = createBitmap(oSpriteLPanel);
        _oLevelBg.regX = oSpriteLPanel.width / 2;
        _oLevelBg.regY = oSpriteLPanel.height / 2;

        _oLevelContainer = new createjs.Container();
        _oLevelContainer.x = CANVAS_WIDTH / 2;
        _oLevelContainer.y = CANVAS_HEIGHT / 2 + GAME_ELEMENT_HEIGHT - 370;
        _oLevelContainer.addChild(_oLevelBg, _oLevelCont, _oLevelText);

        s_oStage.addChild(_oLevelContainer);

        var oSpritePanel = s_oSpriteLibrary.getSprite('money_panel');

        _oMoneyDisplay = new CText(CANVAS_WIDTH / 2 - 300, CANVAS_HEIGHT / 2 + GAME_ELEMENT_HEIGHT - 340, oSpritePanel, iMoney + TEXT_PT, PRIMARY_FONT, "#ffffff", 66, -10);

        s_oStage.addChild(_oMoneyText);

        if (BONUS_TIME === true) {
            _oTimeDisplay = new CText(CANVAS_WIDTH / 2 + 300, CANVAS_HEIGHT / 2 + GAME_ELEMENT_HEIGHT - 340, oSpritePanel, _iCount + "s", PRIMARY_FONT, "#ffffff", 66, -10);
            s_oStage.addChild(_oTimeText);
        }
        else
        {
            _iCount = 0;
        }
        this.helpPanel();

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);

        if (s_bMobile === false) {
            _oButExit.setCursorType("pointer");
            _oAudioToggle.setCursorType("pointer");
        }

    };

    this.helpPanel = function () {
        var oSpriteMsgBox = s_oSpriteLibrary.getSprite("bg_gameover");

        _oHelpPanel = createBitmap(oSpriteMsgBox);

        _oHelpPanel.addEventListener("click", function () {
        });
        s_oStage.addChild(_oHelpPanel);

        _oHelpText = new createjs.Text(TEXT_HELP, "bold " + 70 + "px " + PRIMARY_FONT, "#ff21fe");
        _oHelpText.textAlign = "left";
        _oHelpText.textBaseline = "alphabetic";
        _oHelpText.lineWidth = 600;
        _oHelpText.x = CANVAS_WIDTH / 2 - 260;
        _oHelpText.y = CANVAS_HEIGHT / 2 - 150;

        s_oStage.addChild(_oHelpText);

        _oHelpCont = new createjs.Text(TEXT_HELP, "bold " + 70 + "px " + PRIMARY_FONT, "#ffffff");
        _oHelpCont.textAlign = "left";
        _oHelpCont.textBaseline = "alphabetic";
        _oHelpCont.lineWidth = 600;
        _oHelpCont.x = CANVAS_WIDTH / 2 - 260;
        _oHelpCont.y = CANVAS_HEIGHT / 2 - 150;
        _oHelpCont.outline = 3;

        s_oStage.addChild(_oHelpCont);

        var _oSpriteNext = s_oSpriteLibrary.getSprite('but_next');
        _oButNext = new CGfxButton(CANVAS_WIDTH / 2 + 460, CANVAS_HEIGHT / 2, _oSpriteNext);
        _oButNext.addEventListener(ON_MOUSE_UP, this._onNextHelp2, this);
        if (s_bMobile == false) {
            _oButNext.setCursorType("pointer");
        }
    };

    this._onNextHelp2 = function () {
        _oButNext.unload();
        _oButNext = null;
        this.helpPanel2();
    };

    this.helpPanel2 = function () {
        var _oSpriteNext = s_oSpriteLibrary.getSprite('but_next');
        _oButNext = new CGfxButton(CANVAS_WIDTH / 2 + 460, CANVAS_HEIGHT / 2 , _oSpriteNext);
        _oButNext.addEventListener(ON_MOUSE_UP, this._onStartGame, this);
        if (s_bMobile == false) {
            _oButNext.setCursorType("pointer");
        }

        var _oSpriteDSL = s_oSpriteLibrary.getSprite('but_remove_letters');

        _oButDelSomeLetters = createBitmap(_oSpriteDSL);
        _oButDelSomeLetters.x = CANVAS_WIDTH / 2 - 340;
        _oButDelSomeLetters.y = CANVAS_HEIGHT / 2 + 240;
        _oButDelSomeLetters.regX = _oSpriteDSL.width / 2;
        _oButDelSomeLetters.regY = _oSpriteDSL.height / 2;

        s_oStage.addChild(_oButDelSomeLetters);

        var _oSpriteAAL = s_oSpriteLibrary.getSprite('but_add_a_letter');

        _oButAddALetter = createBitmap(_oSpriteAAL);
        _oButAddALetter.x = CANVAS_WIDTH / 2 - 340;
        _oButAddALetter.y = CANVAS_HEIGHT / 2 - 145;
        _oButAddALetter.regX = _oSpriteAAL.width / 2;
        _oButAddALetter.regY = _oSpriteAAL.height / 2;

        s_oStage.addChild(_oButAddALetter);

        _oHelpText.text = TEXT_HELP2 + COST_FOR_REMOVE_LETTERS + TEXT_PT + "." + TEXT_HELP3 + COST_OF_A_LETTER + TEXT_PT+".";
        _oHelpText.x = CANVAS_WIDTH / 2 -190;
        _oHelpText.y = CANVAS_HEIGHT / 2 - 230;

        _oHelpCont.text = TEXT_HELP2 + COST_FOR_REMOVE_LETTERS + TEXT_PT + "." + TEXT_HELP3 + COST_OF_A_LETTER + TEXT_PT+".";
        _oHelpCont.x = CANVAS_WIDTH / 2 -190;
        _oHelpCont.y = CANVAS_HEIGHT / 2 - 230;
    };
    
    this._onStartGame = function () {
        s_oStage.removeChild(_oHelpCont, _oHelpText, _oHelpPanel, _oButAddALetter, _oButDelSomeLetters);
        _oButNext.unload();
        _oButNext = null;
        _oHelpCont = null;
        _oHelpPanel = null;
        _oHelpText = null;
        _bStoppedTime = false;
        _oButAddALetter = null;
        _oButDelSomeLetters = null;
        
        PokiSDK.gameplayStart();
    };

    this.unload = function () {

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.unload();
        }
        
        s_oStage.removeChild(_oShadowImg);
        _oShadowImg = null;

        _oButExit.unload();
        _oButExit = null;
        s_oStage.removeChild(_oLevelContainer);
        _oLevelContainer = null;

        s_oStage.removeChild(_oLevelText);
        _oLevelText = null;

        _oMoneyDisplay.unload();
        _oMoneyDisplay = null;

        s_oStage.removeChild(_oMoneyText);
        _oMoneyText = null;

        s_oStage.removeChild(_oTimeText);
        _oTimeText = null;

        _oTimeDisplay.unload();
        _oTimeDisplay = null;

        s_oStage.removeChild(_oBg);
        _oBg = null;

        if (_oHelpPanel !== null) {
            _oHelpPanel.unload();
        }

        s_oInterface = null;
    };

    this.addedMoneyAnim = function (iEarnedMoney, iTime, szColor) {
        var oAddedMoneyText;
        var oAddedMoneyCont;
        var oContainerAdd;
        if (iEarnedMoney > 0) {
            oAddedMoneyText = new createjs.Text("+" + iEarnedMoney, "bold " + 66 + "px " + PRIMARY_FONT, szColor);
            oAddedMoneyCont = new createjs.Text("+" + iEarnedMoney, "bold " + 66 + "px " + PRIMARY_FONT, "#ffffff");
        }
        else {
            oAddedMoneyText = new createjs.Text(iEarnedMoney, "bold " + 66 + "px " + PRIMARY_FONT, szColor);
            oAddedMoneyCont = new createjs.Text(iEarnedMoney, "bold " + 66 + "px " + PRIMARY_FONT, "#ffffff");
        }
        oAddedMoneyText.textAlign = "center";
        oAddedMoneyText.textBaseline = "alphabetic";
        
        oAddedMoneyCont.textAlign = "center";
        oAddedMoneyCont.textBaseline = "alphabetic";
        oAddedMoneyCont.outline = 4;
        
        oContainerAdd= new createjs.Container();
        oContainerAdd.x = CANVAS_WIDTH / 2 - 150;
        oContainerAdd.y = CANVAS_HEIGHT / 2 + GAME_ELEMENT_HEIGHT - 330;
        oContainerAdd.addChild(oAddedMoneyText,oAddedMoneyCont);
        
        s_oStage.addChild(oContainerAdd);
        
        createjs.Tween.get(oContainerAdd).to({y: CANVAS_HEIGHT / 2 - 500}, iTime);
        createjs.Tween.get(oContainerAdd).to({alpha: 0}, iTime).call(function () {
            s_oStage.removeChild(oContainerAdd);
            oContainerAdd = null;
        });
    };

    this.setStoppedTime = function (bVal) {
        _bStoppedTime = bVal;
    };

    this.resetCounter = function () {
        _iCount = TIME_FOR_EVERY_WORD;
        _oTimeDisplay.setText(_iCount + "s");
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oButExit.setPosition(_pStartPosExit.x - iNewX, iNewY + _pStartPosExit.y);

        _oLogo.x = _pStartPosLogo.x + iNewX;
        _oLogo.y = _pStartPosLogo.y + iNewY;

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }

        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x - iNewX,_pStartPosFullscreen.y + iNewY);
        }
    };

    this.refreshMoney = function (iTotMoney) {
        _oMoneyDisplay.setText(iTotMoney + "PT");
    };

    this.refreshNuMLevel = function (iLevel) {
        var iLevelText = iLevel + 1;
        _oLevelText.text = TEXT_LEVEL+"\n" + iLevelText;
        _oLevelCont.text = TEXT_LEVEL+"\n" + iLevelText;
    };

    this.getCount = function () {
        return Math.round(_iCount);
    };

    this.update = function () {
        if (_iCount > 0 && _bStoppedTime === false) {
            var iFPS = createjs.Ticker.framerate;
            _iCount -= 1 / iFPS;
            _oTimeDisplay.setText(Math.round(_iCount) + "s");
        }
    };

    this._onExit = function () {
        if(!s_oGame.isSuccess()){
            PokiSDK.gameplayStop();
        }


        s_oGame.onExit();
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this.resetFullscreenBut = function(){
	if (_fRequestFullScreen && screenfull.enabled){
		_oButFullscreen.setActive(s_bFullscreen);
	}
    };

    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };
    
    s_oInterface = this;

    this._init();

    return this;
}

var s_oInterface = null;