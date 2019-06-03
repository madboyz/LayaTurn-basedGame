import { SheetManager } from "../SheetManager";
import { CHAT_EMOTION_CFG_BASE } from "../base/CHAT_EMOTION_CFG_BASE";

export class Chat_emotion_cfgVo extends CHAT_EMOTION_CFG_BASE {

  public static get(id: number, index: number = -1): Chat_emotion_cfgVo {
    if (this[id]) return this[id];
    var vo: Chat_emotion_cfgVo = new Chat_emotion_cfgVo();
    this[id] = vo;
    return SheetManager.get("chat_emotion_cfg", id, this[id], vo.keys(), index);
  }

  private static datas: Array<Chat_emotion_cfgVo>;
  public static getAll(): Array<Chat_emotion_cfgVo> {
    if (!this.datas) {
      this.datas = [];
      var list: any = SheetManager.getList("chat_emotion_cfg");
      for (var key in list) {
        var vo: Chat_emotion_cfgVo = this.get(parseInt(key));
        this.datas.push(vo);
      }
    }
    return this.datas;
  }

}