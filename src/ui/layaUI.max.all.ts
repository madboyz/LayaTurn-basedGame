
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
import UIBase=base.UIBase;
module ui.main {
    export class AchievementsItemUI extends View {
		public SelectImg:Laya.Image;
		public titleTxt:laya.display.Text;
		public desTxt:laya.display.Text;
		public getBtn: component.ScaleButton;
		public getTimeTxt:laya.display.Text;
		public finish:Laya.Image;
		public pointTxt:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/AchievementsItem");

        }

    }
}

module ui.main {
    export class AchievementsPanelUI extends UIBase {
		public AchList:Laya.List;
		public totalTxt:laya.display.Text;
		public btnList:Laya.Panel;
		public btn_0: component.ScaleButton;
		public btn_1:component.ScaleButton;
		public btn_2:component.ScaleButton;
		public btn_3:component.ScaleButton;
		public btn_4:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/AchievementsPanel");

        }

    }
}

module ui.main {
    export class ActiveIconUI extends View {
		public icon:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/ActiveIcon");

        }

    }
}

module ui.main {
    export class ActiveItemUI extends View {
		public bgImg:Laya.Image;
		public OpenBtn:component.ScaleButton;
		public GotoBtn:component.ScaleButton;
		public redDot:Laya.Image;
		public titleTipsLb:laya.display.Text;
		public NumText:laya.display.Text;
		public NameText:laya.display.Text;
		public TimeText:Laya.Label;
		public tipsText:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/ActiveItem");

        }

    }
}

module ui.main {
    export class ActiveMainPanelUI extends UIBase {
		public btn_1: component.ScaleButton;
		public btn_2: component.ScaleButton;
		public btn_3: component.ScaleButton;
		public activeList:Laya.List;
		public noDataBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/ActiveMainPanel");

        }

    }
}

module ui.main {
    export class AlertPanelUI extends View {
		public txt_title:laya.display.Text;
		public txt_content:laya.html.dom.HTMLDivElement;
		public btn_cancel:component.ScaleButton;
		public btn_ok:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/AlertPanel");

        }

    }
}

module ui.main {
    export class AnswerQuestionPanelUI extends UIBase {
		public answerBtn1:Laya.Image;
		public answerBtn2:Laya.Image;
		public answerBtn3:Laya.Image;
		public answerBtn4:Laya.Image;
		public answerImg1:Laya.Image;
		public answerImg2:Laya.Image;
		public answerImg3:Laya.Image;
		public answerImg4:Laya.Image;
		public questionLb:laya.display.Text;
		public timeLb:laya.display.Text;
		public tipsLb:laya.display.Text;
		public answerLb1:laya.display.Text;
		public answerLb2:laya.display.Text;
		public answerLb3:laya.display.Text;
		public answerLb4:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/AnswerQuestionPanel");

        }

    }
}

module ui.main {
    export class AutoChessUI extends View {
		public ScrollArea:Laya.Panel;
		public box:Laya.Box;
		public BackBtn: component.ScaleButton;
		public StartBtn: component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/AutoChess");

        }

    }
}

module ui.main {
    export class BagFabaoPanelUI extends View {
		public mBg:Laya.Image;
		public btn_0:component.ScaleButton;
		public btn_1:component.ScaleButton;
		public box:Laya.Box;
		public btn_add:component.ScaleButton;
		public btn_smell:component.ScaleButton;
		public txt_count:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/BagFabaoPanel");

        }

    }
}

module ui.main {
    export class BagMinggePanelUI extends View {
		public mBg:Laya.Image;
		public itemList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("main/BagMinggePanel");

        }

    }
}

module ui.main {
    export class BagPanelUI extends UIBase {
		public btn_0: component.ScaleButton;
		public btn_1:component.ScaleButton;
		public btn_2:component.ScaleButton;
		public btn_3:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/BagPanel");

        }

    }
}

module ui.main {
    export class BagWupinPanelUI extends View {
		public mBg:Laya.Image;
		public box:Laya.Box;
		public btn_add:component.ScaleButton;
		public btn_smell:component.ScaleButton;
		public txt_count:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/BagWupinPanel");

        }

    }
}

module ui.main {
    export class BasePanelUI extends UIBase {

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("main/BasePanel");

        }

    }
}

module ui.main {
    export class BattlePanelUI extends UIBase {
		public BossCome:Laya.Image;
		public operate:Laya.Box;
		public skill: component.ScaleButton;
		public jiaobiao:Laya.Image;
		public AutoCheck:Laya.CheckBox;
		public TopRight:Laya.Box;
		public line:Laya.Image;
		public MapName:laya.display.Text;
		public DesTxt:laya.display.Text;
		public CamEffect:Laya.Animation;
		public ExitBtn: component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/BattlePanel");

        }

    }
}

module ui.main {
    export class BattlePowerPanelUI extends UIBase {
		public BattlePowerNumber:component.NumberImage;
		public AddDynamicNumber:component.NumberImage;
		public CutDynamicNumber:component.NumberImage;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.NumberImage",component.NumberImage);

            super.createChildren();
            this.loadUI("main/BattlePowerPanel");

        }

    }
}

module ui.main {
    export class BattleSkillPanelUI extends UIBase {
		public btnClose: component.ScaleButton;
		public tileTxt:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/BattleSkillPanel");

        }

    }
}

module ui.main {
    export class BeStrongerItemUI extends View {
		public icon:Laya.Image;
		public txt_name:laya.display.Text;
		public tipsLb:laya.display.Text;
		public gotoBtn:component.ScaleButton;
		public titleLb:laya.display.Text;
		public star1:Laya.Image;
		public star2:Laya.Image;
		public star3:Laya.Image;
		public star4:Laya.Image;
		public star5:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/BeStrongerItem");

        }

    }
}

module ui.main {
    export class BeStrongerPanelUI extends UIBase {
		public btn_1: component.ScaleButton;
		public btn_2: component.ScaleButton;
		public itemList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("ui.main.BeStrongerItemUI",ui.main.BeStrongerItemUI);

            super.createChildren();
            this.loadUI("main/BeStrongerPanel");

        }

    }
}

module ui.main {
    export class BossCopyPanelUI extends UIBase {
		public btn_0: component.ScaleButton;
		public btn_1:component.ScaleButton;
		public btn_2:component.ScaleButton;
		public btn_3:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/BossCopyPanel");

        }

    }
}

module ui.main {
    export class boxRewarldUI extends View {
		public icon:Laya.Image;
		public star:Laya.Image;
		public num:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/boxRewarld");

        }

    }
}

module ui.main {
    export class BuyCountPanelUI extends UIBase {
		public txt_const:laya.display.Text;
		public sure:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/BuyCountPanel");

        }

    }
}

module ui.main {
    export class CatchPetMainPanelUI extends UIBase {
		public ScoreTxt:laya.display.Text;
		public BgImg:Laya.Image;
		public RefreshBtn:component.ScaleButton;
		public ExitBtn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/CatchPetMainPanel");

        }

    }
}

module ui.main {
    export class ChallengeResultPanelUI extends UIBase {
		public ItemList:Laya.List;
		public lostList:Laya.List;
		public showImg:Laya.Image;
		public showLb:laya.display.Text;
		public GetBtn:component.ScaleButton;
		public ResultImage:Laya.Image;
		public DesLabel:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/ChallengeResultPanel");

        }

    }
}

module ui.main {
    export class ChangeCodePanelUI extends UIBase {
		public codeInput:Laya.TextInput;
		public OkBtn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/ChangeCodePanel");

        }

    }
}

module ui.main {
    export class ChaoPlayerPanelUI extends UIBase {
		public LeftPageBtn:component.ScaleButton;
		public RightPageBtn:component.ScaleButton;
		public PageText:laya.display.Text;
		public ItemList:Laya.VBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/ChaoPlayerPanel");

        }

    }
}

module ui.main {
    export class ChaosHudMainPanelUI extends UIBase {
		public TopRight:Laya.Image;
		public Balls:Laya.HBox;
		public InfoText:laya.html.dom.HTMLDivElement;
		public TimeText:laya.html.dom.HTMLDivElement;
		public LeftBottom:Laya.Box;
		public AoiPlayerBtn: component.ScaleButton;
		public AutoBtn:Laya.CheckBox;
		public ExitBtn: component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/ChaosHudMainPanel");

        }

    }
}

module ui.main {
    export class ChaosPlayerItemUI extends View {
		public NameText:laya.display.Text;
		public GotoBtn:component.ScaleButton;
		public Balls:Laya.HBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/ChaosPlayerItem");

        }

    }
}

module ui.main {
    export class ChatEmotionPanelUI extends UIBase {
		public bgImage:Laya.Image;
		public emotionList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("main/ChatEmotionPanel");

        }

    }
}

module ui.main {
    export class ChatLineUI extends View {
		public txt:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/ChatLine");

        }

    }
}

module ui.main {
    export class ChatPanlUI extends UIBase {
		public img_Bg:Laya.Image;
		public img_txtBg:Laya.Image;
		public btn_look: component.ScaleButton;
		public btn_bag: component.ScaleButton;
		public btn_1:Laya.Button;
		public btn_0:Laya.Button;
		public btn_send: component.ScaleButton;
		public msgPanel:Laya.Panel;
		public txt_input:Laya.TextInput;
		public btn_2:Laya.Button;
		public btn_big:Laya.Button;
		public img_bagFull:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/ChatPanl");

        }

    }
}

module ui.main {
    export class ComateChangeTalentPanelUI extends UIBase {
		public TalentPointText:laya.display.Text;
		public OneBtn:component.ScaleButton;
		public TenBtn:component.ScaleButton;
		public OneText:laya.html.dom.HTMLDivElement;
		public TenText:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/ComateChangeTalentPanel");

        }

    }
}

module ui.main {
    export class ComateInfoPanelUI extends UIBase {
		public Stars:Laya.HBox;
		public NameText:laya.display.Text;
		public sp_combat:Laya.Box;
		public BattleText:component.NumberImage;
		public AttrBtn: component.ScaleButton;
		public hadActiveBox:Laya.Box;
		public SetPosBtn:component.ScaleButton;
		public yuanfenBtn:component.ScaleButton;
		public tupoBtn:component.ScaleButton;
		public yuanshenBtn:component.ScaleButton;
		public relive:component.ScaleButton;
		public minggeBtn:component.ScaleButton;
		public showBtn:component.ScaleButton;
		public SkillsBox:Laya.Box;
		public ActiveBox:Laya.Box;
		public GetBtn:component.ScaleButton;
		public CountText:laya.html.dom.HTMLDivElement;
		public pingfenLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/ComateInfoPanel");

        }

    }
}

module ui.main {
    export class ComateItemUI extends View {
		public QualityBg:Laya.Image;
		public icon:Laya.Sprite;
		public selectBg:Laya.Image;
		public SetBg:Laya.Image;
		public Stars:Laya.HBox;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/ComateItem");

        }

    }
}

module ui.main {
    export class ComateLiemingPanelUI extends UIBase {
		public itemLb1:laya.display.Text;
		public itemLb2:laya.display.Text;
		public itemIcon1:Laya.Image;
		public itemIconBox1:Laya.Box;
		public itemIcon2:Laya.Image;
		public btn_addGold: component.ScaleButton;
		public allGetBtn:component.ScaleButton;
		public liemingBtn:component.ScaleButton;
		public goldSelectBtn:Laya.Button;
		public itemList:Laya.List;
		public costIcon1:Laya.Image;
		public costIcon2:Laya.Image;
		public costIcon3:Laya.Image;
		public costIcon4:Laya.Image;
		public costIcon5:Laya.Image;
		public headIcon1:Laya.Image;
		public headIcon2:Laya.Image;
		public headIcon3:Laya.Image;
		public headIcon4:Laya.Image;
		public headIcon5:Laya.Image;
		public costLb1:laya.display.Text;
		public costLb2:laya.display.Text;
		public costLb3:laya.display.Text;
		public costLb4:laya.display.Text;
		public costLb5:laya.display.Text;
		public nameLb1:laya.display.Text;
		public nameLb2:laya.display.Text;
		public nameLb3:laya.display.Text;
		public nameLb4:laya.display.Text;
		public nameLb5:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/ComateLiemingPanel");

        }

    }
}

module ui.main {
    export class ComateLvUpPanelUI extends UIBase {
		public Stars:Laya.HBox;
		public sp_combat:Laya.Sprite;
		public combatSp:Laya.Box;
		public world:Laya.Image;
		public combat:component.NumberImage;
		public btn_look: component.ScaleButton;
		public shengjiCostBox:Laya.Box;
		public shengjiBtn:component.ScaleButton;
		public shengjiLvLb:laya.display.Text;
		public comateNameLb:laya.display.Text;
		public pingfenLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/ComateLvUpPanel");

        }

    }
}

module ui.main {
    export class ComatemainPanelUI extends UIBase {
		public btn_0: component.ScaleButton;
		public btn_1: component.ScaleButton;
		public btn_2: component.ScaleButton;
		public btn_3: component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/ComatemainPanel");

        }

    }
}

module ui.main {
    export class ComateMinggePanelUI extends UIBase {
		public sp_combat:Laya.Sprite;
		public BattleText:component.NumberImage;
		public AttrBtn: component.ScaleButton;
		public oneKeyEquipBtn:component.ScaleButton;
		public goLiemingBtn:component.ScaleButton;
		public roleBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/ComateMinggePanel");

        }

    }
}

module ui.main {
    export class ComateStarPanelUI extends UIBase {
		public Stars:Laya.HBox;
		public NameText:laya.display.Text;
		public sp_combat:Laya.Box;
		public BattleText:component.NumberImage;
		public AttrBtn: component.ScaleButton;
		public upgardeBox:Laya.Box;
		public StarBtn:component.ScaleButton;
		public CountText:laya.html.dom.HTMLDivElement;
		public MaxTips:laya.display.Text;
		public pingfenLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/ComateStarPanel");

        }

    }
}

module ui.main {
    export class ComateTalentInfoPanelUI extends UIBase {
		public TalentIcon:Laya.Sprite;
		public NameText:laya.display.Text;
		public CurrentDesText:laya.display.Text;
		public NextDesText:laya.display.Text;
		public MaxBtn:component.ScaleButton;
		public OneBtn:component.ScaleButton;
		public LvText:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/ComateTalentInfoPanel");

        }

    }
}

module ui.main {
    export class ComateTalentPanelUI extends UIBase {
		public ChangeTalentBtn: component.ScaleButton;
		public AutoLearnBtn: component.ScaleButton;
		public TalentPointText:laya.display.Text;
		public SelectImg:Laya.Image;
		public sp_combat:Laya.Box;
		public BattleText:component.NumberImage;
		public AttrBtn: component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.NumberImage",component.NumberImage);

            super.createChildren();
            this.loadUI("main/ComateTalentPanel");

        }

    }
}

module ui.main {
    export class ComateYuanfenItemUI extends View {
		public bgImg:Laya.Image;
		public item1:Laya.Box;
		public item2:Laya.Box;
		public item3:Laya.Box;
		public item4:Laya.Box;
		public attrLb1:Laya.Label;
		public attrLb2:Laya.Label;
		public attrLb3:Laya.Label;
		public attrLb4:Laya.Label;
		public titleLb:Laya.Label;
		public hadJihuoImg:Laya.Image;
		public upBtn:component.ScaleButton;
		public star1:Laya.Image;
		public star2:Laya.Image;
		public star3:Laya.Image;
		public star4:Laya.Image;
		public star5:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/ComateYuanfenItem");

        }

    }
}

module ui.main {
    export class ComateYuanfenPanelUI extends UIBase {
		public itemList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.main.ComateYuanfenItemUI",ui.main.ComateYuanfenItemUI);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/ComateYuanfenPanel");

        }

    }
}

module ui.main {
    export class copyLevelItemUI extends View {
		public Btn:component.ScaleButton;
		public condtionTxt:laya.display.Text;
		public nameTxt:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/copyLevelItem");

        }

    }
}

module ui.main {
    export class CostGetRewardItemUI extends View {
		public bgImg:Laya.Image;
		public getBtn:component.ScaleButton;
		public wordImgSub:Laya.Image;
		public combat:component.NumberImage;
		public hadGetImg:Laya.Image;
		public progressBox:Laya.Box;
		public rewardBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("component.NumberImage",component.NumberImage);

            super.createChildren();
            this.loadUI("main/CostGetRewardItem");

        }

    }
}

module ui.main {
    export class CostGetRewardPanelUI extends View {
		public itemList:Laya.List;
		public timeLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.main.CostGetRewardItemUI",ui.main.CostGetRewardItemUI);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/CostGetRewardPanel");

        }

    }
}

module ui.main {
    export class CreateRoleUI extends UIBase {
		public playerImage:Laya.Image;
		public NameInput:Laya.TextInput;
		public CreateBtn:component.ScaleButton;
		public manBtn:Laya.Button;
		public womanBtn:Laya.Button;
		public NameBtn:component.ScaleButton;
		public Role1:Laya.Button;
		public wordImg1:Laya.Image;
		public Role2:Laya.Button;
		public wordImg2:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/CreateRole");

        }

    }
}

module ui.main {
    export class DartInfoPanelUI extends UIBase {
		public StarBox:Laya.HBox;
		public HiJackBtn:component.ScaleButton;
		public OneKeyMaxBtn:component.ScaleButton;
		public StartDartBtn:component.ScaleButton;
		public RefreshBtn:component.ScaleButton;
		public DesText:laya.display.Text;
		public oneKeyText:laya.html.dom.HTMLDivElement;
		public refreshText:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/DartInfoPanel");

        }

    }
}

module ui.main {
    export class DartLogItemUI extends View {
		public Bg:Laya.Image;
		public TitleText:laya.display.Text;
		public TypeText:laya.display.Text;
		public GoodsText:laya.html.dom.HTMLDivElement;
		public RevengeBtn:component.ScaleButton;
		public TimeText:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/DartLogItem");

        }

    }
}

module ui.main {
    export class DartLogPanelUI extends UIBase {
		public LogList:Laya.List;
		public Nodata:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/DartLogPanel");

        }

    }
}

module ui.main {
    export class DartMainPanelUI extends UIBase {
		public Mask:Laya.Panel;
		public currentTransTxt:laya.display.Text;
		public currentHiJackTxt:laya.display.Text;
		public TransBox:Laya.Box;
		public GetBtn:component.ScaleButton;
		public TransText:laya.html.dom.HTMLDivElement;
		public startTransBtn:component.ScaleButton;
		public dartLogBtn: component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/DartMainPanel");

        }

    }
}

module ui.main {
    export class DayMarkRewardItemUI extends View {
		public IsGet:Laya.Image;
		public day_txt:laya.display.Text;
		public GetBtn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/DayMarkRewardItem");

        }

    }
}

module ui.main {
    export class DayMarkRewardPanelUI extends View {
		public RewardList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("main/DayMarkRewardPanel");

        }

    }
}

module ui.main {
    export class DayTaskPanelUI extends UIBase {
		public btn_0: component.ScaleButton;
		public btn_1:component.ScaleButton;
		public btn_2:component.ScaleButton;
		public btn_3:component.ScaleButton;
		public btn_4:component.ScaleButton;
		public baseBox:Laya.Box;
		public taskDes:laya.html.dom.HTMLDivElement;
		public quickBtn:component.ScaleButton;
		public gotoBtn:component.ScaleButton;
		public FinishBtn:component.ScaleButton;
		public moneyBox:Laya.Box;
		public moneyText:laya.display.Text;
		public baotuBox:Laya.Box;
		public star1:Laya.Image;
		public star2:Laya.Image;
		public star3:Laya.Image;
		public star4:Laya.Image;
		public star5:Laya.Image;
		public refreshBtn:component.ScaleButton;
		public leftTaskNumLb:laya.display.Text;
		public index4FinishBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/DayTaskPanel");

        }

    }
}

module ui.main {
    export class EquipChangePanelUI extends UIBase {
		public changeBtn:component.ScaleButton;
		public equipList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/EquipChangePanel");

        }

    }
}

module ui.main {
    export class FabaoInfoPanelUI extends View {
		public btn_changeEquip:component.ScaleButton;
		public sp_combat:Laya.Sprite;
		public combatSp:Laya.Box;
		public world:Laya.Image;
		public combat:component.NumberImage;
		public btn_look: component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/FabaoInfoPanel");

        }

    }
}

module ui.main {
    export class FabaoLvupItemUI extends View {
		public bgImg:Laya.Image;
		public itemBox:Laya.Box;
		public getImg:Laya.Image;
		public nameLb:laya.display.Text;
		public typeLb:laya.display.Text;
		public selectImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/FabaoLvupItem");

        }

    }
}

module ui.main {
    export class FabaoLvupPanelUI extends View {
		public dianhuaBtn:component.ScaleButton;
		public sp_combat:Laya.Sprite;
		public combatSp:Laya.Box;
		public world:Laya.Image;
		public combat:component.NumberImage;
		public btn_look: component.ScaleButton;
		public attrList:Laya.List;
		public costItemBox:Laya.Box;
		public fabaoItemBox:Laya.Box;
		public progressBarBox:Laya.Box;
		public itemList:Laya.List;
		public lvLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("ui.main.FabaoLvupItemUI",ui.main.FabaoLvupItemUI);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/FabaoLvupPanel");

        }

    }
}

module ui.main {
    export class FabaoMainPanelUI extends UIBase {
		public btn_0: component.ScaleButton;
		public btn_1:component.ScaleButton;
		public btn_2:component.ScaleButton;
		public btn_3:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/FabaoMainPanel");

        }

    }
}

module ui.main {
    export class FabaoTanbaoPanelUI extends View {
		public type1OneBtn:component.ScaleButton;
		public type2OneBtn:component.ScaleButton;
		public type2TenBtn:component.ScaleButton;
		public type1OneIcon:Laya.Image;
		public type2OneIcon:Laya.Image;
		public type2TenIcon:Laya.Image;
		public type1OneLb:laya.display.Text;
		public type2OneLb:laya.display.Text;
		public type2TenLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/FabaoTanbaoPanel");

        }

    }
}

module ui.main {
    export class FirstRechargePanelUI extends UIBase {
		public backBtn:component.ScaleButton;
		public rewardList:Laya.List;
		public typeBtn1:component.ScaleButton;
		public typeBtn2:component.ScaleButton;
		public typeBtn3:component.ScaleButton;
		public typeBtn4:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/FirstRechargePanel");

        }

    }
}

module ui.main {
    export class ForgingPanelUI extends UIBase {
		public btn_0: component.ScaleButton;
		public btn_1:component.ScaleButton;
		public btn_2:component.ScaleButton;
		public btn_3:component.ScaleButton;
		public combatSp:Laya.Sprite;
		public world:Laya.Image;
		public combat:component.NumberImage;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("component.NumberImage",component.NumberImage);

            super.createChildren();
            this.loadUI("main/ForgingPanel");

        }

    }
}

module ui.main {
    export class FriendAddPanelUI extends View {
		public b_tujian:Laya.Box;
		public tujian_list:Laya.List;
		public txt_tujian:laya.display.Text;
		public btn_refresh:component.ScaleButton;
		public b_find:Laya.Box;
		public find_list:Laya.List;
		public txt_name:Laya.TextInput;
		public btn_find: component.ScaleButton;
		public btn_0:component.ScaleButton;
		public btn_1:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/FriendAddPanel");

        }

    }
}

module ui.main {
    export class FriendApplyItemUI extends View {
		public txt_name:laya.display.Text;
		public txt_lv:laya.display.Text;
		public txt_combat:laya.display.Text;
		public btn_apply:component.ScaleButton;
		public txt_heart:laya.display.Text;
		public headImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/FriendApplyItem");

        }

    }
}

module ui.main {
    export class FriendDeleteItemUI extends View {
		public txt_name:laya.display.Text;
		public txt_lv:laya.display.Text;
		public txt_combat:laya.display.Text;
		public txt_state:laya.display.Text;
		public btn_delete:component.ScaleButton;
		public headImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/FriendDeleteItem");

        }

    }
}

module ui.main {
    export class FriendItemUI extends View {
		public txt_name:laya.display.Text;
		public txt_lv:laya.display.Text;
		public txt_heart:laya.display.Text;
		public txt_combat:laya.display.Text;
		public txt_state:laya.display.Text;
		public headImg:Laya.Image;
		public img_state:Laya.Image;
		public selectImg:Laya.Image;
		public send:Laya.Button;
		public btn_send:component.ScaleButton;
		public b_send:Laya.Box;
		public txt_send:laya.display.Text;
		public img_icon:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/FriendItem");

        }

    }
}

module ui.main {
    export class FriendListPanelUI extends View {
		public list:Laya.List;
		public btn_receivedAll:component.ScaleButton;
		public btn_sendAll:component.ScaleButton;
		public noDataBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/FriendListPanel");

        }

    }
}

module ui.main {
    export class FriendManagerPanelUI extends View {
		public list:Laya.List;
		public btn_0:component.ScaleButton;
		public btn_1:component.ScaleButton;
		public noDataBox:Laya.Box;
		public tipsWordLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/FriendManagerPanel");

        }

    }
}

module ui.main {
    export class FriendPanelUI extends UIBase {
		public btn_0: component.ScaleButton;
		public btn_1:component.ScaleButton;
		public btn_2:component.ScaleButton;
		public btn_3:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/FriendPanel");

        }

    }
}

module ui.main {
    export class FriendReceivedItemtsUI extends View {
		public txt_name:laya.display.Text;
		public txt_lv:laya.display.Text;
		public txt_combat:laya.display.Text;
		public btn_refuse:component.ScaleButton;
		public btn_agreen:component.ScaleButton;
		public headImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/FriendReceivedItemts");

        }

    }
}

module ui.main {
    export class FuliMainPanelUI extends UIBase {
		public btn_0: component.ScaleButton;
		public selectImg:Laya.Image;
		public btn0_red:Laya.Image;
		public btn_1: component.ScaleButton;
		public btn1_red:Laya.Image;
		public btn_2: component.ScaleButton;
		public btn2_red:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/FuliMainPanel");

        }

    }
}

module ui.main {
    export class FuncOpenPanelUI extends UIBase {
		public rewardList:Laya.List;
		public funcOpenBox:Laya.Box;
		public textLb1:laya.display.Text;
		public textLb2:laya.display.Text;
		public okBtn:component.ScaleButton;
		public tipsLb2:laya.display.Text;
		public tipsLb:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/FuncOpenPanel");

        }

    }
}

module ui.main {
    export class GetWayPanelUI extends UIBase {
		public txt_name:laya.display.Text;
		public btn_recharge:component.ScaleButton;
		public btn_buy:component.ScaleButton;
		public icon:Laya.Image;
		public txt_num:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/GetWayPanel");

        }

    }
}

module ui.main {
    export class GodPetComingDetailPanelUI extends UIBase {
		public close_btn:component.ScaleButton;
		public roleBox:Laya.Box;
		public combat:component.NumberImage;
		public skillBox:Laya.Box;
		public petName:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/GodPetComingDetailPanel");

        }

    }
}

module ui.main {
    export class GodPetComingItemUI extends View {
		public roleBox:Laya.Box;
		public selectImg:Laya.Image;
		public passImg:Laya.Image;
		public stageLb:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/GodPetComingItem");

        }

    }
}

module ui.main {
    export class GodPetComingPanelUI extends View {
		public roleBox:Laya.Box;
		public combat:component.NumberImage;
		public fightBtn:component.ScaleButton;
		public lookAttrBtn:laya.display.Text;
		public timeCdLb:laya.display.Text;
		public LeftBtn:component.ScaleButton;
		public RightBtn:component.ScaleButton;
		public pageList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/GodPetComingPanel");

        }

    }
}

module ui.main {
    export class GonggaoPanelUI extends UIBase {
		public quedingBtn:component.ScaleButton;
		public contentPanel:Laya.Panel;
		public contentText:laya.html.dom.HTMLDivElement;
		public overImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/GonggaoPanel");

        }

    }
}

module ui.main {
    export class GoodsBuyPanelUI extends UIBase {
		public txt_money:laya.display.Text;
		public moneyIcon:Laya.Image;
		public btn_buy:component.ScaleButton;
		public txt_name:laya.display.Text;
		public txt_desc:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/GoodsBuyPanel");

        }

    }
}

module ui.main {
    export class GoodsHechengPanelUI extends UIBase {
		public txt_money:laya.display.Text;
		public moneyIcon:Laya.Image;
		public moneyTitle:laya.display.Text;
		public btn_ok:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/GoodsHechengPanel");

        }

    }
}

module ui.main {
    export class GoodsItemUI extends View {
		public img_discout:Laya.Image;
		public txt_name:laya.display.Text;
		public txt_leftNum:laya.display.Text;
		public moneyIcon:Laya.Image;
		public powerUpImg:Laya.Image;
		public txt_prince:laya.display.Text;
		public txt_discount:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/GoodsItem");

        }

    }
}

module ui.main {
    export class GoodsSellPanelUI extends UIBase {
		public txt_money:laya.display.Text;
		public moneyIcon:Laya.Image;
		public moneyTitle:laya.display.Text;
		public btn_shut:component.ScaleButton;
		public btn_add:component.ScaleButton;
		public txt_num:Laya.TextInput;
		public btn_ok:component.ScaleButton;
		public txt_name:laya.display.Text;
		public txt_desc:laya.html.dom.HTMLDivElement;
		public hasNum:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/GoodsSellPanel");

        }

    }
}

module ui.main {
    export class GridHudMainPageUI extends UIBase {
		public ExitBtn: component.ScaleButton;
		public RandBtn: component.ScaleButton;
		public rollPoint:Laya.Image;
		public TopRight:Laya.Image;
		public DesText:laya.display.Text;
		public NowPointText:laya.display.Text;
		public GridNoImg:Laya.Image;
		public GridNoText:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/GridHudMainPage");

        }

    }
}

module ui.main {
    export class GridSceneSelectPanelUI extends UIBase {
		public EnterBtn:component.ScaleButton;
		public LevelList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/GridSceneSelectPanel");

        }

    }
}

module ui.main {
    export class GuildBossItemUI extends View {
		public bgImg:Laya.Image;
		public titleLb:laya.display.Text;
		public limitLb:laya.display.Text;
		public typeLb:laya.display.Text;
		public rewardBox:Laya.Box;
		public roleBox:Laya.Box;
		public hpBox:Laya.Box;
		public killedImg:Laya.Image;
		public selectImg:Laya.Image;
		public redDot:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/GuildBossItem");

        }

    }
}

module ui.main {
    export class GuildBossPanelUI extends UIBase {
		public bossList:Laya.List;
		public rewardBox:Laya.Box;
		public sureBtn:component.ScaleButton;
		public bossTimeLb:laya.display.Text;
		public cardTimeLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.main.GuildBossItemUI",ui.main.GuildBossItemUI);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/GuildBossPanel");

        }

    }
}

module ui.main {
    export class GuildBossSelectCardItemUI extends View {
		public cardBox:Laya.Box;
		public cardBg:Laya.Image;
		public itemBox:Laya.Box;
		public costBox:Laya.Box;
		public costNumLb:laya.display.Text;
		public costItem:Laya.Image;
		public freeLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/GuildBossSelectCardItem");

        }

    }
}

module ui.main {
    export class GuildBossSelectCardPanelUI extends UIBase {
		public leftTimeLb:laya.display.Text;
		public cardList:Laya.List;
		public timeLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("ui.main.GuildBossSelectCardItemUI",ui.main.GuildBossSelectCardItemUI);

            super.createChildren();
            this.loadUI("main/GuildBossSelectCardPanel");

        }

    }
}

module ui.main {
    export class GuildContributePanelUI extends View {
		public refreshIcon:Laya.Image;
		public refreshBtn:component.ScaleButton;
		public contriBtn1:component.ScaleButton;
		public contriBtn2:component.ScaleButton;
		public leftTimeLb:laya.display.Text;
		public goldNumLb:laya.display.Text;
		public tipsLb:laya.display.Text;
		public showItem1:Laya.Box;
		public showItem2:Laya.Box;
		public getReward:Laya.Box;
		public item1Lb:laya.html.dom.HTMLDivElement;
		public item2Lb:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/GuildContributePanel");

        }

    }
}

module ui.main {
    export class GuildCreatPanelUI extends UIBase {
		public cancelBtn:component.ScaleButton;
		public creatBtn:component.ScaleButton;
		public guildInputLb:Laya.TextInput;
		public constNumLb:laya.display.Text;
		public costIcon:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/GuildCreatPanel");

        }

    }
}

module ui.main {
    export class GuildHudScenePageUI extends UIBase {
		public titleBox:Laya.Box;
		public contentBox:Laya.Box;
		public exitBtn: component.ScaleButton;
		public taskBtn:component.ScaleButton;
		public Icon:Laya.Image;
		public txt:laya.html.dom.HTMLDivElement;
		public finishImg:Laya.Image;
		public finishBtn: component.ScaleButton;
		public moneyText:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/GuildHudScenePage");

        }

    }
}

module ui.main {
    export class GuildInfoPanelUI extends View {
		public bianjiBtn:component.ScaleButton;
		public baocunBtn:component.ScaleButton;
		public quxiaoBtn:component.ScaleButton;
		public gonggaoLb:laya.display.Text;
		public gonggaoInputLb:Laya.TextInput;
		public guildLvLb:laya.display.Text;
		public guildNameLb:laya.display.Text;
		public leaderNameLb:laya.display.Text;
		public menberNumLb:laya.display.Text;
		public gongxianLb:laya.display.Text;
		public rankLb:laya.display.Text;
		public zhanliLb:laya.display.Text;
		public funcPanel:Laya.Panel;
		public funcBox1:Laya.Box;
		public taskProgressLb:laya.display.Text;
		public funcBox2:Laya.Box;
		public funcBox3:Laya.Box;
		public taskRed:Laya.Image;
		public bossRed:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/GuildInfoPanel");

        }

    }
}

module ui.main {
    export class GuildListItemUI extends View {
		public bgImg:Laya.Image;
		public applyBtn:component.ScaleButton;
		public rankLb:laya.display.Text;
		public guildLvLb:laya.display.Text;
		public guildNameLb:laya.display.Text;
		public guildLeaderLb:laya.display.Text;
		public powerLb:laya.display.Text;
		public personLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/GuildListItem");

        }

    }
}

module ui.main {
    export class GuildListPanelUI extends UIBase {
		public b_find:Laya.Box;
		public txt_name:Laya.TextInput;
		public btn_find: component.ScaleButton;
		public applyAllBtn:component.ScaleButton;
		public creatGuildBtn:component.ScaleButton;
		public baseBox:Laya.Box;
		public guildList:Laya.List;
		public LeftBtn:component.ScaleButton;
		public RightBtn:component.ScaleButton;
		public Page:component.NumberImage;
		public noDataBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("ui.main.GuildListItemUI",ui.main.GuildListItemUI);
			View.regComponent("component.NumberImage",component.NumberImage);

            super.createChildren();
            this.loadUI("main/GuildListPanel");

        }

    }
}

module ui.main {
    export class GuildMainPanelUI extends UIBase {
		public btnList:Laya.Panel;
		public btn_0: component.ScaleButton;
		public btn_1: component.ScaleButton;
		public btn_2: component.ScaleButton;
		public btn_3: component.ScaleButton;
		public btn_4: component.ScaleButton;
		public btn_5: component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/GuildMainPanel");

        }

    }
}

module ui.main {
    export class GuildManageItemUI extends View {
		public btn_tongyi:component.ScaleButton;
		public headImg:Laya.Image;
		public titleLb:laya.html.dom.HTMLDivElement;
		public txt_lv:laya.display.Text;
		public txt_offLine:laya.display.Text;
		public txt_power:laya.display.Text;
		public btn_hulue:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/GuildManageItem");

        }

    }
}

module ui.main {
    export class GuildManagePanelUI extends View {
		public manageList:Laya.List;
		public rejectAllBtn:component.ScaleButton;
		public typeBox0:Laya.Box;
		public typeBtn0:Laya.Button;
		public typeBox1:Laya.Box;
		public typeBtn1:Laya.Button;
		public typeBox2:Laya.Box;
		public typeBtn2:Laya.Button;
		public noApplyBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/GuildManagePanel");

        }

    }
}

module ui.main {
    export class GuildMenberListItemUI extends View {
		public btn_exit:component.ScaleButton;
		public headImg:Laya.Image;
		public txt_name:laya.display.Text;
		public txt_lv:laya.display.Text;
		public txt_position:laya.display.Text;
		public txt_offLine:laya.display.Text;
		public txt_power:laya.display.Text;
		public txt_gongxian:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/GuildMenberListItem");

        }

    }
}

module ui.main {
    export class GuildMenberListPanelUI extends View {
		public menberList:Laya.List;
		public LeftBtn:component.ScaleButton;
		public RightBtn:component.ScaleButton;
		public Page:component.NumberImage;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.main.GuildMenberListItemUI",ui.main.GuildMenberListItemUI);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("component.NumberImage",component.NumberImage);

            super.createChildren();
            this.loadUI("main/GuildMenberListPanel");

        }

    }
}

module ui.main {
    export class HudMainPageUI extends UIBase {
		public exp:Laya.ProgressBar;
		public txt_exp:laya.display.Text;
		public txt_point:laya.display.Text;
		public txt_silver:laya.display.Text;
		public txt_gold:laya.display.Text;
		public btn_addYinbi: component.ScaleButton;
		public btn_addBind: component.ScaleButton;
		public btn_addGold: component.ScaleButton;
		public headImg:Laya.Image;
		public txt_level:laya.display.Text;
		public txt_name:laya.display.Text;
		public combat:component.NumberImage;
		public RightTop:Laya.Box;
		public txt_senceName:laya.display.Text;
		public txt_pos:laya.display.Text;
		public btn_world:Laya.Image;
		public btn_happy: component.ScaleButton;
		public btn_zeroBuy: component.ScaleButton;
		public btn_firstRecharge: component.ScaleButton;
		public funcOpenBox:Laya.Box;
		public funcOpenBg2:Laya.Image;
		public funcOpenBg1:Laya.Image;
		public funcOpenLb:laya.html.dom.HTMLDivElement;
		public BossBtn:Laya.Button;
		public AutoBoss:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/HudMainPage");

        }

    }
}

module ui.main {
    export class JJCItemUI extends View {
		public roleBox:Laya.Box;
		public roleName:laya.display.Text;
		public miaoshaImg:Laya.Image;
		public titleBox:Laya.Box;
		public powerLb:laya.display.Text;
		public rankBgLbL:laya.display.Text;
		public rankImg:Laya.FontClip;
		public rankBgLbR:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/JJCItem");

        }

    }
}

module ui.main {
    export class JJCPanelUI extends UIBase {
		public rewardList:Laya.List;
		public getRewardBtn:component.ScaleButton;
		public cishuLb:laya.display.Text;
		public timeLb:laya.display.Text;
		public addTimeBtn:Laya.Button;
		public rankBtn:component.ScaleButton;
		public shopBtn:component.ScaleButton;
		public back_Btn:component.ScaleButton;
		public rankImg:Laya.FontClip;
		public getImg:Laya.Image;
		public recordBtn:component.ScaleButton;
		public close_Btn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/JJCPanel");

        }

    }
}

module ui.main {
    export class JJCRecoedItemUI extends View {
		public bgImg:Laya.Image;
		public introLb:laya.html.dom.HTMLDivElement;
		public sameTipLbXX:laya.display.Text;
		public tyoeLb:laya.display.Text;
		public rankLbXX:laya.display.Text;
		public fightTimeLb:laya.display.Text;
		public typeImgXX:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/JJCRecoedItem");

        }

    }
}

module ui.main {
    export class JJCRecordPanelUI extends UIBase {
		public recordList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("main/JJCRecordPanel");

        }

    }
}

module ui.main {
    export class JJCResultPanelUI extends UIBase {
		public ResultImage:Laya.Image;
		public rewardList:Laya.List;
		public GetBtn:component.ScaleButton;
		public typeImg:Laya.Image;
		public exRewardImg:Laya.Image;
		public rankLb:laya.display.Text;
		public hisRankLb:laya.display.Text;
		public exRewardNumLb:laya.display.Text;
		public rankChangeLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/JJCResultPanel");

        }

    }
}

module ui.main {
    export class LevelChallengePanelUI extends UIBase {
		public Des:laya.display.Text;
		public levelAwardList:Laya.List;
		public TimeTxt:laya.html.dom.HTMLDivElement;
		public GoBtn:component.ScaleButton;
		public rankBox:Laya.Box;
		public rank1:laya.display.Text;
		public rank2:laya.display.Text;
		public rank3:laya.display.Text;
		public rankNo1:laya.display.Text;
		public rankNo2:laya.display.Text;
		public rankNo3:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/LevelChallengePanel");

        }

    }
}

module ui.main {
    export class LevelRewardItemUI extends View {
		public levelTxt:laya.display.Text;
		public GetBtn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/LevelRewardItem");

        }

    }
}

module ui.main {
    export class LevelRewardPanelUI extends View {
		public RewardList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("main/LevelRewardPanel");

        }

    }
}

module ui.main {
    export class LoadingPanelUI extends UIBase {
		public RefreshText:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/LoadingPanel");

        }

    }
}

module ui.main {
    export class LocalPlayerPanelUI extends UIBase {
		public combat:component.NumberImage;
		public txt_name:laya.display.Text;
		public headImg:Laya.Image;
		public ChangeBtn:component.ScaleButton;
		public RefreshBtn:component.ScaleButton;
		public SysBtn:component.ScaleButton;
		public GMBtn:component.ScaleButton;
		public txt_info:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/LocalPlayerPanel");

        }

    }
}

module ui.main {
    export class LoginRewardPanelUI extends UIBase {
		public getBtn:component.ScaleButton;
		public rewardList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/LoginRewardPanel");

        }

    }
}

module ui.main {
    export class MaildItemUI extends View {
		public img_select:Laya.Image;
		public img_new:Laya.Image;
		public txt_title:laya.display.Text;
		public txt_time:laya.display.Text;
		public img_gift:Laya.Image;
		public img_icon:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/MaildItem");

        }

    }
}

module ui.main {
    export class MailPanelUI extends UIBase {
		public list:Laya.List;
		public btn_reAll:component.ScaleButton;
		public noDataBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/MailPanel");

        }

    }
}

module ui.main {
    export class MailReadPanelUI extends UIBase {
		public txt_content:laya.html.dom.HTMLDivElement;
		public btn_sure:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/MailReadPanel");

        }

    }
}

module ui.main {
    export class MainbuttomUI extends View {
		public btn_0: component.ScaleButton;
		public btn_1: component.ScaleButton;
		public btn_2: component.ScaleButton;
		public btn_3: component.ScaleButton;
		public btn_4: component.ScaleButton;
		public btn_5: component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/Mainbuttom");

        }

    }
}

module ui.main {
    export class MainCityPanelUI extends UIBase {
		public btn_main:Laya.Box;
		public btn_0_Red:Laya.Image;
		public btn_2_Red:Laya.Image;
		public btn_3_Red:Laya.Image;
		public btn_4_Red:Laya.Image;
		public btn_5_Red:Laya.Image;
		public ScrollArea:Laya.Panel;
		public item:Laya.Image;
		public btn_guild:Laya.Box;
		public img_guid:Laya.Image;
		public guildRed:Laya.Image;
		public btn_tianti:Laya.Box;
		public img_tianti:Laya.Image;
		public jjcRed:Laya.Image;
		public btn_friend:Laya.Box;
		public img_friend:Laya.Image;
		public friendRed:Laya.Image;
		public btn_boss:Laya.Box;
		public img_boss:Laya.Image;
		public bossRed:Laya.Image;
		public btn_copy:Laya.Box;
		public img_copy:Laya.Image;
		public copyRed:Laya.Image;
		public btn_comate:Laya.Box;
		public img_comate:Laya.Image;
		public comateRed:Laya.Image;
		public btn_race:Laya.Box;
		public img_race:Laya.Image;
		public btn_active:Laya.Box;
		public img_act:Laya.Image;
		public activityRed:Laya.Image;
		public btn_left:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/MainCityPanel");

        }

    }
}

module ui.main {
    export class MainLeftUI extends View {
		public leftBox:Laya.Box;
		public btn_0: component.ScaleButton;
		public btn_1: component.ScaleButton;
		public btn_2: component.ScaleButton;
		public btn_3: component.ScaleButton;
		public btn_4: component.ScaleButton;
		public TeamCountText:laya.display.Text;
		public topBox:Laya.Box;
		public btn_5: component.ScaleButton;
		public btn_6: component.ScaleButton;
		public OnlineTimeText:laya.display.Text;
		public btn_7: component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/MainLeft");

        }

    }
}

module ui.main {
    export class MapPanelUI extends UIBase {
		public MapList:Laya.List;
		public back_Btn:component.ScaleButton;
		public close_Btn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/MapPanel");

        }

    }
}

module ui.main {
    export class MapSelectPanelUI extends UIBase {
		public DesText:laya.display.Text;
		public AwardList:Laya.List;
		public okBtn:component.ScaleButton;
		public conditionTxt:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/MapSelectPanel");

        }

    }
}

module ui.main {
    export class MaterialCopyPanelUI extends View {
		public list:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("main/MaterialCopyPanel");

        }

    }
}

module ui.main {
    export class MinggeChangePanelUI extends UIBase {
		public changeBtn:component.ScaleButton;
		public itemList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/MinggeChangePanel");

        }

    }
}

module ui.main {
    export class MinggeEatPanelUI extends UIBase {
		public progressBox:Laya.Box;
		public oneKeyEatBtn:component.ScaleButton;
		public itemList:Laya.List;
		public eatBtn:component.ScaleButton;
		public nameLb:laya.display.Text;
		public expLb:laya.html.dom.HTMLDivElement;
		public selectBox:Laya.Box;
		public selectQualityLb:laya.display.Text;
		public arrowImg:Laya.Image;
		public selectOpenBox:Laya.Box;
		public qualityBtn4:Laya.Image;
		public qualityBtn3:Laya.Image;
		public qualityBtn2:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/MinggeEatPanel");

        }

    }
}

module ui.main {
    export class MinggeItemUI extends View {
		public Frame:Laya.Image;
		public icon:Laya.Image;
		public lbBox:Laya.Box;
		public lvLb:laya.display.Text;
		public maskImg:Laya.Image;
		public tipsLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/MinggeItem");

        }

    }
}

module ui.main {
    export class MonthSignInItemUI extends View {
		public dayNoLb:laya.display.Text;
		public itemBox:Laya.Box;
		public signImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/MonthSignInItem");

        }

    }
}

module ui.main {
    export class MonthSignInPanelUI extends View {
		public signInList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.main.MonthSignInItemUI",ui.main.MonthSignInItemUI);

            super.createChildren();
            this.loadUI("main/MonthSignInPanel");

        }

    }
}

module ui.main {
    export class MountLingjingPanelUI extends UIBase {
		public sp_combat:Laya.Sprite;
		public combatSp:Laya.Box;
		public world:Laya.Image;
		public combat:component.NumberImage;
		public btn_look: component.ScaleButton;
		public shengjiCostBox:Laya.Box;
		public shengjiBtn:component.ScaleButton;
		public attrList:Laya.List;
		public attrLb:Laya.Label;
		public shengjiLvLb:laya.display.Text;
		public subTitleLb:laya.display.Text;
		public attrListNext:Laya.List;
		public upArrowImg:Laya.Image;
		public equipBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/MountLingjingPanel");

        }

    }
}

module ui.main {
    export class MountModelItemUI extends View {

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("main/MountModelItem");

        }

    }
}

module ui.main {
    export class MountPanelUI extends UIBase {
		public bgImg:Laya.Image;
		public btn_0: component.ScaleButton;
		public btn_1:component.ScaleButton;
		public btn_2:component.ScaleButton;
		public sp_combat:Laya.Sprite;
		public combatSp:Laya.Box;
		public world:Laya.Image;
		public combat:component.NumberImage;
		public txt_name:laya.display.Text;
		public txt_costWord:laya.display.Text;
		public txt_tips:laya.display.Text;
		public txt_desc:laya.html.dom.HTMLDivElement;
		public txt_attr_desc:laya.html.dom.HTMLDivElement;
		public attrList:Laya.List;
		public cost:Laya.Box;
		public txt_costName:laya.display.Text;
		public txt_m:laya.html.dom.HTMLDivElement;
		public txt_leftFeed:laya.display.Text;
		public btn_lv:component.ScaleButton;
		public btn_translate:component.ScaleButton;
		public btn_look: component.ScaleButton;
		public tujianBtn:Laya.Button;
		public txt_star:laya.display.Text;
		public txt_fly:laya.display.Text;
		public img_state:Laya.Image;
		public txt_lv:laya.display.Text;
		public zonglanBox:Laya.Box;
		public bianyiBtn:component.ScaleButton;
		public lingjingBtn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/MountPanel");

        }

    }
}

module ui.main {
    export class MountTujianPanelUI extends UIBase {
		public attrList:Laya.List;
		public attrLb:Laya.Label;
		public tipsLb:laya.display.Text;
		public noAttrTips:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/MountTujianPanel");

        }

    }
}

module ui.main {
    export class NumStepUI extends View {
		public txt_num:Laya.TextInput;
		public btn_add:component.ScaleButton;
		public btn_shut:component.ScaleButton;
		public btn_stepShut:component.ScaleButton;
		public txt_shut:laya.display.Text;
		public btn_stepAdd:component.ScaleButton;
		public txt_add:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/NumStep");

        }

    }
}

module ui.main {
    export class OfflineRewardPanelUI extends UIBase {
		public txt_level:laya.display.Text;
		public txt_time:laya.display.Text;
		public txt_timeTips:laya.display.Text;
		public txt_money:laya.display.Text;
		public txt_exp:laya.display.Text;
		public btn_reward:component.ScaleButton;
		public list:Laya.List;
		public noDataBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/OfflineRewardPanel");

        }

    }
}

module ui.main {
    export class OpenServiceActivityPanelUI extends UIBase {
		public btn_0: component.ScaleButton;
		public selectImg:Laya.Image;
		public btn_1: component.ScaleButton;
		public btn1_red:Laya.Image;
		public btn_2: component.ScaleButton;
		public btn2_red:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/OpenServiceActivityPanel");

        }

    }
}

module ui.main {
    export class OSActivityChangeItemUI extends View {
		public bgImg:Laya.Image;
		public changeBtn:component.ScaleButton;
		public NumText:laya.display.Text;
		public NameText:laya.display.Text;
		public item1:Laya.Box;
		public numLb1:laya.html.dom.HTMLDivElement;
		public item2:Laya.Box;
		public numLb2:laya.html.dom.HTMLDivElement;
		public item3:Laya.Box;
		public numLb3:laya.html.dom.HTMLDivElement;
		public item4:Laya.Box;
		public numLb4:laya.html.dom.HTMLDivElement;
		public itemGet:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/OSActivityChangeItem");

        }

    }
}

module ui.main {
    export class OSActivityChangePanelUI extends View {
		public itemList:Laya.List;
		public timeLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.main.OSActivityChangeItemUI",ui.main.OSActivityChangeItemUI);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/OSActivityChangePanel");

        }

    }
}

module ui.main {
    export class OtherComateInfoPanelUI extends UIBase {
		public Stars:Laya.HBox;
		public NameText:laya.display.Text;
		public SkillsBox:Laya.Box;
		public pingfenLb:laya.display.Text;
		public equipBox:Laya.Box;
		public sp_combat:Laya.Box;
		public BattleText:component.NumberImage;
		public AttrBtn: component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/OtherComateInfoPanel");

        }

    }
}

module ui.main {
    export class OtherPetInfoPanelUI extends UIBase {
		public txt_level:laya.display.Text;
		public txt_name:laya.display.Text;
		public god:Laya.Image;
		public skillList:Laya.List;
		public pingfenLb:laya.display.Text;
		public equipBox:Laya.Box;
		public sp_combat:Laya.Sprite;
		public combatSp:Laya.Box;
		public combat:component.NumberImage;
		public btn_look: component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/OtherPetInfoPanel");

        }

    }
}

module ui.main {
    export class PersonBossItemUI extends View {
		public bitmapBox:Laya.Box;
		public headBg:Laya.Image;
		public txt_copyName:laya.display.Text;
		public txt_leftNum:laya.display.Text;
		public hasKill:Laya.Image;
		public btn:component.ScaleButton;
		public txt_tips:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/PersonBossItem");

        }

    }
}

module ui.main {
    export class PersonBossPanelUI extends View {
		public list:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("main/PersonBossPanel");

        }

    }
}

module ui.main {
    export class PetAddPointUI extends UIBase {
		public sub_attr_0:laya.html.dom.HTMLDivElement;
		public sub_attr_1:laya.html.dom.HTMLDivElement;
		public sub_attr_2:laya.html.dom.HTMLDivElement;
		public sub_attr_3:laya.html.dom.HTMLDivElement;
		public sub_attr_4:laya.html.dom.HTMLDivElement;
		public sub_attr_5:laya.html.dom.HTMLDivElement;
		public sub_attr_6:laya.html.dom.HTMLDivElement;
		public sub_attr_7:laya.html.dom.HTMLDivElement;
		public sub_attr_8:laya.html.dom.HTMLDivElement;
		public sub_attr_9:laya.html.dom.HTMLDivElement;
		public sub_attr_10:laya.html.dom.HTMLDivElement;
		public sub_attr_11:laya.html.dom.HTMLDivElement;
		public txt_leftPoint:laya.display.Text;
		public restPoint:component.ScaleButton;
		public helpAdd:component.ScaleButton;
		public sureAdd:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/PetAddPoint");

        }

    }
}

module ui.main {
    export class PetBossPanelUI extends View {
		public btn_rank:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/PetBossPanel");

        }

    }
}

module ui.main {
    export class PetChoujiangPanelUI extends UIBase {
		public titleLb:laya.display.Text;
		public viewBox:Laya.Box;
		public back_Btn:component.ScaleButton;
		public close_Btn: component.ScaleButton;
		public tabBtn1: component.ScaleButton;
		public tabBtn2:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/PetChoujiangPanel");

        }

    }
}

module ui.main {
    export class PetChoujiangViewUI extends View {
		public bgImg:Laya.Image;
		public btn_reward:component.ScaleButton;
		public costIcon:Laya.Image;
		public txt_time:laya.display.Text;
		public costNumLb:laya.display.Text;
		public wordList:Laya.List;
		public infoLb:laya.html.dom.HTMLDivElement;
		public itemBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/PetChoujiangView");

        }

    }
}

module ui.main {
    export class petCopyItemUI extends View {
		public head:Laya.Image;
		public star_0:Laya.Image;
		public star_1:Laya.Image;
		public star_2:Laya.Image;
		public img_select:Laya.Image;
		public hasPass:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("main/petCopyItem");

        }

    }
}

module ui.main {
    export class PetCopyPanelUI extends View {
		public bitmapBox:Laya.Box;
		public get1:Laya.Image;
		public btn_sweep:component.ScaleButton;
		public btn_enter:component.ScaleButton;
		public titleSubImg:Laya.Image;
		public txt_zang:component.NumberImage;
		public txt_rank:laya.display.Text;
		public b_0:ui.main.boxRewarldUI;
		public b_1:ui.main.boxRewarldUI;
		public b_2:ui.main.boxRewarldUI;
		public txt_tips:laya.display.Text;
		public txt_num:laya.display.Text;
		public get2:Laya.Image;
		public leftRedDot:Laya.Image;
		public rightRedDot:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("ui.main.boxRewarldUI",ui.main.boxRewarldUI);

            super.createChildren();
            this.loadUI("main/PetCopyPanel");

        }

    }
}

module ui.main {
    export class PetCopyRankItemUI extends View {
		public bg:Laya.Image;
		public img_select:Laya.Image;
		public txt_rank:laya.display.Text;
		public txt_name:laya.display.Text;
		public txt_fight:laya.display.Text;
		public txt_num:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/PetCopyRankItem");

        }

    }
}

module ui.main {
    export class PetCopyRankPanelUI extends UIBase {
		public list:Laya.List;
		public txt_myRank:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/PetCopyRankPanel");

        }

    }
}

module ui.main {
    export class PetCopyStarProgressUI extends View {
		public box:Laya.Box;
		public star_3:component.NumberImage;
		public star_2:component.NumberImage;
		public star_1:component.NumberImage;
		public passName:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/PetCopyStarProgress");

        }

    }
}

module ui.main {
    export class PetCopyStarRewardPanelUI extends UIBase {
		public txt_tips:laya.display.Text;
		public btn_sure:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/PetCopyStarRewardPanel");

        }

    }
}

module ui.main {
    export class PetDianhuaPanelUI extends UIBase {
		public sp_combat:Laya.Sprite;
		public combatSp:Laya.Box;
		public world:Laya.Image;
		public combat:component.NumberImage;
		public btn_look: component.ScaleButton;
		public dianhuaCostBox:Laya.Box;
		public dianhuaBtn:component.ScaleButton;
		public attrList:Laya.List;
		public attrLb:Laya.Label;
		public dianhuaLvLb:laya.display.Text;
		public attrTitleLb:laya.display.Text;
		public lvTipsLb:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/PetDianhuaPanel");

        }

    }
}

module ui.main {
    export class PetDianhuaSkillItemUI extends View {
		public itemBox:Laya.Box;
		public banImg:Laya.Image;
		public upBtn:component.ScaleButton;
		public costBox:Laya.Box;
		public costNumLb:laya.display.Text;
		public banLb:Laya.Label;
		public fullLb:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/PetDianhuaSkillItem");

        }

    }
}

module ui.main {
    export class PetFightSettingUI extends UIBase {
		public btn_sure:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/PetFightSetting");

        }

    }
}

module ui.main {
    export class PetInfoPanelUI extends View {
		public txt_level:laya.display.Text;
		public txt_name:laya.display.Text;
		public box_noActive:Laya.Box;
		public active:component.ScaleButton;
		public noCast:Laya.Box;
		public txt_cost:laya.html.dom.HTMLDivElement;
		public box_hasActive:Laya.Box;
		public showBtn:component.ScaleButton;
		public addPoint:component.ScaleButton;
		public fight:component.ScaleButton;
		public tujianBtn:component.ScaleButton;
		public dianhuaBtn:component.ScaleButton;
		public shoulingBtn:component.ScaleButton;
		public relive:component.ScaleButton;
		public god:Laya.Image;
		public hasFight:Laya.Image;
		public skillList:Laya.List;
		public pingfenLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/PetInfoPanel");

        }

    }
}

module ui.main {
    export class PetlearnSkillItemUI extends View {
		public img_select:Laya.Image;
		public txt_name:laya.display.Text;
		public txt_desc:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/PetlearnSkillItem");

        }

    }
}

module ui.main {
    export class PetLearnSkillPanelUI extends UIBase {
		public txt_lv:laya.display.Text;
		public btn_learn:component.ScaleButton;
		public skillList:Laya.List;
		public txt_tips:Laya.Box;
		public tujianBtn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/PetLearnSkillPanel");

        }

    }
}

module ui.main {
    export class PetLevelPanelUI extends View {
		public txt_name:laya.display.Text;
		public god:Laya.Image;
		public btn_one:component.ScaleButton;
		public skillList:Laya.List;
		public txt_lv:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/PetLevelPanel");

        }

    }
}

module ui.main {
    export class PetListItemUI extends View {
		public txt_num:laya.display.Text;
		public txt_pass:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/PetListItem");

        }

    }
}

module ui.main {
    export class PetPanelUI extends UIBase {
		public sp_combat:Laya.Sprite;
		public combatSp:Laya.Box;
		public world:Laya.Image;
		public combat:component.NumberImage;
		public btn_look: component.ScaleButton;
		public btnList:Laya.Panel;
		public btn_0: component.ScaleButton;
		public btn_1:component.ScaleButton;
		public btn_2:component.ScaleButton;
		public btn_3:component.ScaleButton;
		public btn_4:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/PetPanel");

        }

    }
}

module ui.main {
    export class PetRefineItemUI extends View {
		public img_select:Laya.Image;
		public txt_name:laya.display.Text;
		public txt_value:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/PetRefineItem");

        }

    }
}

module ui.main {
    export class PetRefinePanelUI extends View {
		public txt_lv_and_floor:laya.display.Text;
		public txt_m:laya.html.dom.HTMLDivElement;
		public btn_auto:component.ScaleButton;
		public barList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/PetRefinePanel");

        }

    }
}

module ui.main {
    export class PetRelivePanelUI extends UIBase {
		public btn_sure:component.ScaleButton;
		public btn_cancel:component.ScaleButton;
		public tipsLb:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/PetRelivePanel");

        }

    }
}

module ui.main {
    export class PetShouLingPanelUI extends UIBase {
		public sp_combat:Laya.Sprite;
		public combatSp:Laya.Box;
		public world:Laya.Image;
		public combat:component.NumberImage;
		public btn_look: component.ScaleButton;
		public shengjiCostBox:Laya.Box;
		public shengjiBtn:component.ScaleButton;
		public attrList:Laya.List;
		public attrLb:Laya.Label;
		public shengjiLvLb:laya.display.Text;
		public subTitleLb:laya.display.Text;
		public attrListNext:Laya.List;
		public upArrowImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/PetShouLingPanel");

        }

    }
}

module ui.main {
    export class PetSkillIconUI extends View {
		public lock:Laya.Image;
		public img_canlearn:Laya.Image;
		public txt_tips:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/PetSkillIcon");

        }

    }
}

module ui.main {
    export class PetSkillItemUI extends View {
		public img_select:Laya.Image;
		public txt_name:laya.display.Text;
		public txt_desc:laya.display.Text;
		public lock:Laya.Image;
		public img_gray:Laya.Image;
		public txt_tips:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/PetSkillItem");

        }

    }
}

module ui.main {
    export class PetSkillPanelUI extends View {
		public btn_forget:component.ScaleButton;
		public txt_lv:laya.display.Text;
		public skillList:Laya.List;
		public tujianBtn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/PetSkillPanel");

        }

    }
}

module ui.main {
    export class PetTrainPanelUI extends View {
		public maxLvLb:laya.display.Text;
		public costBox:Laya.Box;
		public btn_lv:component.ScaleButton;
		public txt_tips:laya.display.Text;
		public txt_m:laya.html.dom.HTMLDivElement;
		public txt_lv:laya.display.Text;
		public txt_floor:laya.display.Text;
		public txt_name:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/PetTrainPanel");

        }

    }
}

module ui.main {
    export class PetTujianEnterPanelUI extends UIBase {
		public itemList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("main/PetTujianEnterPanel");

        }

    }
}

module ui.main {
    export class PetTujianPanelUI extends UIBase {
		public sp_combat:Laya.Sprite;
		public combatSp:Laya.Box;
		public world:Laya.Image;
		public combat:component.NumberImage;
		public btn_look: component.ScaleButton;
		public dianhuaCostBox:Laya.Box;
		public useBtn:component.ScaleButton;
		public attrList:Laya.List;
		public attrLb:Laya.Label;
		public tujianLvLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/PetTujianPanel");

        }

    }
}

module ui.main {
    export class PlayerTitleItemUI extends View {
		public Bg:Laya.Image;
		public nameTxt:Laya.Label;
		public IsInstall:Laya.Image;
		public Bg1:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("main/PlayerTitleItem");

        }

    }
}

module ui.main {
    export class PlayerTitlePanelUI extends UIBase {
		public titleLb:laya.display.Text;
		public BattleText:component.NumberImage;
		public AttrBtn: component.ScaleButton;
		public changeBtn: component.ScaleButton;
		public desTxt:laya.display.Text;
		public infoText:laya.display.Text;
		public titleAni:Laya.Animation;
		public titleImg:Laya.Image;
		public timeTxt:laya.display.Text;
		public InstallBox:Laya.Box;
		public InstallAttrList:Laya.List;
		public installTitleTxt:laya.display.Text;
		public getBox:Laya.Box;
		public GetAttrlList:Laya.List;
		public back_Btn:component.ScaleButton;
		public close_Btn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/PlayerTitlePanel");

        }

    }
}

module ui.main {
    export class PopRewardPanelUI extends UIBase {
		public bgImg:Laya.Image;
		public maskClick:Laya.Sprite;
		public rewardList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("main/PopRewardPanel");

        }

    }
}

module ui.main {
    export class PropPanelUI extends UIBase {
		public txt_sys:laya.display.Text;
		public value_0:laya.display.Text;
		public value_1:laya.display.Text;
		public value_2:laya.display.Text;
		public value_3:laya.display.Text;
		public value_4:laya.display.Text;
		public value_5:laya.display.Text;
		public value_6:laya.display.Text;
		public value_7:laya.display.Text;
		public value_8:laya.display.Text;
		public value_9:laya.display.Text;
		public value_10:laya.display.Text;
		public value_11:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/PropPanel");

        }

    }
}

module ui.main {
    export class RankMainPanelUI extends UIBase {
		public Btn_0: component.ScaleButton;
		public Btn_1: component.ScaleButton;
		public Btn_2: component.ScaleButton;
		public Btn_3: component.ScaleButton;
		public Btn_4: component.ScaleButton;
		public Btn_5: component.ScaleButton;
		public Btn_6: component.ScaleButton;
		public Btn_7: component.ScaleButton;
		public Box1st:Laya.Box;
		public star1st:Laya.Image;
		public NameText1st:laya.display.Text;
		public ranitem1:Laya.Image;
		public ranitem2:Laya.Image;
		public ranitem3:Laya.Image;
		public ranitem4:Laya.Image;
		public LeftBtn:component.ScaleButton;
		public RightBtn:component.ScaleButton;
		public Page:component.NumberImage;
		public MyRankText:laya.display.Text;
		public Value1st:component.NumberImage;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("component.NumberImage",component.NumberImage);

            super.createChildren();
            this.loadUI("main/RankMainPanel");

        }

    }
}

module ui.main {
    export class RechargeItemUI extends View {
		public goldImg:Laya.Image;
		public doubleBox:Laya.Box;
		public goldLb:laya.display.Text;
		public moneyLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/RechargeItem");

        }

    }
}

module ui.main {
    export class RechargePanelUI extends UIBase {
		public backBtn:component.ScaleButton;
		public rewardList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("ui.main.RechargeItemUI",ui.main.RechargeItemUI);

            super.createChildren();
            this.loadUI("main/RechargePanel");

        }

    }
}

module ui.main {
    export class RechargeRewardItemUI extends View {
		public bgImg:Laya.Image;
		public tipsLb:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/RechargeRewardItem");

        }

    }
}

module ui.main {
    export class RechargeRewardPanelUI extends UIBase {
		public roleBox:Laya.Box;
		public combat:component.NumberImage;
		public moneyTipsLb:laya.display.Text;
		public LeftBtn:component.ScaleButton;
		public RightBtn:component.ScaleButton;
		public pageList:Laya.List;
		public sureBtn:component.ScaleButton;
		public rewardBox:Laya.Box;
		public rechargeLb:laya.display.Text;
		public tipsTopBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("ui.main.RechargeRewardItemUI",ui.main.RechargeRewardItemUI);

            super.createChildren();
            this.loadUI("main/RechargeRewardPanel");

        }

    }
}

module ui.main {
    export class RoleHeartMethodPanelUI extends View {
		public LockBox:Laya.Box;
		public BattleValue:component.NumberImage;
		public UnlockBox:Laya.Box;
		public SelectImg:Laya.Image;
		public currentHeartText:laya.display.Text;
		public upgardeBox:Laya.Box;
		public GoodsTxt:laya.html.dom.HTMLDivElement;
		public AutoBtn:component.ScaleButton;
		public MaxTips:laya.display.Text;
		public attrList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("component.NumberImage",component.NumberImage);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/RoleHeartMethodPanel");

        }

    }
}

module ui.main {
    export class RoleInfoPanelUI extends View {
		public txt_soar:laya.display.Text;
		public txt_level:laya.display.Text;
		public txt_name:laya.display.Text;
		public btn_addPoint:component.ScaleButton;
		public btn_look: component.ScaleButton;
		public btn_changeEquip:component.ScaleButton;
		public soarBtn:component.ScaleButton;
		public combat:component.NumberImage;
		public chengjiuBtn:component.ScaleButton;
		public chenghaoBtn:component.ScaleButton;
		public fabaoBtn:component.ScaleButton;
		public shizhuangBtn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.NumberImage",component.NumberImage);

            super.createChildren();
            this.loadUI("main/RoleInfoPanel");

        }

    }
}

module ui.main {
    export class RoleJIngMaiItemUI extends View {
		public btn:component.ScaleButton;
		public icon:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/RoleJIngMaiItem");

        }

    }
}

module ui.main {
    export class RoleJingMaiPanelUI extends View {
		public attrList:Laya.List;
		public upgardeBox:Laya.Box;
		public GoodsTxt:laya.html.dom.HTMLDivElement;
		public AutoBtn:component.ScaleButton;
		public BattleValue:component.NumberImage;
		public JingMaiList:Laya.List;
		public MaxTips:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("component.NumberImage",component.NumberImage);

            super.createChildren();
            this.loadUI("main/RoleJingMaiPanel");

        }

    }
}

module ui.main {
    export class RolePanelUI extends UIBase {
		public btn_0: component.ScaleButton;
		public btn_1:component.ScaleButton;
		public btn_2:component.ScaleButton;
		public btn_3:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/RolePanel");

        }

    }
}

module ui.main {
    export class RoleSoarPanelUI extends UIBase {
		public UpGradeBtn:component.ScaleButton;
		public TipsText:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/RoleSoarPanel");

        }

    }
}

module ui.main {
    export class SanjieCopyItemUI extends View {
		public bgImg:Laya.Image;
		public roleBox:Laya.Box;
		public killedImg:Laya.Image;
		public titleLb:laya.display.Text;
		public bgImg2:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/SanjieCopyItem");

        }

    }
}

module ui.main {
    export class SanjieCopyPanelUI extends View {
		public btn_sweep:component.ScaleButton;
		public btn_enter:component.ScaleButton;
		public maxPassLb:laya.display.Text;
		public rankBox:Laya.Box;
		public rank1:laya.display.Text;
		public rank2:laya.display.Text;
		public rank3:laya.display.Text;
		public rankNo1:laya.display.Text;
		public rankNo2:laya.display.Text;
		public rankNo3:laya.display.Text;
		public txt_rank:laya.display.Text;
		public iconTipsBox:Laya.Box;
		public funcOpenBox:Laya.Box;
		public talkLb:laya.html.dom.HTMLDivElement;
		public proBox:Laya.Box;
		public box1:Laya.Image;
		public box2:Laya.Image;
		public box3:Laya.Image;
		public getImg1:Laya.Image;
		public getImg2:Laya.Image;
		public getImg3:Laya.Image;
		public boxStage1:laya.display.Text;
		public boxStage2:laya.display.Text;
		public boxStage3:laya.display.Text;
		public boxBtnL:component.ScaleButton;
		public boxBtnR:component.ScaleButton;
		public stageBtnL:component.ScaleButton;
		public stageBtnR:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/SanjieCopyPanel");

        }

    }
}

module ui.main {
    export class SanjieCopyRankPanelUI extends UIBase {
		public list:Laya.List;
		public txt_myRank:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/SanjieCopyRankPanel");

        }

    }
}

module ui.main {
    export class SeleclSceneObjUI extends UIBase {
		public FrameBg:Laya.Image;
		public List:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("main/SeleclSceneObj");

        }

    }
}

module ui.main {
    export class SelectRoleUI extends UIBase {
		public PlayerImage:Laya.Image;
		public startBtn:component.ScaleButton;
		public Name:laya.display.Text;
		public btn_delete:component.ScaleButton;
		public btn_create:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/SelectRole");

        }

    }
}

module ui.main {
    export class ServerItem1UI extends View {
		public ServerState:Laya.Image;
		public ServerName:laya.display.Text;
		public ServerFlag:Laya.Image;
		public hasRole:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/ServerItem1");

        }

    }
}

module ui.main {
    export class ServerListPanelUI extends UIBase {
		public serverList:Laya.List;
		public regionList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/ServerListPanel");

        }

    }
}

module ui.main {
    export class ShopMallPanelUI extends UIBase {
		public BG:Laya.Image;
		public icon:Laya.Image;
		public txt_money:laya.display.Text;
		public list:Laya.List;
		public btnList:Laya.List;
		public btn_recharge:component.ScaleButton;
		public equipBox:Laya.Box;
		public list1:Laya.List;
		public Sublist:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/ShopMallPanel");

        }

    }
}

module ui.main {
    export class ShopSubItemUI extends View {
		public Btn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/ShopSubItem");

        }

    }
}

module ui.main {
    export class ShopTabItemUI extends View {
		public btn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/ShopTabItem");

        }

    }
}

module ui.main {
    export class ShowRewardPanelUI extends UIBase {
		public btn_ok:component.ScaleButton;
		public subTitle:laya.display.Text;
		public rewardList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/ShowRewardPanel");

        }

    }
}

module ui.main {
    export class SkillItem1UI extends View {
		public Frame:Laya.Image;
		public icon:Laya.Sprite;
		public Btn:Laya.Button;
		public UpGradeBox:Laya.Box;
		public Text:laya.display.Text;
		public NameLabel:laya.display.Text;
		public lockImg:Laya.Image;
		public selectImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/SkillItem1");

        }

    }
}

module ui.main {
    export class SkillPanelUI extends View {
		public upBgBox:Laya.Image;
		public downBgBox:Laya.Box;
		public CostImage:Laya.Image;
		public equipSkillBtn:component.ScaleButton;
		public UpgradeOneKeyBtn:component.ScaleButton;
		public UpgradeBtn:component.ScaleButton;
		public SkillGroupBtn1:component.ScaleButton;
		public SkillGroupBtn2:component.ScaleButton;
		public SkillGroupBtn3:component.ScaleButton;
		public feishengResetBtn:component.ScaleButton;
		public CostLabel:laya.html.dom.HTMLDivElement;
		public NameDes:laya.html.dom.HTMLDivElement;
		public AttrDes:laya.html.dom.HTMLDivElement;
		public NextDes:laya.html.dom.HTMLDivElement;
		public feishengBox:Laya.Box;
		public feishengPointLb:laya.display.Text;
		public noDataBox:Laya.Box;
		public tejiSkillTipsLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/SkillPanel");

        }

    }
}

module ui.main {
    export class SmellPanelUI extends UIBase {
		public btn_smell:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/SmellPanel");

        }

    }
}

module ui.main {
    export class SmellSelectPanelUI extends UIBase {
		public sure:component.ScaleButton;
		public selectAllBtn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/SmellSelectPanel");

        }

    }
}

module ui.main {
    export class StartGamePanelUI extends UIBase {
		public ServerListBtn:Laya.Button;
		public currentServerTxt:laya.display.Text;
		public CurrentServerState:Laya.Image;
		public LoginBtn:component.ScaleButton;
		public Loging:Laya.Panel;
		public gonggaoBtn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/StartGamePanel");

        }

    }
}

module ui.main {
    export class StrengthPanelUI extends View {
		public btn_str:component.ScaleButton;
		public cost:Laya.Box;
		public txt_m0:laya.html.dom.HTMLDivElement;
		public txt_m1:laya.html.dom.HTMLDivElement;
		public arrow:Laya.Image;
		public gemIcons:Laya.Box;
		public gem_0:Laya.Image;
		public gem_1:Laya.Image;
		public gem_2:Laya.Image;
		public gem_3:Laya.Image;
		public tejiqianghuaBtn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/StrengthPanel");

        }

    }
}

module ui.main {
    export class StuffCopyItemUI extends View {
		public txt_name:laya.display.Text;
		public txt_world:laya.display.Text;
		public txt_num:laya.display.Text;
		public btn_enter:component.ScaleButton;
		public txt_tips:laya.display.Text;
		public overImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/StuffCopyItem");

        }

    }
}

module ui.main {
    export class StuffCopyPanelUI extends UIBase {
		public btnList:Laya.Panel;
		public btn_0: component.ScaleButton;
		public btn_1:component.ScaleButton;
		public btn_2:component.ScaleButton;
		public btn_3:component.ScaleButton;
		public btn_4:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/StuffCopyPanel");

        }

    }
}

module ui.main {
    export class SuperBossChapItemUI extends View {
		public bgImg:Laya.Image;
		public rewardBox:Laya.Box;
		public roleBox:Laya.Box;
		public killedImg:Laya.Image;
		public selectImg:Laya.Image;
		public costImg:Laya.Image;
		public sureBtn:component.ScaleButton;
		public typeLb:laya.display.Text;
		public titleLb:laya.display.Text;
		public costLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/SuperBossChapItem");

        }

    }
}

module ui.main {
    export class SuperBossChapPanelUI extends UIBase {
		public bossList:Laya.List;
		public rewardBox:Laya.Box;
		public sureBtn:component.ScaleButton;
		public closeBtn1: component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("ui.main.SuperBossChapItemUI",ui.main.SuperBossChapItemUI);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/SuperBossChapPanel");

        }

    }
}

module ui.main {
    export class SuperBossItemUI extends View {
		public bitmapBox:Laya.Box;
		public headBg:Laya.Image;
		public txt_chapName:laya.display.Text;
		public txt_leftNum:laya.display.Text;
		public sureBtn:component.ScaleButton;
		public rewardBox:Laya.Box;
		public getImgBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/SuperBossItem");

        }

    }
}

module ui.main {
    export class TaskPanelUI extends UIBase {
		public taskBtn:component.ScaleButton;
		public Icon:Laya.Image;
		public txt:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/TaskPanel");

        }

    }
}

module ui.main {
    export class TeamBeRequestPanelUI extends UIBase {
		public LeaderList:Laya.List;
		public allCancelBtn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/TeamBeRequestPanel");

        }

    }
}

module ui.main {
    export class TeamItem1UI extends View {
		public NameText:laya.display.Text;
		public LvText:laya.display.Text;
		public FriendshipText:laya.display.Text;
		public RoleIcon:Laya.Image;
		public BattlePowerText:laya.display.Text;
		public TeamCountText:laya.display.Text;
		public ActionBtn:component.ScaleButton;
		public isLeaderFlag:Laya.Image;
		public AddBtn:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/TeamItem1");

        }

    }
}

module ui.main {
    export class TeamItem2UI extends View {
		public Btn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/TeamItem2");

        }

    }
}

module ui.main {
    export class TeamItem3UI extends View {
		public LvText:laya.display.Text;
		public BattlePowerText:laya.display.Text;
		public TimeText:laya.display.Text;
		public NoticeText:laya.html.dom.HTMLDivElement;
		public AllowBtn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/TeamItem3");

        }

    }
}

module ui.main {
    export class TeamMainPanelUI extends UIBase {
		public TeamCombo:Laya.ComboBox;
		public TeamList:Laya.List;
		public CreateBtn: component.ScaleButton;
		public FindBtn: component.ScaleButton;
		public Refresh: component.ScaleButton;
		public mapBtn:Laya.Button;
		public TipsTxt:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/TeamMainPanel");

        }

    }
}

module ui.main {
    export class TeamRequsetPanelUI extends UIBase {
		public TeamRequestList:Laya.List;
		public btn_1:component.ScaleButton;
		public btn_2:component.ScaleButton;
		public btn_3:component.ScaleButton;
		public noDataBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/TeamRequsetPanel");

        }

    }
}

module ui.main {
    export class TejiQianghuaPanelUI extends UIBase {
		public dianhuaBtn:component.ScaleButton;
		public costNumLb:laya.display.Text;
		public itemBox:Laya.Box;
		public costItemBox:Laya.Box;
		public noDataBox:Laya.Box;
		public progressBox:Laya.Box;
		public skillBox:Laya.Box;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/TejiQianghuaPanel");

        }

    }
}

module ui.main {
    export class TestLoginUI extends UIBase {
		public WssLoginBtn:component.ScaleButton;
		public NameInput:Laya.TextInput;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/TestLogin");

        }

    }
}

module ui.main {
    export class tipsUI extends View {

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/tips");

        }

    }
}

module ui.main {
    export class TongtiantaItemUI extends View {
		public windowImg:Laya.Image;
		public doorBase:Laya.Box;
		public doorImg:Laya.Image;
		public lockImg:Laya.Image;
		public stageLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/TongtiantaItem");

        }

    }
}

module ui.main {
    export class TongtiantaPanelUI extends View {
		public txt_rank:laya.display.Text;
		public leftTimeLb:laya.display.Text;
		public addTimeBtn:Laya.Button;
		public txt_shop:laya.display.Text;
		public baseContent:Laya.Panel;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/TongtiantaPanel");

        }

    }
}

module ui.main {
    export class TongtiantaRankItemUI extends View {
		public bg:Laya.Image;
		public img_select:Laya.Image;
		public txt_rank:laya.display.Text;
		public txt_name:laya.display.Text;
		public txt_fight:laya.display.Text;
		public txt_num:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/TongtiantaRankItem");

        }

    }
}

module ui.main {
    export class TongtiantaRankPanelUI extends UIBase {
		public list:Laya.List;
		public txt_myRank:laya.display.Text;
		public rewardLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/TongtiantaRankPanel");

        }

    }
}

module ui.main {
    export class TouzijihuaItemUI extends View {
		public getBtn: component.ScaleButton;
		public hasGetImg:Laya.Image;
		public rewardBox:Laya.Box;
		public lvLb:laya.display.Text;
		public lvNoLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/TouzijihuaItem");

        }

    }
}

module ui.main {
    export class TouzijihuaPanelUI extends UIBase {
		public sureBtn:component.ScaleButton;
		public showList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("ui.main.TouzijihuaItemUI",ui.main.TouzijihuaItemUI);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/TouzijihuaPanel");

        }

    }
}

module ui.main {
    export class UnLcokMountPanelUI extends View {
		public btn_tran:component.ScaleButton;
		public txt_name:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/UnLcokMountPanel");

        }

    }
}

module ui.main {
    export class WorldBossDamageRankPanelUI extends UIBase {
		public itemList:Laya.List;
		public rankLb:Laya.Label;
		public nameLb:Laya.Label;
		public damageLb:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/WorldBossDamageRankPanel");

        }

    }
}

module ui.main {
    export class WorldBossItemUI extends View {
		public bitmapBox:Laya.Box;
		public headBg:Laya.Image;
		public txt_name:laya.display.Text;
		public txt_record:laya.display.Text;
		public haskill:Laya.Image;
		public btn:component.ScaleButton;
		public txt_tips:laya.display.Text;
		public txt_num:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/WorldBossItem");

        }

    }
}

module ui.main {
    export class WorldBossKillPanelUI extends UIBase {
		public TimeTxt:laya.display.Text;
		public NameTxt:laya.display.Text;
		public BattleTxt:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/WorldBossKillPanel");

        }

    }
}

module ui.main {
    export class WorldBossPanelUI extends View {
		public list:Laya.List;
		public txt_leftNum:laya.display.Text;
		public btn_add:component.ScaleButton;
		public btn_tip:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/WorldBossPanel");

        }

    }
}

module ui.main {
    export class WorldHudFightPanelUI extends UIBase {
		public box:Laya.Box;
		public bossHp:laya.display.Text;
		public DamageText:laya.display.Text;
		public RankText:laya.display.Text;
		public MyRank:laya.display.Text;
		public MyDamage:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/WorldHudFightPanel");

        }

    }
}

module ui.main {
    export class WorldNoticePanelUI extends UIBase {
		public box:Laya.Box;
		public BgImage:Laya.Image;
		public headBg:Laya.Image;
		public Txt:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/WorldNoticePanel");

        }

    }
}

module ui.main {
    export class WudaohuiPanelUI extends UIBase {
		public startMatchBtn:component.ScaleButton;
		public matchingLb:laya.html.dom.HTMLDivElement;
		public itemBox:Laya.Box;
		public getImg1:Laya.Image;
		public getImg2:Laya.Image;
		public getImg3:Laya.Image;
		public winTitleLb1:laya.display.Text;
		public winTitleLb2:laya.display.Text;
		public winTitleLb3:laya.display.Text;
		public winTimeLb:laya.display.Text;
		public loseTimeLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/WudaohuiPanel");

        }

    }
}

module ui.main {
    export class WujinshilianEnterPanelUI extends UIBase {
		public normalEnterBtn:component.ScaleButton;
		public itemBox:Laya.Box;
		public flyEnterBtn:component.ScaleButton;
		public maxStageLb:laya.display.Text;
		public wantStageLb:laya.display.Text;
		public closeBtn2:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/WujinshilianEnterPanel");

        }

    }
}

module ui.main {
    export class YuekaPanelUI extends UIBase {
		public sureBtn:component.ScaleButton;
		public rewardBox:Laya.Box;
		public tipsLb1:laya.html.dom.HTMLDivElement;
		public tipsLb2:laya.html.dom.HTMLDivElement;
		public tipsLb3:laya.html.dom.HTMLDivElement;
		public tipsLb4:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/YuekaPanel");

        }

    }
}

module ui.main {
    export class YYGiveBackPanelUI extends UIBase {
		public btn_0: component.ScaleButton;
		public btn_1:component.ScaleButton;
		public btn_2:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/YYGiveBackPanel");

        }

    }
}

module ui.main {
    export class YYLibaoPanelUI extends UIBase {
		public wordImg:Laya.Image;
		public btn_0: component.ScaleButton;
		public btn_1: component.ScaleButton;
		public btn_2: component.ScaleButton;
		public btn_3: component.ScaleButton;
		public buyBtn:component.ScaleButton;
		public rewardBox:Laya.Box;
		public lastPriceLb:laya.display.Text;
		public realPriceLb:laya.display.Text;
		public leftTimeLb:laya.display.Text;
		public titleLb:laya.display.Text;
		public testLb1:laya.display.Text;
		public testLb2:laya.display.Text;
		public tabLb0:laya.html.dom.HTMLDivElement;
		public tabLb1:laya.html.dom.HTMLDivElement;
		public tabLb2:laya.html.dom.HTMLDivElement;
		public tabLb3:laya.html.dom.HTMLDivElement;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent(" component.ScaleButton", component.ScaleButton);
			View.regComponent("component.ScaleButton",component.ScaleButton);
			View.regComponent("Text",laya.display.Text);
			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);

            super.createChildren();
            this.loadUI("main/YYLibaoPanel");

        }

    }
}

module ui.main {
    export class YYLoginDayRewardItemUI extends View {
		public IsGet:Laya.Image;
		public day_txt:laya.display.Text;
		public GetBtn:component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);
			View.regComponent("component.ScaleButton",component.ScaleButton);

            super.createChildren();
            this.loadUI("main/YYLoginDayRewardItem");

        }

    }
}

module ui.main {
    export class YYLoginDayRewardPanelUI extends UIBase {
		public headBgImg:Laya.Image;
		public RewardList:Laya.List;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("main/YYLoginDayRewardPanel");

        }

    }
}

module ui.main {
    export class YYRankItemUI extends View {
		public rewardBox:Laya.Box;
		public rankLb:laya.html.dom.HTMLDivElement;
		public noDataLb:laya.display.Text;
		public nameLb:laya.display.Text;
		public powerLb:laya.display.Text;
		public lookBtn: component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HTMLDivElement",laya.html.dom.HTMLDivElement);
			View.regComponent("Text",laya.display.Text);
			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/YYRankItem");

        }

    }
}

module ui.main {
    export class YYRankPanelUI extends UIBase {
		public itemList:Laya.List;
		public timeLb:laya.display.Text;
		public btn_0: component.ScaleButton;
		public btn_1: component.ScaleButton;
		public btn_2: component.ScaleButton;
		public btn_3: component.ScaleButton;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.main.YYRankItemUI",ui.main.YYRankItemUI);
			View.regComponent("Text",laya.display.Text);
			View.regComponent(" component.ScaleButton", component.ScaleButton);

            super.createChildren();
            this.loadUI("main/YYRankPanel");

        }

    }
}

module ui.main {
    export class YYRechargeGiveBackItemUI extends View {
		public bgImg:Laya.Image;
		public wordImgSub:Laya.Image;
		public combat:component.NumberImage;
		public progressBox:Laya.Box;
		public rewardBox:Laya.Box;
		public getImg:Laya.Image;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("component.NumberImage",component.NumberImage);

            super.createChildren();
            this.loadUI("main/YYRechargeGiveBackItem");

        }

    }
}

module ui.main {
    export class YYRechargeGiveBackPanelUI extends View {
		public itemList:Laya.List;
		public timeLb:laya.display.Text;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.main.YYRechargeGiveBackItemUI",ui.main.YYRechargeGiveBackItemUI);
			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.loadUI("main/YYRechargeGiveBackPanel");

        }

    }
}
