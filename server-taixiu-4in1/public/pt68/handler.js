(function () {

    function removeLeftApp() {

        if (typeof cc === "undefined" || !cc.find) return;

        var leftapp = cc.find("Canvas/LeftApp");
        if (leftapp) {
            leftapp.destroy();
        }
		
		var sieutop = cc.find("Canvas/RedHat/miniPanel/popup/sieutop");
        if (sieutop) {
            sieutop.destroy();
        }
		
		var xoso = cc.find("Canvas/Menu/XoSo");
        if (xoso) {
            xoso.destroy();
        }
		
		var pushNoHu = cc.find("Canvas/PushNoHu/ThongBaoNoHu");
		if(pushNoHu) {
			pushNoHu.destroy();
		}

		//var xocxoc = cc.find("Canvas/Menu/XocXoc");
        //if (xocxoc) {
            //xocxoc.destroy();
        //}
		
		let sam = cc.find("Canvas/Menu/scrollview/view/content/GameBai/icon-sam");
		let poker = cc.find("Canvas/Menu/scrollview/view/content/GameBai/icon-poker");
		let pokerIcon = cc.find("Canvas/Menu/scrollview/view/content/GameBai/icon-poker/icon-poker");
		let three = cc.find("Canvas/Menu/scrollview/view/content/GameBai/icon-3cay");
		let threeIcon = cc.find("Canvas/Menu/scrollview/view/content/GameBai/icon-3cay/icon-3cay");
		
		if(sam && poker && three && pokerIcon && threeIcon) {
			let samBtn = sam.getComponent(cc.Button);
			let pokerBtn = poker.getComponent(cc.Button);
			var threeBtn = three.getComponent(cc.Button);
			pokerBtn.clickEvents = samBtn.clickEvents.slice();
			pokerIcon.color = new cc.Color(122, 122, 122);
			threeBtn.clickEvents = samBtn.clickEvents.slice();
			threeIcon.color = new cc.Color(122, 122, 122);
		}
    }

    setInterval(removeLeftApp, 100);

})();