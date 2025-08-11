function CCreditsPanel(){
    
    var _oFade;
    var _oPanelContainer;
    var _oButExit;
    var _oLogo;
    
    var _pStartPanelPos;
    
    this._init = function(){

        _oPanelContainer = new createjs.Container();        
        s_oStage.addChild(_oPanelContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('credit_bg');
        var oPanel = createBitmap(oSprite);        
        oPanel.regX = oSprite.width/2;
        oPanel.regY = oSprite.height/2;
        oPanel.on("mousedown", function(){});
        _oPanelContainer.addChild(oPanel);
        
        _oPanelContainer.x = CANVAS_WIDTH/2;
        _oPanelContainer.y = CANVAS_HEIGHT/2;  
        _pStartPanelPos = {x: _oPanelContainer.x, y: _oPanelContainer.y};
        
        var oTitleStroke = new createjs.Text(TEXT_DEVELOPED," 80px "+PRIMARY_FONT, "#ffffff");
        oTitleStroke.y = -140;
        oTitleStroke.textAlign = "center";
        oTitleStroke.textBaseline = "middle";
        oTitleStroke.lineWidth = 600;
        oTitleStroke.outline = 5;

        var oTitle = new createjs.Text(TEXT_DEVELOPED," 80px "+PRIMARY_FONT, "#ffffff");
        oTitle.y = oTitleStroke.y
        oTitle.textAlign = "center";
        oTitle.textBaseline = "middle";
        oTitle.lineWidth = 600;
        _oPanelContainer.addChild(oTitle);
        
        var oLinkStroke = new createjs.Text("www.codethislab.com"," 80px "+PRIMARY_FONT, "#ffffff");
        oLinkStroke.y = 150;
        oLinkStroke.textAlign = "center";
        oLinkStroke.textBaseline = "middle";
        oLinkStroke.lineWidth = 600;
        oLinkStroke.outline = 5;

        var oLink = new createjs.Text("www.codethislab.com"," 80px "+PRIMARY_FONT, "#ffffff");
        oLink.y = oLinkStroke.y;
        oLink.textAlign = "center";
        oLink.textBaseline = "middle";
        oLink.lineWidth = 600;
        _oPanelContainer.addChild(oLink);
        
        var oSprite = s_oSpriteLibrary.getSprite('ctl_logo');
        _oLogo = createBitmap(oSprite);
        _oLogo.on("mousedown",this._onLogoButRelease);
        _oLogo.regX = oSprite.width/2;
        _oLogo.regY = oSprite.height/2;
        _oPanelContainer.addChild(_oLogo);
      
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _oButExit = new CGfxButton(371, -184, oSprite, _oPanelContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this.unload, this);
        
    };
    
    this.unload = function(){

        s_oStage.removeChild(_oFade);
        s_oStage.removeChild(_oPanelContainer);

        _oButExit.unload();

        _oLogo.off("mousedown",this._onLogoButRelease);
        
        
    };
    
    this._onLogoButRelease = function(){
        //window.open("http://www.codethislab.com/index.php?&l=en");
    };

    
    this._init();
    
    
};


