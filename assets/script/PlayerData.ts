import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerData')
export class PlayerData extends Component {
    public static instant:PlayerData;
    public planeType:number;
    start() {
        if(PlayerData.instant==null) {
            PlayerData.instant =this;
            director.addPersistRootNode(this.node);
        }
    }
}


