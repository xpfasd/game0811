function CModeMenu(){
    var _oBg;
    var _oContainerEasy;
    var _oContainerNormal;
    var _oContainerHard;
    var _oTextEasy;
    var _oButEasy;
    var _oTextMedium;
    var _oButMedium;
    var _oTextHard;
    var _oButHard;
    var _oTextTop;
    
    var _oParent;
    
    var _oFade;
    var _oAudioToggle;
    
    this._init = function(){
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_mode_menu'));
        s_oStage.addChild(_oBg);
       
        _oTextTop = new createjs.Text(TEXT_TOP_MODE," 100px "+SECONDARY_FONT, "#ffffff");
        _oTextTop.x = CANVAS_WIDTH/2;
        _oTextTop.y = 200;
        _oTextTop.textAlign = "center";
        _oTextTop.lineWidth = 800;
        s_oStage.addChild(_oTextTop);
       
       
        var oTablePos = {x: CANVAS_WIDTH/2, y: 300};
       
        _oContainerEasy = new createjs.Container();
        _oContainerEasy.x = oTablePos.x;
        _oContainerEasy.y = oTablePos.y + 120;
        
        _oContainerNormal = new createjs.Container();
        _oContainerNormal.x = oTablePos.x;
        _oContainerNormal.y = oTablePos.y+550;
        
        _oContainerHard = new createjs.Container();
        _oContainerHard.x = oTablePos.x;
        _oContainerHard.y = oTablePos.y +980;
        
        _oTextEasy = new createjs.Text(TEXT_EASY," 50px "+SECONDARY_FONT, "#ffffff");
	_oTextEasy.textBaseline = "alphabetic";
        _oTextEasy.textAlign = "center";
        _oTextEasy.lineWidth = 400;
        _oContainerEasy.addChild(_oTextEasy);

        var oSprite = s_oSpriteLibrary.getSprite('mod_easy_icon');
        _oButEasy = new CGfxButton(0, 160,oSprite, _oContainerEasy);
        _oButEasy.addEventListener(ON_MOUSE_UP, this._selectEasy, this);
        
        _oTextMedium = new createjs.Text(TEXT_MEDIUM," 50px "+SECONDARY_FONT, "#ffffff");
        _oTextMedium.textBaseline = "alphabetic";
        _oTextMedium.textAlign = "center";
        _oTextMedium.lineWidth = 400;
        _oContainerNormal.addChild(_oTextMedium);
     
        var oSprite = s_oSpriteLibrary.getSprite('mod_medium_icon');
        _oButMedium = new CGfxButton(0, 160,oSprite, _oContainerNormal);
        _oButMedium.addEventListener(ON_MOUSE_UP, this._selectMedium, this);
        
        _oTextHard = new createjs.Text(TEXT_HARD," 50px "+SECONDARY_FONT, "#ffffff");
        _oTextHard.textBaseline = "alphabetic";
        _oTextHard.textAlign = "center";
        _oTextHard.lineWidth = 400;
        _oContainerHard.addChild(_oTextHard);
        
        var oSprite = s_oSpriteLibrary.getSprite('mod_hard_icon');
        _oButHard = new CGfxButton(0, 160,oSprite, _oContainerHard);
        _oButHard.addEventListener(ON_MOUSE_UP, this._selectHard, this);
        
        s_oStage.addChild(_oContainerEasy, _oContainerNormal, _oContainerHard);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 400).call(function(){_oFade.visible = false;});
           
    };

    
    this._selectEasy = function(){
        _oParent.unload();
        $(s_oMain).trigger("start_level",1);
        s_oMain.gotoGame(0);
    };
    
    
    this._selectMedium = function(){
        _oParent.unload();
        $(s_oMain).trigger("start_level",1);
        s_oMain.gotoGame(1);
    };

    this._selectHard = function(){
        _oParent.unload();      
        $(s_oMain).trigger("start_level",1);
        s_oMain.gotoGame(2);
    };
    
    this.unload = function(){
        s_oStage.removeAllChildren();
        _oBg = null;
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    _oParent=this;
    this._init();
}