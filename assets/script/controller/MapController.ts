import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MapController')
export class MapController extends Component {
    start() {
        //start map
    }

    update(deltaTime: number) {
        this.node.translate(new Vec3(0,-1,0));
    }
}


