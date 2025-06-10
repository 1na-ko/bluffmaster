import { _decorator, Component, Node, Label, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {
    @property({ type: Node })
    loginButton: Node = null!;
    start() {
        console.log('Game started', wx.getStorageSync('Login'));
        if (wx.getStorageSync('Login')) {
            this.updateButtonState();
        }
    }

    update(deltaTime: number) {
        
    }

    public onLoginButtonClick() {
        if (wx.getStorageSync('Login')) {
            director.loadScene('main');
        } else {
            console.log('Login button clicked');
            if (typeof wx !== 'undefined') {
                // 微信登录逻辑
                wx.login({
                    success: (res) => {
                        if (res.code) {
                            console.log('Login code:', res.code);
                            wx.setStorageSync('Login', true);
                            this.updateButtonState();
                        } else {
                            console.error('Login failed:', res.errMsg);
                            wx.setStorageSync('Login', false);
                        }
                    },
                    fail: (err) => {
                        console.error('wx.login failed:', err);
                    }
                });
            }
        }
    }

    private updateButtonState() {
        console.log('Updating button state');
        if (!this.loginButton) {
            console.error('Login button node is not assigned!');
            return;
        }
        
        // 尝试从子节点获取Label组件
        const labelNode = this.loginButton.children[0];
        if (!labelNode) {
            console.error('No child node found for login button');
            return;
        }
        
        const label = labelNode.getComponent(Label);
        if (label) {
            label.string = wx.getStorageSync('Login') ? '开始游戏' : '微信登录';
        } else {
            console.error('Label component not found on login button child node');
        }
    }

    // private sendCodeToServer(code: string) {
    //     // 示例：使用wx.request发送到服务器
    //     wx.request({
    //         url: 'https://your.server.com/login',
    //         method: 'POST',
    //         data: {
    //             code: code
    //         },
    //         success: (res) => {
    //             console.log('Login success:', res.data);
    //             // 处理登录成功逻辑
    //         },
    //         fail: (err) => {
    //             console.error('Request failed:', err);
    //         }
    //     });
    // }
}


