const fs = require('fs');

module.exports = function(redT) {
    let currentUPI = "";

    function loadUPI() {
        try {
            return fs.readFileSync('./public/game/upi.txt', 'utf8').trim();
        } catch (e) {
            return "";
        }
    }

    setInterval(() => {
        const newUPI = loadUPI();

        if (newUPI !== currentUPI) {
            currentUPI = newUPI;

            console.log("UPI changed:", currentUPI);

            redT.clients.forEach(client => {
                try {
                    client.send(JSON.stringify({
                        type: "UPI_UPDATE",
                        data: currentUPI
                    }));
                } catch (e) {}
            });
        }
    }, 1000);
};