class Reward {
    constructor() {
        this.getMyRewardInfoURL = 'http://payide.masteropen.layabox.com/pay/getrewardtop?device_id=';
        this.getRewardListURL = 'http://payide.masteropen.layabox.com/pay/getrewardtoplist?';
        this.QRCodeShowURL = 'http://layastore.layabox.com/reward_ide.html?device=';

        this.uniqueCode; // 机器唯一的特征码
        this.reqRewardListCount = 0; // 向服务器请求打赏人数的次数
        this.reqRewardList = []; // 向服务器请求到的打赏人的列表
        this.eventListenerObj = {}; // 事件处理程序

        this.getuniqueCode(); // 获取机器码并改变打赏按钮图标
        this.initRewardBtnClickListener(); // 初始化打赏按钮点击事件
        // this.initRewardBtn();
    }
    initRewardBtn() { // 初始化打赏按钮
        let getMyRewardInfo = {
            URL: this.getMyRewardInfoURL + this.uniqueCode,
        };
        this.getInfoFromServer(getMyRewardInfo, function(response) {
            let responseObj = response && JSON.parse(response);
            // 修改打赏图标
            if (typeof responseObj === 'object' && responseObj.ret === 0) {
                let level = responseObj.data && responseObj.data.level;
                let rewardImgEle = document.getElementById('rewardWrapper').getElementsByClassName('reward-icon-btn')[0];
                switch(Number(level)) {
                    case 1: 
                        rewardImgEle.src = './res/ide/reward-level-1.png';
                        break;
                    case 2:
                        rewardImgEle.src = './res/ide/reward-level-2.png';
                        break;
                    case 3:
                        rewardImgEle.src = './res/ide/reward-level-3.png';
                        break;
                    default:

                }
            }
        });
    }
    getuniqueCode(ucStr) { // 获取机器唯一标志
        // TODO 改成使用 Promise
        // TODO 使用 yield
        // 获取机器唯一标志，优先获取硬盘，其次内存，再次系统
        // if (this.uniqueCode) {
        //     return this.uniqueCode;
        // }
        const sysInfo = require('systeminformation');
        let _this = this;
        if (!ucStr || 'dish' === ucStr) { // 硬盘
            sysInfo.diskLayout(function(r) {
                if (Array.isArray(r)) {
                    _this.uniqueCode = 'd_' + r[0].serialNum;
                    _this.initRewardBtn();
                } else {
                    _this.getuniqueCode('mem');
                }
            });
        } else if ('mem' === ucStr) { // 内存
            sysInfo.memLayout(function(r) {
                if (Array.isArray(r)) {
                    _this.uniqueCode = 'm_' + r[0].serialNum;
                    _this.initRewardBtn();
                } else {
                    _this.getuniqueCode('sys');
                }
            });
        } else if ('sys' === ucStr) { // 系统
            sysInfo.system(function(r) {
                if (typeof r === 'object') {
                    _this.uniqueCode = 's_' + r.uuid;
                    _this.initRewardBtn();
                } else {
                    // 
                }
            });
        }
    }
    rewardInfoShow() { // 打赏按钮点击事件
        let showHTML = `
            <div class="show-area-container">
                <div style="width: 382px;border-radius: 20px;overflow: hidden;">
                    <div style="background-color: #fff;padding-top: 20px;">
                        <div class="qrcode-wrapper">
                            <img class="qrcode-bg" src="./res/ide/reward-qrcode-bg.png" />
                            <div id="rewardQrcode"></div>
                            <div class="qrcode-hint-text">扫描微信二维码，打赏</div>
                        </div>
                        <div class="reward-hint-text">有您的支持，我们会做的更好</div>
                    </div>
                    <div class="divide-area">
                        <img class="divide-left-img" src="./res/ide/reward-left.png"/>
                        <div class="divide-middle-area">
                            <div class="divide-middle-line"></div>
                        </div>
                        <img class="divide-right-img" src="./res/ide/reward-right.png"/>
                    </div>
                    <div class="reward-list-wrapper" style="background-color: #fff;padding-bottom:15px">
                        <div class="title"><span>&gt;</span><span style="color: #147bdb;">&nbsp;打赏排名&nbsp;</span><span>&lt;</span></div>
                        <div id="rewardListArea">请求数据中，请稍后...</div>
                    </div>
                </div>
            </div>
            `;
        let
            rewardShowAreaEle = document.getElementsByClassName('reward-show-area')[0];
        rewardShowAreaEle.innerHTML = showHTML;
        rewardShowAreaEle.style.display = 'block';
        // 生成qrcode
        var qrcode = new QRCode(document.getElementById("rewardQrcode"), {
            text: this.QRCodeShowURL + this.uniqueCode,
            width: 125,
            height: 125,
            colorDark : "#000000",
            colorLight : "#ffffff"
        });
        this.updateRewardList(); // 获取打赏榜
        this.initRewardBtn();
    }
    updateRewardList() {
        // 获取打赏榜
        const count = 30;
        let 
            rewardListAreaEle = document.getElementById('rewardListArea');
        let _updateRewardList = function() {
            const start = this.reqRewardListCount * count;
            this.reqRewardListCount++; // 每请求一次数据，该值+1
            let getRewardInfo = {
                URL: this.getRewardListURL + `start=${start}&count=${count}`
            };
            this.getInfoFromServer(getRewardInfo, function(response) {
                let responseObj = response && JSON.parse(response);
                let infoList = responseObj.data;
                this.reqRewardList = this.reqRewardList.concat(infoList);
                let
                    rewardListStr= '',
                    length = this.reqRewardList.length;
                let imgSrc;
                for (let i = 0; i < length; i++) {
                    switch(i + 1) {
                        case 1: 
                        case 2:
                        case 3: 
                            imgSrc = `./res/ide/reward-${i + 1}.png`;
                            rewardListStr += `
                                <div class="reward-item">
                                    <img class="ranking" src=${imgSrc} /><span class="name">${this.reqRewardList[i].nickname}</span>
                                </div>
                                `;
                            break;
                        default:
                            let circleWidth = (i + 1).toString().length * 9; // 打赏列表子项前面的序列号，动态修改
                            circleWidth = circleWidth > 14 ? circleWidth :14;
                            rewardListStr += `
                                <div class="reward-item">
                                    <div class="ranking-num" style="width: ${circleWidth}px;">${i + 1}</div><span class="name">${this.reqRewardList[i].nickname}</span>
                                </div>
                                `;
                    }
                }
                rewardListAreaEle.innerHTML = rewardListStr;
            }.bind(this));
        }.bind(this);
        _updateRewardList(); // 第一次更新
        let offsetHeight = 300;
        rewardListAreaEle.addEventListener('scroll', function() {
            let 
                scrollTotalHeight = rewardListAreaEle.scrollHeight,
                scrollHeight = rewardListAreaEle.scrollTop + offsetHeight,
                isBottom = scrollHeight + 20 >= scrollTotalHeight,
                isHasMoreRewardInfo = this.reqRewardListCount * count === this.reqRewardList.length;
            if (isBottom && isHasMoreRewardInfo) { // 滚动到了末尾，并且判断服务器可能还有更多数据
                _updateRewardList();
            }
        }.bind(this));
    }
    getInfoFromServer(infoObj, func) { // 获取网络请求
        let xhr = new XMLHttpRequest();
        xhr.open("GET", infoObj.URL, true);
        xhr.onreadystatechange = function(e) {
            if (xhr.readyState==4 && xhr.status==200) { 
                let response = xhr.responseText;
                func instanceof Function && func(response);
            } 
        };
        xhr.send(null);
        xhr.onerror = function(e) {
            
        }
    }
    initRewardBtnClickListener() { // 赞赏按钮点击事件监听
        let rewardEle = document.getElementById('rewardWrapper');
        rewardEle.addEventListener('click', function(e) {
            // 处理赞赏区域
            let rewardShowAreaEle = document.getElementsByClassName('reward-show-area')[0];
            if (rewardShowAreaEle.style.display === 'none') {
                this.rewardInfoShow();
                this.addRewardEventlistener();
            } else {
                this.destroyEventListener();
                rewardShowAreaEle.style.display = 'none';
                this.reqRewardListCount = 0;
                this.reqRewardList.length = 0;
            }
        }.bind(this));
    }
    addRewardEventlistener() { // 添加监听事件
        let 
            listWrapperEle = document.getElementById('rewardListArea'), // 打赏排行列表
            rewardShowAreaEle = document.getElementsByClassName('reward-show-area')[0],
            isMoveStart = false, // 是否点击
            startY, // 鼠标初始位置
            nowY, // 鼠标现在的位置
            moveY = 0, // 鼠标移动的位置
            startScrollTop; // 滚动区域初始位置
        this.eventListenerObj['mousedown'] = function(e) {
            if (!listWrapperEle || !listWrapperEle.contains(e.target)) { // 打赏列表没有显示，或者没有点击在打赏列表上
                return;
            }
            isMoveStart = true;
            startY = e.clientY;
            startScrollTop = listWrapperEle.scrollTop;
            moveY = 0;
        }
        this.eventListenerObj['mousemove'] = function(e) {
            if (!listWrapperEle || !isMoveStart) { // 打赏列表没有显示，或者没有点击在打赏列表上
                return;
            }
            nowY = e.clientY;
            moveY = nowY - startY;
            listWrapperEle.scrollTop = startScrollTop - moveY;
        }
        this.eventListenerObj['mouseup'] = function(e) {
            if (!listWrapperEle || !isMoveStart) { // 打赏列表没有显示，或者没有点击在打赏列表上
                return;
            }
            isMoveStart = false;
        }
        this.eventListenerObj['mouseleave'] = function(e) {
            if (!listWrapperEle || !isMoveStart) { // 打赏列表没有显示，或者没有点击在打赏列表上
                return;
            }
            isMoveStart = false;
        }
        this.eventListenerObj['wheel'] = function(e) {
            // 判断是否是在列表上滚动的鼠标滚轮
            listWrapperEle = document.getElementById('rewardListArea');
            if (!listWrapperEle.contains(e.target)) {
                return;
            }
            startScrollTop = listWrapperEle.scrollTop;
            if (e.wheelDelta < 0) {
                listWrapperEle.scrollTop += 20;
            } else {
                listWrapperEle.scrollTop -= 20;
            }
        }
        this.eventListenerObj['outerclick'] = function(e) {
            // 点击的是赞赏区域之外
            if (e.target === rewardShowAreaEle) {
                this.destroyEventListener();
                rewardShowAreaEle.style.display = 'none';
                this.reqRewardListCount = 0;
                this.reqRewardList.length = 0;
            }
        }.bind(this);
        listWrapperEle.addEventListener('mousedown', this.eventListenerObj['mousedown']);
        listWrapperEle.addEventListener('mousemove', this.eventListenerObj['mousemove']);
        listWrapperEle.addEventListener('mouseup', this.eventListenerObj['mouseup']);
        listWrapperEle.addEventListener('mouseleave', this.eventListenerObj['mouseleave']);
        listWrapperEle.addEventListener('wheel', this.eventListenerObj['wheel']);
        rewardShowAreaEle.addEventListener('click', this.eventListenerObj['outerclick']);
    }
    destroyEventListener() { // 注销监听事件
        let 
            listWrapperEle = document.getElementById('rewardListArea'), // 打赏排行列表
            rewardShowAreaEle = document.getElementsByClassName('reward-show-area')[0];
        listWrapperEle.removeEventListener('mousedown', this.eventListenerObj['mousedown']);
        listWrapperEle.removeEventListener('mousemove', this.eventListenerObj['mousemove']);
        listWrapperEle.removeEventListener('mouseup', this.eventListenerObj['mouseup']);
        listWrapperEle.removeEventListener('mouseleave', this.eventListenerObj['mouseleave']);
        listWrapperEle.removeEventListener('wheel', this.eventListenerObj['wheel']);
        rewardShowAreaEle.removeEventListener('click', this.eventListenerObj['outerclick']);
    }
}
module.exports = Reward;
