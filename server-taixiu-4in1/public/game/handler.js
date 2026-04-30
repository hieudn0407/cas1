(function () {

    function removeLeftApp() {

        if (typeof cc === "undefined" || !cc.find)
            return;

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
        if (pushNoHu) {
            pushNoHu.destroy();
        }

        var ketSatHead = cc.find("Canvas/dialog/profile/head/KetSat");
        if (ketSatHead) {
            ketSatHead.active = false;
        }

        var lichSuHead = cc.find("Canvas/dialog/profile/head/LichSu");
        if (lichSuHead) {
            lichSuHead.active = false;
        }

        var dangKyOTP = cc.find("Canvas/dialog/profile/BaoMat/header/DangKyOTP");
        if (dangKyOTP) {
            dangKyOTP.active = false;
        }

        var vip = cc.find("Canvas/dialog/profile/CaNhan/header/vip");
        if (vip) {
            vip.active = false;
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

        if (sam && poker && three && pokerIcon && threeIcon) {
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

    var redExchange = 100;
    var withdrawAmountMin = 30000;
    var withdrawAmountMax = 2000000;
    var cacheAmount = 100;
    var init = false;
    document.querySelectorAll('.amount-item').forEach(item => {
        item.addEventListener('click', () => PurchaseFunction(item));
        if (!init) {
            init = true;
            PurchaseFunction(item);
        }
    });

    document.getElementById('flatBtn').addEventListener('click', (event) => FlatFunction(event.target));
    document.getElementById('rutBtn').addEventListener('click', (event) => FlatHistoryFunction(event.target));
    document.getElementById('napBtn').addEventListener('click', (event) => NapFucntion(event.target));
    document.getElementById('closeBtn').addEventListener('click', (event) => Close(event.target));
    document.getElementById('copyBtn').addEventListener('click', (event) => CopyWallet(event.target));
    document.getElementById('withdrawBtn').addEventListener('click', (event) => WithdrawClicked(event.target));
    document.getElementById('withdrawHistoryBtn').addEventListener('click', (event) => WithdrawHistoryClicked(event.target));
    document.getElementById('withdrawFastMinBtn').addEventListener('click', (event) => WithdrawMin(event.target));
    document.getElementById('withdrawFastMaxBtn').addEventListener('click', (event) => WithdrawMax(event.target));
    document.getElementById('inputWithdrawAmount').addEventListener('input', (event) => WithdrawUpdateAmount(event.target));
    document.getElementById('withdrawSubmit').addEventListener('click', (event) => WithdrawSubmit(event.target));

    window.addEventListener('resize', updateScale);
    updateScale();

    function updateScale() {
		const el = document.getElementById('ShopBackground');

		const baseWidth = 800;
		const baseHeight = 350;

		const isMobile = window.innerWidth <= 768;
		const isPortrait = window.innerHeight > window.innerWidth;

		let scale, transform;

		if (isMobile && isPortrait) {

			const scaleX = window.innerWidth / baseHeight;
			const scaleY = window.innerHeight / baseWidth;

			scale = Math.min(scaleX, scaleY);

			transform = `rotate(90deg) scale(${scale})`;
		} else {

			const scaleX = window.innerWidth / baseWidth;
			const scaleY = window.innerHeight / baseHeight;

			scale = Math.min(scaleX, scaleY);

			transform = `scale(${scale})`;
		}

		el.style.transform = transform;
	}

    window.ShopUI = {
        initShop: function (tab) {
            FlatFunction(document.getElementById('flatBtn'));
        }
    };

    function PurchaseFunction(item) {
        const input = document.getElementById('inputValue');
        const rupee = document.getElementById('rupee-amount');
        const red = document.getElementById('red-amount');
        input.value = item.dataset.value;
        cacheAmount = item.dataset.value;
        rupee.innerText = Number(item.dataset.value).toLocaleString("en-US");
        red.innerText = (Number(item.dataset.value) * redExchange).toLocaleString("en-US");
        document.querySelectorAll('.amount-item').forEach(item => {
            item.classList.remove("active");
        });
        item.classList.add("active");
    }

    function FlatFunction(item) {
        item.classList.add("btnSelect");
        document.getElementById('rutBtn').classList.remove("btnSelect");
        document.getElementById('withdrawBtn').classList.remove("btnSelect");
        document.getElementById('withdrawHistoryBtn').classList.remove("btnSelect");

        document.getElementById('Flat-Process').classList.remove("Hide");
        document.getElementById('FlatHistory').classList.add("Hide");
        document.getElementById('Withdraw').classList.add("Hide");
        document.getElementById('WidthdrawHistory').classList.add("Hide");
    }

    var historyInit = false;
    var cacheFlatHistoryData;
    var cacheWithdrawHistoryData;
    function HistoryInit() {
        const lichSu = cc.find("Canvas/dialog/profile/LichSu").getComponent("LichSu");
        const lichSuNap = cc.find("Canvas/dialog/profile/LichSu/LichSuNap").getComponent("LichSuNap");
        const lichSuRut = cc.find("Canvas/dialog/profile/LichSu/LichSuBank").getComponent("LichSuBank");
        if (!historyInit) {
            historyInit = true;
            lichSu.onLoad();
            lichSuNap.onLoad();
            lichSuRut.onLoad();

            lichSuNap.onData = function (datas) {
                cacheFlatHistoryData = datas;
                displayFlatHistoryTable(cacheFlatHistoryData, currentPage);
                setupPagination(cacheFlatHistoryData, "pagination");
            }

            lichSuRut.onData = function (datas) {
                cacheWithdrawHistoryData = datas;
                displayWithdrawHistoryTable(cacheWithdrawHistoryData, historyCurrentPage);
                setupPagination(cacheWithdrawHistoryData, "WithdrawPagination");
            }
        }
    }

    function FlatHistoryFunction(item) {
        HistoryInit();
		currentPage = 1;
        const lichSuNap = cc.find("Canvas/dialog/profile/LichSu/LichSuNap").getComponent("LichSuNap");
        item.classList.add("btnSelect");
        document.getElementById('flatBtn').classList.remove("btnSelect");
        document.getElementById('withdrawBtn').classList.remove("btnSelect");
        document.getElementById('withdrawHistoryBtn').classList.remove("btnSelect");

        document.getElementById('Flat-Process').classList.add("Hide");
        document.getElementById('FlatHistory').classList.remove("Hide");
        document.getElementById('Withdraw').classList.add("Hide");
        document.getElementById('WidthdrawHistory').classList.add("Hide");
        lichSuNap.get_data();
    }

    function NapFucntion(item) {
        if (validateUTR()) {
            var utr = document.getElementById("inputUtr").value;
            cc.RedT.send({
                shop: {
                    nap_the: {
                        nhamang: "PAY",
                        menhgia: cacheAmount,
                        mathe: utr,
                        seri: utr,
                        captcha: "1111"
                    }
                }
            });

            document.getElementById('ShopShopPopup').classList.add("Hide");
            document.getElementById("inputUtr").value = "";
        }
    }

    function Close(item) {
        document.getElementById('ShopShopPopup').classList.add("Hide");
    }

    function ShowTopUpPopup() {
        document.getElementById('ShopShopPopup').classList.remove("Hide");
    }

    function CopyWallet(item) {
        const value = document.getElementById("inputUPI").value;
        copyText(value);
        showToastNearButton(item, "Copied!", "#37ff64");
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

    function copyText(value) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(value);
        } else {
            const input = document.createElement("textarea");
            input.value = value;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
        }
    }

    const rowsPerPage = 6;
    let currentPage = 1;
    let historyCurrentPage = 1;
    function displayFlatHistoryTable(data, page) {
        const tbody = document.querySelector("#dataTable tbody");
        tbody.innerHTML = "";

        let start = (page - 1) * rowsPerPage;
        let end = start + rowsPerPage;

        data.slice(start, end).forEach(row => {
            tbody.innerHTML += `
			<tr> 
			<td>${formatTime(row.time)}</td> 
			<td>${row.nhaMang}</td> 
			<td>${row.menhGia.toLocaleString("en-US")}</td> 
			<td>${row.nhan.toLocaleString("en-US")}</td> 
			<td >${row.maThe}</td> 
			<td>${getStatusHTML(row.status)}</td> 
			</tr>`;
        });
    }

    function displayWithdrawHistoryTable(data, page) {
        const tbody = document.querySelector("#WidthdrawHistoryDt tbody");
        tbody.innerHTML = "";

        let start = (page - 1) * rowsPerPage;
        let end = start + rowsPerPage;

        data.slice(start, end).forEach(row => {
            tbody.innerHTML += `
			<tr> 
			<td>${formatTime(row.time)}</td> 
			<td>${row.number}</td> 
			<td>${row.bank}</td> 
			<td>${Number(row.money).toLocaleString("en-US")}</td> 
			<td >${(Math.floor(row.money / redExchange * 0.97).toLocaleString("en-US"))}</td> 
			<td>${getStatusHTML(row.status)}</td> 
			</tr>`;
        });
    }

    function getStatusHTML(status) {

        if (status == 0)
            return '<span class="status-pending">Pending Approval</span>';

        if (status == 1)
            return '<span class="status-success">Success</span>';

        if (status == 2)
            return '<span class="status-failed">Failed</span>';

        return "Unknown";
    }

    function setupPagination(data, id) {

        const pageCount = Math.ceil(data.length / rowsPerPage);
        const pagination = document.getElementById(id);
		const page = id == "pagination" ? currentPage : historyCurrentPage;

        pagination.innerHTML = "";

        const maxVisible = 2; // số nút hiển thị chính giữa

        let start = page - Math.floor(maxVisible / 2);
        let end = page + Math.floor(maxVisible / 2);

        if (start < 1) {
            start = 1;
            end = Math.min(maxVisible, pageCount);
        }

        if (end > pageCount) {
            end = pageCount;
            start = Math.max(1, pageCount - maxVisible + 1);
        }

        // Prev
        if (page > 1) {
            pagination.innerHTML += `
			<button onclick="changePage(${page-1}, '${id}')">«</button>
			`;
        }

        // trang đầu + ...
        if (start > 1) {

            pagination.innerHTML += `
			<button onclick="changePage(1, '${id}")'>1</button>
			`;

            if (start > 2) {
                pagination.innerHTML += `<span>...</span>`;
            }
        }

        // các trang chính
        for (let i = start; i <= end; i++) {

            pagination.innerHTML += `
			<button onclick="changePage(${i}, '${id}')"
			class="${i===page?"active":""}">
			${i}
			</button>
			`;
        }

        // ... + trang cuối
        if (end < pageCount) {

            if (end < pageCount - 1) {
                pagination.innerHTML += `<span>...</span>`;
            }

            pagination.innerHTML += `
			<button onclick="changePage(${pageCount}, '${id}')">${pageCount}</button>
			`;
        }

        // Next
        if (page < pageCount) {
            pagination.innerHTML += `
			<button onclick="changePage(${page+1}, '${id}')">»</button>
			`;
        }

    }

    window.changePage = function (page, id) {
        let data;
        let PageX;
        if (id == "pagination") {
            data = cacheFlatHistoryData;
            currentPage = page;
            displayFlatHistoryTable(data, page);
        } else {
            data = cacheWithdrawHistoryData;
            historyCurrentPage = page;
            displayWithdrawHistoryTable(data, page);
        }

        setupPagination(data, id);
    }

    function formatTime(time) {
        const d = new Date(time);

        const hh = d.getHours().toString().padStart(2, "0");
        const mm = d.getMinutes().toString().padStart(2, "0");

        const dd = d.getDate().toString().padStart(2, "0");
        const MM = (d.getMonth() + 1).toString().padStart(2, "0");
        const yyyy = d.getFullYear();

        return `${hh}:${mm} ${dd}/${MM}/${yyyy}`;
    }

    function WithdrawClicked(item) {
        item.classList.add("btnSelect");
        document.getElementById('flatBtn').classList.remove("btnSelect");
        document.getElementById('rutBtn').classList.remove("btnSelect");
        document.getElementById('withdrawHistoryBtn').classList.remove("btnSelect");

        document.getElementById('Flat-Process').classList.add("Hide");
        document.getElementById('FlatHistory').classList.add("Hide");
        document.getElementById('WidthdrawHistory').classList.add("Hide");
        document.getElementById('Withdraw').classList.remove("Hide");

        const red = document.getElementById('availableRed');
        red.innerText = Number(cc.RedT.user.red).toLocaleString("en-US");
    }

    function WithdrawHistoryClicked(item) {
        HistoryInit();
		historyCurrentPage = 1;
        item.classList.add("btnSelect");
        document.getElementById('flatBtn').classList.remove("btnSelect");
        document.getElementById('rutBtn').classList.remove("btnSelect");
        document.getElementById('withdrawBtn').classList.remove("btnSelect");

        document.getElementById('Flat-Process').classList.add("Hide");
        document.getElementById('FlatHistory').classList.add("Hide");
        document.getElementById('Withdraw').classList.add("Hide");
        document.getElementById('WidthdrawHistory').classList.remove("Hide");

        const red = document.getElementById('availableRed');
        red.innerText = Number(cc.RedT.user.red).toLocaleString("en-US");

        const lichSuRut = cc.find("Canvas/dialog/profile/LichSu/LichSuBank").getComponent("LichSuBank");
        lichSuRut.get_data();
    }

    function WithdrawMin(item) {
        document.getElementById('inputWithdrawAmount').value = withdrawAmountMin;
        WithdrawUpdateAmount();
    }

    function WithdrawMax(item) {
        document.getElementById('inputWithdrawAmount').value = withdrawAmountMax;
        WithdrawUpdateAmount();
    }

    function WithdrawUpdateAmount() {
        const amount = document.getElementById('inputWithdrawAmount').value;
        const rs = Math.floor((amount / redExchange) * 0.97);
        document.getElementById('withdrawRsAmount').innerText = rs.toLocaleString("en-US");
    }

    function WithdrawSubmit() {
        const an = document.getElementById('inputBankNumber');
        const ifsc = document.getElementById('inputBankIFSC');
        const amount = document.getElementById('inputWithdrawAmount');

        if (an.value == "" || an.value == undefined) {
            showToastNearButton(an, "Please enter account number!", "#ff0000")
        } else if (ifsc.value == "" || ifsc.value == undefined) {
            showToastNearButton(ifsc, "Please enter IFSC Code!", "#ff0000")
        } else if (amount.value == "" || amount.value == undefined || amount.value <= 0) {
            showToastNearButton(amount, "Please input withdraw amount!", "#ff0000")
        } else if (amount.value < withdrawAmountMin) {
            showToastNearButton(amount, `The minimum withdrawal amount for RED is ${withdrawAmountMin.toLocaleString("en-US")}!`, "#ff0000")
        } else if (amount.value > withdrawAmountMax) {
            showToastNearButton(amount, `The maximum withdrawal amount for RED is ${withdrawAmountMax.toLocaleString("en-US")}!`, "#ff0000")
        } else {
            const tenNganHang = ifsc.value;
            const stk = an.value;
            const tenTaiKhoan = "Unknown";
            const red = amount.value;
            const otp = "1111";

            cc.RedT.send({
                shop: {
                    bank: {
                        rut: {
                            bank: tenNganHang,
                            number: stk,
                            name: tenTaiKhoan,
                            rut: red,
                            otp: otp
                        }
                    }
                }
            });

            Close(null);
        }
    }
})();
