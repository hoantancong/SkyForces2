import { _decorator, Component, Node, dragonBones, input, Input, EventTouch, Vec3, tween, Prefab, path, instantiate, NodePool } from 'cc';
import { Configs } from '../utils/Configs';
import { ResourceUtils } from '../utils/ResourceUtils';
import { Utils } from '../utils/Utils';
import { PlayerBullet } from './PlayerBullet';
const { ccclass, property } = _decorator;

@ccclass('PlayerPlane')
export class PlayerPlane extends Component {
    @property(Node)
    private planeBody:Node;
    
    private bulletPrefab:Prefab;

    //
    private bulletType:number = 1;
    private planeType:number = 0;
    //create bullet pool
    private bulletPool;
    onLoad(){
        this.node.active=false;
    }
    start() {

    }  
    //move the plane 
    public setPlaneType(planeType:number){
        //0,1,2
        this.planeType = planeType-1;
        let armatureDisplay = this.planeBody.getComponent(dragonBones.ArmatureDisplay);
        let armature = armatureDisplay!.armature();
        let slots = armature.getSlots();
        slots[0].displayIndex = this.planeType;
        this.node.active=true;
        //set up move input
        this.setUpInput();
        //load bullet prefab
        this.loadBulletPrefab();
    }
    private setUpInput(){
        input.on(Input.EventType.TOUCH_MOVE,this.onTouchMove,this);
    }
    private onTouchMove(event:EventTouch){
        let touchLocation = event.getUILocation();
        let loc = new Vec3(touchLocation.x -Configs.HALF_SCENE_WIDTH, touchLocation.y- Configs.HALF_SCENE_HEIGHT, 0);
        //tween(this.node).to(0.5,{position:loc}).start();
        this.node.setPosition(loc);
    }
    private loadBulletPrefab(){
        let bulletPath = 'prefab/PlayerBullet'+this.bulletType;
        ResourceUtils.loadPrefab(bulletPath,(prefab:Prefab)=>{
            this.bulletPrefab = prefab;
            //
            this.bulletPool = new NodePool();
            for(let i = 0; i < 20;i++){
                let newBullet:Node = instantiate(this.bulletPrefab);
                newBullet.getComponent(PlayerBullet).setUp(()=>{
                    //reput to pool
                    this.bulletPool.put(newBullet);
                })
                this.bulletPool.put(newBullet);
            }
        })
    }
    private fire(){
        if(this.bulletPrefab){
            let newBullet:Node = this.bulletPool.get();
            this.node.parent.addChild(newBullet);
            //
            newBullet.getComponent(PlayerBullet).fire(this.node.position);

        }
    }
    private timeCount:number = 0;

    update(deltaTime: number) {
        this.timeCount+=deltaTime;
        if(this.timeCount>=0.2){
            this.fire();
            this.timeCount=0;
        }
    }
}


