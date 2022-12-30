import { _decorator, Component, Node, director } from 'cc';
import { PlayerData } from '../PlayerData';
import { Configs } from '../utils/Configs';
const { ccclass, property } = _decorator;

@ccclass('MenuController')
export class MenuController extends Component {
    @property(Node)
    private planeSelectUI:Node;
    start() {

    }
    public onClickStart(){
        //audio
        //show plane select
        this.planeSelectUI.active=true;

    }
    public onClickPlane(event,planeType){
        PlayerData.instant.planeType = planeType;
        director.loadScene(Configs.GAME_SCENE_NAME);
        //planeType => luu vao player prefab
        //singleton
    }
    update(deltaTime: number) {
        
    }
}


