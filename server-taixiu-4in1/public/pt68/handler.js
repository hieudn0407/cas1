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
		
		//var xocxoc = cc.find("Canvas/Menu/XocXoc");
        //if (xocxoc) {
            //xocxoc.destroy();
        //}
    }

    setInterval(removeLeftApp, 500);

})();