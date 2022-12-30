import { _decorator, Component, Node, PhysicsSystem2D, EPhysics2DDrawFlags, director } from 'cc';
import { GameModel } from '../model/GameModel';
import { PlayerPlane } from '../object/PlayerPlane';
import { PlayerData } from '../PlayerData';
import { ResourceUtils } from '../utils/ResourceUtils';
import { Utils } from '../utils/Utils';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Node)
    gameModelNode: Node;
    gameModel: GameModel;
    start() {
        //
        this.debugPhysic();
        this.gameModel = this.gameModelNode.getComponent(GameModel);
        this.gameModel.loadPlyerPlane(() => {
            this.beginLevel();
        })
    }
    private debugPhysic() {
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
            EPhysics2DDrawFlags.Pair |
            EPhysics2DDrawFlags.CenterOfMass |
            EPhysics2DDrawFlags.Joint |
            EPhysics2DDrawFlags.Shape;
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.All
    }
    private beginLevel() {
        //set plane type;
        Utils.Log('begin');
        this.gameModel.playerPlane.getComponent(PlayerPlane).setPlaneType(PlayerData.instant.planeType);
    }
    update(deltaTime: number) {

    }
}


