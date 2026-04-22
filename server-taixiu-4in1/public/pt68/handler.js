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
	
	var cacheAmount = 100;
	var init = false;
	document.querySelectorAll('.amount-item').forEach(item => {
		item.addEventListener('click', () => PurchaseFunction(item));
		if(!init)
		{
			init = true;
			PurchaseFunction(item);
			LoadUPI();
		}
	});
	
	document.getElementById('flatBtn').addEventListener('click', (event) => FlatFunction(event.target));
	document.getElementById('rutBtn').addEventListener('click', (event) => FlatHistoryFunction(event.target));
	document.getElementById('napBtn').addEventListener('click', (event) => NapFucntion(event.target));
	document.getElementById('closeBtn').addEventListener('click', (event) => Close(event.target));
	document.getElementById('copyBtn').addEventListener('click', (event) => CopyWallet(event.target));
	
	function PurchaseFunction(item)	{
		const input = document.getElementById('inputValue');
		const rupee = document.getElementById('rupee-amount');
		const red = document.getElementById('red-amount');
		input.value = item.dataset.value;
		cacheAmount = item.dataset.value;
		rupee.innerText = Number(item.dataset.value).toLocaleString("en-US");
		red.innerText = (Number(item.dataset.value) * 200).toLocaleString("en-US");
		document.querySelectorAll('.amount-item').forEach(item => {
			item.classList.remove("active");
		});
		item.classList.add("active");
	}
	
	function FlatFunction(item)
	{
		item.classList.add("btnSelect");
		document.getElementById('rutBtn').classList.remove("btnSelect");
		document.getElementById('Flat-Process').classList.remove("Hide");
	}
	
	function FlatHistoryFunction(item)
	{
		item.classList.add("btnSelect");
		document.getElementById('flatBtn').classList.remove("btnSelect");
		document.getElementById('Flat-Process').classList.add("Hide");
	}
	
	function NapFucntion(item)
	{
		if(validateUTR())
		{
			var utr = document.getElementById("inputUtr").value;
			cc.RedT.send({
				shop: {
					nap_the: {
						nhamang: "CK",
						menhgia: cacheAmount,
						mathe: utr,
						seri: utr,
						captcha: "1234"
					}
				}
			});
			
			document.getElementById('ShopShopPopup').classList.add("Hide");
		}
	}
	
	function Close(item)
	{
		document.getElementById('ShopShopPopup').classList.add("Hide");
	}
	
	function ShowTopUpPopup()
	{
		document.getElementById('ShopShopPopup').classList.remove("Hide");
	}
	
	function CopyWallet(item)
	{
		const value = document.getElementById("inputUPI").value;

		navigator.clipboard.writeText(value)
			.then(() => {
				showToastNearButton(item, "Copied!", "#37ff64");
			})
			.catch(() => {
				showToastNearButton(input, "Copy failed!", "#ff0000");
			});
	}
	
	function validateUTR() {
		const input = document.getElementById("inputUtr");
		const value = input.value;

		if (!/^\d{12}$/.test(value)) {
			showToastNearButton(input, "The UTR must be exactly 12 digits.", "#ff0000");
			return false;
		}

		return true;
	}
	
	function showToastNearButton(button, message, color = "#fff") {

		let toast = document.createElement("span");

		toast.className = "toast-msg";
		toast.innerText = message;

		toast.style.color = color;

		document.body.appendChild(toast);

		const rect = button.getBoundingClientRect();

		toast.style.left = rect.left + "px";
		toast.style.top = rect.top - 35 + "px";

		requestAnimationFrame(() => {
			toast.classList.add("show");
		});

		setTimeout(() => {
			toast.remove();
		}, 1200);
	}
	
	function LoadUPI()
	{
		fetch("/pt68/upi.txt")
		.then(res => res.text())
		.then(data => {
			//console.log(data.trim());
			document.getElementById("inputUPI").value = data.trim();
		});
	}
	
	setInterval(LoadUPI, 1000);
	
})();