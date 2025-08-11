function CLanguageMenu() {
    var _oFade;
    var _oAudioToggle;
    var _oButFlagIT;
    var _oButFlagEN;
    var _oButFlagFR;
    var _oButFlagES;
    var _oButFlagGER;
    var _oButFlagPOR;
    
    var _pStartPosAudio;
    var _pStartPosFullscreen;
    var _pStartPosLogo;
    
    var _oSelLangText;
    var _oSelLangCont;
    var _oBg;
    var _oLogo;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    this._init = function () {
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(_oBg);
        
        var oSpriteLogoSmall=s_oSpriteLibrary.getSprite('logo_small');
        
        _pStartPosLogo = {x: CANVAS_WIDTH / 2 - 540 + PADDING, y: CANVAS_HEIGHT / 2 - 840 + PADDING};
        _oLogo = createBitmap(oSpriteLogoSmall);
        _oLogo.x = _pStartPosLogo.x;
        _oLogo.y = _pStartPosLogo.y;
        _oLogo.regX = oSpriteLogoSmall.width / 2;
        _oLogo.regY = oSpriteLogoSmall.height / 2;
        s_oStage.addChild(_oLogo);
        
        _oSelLangText = new createjs.Text(TEXT_SELECT_LANG, "bold " + 104 + "px " + PRIMARY_FONT, "#ff21fe");
        _oSelLangText.textAlign = "center";
        _oSelLangText.textBaseline = "alphabetic";
        _oSelLangText.x = CANVAS_WIDTH / 2;
        _oSelLangText.y = CANVAS_HEIGHT / 2 - 300;

        s_oStage.addChild(_oSelLangText);

        _oSelLangCont = new createjs.Text(TEXT_SELECT_LANG, "bold " + 104 + "px " + PRIMARY_FONT, "#ffffff");
        _oSelLangCont.textAlign = "center";
        _oSelLangCont.textBaseline = "alphabetic";
        _oSelLangCont.x = CANVAS_WIDTH / 2;
        _oSelLangCont.y = CANVAS_HEIGHT / 2 - 300;
        _oSelLangCont.outline = 4;

        s_oStage.addChild(_oSelLangCont);

        var oSpriteFlagIt = s_oSpriteLibrary.getSprite('but_flag_it');
        _oButFlagIT = new CGfxButton((CANVAS_WIDTH / 2 + 350), CANVAS_HEIGHT / 2 - 100, oSpriteFlagIt);
        _oButFlagIT.addEventListenerWithParams(ON_MOUSE_UP, this._onButPlayRelease, this, 2);
        _oButFlagIT.regX = 128;
        _oButFlagIT.regY = 90;

        var oSpriteFlagEn = s_oSpriteLibrary.getSprite('but_flag_en');
        _oButFlagEN = new CGfxButton((CANVAS_WIDTH / 2 - 350), CANVAS_HEIGHT / 2 - 100, oSpriteFlagEn);
        _oButFlagEN.addEventListenerWithParams(ON_MOUSE_UP, this._onButPlayRelease, this, 0);
        _oButFlagEN.regX = 128;
        _oButFlagEN.regY = 90;

        var oSpriteFlagfr = s_oSpriteLibrary.getSprite('but_flag_fr');
        _oButFlagFR = new CGfxButton((CANVAS_WIDTH / 2), CANVAS_HEIGHT / 2 - 100, oSpriteFlagfr);
        _oButFlagFR.addEventListenerWithParams(ON_MOUSE_UP, this._onButPlayRelease, this, 1);
        _oButFlagFR.regX = 128;
        _oButFlagFR.regY = 90;

        var oSpriteFlagEs = s_oSpriteLibrary.getSprite('but_flag_es');
        _oButFlagES = new CGfxButton((CANVAS_WIDTH / 2 + 350), CANVAS_HEIGHT / 2 + 150, oSpriteFlagEs);
        _oButFlagES.addEventListenerWithParams(ON_MOUSE_UP, this._onButPlayRelease, this, 3);
        _oButFlagES.regX = 128;
        _oButFlagES.regY = 90;

        var oSpriteFlagGer = s_oSpriteLibrary.getSprite('but_flag_ger');
        _oButFlagGER = new CGfxButton((CANVAS_WIDTH / 2 - 350), CANVAS_HEIGHT / 2 + 150, oSpriteFlagGer);
        _oButFlagGER.addEventListenerWithParams(ON_MOUSE_UP, this._onButPlayRelease, this, 4);
        _oButFlagGER.regX = 128;
        _oButFlagGER.regY = 90;

        var oSpriteFlagPor = s_oSpriteLibrary.getSprite('but_flag_por');
        _oButFlagPOR = new CGfxButton((CANVAS_WIDTH / 2), CANVAS_HEIGHT / 2 + 150, oSpriteFlagPor);
        _oButFlagPOR.addEventListenerWithParams(ON_MOUSE_UP, this._onButPlayRelease, this, 5);
        _oButFlagPOR.regX = 128;
        _oButFlagPOR.regY = 90;
        
        var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height / 2) - PADDING, y: (oSprite.height / 2) + PADDING};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            
            _pStartPosFullscreen = {x:_pStartPosAudio.x - oSprite.width/2 - 10,y:_pStartPosAudio.y};
        }else{
            _pStartPosFullscreen = {x: CANVAS_WIDTH - (oSprite.height / 2) - PADDING, y: (oSprite.height / 2) + PADDING};
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
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({alpha: 0}, 1000).call(function () {
            s_oStage.removeChild(_oFade);
            _oFade = null;
        });
        
        if (s_bMobile === false) {
            _oAudioToggle.setCursorType("pointer");
            _oButFlagEN.setCursorType("pointer");
            _oButFlagES.setCursorType("pointer");
            _oButFlagFR.setCursorType("pointer");
            _oButFlagGER.setCursorType("pointer");
            _oButFlagIT.setCursorType("pointer");
            _oButFlagPOR.setCursorType("pointer");
        }
        
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);

    };

    this.unload = function () {
        _oButFlagIT.unload();
        _oButFlagIT = null;
        _oButFlagEN.unload();
        _oButFlagEN = null;
        _oButFlagFR.unload();
        _oButFlagFR = null;
        _oButFlagES.unload();
        _oButFlagES = null;
        _oButFlagGER.unload();
        _oButFlagGER = null;
        _oButFlagPOR.unload();
        _oButFlagPOR = null;

        s_oStage.removeChild(_oSelLangCont,_oSelLangText, _oLogo);
        
        _oSelLangCont = null;
        _oSelLangText = null;   
        _oLogo = null;
        
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.unload();
        }
        
        s_oLanguageMenu = null;
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
                _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }
        
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x - iNewX,_pStartPosFullscreen.y + iNewY);
        }
        
        _oLogo.x=_pStartPosLogo.x + iNewX;
        _oLogo.y=_pStartPosLogo.y + iNewY;
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    this._onButPlayRelease = function (_iLang) {
        this.unload();

        $(s_oMain).trigger("start_session");
        s_oMain.gotoGame(_iLang);
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
    
    s_oLanguageMenu = this;

    this._init();
}

var s_oLanguageMenu = null;



