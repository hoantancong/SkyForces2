import { _decorator, Component, Node, ProgressBar, Sprite, Collider2D, Contact2DType, IPhysics2DContact, Vec3 } from 'cc';
import { ShipType } from './item/ShipType';
import { PlayerBullet } from './object/PlayerBullet';
import { Configs } from './utils/Configs';
import { Utils } from './utils/Utils';
const { ccclass, property } = _decorator;

@ccclass('ShipController')
export class ShipController extends Component {
    @property(ProgressBar)
    healthProgress: ProgressBar;

    @property(Sprite)
    shipSprite: Sprite;

    //health
    health: number;
    fullHealth: number;
    //speed
    speed: number;
    dieCallback
    direction;
    start() {
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
/*     setUp(shipType:ShipType, position: Vec3,dieCallback) {

        //set ship frame
        this.shipSprite.spriteFrame = shipType.shipSpriteFame;
        this.health = this.fullHealth = shipType.shipHealth;
        this.speed = shipType.shipSpeed;
        this.node.setPosition(position);
        this.dieCallback = dieCallback;
        this.direction = new Vec3(0, this.speed, 0);

    } */
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        Utils.Log('hit');
        if (this.node) {
            let hitObject: Node = otherCollider.node;
            console.log(hitObject);

            if (hitObject.name.includes(Configs.PLAYER_BULLET_NAME)) {
                let damageHealth = hitObject.getComponent(PlayerBullet).getDamage();
                this.health -= damageHealth;
                //update progressbar
                this.healthProgress.progress = this.health / this.fullHealth;
                if (this.health <= 0) {
                    Utils.Log('die');
                    //destroy
                    //if(this.dieCallback)
                    //this.dieCallback(this.node);
                    //if(this.dieCallback) this.dieCallback(this.node.position);
                    this.node.destroy();
      

                }
                //reput bullet to the pool 
                hitObject.getComponent(PlayerBullet).hitEnemyShip();

            }
        }
    }
    update(deltaTime: number) {
        //update
    }   
}


