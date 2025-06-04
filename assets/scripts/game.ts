import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {
    @property({ type: Node })
    loginButton: Node = null!;
    start() {
        console.log('Game111111111111111');
        console.log('Game started', wx.getStorageSync('Login'));
        if (wx.getStorageSync('Login')) {
            this.updateButtonState();
        }
    }

    update(deltaTime: number) {
        
    }

    public onLoginButtonClick() {
        console.log('Login button clicked');
        if (typeof wx !== 'undefined') {
            // 微信登录逻辑
            wx.login({
                success: (res) => {
                    if (res.code) {
                        console.log('Login code:', res.code);
                        console.log('Login success:', res);
                        wx.setStorageSync('Login', true);
                        // 这里发送code到你的服务器
                        // this.sendCodeToServer(res.code);
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

    private updateButtonState() {
        console.log('Updating button state');
        const label = this.loginButton.getComponent(Label);
        if (label) {
            label.string = wx.getStorageSync('isLoggedIn') ? '开始游戏' : '登录';
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


