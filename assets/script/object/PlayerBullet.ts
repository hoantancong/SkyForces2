import { _decorator, Component, Node, Vec3 } from 'cc';
import { Configs } from '../utils/Configs';
const { ccclass, property } = _decorator;

@ccclass('PlayerBullet')
export class PlayerBullet extends Component {
    @property(Number)
    private speed:number = 0;
    private removeCallback;
    private isPaused:boolean = false;
    private damage:number = 10;
    start() {

    }
    public setUp(removeCallback){
        this.removeCallback = removeCallback;
    }
    public fire(position:Vec3){
        this.isPaused=false;
        this.node.setWorldPosition(position.add(new Vec3(360,640)));
    }
    public hitEnemyShip(){
        if(this.isPaused) return;
        this.isPaused=true;
        if(this.removeCallback) this.removeCallback();
     
    }
    public getDamage(){
        return this.damage;
    }
    //collision check
    private outOfScreen(){
        if(this.removeCallback) this.removeCallback();
    }
    update(deltaTime: number) {
        if(this.isPaused) return;
        if(this.node.position.y>Configs.EXCEED_TOP_HEIGHT){
            this.isPaused=true;
            this.outOfScreen();
          
        }else{
            this.node.translate(new Vec3(0,this.speed,0));
        }    
    }
}


