import { _decorator, Component, Node, Label, Prefab, instantiate } from 'cc';
import { ResourceUtils } from '../utils/ResourceUtils';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property(Node)
    public uiNode: Node;
    @property(Node)
    public gamePlayNode: Node;
    @property(Label)
    public levelLb:Label;

    public gameScore=0;
    public gameLevel;
    public playerPlane:Node;
    start() {
       
    }
    public loadPlyerPlane(finishCallback){
        ResourceUtils.loadPrefab('prefab/playerPlane',(prefab:Prefab) =>{
            this.playerPlane = instantiate(prefab);
            this.gamePlayNode.addChild(this.playerPlane);
            finishCallback();
        })
    }
}


