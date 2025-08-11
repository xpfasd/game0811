function CEndPanel(oSpriteBg, bNote, bSolve, bTime, iNumHint, iScore){
    
    var _iScore;
    
    var _aHelpUsed;
    var _aHelp;
    
    var _oBg;
    var _oGroup;    
    var _oMsgText;
    var _oHelpText;
    var _oScore;
    

    
    this._init = function(oSpriteBg, bNote, bSolve, bTime, iNumHint, iScore){
        
        _iScore = iScore;
        
        /// PROGRESSIVELY SCALE POINTS BASED ON HELPS USED
        if(iNumHint > 0){
            var iReductionFactor = Math.floor(TIME_BONUS_LIMIT[s_iDifficultyMode]/4000);
            
            _iScore -= iReductionFactor*iNumHint;
            if(_iScore <= 0){
                _iScore = 0;
            }
        }
        
        if(bNote){
            _iScore /= 2;
        }

        if(bSolve || bTime){
            _iScore = 0;
        }
        
        _aHelpUsed = new Array();
        if(bNote){
            _aHelpUsed.push(TEXT_HELP_NOTE+ " "+TEXT_INFO_NOTE);
        }
        if(bSolve){
            _aHelpUsed.push(TEXT_HELP_SOLVE + " "+TEXT_INFO_SOLVE);
        }
        if(bTime){
            _aHelpUsed.push(TEXT_HELP_TIME + " "+TEXT_INFO_SOLVE);
        }
        if(iNumHint > 0){
            
            if(iNumHint > 1){
                _aHelpUsed.push(iNumHint+ TEXT_HELP_HINTS + " (-"+iReductionFactor+" " + TEXT_INFO_HINT);
            } else {
                _aHelpUsed.push(iNumHint+ TEXT_HELP_HINT + " (-"+iReductionFactor+" " + TEXT_INFO_HINT);
            }
        }
        
        _oBg = createBitmap(oSpriteBg);
        _oBg.x = 0;
        _oBg.y = 0;

        _oMsgText = new createjs.Text(""," 80px "+SECONDARY_FONT, "#fff");
        _oMsgText.x = CANVAS_WIDTH/2;
        _oMsgText.y = (CANVAS_HEIGHT/2)-462;
        _oMsgText.textAlign = "center";
        _oMsgText.textBaseline = "alphabetic";
        _oMsgText.lineWidth = 700;
        
        _oHelpText = new createjs.Text("","bold 40px "+PRIMARY_FONT, "#fff");
        _oHelpText.x = CANVAS_WIDTH/2;
        _oHelpText.y = (CANVAS_HEIGHT/2) - 160;
        _oHelpText.textAlign = "center";
        _oHelpText.textBaseline = "alphabetic";
        _oHelpText.lineWidth = 900;
        
        _aHelp = new Array();

        var oPos = {x: 280};
        
        _aHelp[0] = new createjs.Text("","bold 40px "+PRIMARY_FONT, "#fff");
        _aHelp[0].x = oPos.x;
        _aHelp[0].y = (CANVAS_HEIGHT/2) - 90;
        _aHelp[0].textAlign = "left";
        _aHelp[0].textBaseline = "alphabetic";
        _aHelp[0].lineWidth = 600;
        
        _aHelp[1] = new createjs.Text("","bold 40px "+PRIMARY_FONT, "#fff");
        _aHelp[1].x = oPos.x;
        _aHelp[1].y = (CANVAS_HEIGHT/2) + 10;
        _aHelp[1].textAlign = "left";
        _aHelp[1].textBaseline = "alphabetic";
        _aHelp[1].lineWidth = 600;
        
        _aHelp[2] = new createjs.Text("","bold 40px "+PRIMARY_FONT, "#fff");
        _aHelp[2].x = oPos.x;
        _aHelp[2].y = (CANVAS_HEIGHT/2) + 110;
        _aHelp[2].textAlign = "left";
        _aHelp[2].textBaseline = "alphabetic";
        _aHelp[2].lineWidth = 660;
        
        _aHelp[3] = new createjs.Text("","bold 40px "+PRIMARY_FONT, "#fff");
        _aHelp[3].x = oPos.x;
        _aHelp[3].y = (CANVAS_HEIGHT/2) + 210;
        _aHelp[3].textAlign = "left";
        _aHelp[3].textBaseline = "alphabetic";
        _aHelp[3].lineWidth = 600;

        _oScore = new createjs.Text(""," 70px "+SECONDARY_FONT, "#fff");
        _oScore.x = CANVAS_WIDTH/2;;
        _oScore.y = (CANVAS_HEIGHT/2) + 380;
        _oScore.textAlign = "center";
        _oScore.textBaseline = "alphabetic";
        _oScore.lineWidth = 700;

        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        
        _oGroup.addChild(_oBg, _oHelpText, _oMsgText, _aHelp[0], _aHelp[1], _aHelp[2], _aHelp[3], _oScore);

        s_oStage.addChild(_oGroup);
    };
    
    this.unload = function(){
        _oGroup.off("mousedown",this._onExit);
    };
    
    this._initListener = function(){
        _oGroup.on("mousedown",this._onExit);
    };
    
    this.show = function(iTime){
        playSound("game_over",1,false);
        
        iTime = formatTime(iTime);
        
        var aModality = new Array();
        aModality[0] = TEXT_EASY;
        aModality[1] = TEXT_MEDIUM;
        aModality[2] = TEXT_EASY;
        
        if(!bTime){
            _oMsgText.text = TEXT_GAMEOVER + aModality[s_iDifficultyMode] + TEXT_SUDOKU + TEXT_IN + iTime;
        } else {
            _oMsgText.text = TEXT_GAMEOVER + aModality[s_iDifficultyMode] + TEXT_SUDOKU;
        }

        if(_aHelpUsed.length === 1){
            _oHelpText.text = TEXT_HELP_USED; 
        } else if(_aHelpUsed.length > 1){
            _oHelpText.text = TEXT_HELPS_USED; 
        }


        if (_aHelpUsed.length > 0){
            for(var i=0; i<_aHelpUsed.length; i++){
                _aHelp[i].text = "-"+_aHelpUsed[i];
            }
        }
        
        
        
        _oScore.text = TEXT_SCORE +" " +_iScore;    
 
        _oGroup.visible = true;
        
        var oParent = this;
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500).call(function() {oParent._initListener();});
        
		
        $(s_oMain).trigger("save_score",[_iScore, s_iDifficultyMode, iTime, bNote, bSolve, bTime, iNumHint]);

        $(s_oMain).trigger("share_event",[_iScore]);
        
        $(s_oMain).trigger("end_level",1);
    };
    
    this._onExit = function(){
        _oGroup.off("mousedown",this._onExit);
        s_oStage.removeChild(_oGroup);
        
        $(s_oMain).trigger("end_session");
        
        s_oGame.onExit();
    };
    
    this._init(oSpriteBg, bNote, bSolve, bTime, iNumHint, iScore);
    
    return this;
}
