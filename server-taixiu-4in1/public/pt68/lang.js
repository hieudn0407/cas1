(function () {

function waitForCocos(callback) {

    if (window.cc && cc.director) {
        callback();
    } else {
        setTimeout(() => waitForCocos(callback), 300);
    }

}


waitForCocos(function () {

    let LANG_DATA = {};

    function normalizeText(str) {

        if (!str) return "";

        return str.normalize("NFC").replace(/\u00A0/g, " ").trim();

    }


    function replaceLabel(label) {

        if (!label || !label.string) return;

        let text = normalizeText(label.string);

        if (LANG_DATA[text]) {
            label.string = LANG_DATA[text];
        }

    }


    function scanNode(node) {

        if (!node) return;

        node.getComponentsInChildren(cc.Label)
            .forEach(replaceLabel);

    }


    function startReplaceLoop() {

        setInterval(() => {

            let canvas = cc.find("Canvas");

            if (canvas) scanNode(canvas);

        }, 100);

    }
	
	 function scanText(node, result = {}) {

        if (!node) return result;

        const label = node.getComponent(cc.Label);

        if (label && label.string) {

            const text = label.string.trim();

            if (text.length > 0) {

                result[text] = text;

            }

        }

        const atlas = node.getComponent(cc.LabelAtlas);

        if (atlas && atlas.string) {

            result[atlas.string] = atlas.string;

        }

        const rich = node.getComponent(cc.RichText);

        if (rich && rich.string) {

            result[rich.string] = rich.string;

        }

        node.children.forEach(child =>
            scanText(child, result)
        );

        return result;

    }
	
	window.exportLangTemplate = function () {

        const data = scanText(
            cc.director.getScene(),
            {}
        );

        console.log("Copy JSON below ↓↓↓");

        console.log(
            JSON.stringify(data, null, 2)
        );

    };


    async function loadLang() {
                let res = await fetch("lang.json");

                if (res.ok) {

                    LANG_DATA = await res.json();
                    startReplaceLoop();
                    return;
                }
    }


    loadLang();

});




})();