import { FactionVo } from "../../../../../db/sheet/vo/FactionVo";
import { Fashion_cfgVo } from "../../../../../db/sheet/vo/Fashion_cfgVo";

export class FashionHelper {

    public static getAnimRes(Faction, Clothes, Sex): string {
        var url = "";
        var resPath = "";
        //时装用的是这个playerInfo.Clothes
        var vo: FactionVo = FactionVo.get(Faction);
        var path: number = GMath.getPath(180);
        if (Clothes == 0 || !Clothes) {
            resPath = vo.body_anim[Sex == 1 ? 0 : 1];
        } else {
            var fashionVo: Fashion_cfgVo = Fashion_cfgVo.get(Clothes);
            if (fashionVo && fashionVo.body_anim) {
                resPath = fashionVo.body_anim;
            } else {
                resPath = vo.body_anim[Sex == 1 ? 0 : 1];
            }
        }
        // if (resPath != "") {
        //     url = ResUtils.getRoleUrl(resPath, Action.stand, path);
        // }
        return resPath;
    }

}