import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('exit')
export class exit extends Component {
    start() {
        // 添加按钮点击事件监听
        this.node.on(Node.EventType.TOUCH_END, this.onExitClick, this);
    }

    onExitClick() {
        // 调用微信API显示确认弹窗
        wx.showModal({
            title: '退出游戏',
            content: '确定要退出当前游戏吗？',
            success: (res) => {
                if (res.confirm) {
                    // 用户点击确定，跳转到game场景
                    director.loadScene('game');
                    wx.setStorageSync('Login', false);
                }
            }
        });
    }

    update(deltaTime: number) {
        
    }
}


