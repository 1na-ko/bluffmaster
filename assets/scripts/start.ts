import { _decorator, Component, Node, Button, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('start')
export class start extends Component {
    @property({type: Button})
    startButton: Button = null;

    onLoad() {
        // 绑定按钮点击事件
        this.startButton.node.on(Button.EventType.CLICK, this.onStartGame, this);
    }

    onStartGame() {
        // 加载main场景
        director.loadScene('main');
    }

    update(deltaTime: number) {
        
    }
}


