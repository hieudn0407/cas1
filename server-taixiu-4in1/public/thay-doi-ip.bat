 @echo off
title Thiet lap IP
echo "Thiet lap IP cho server Tai Xiu"
SET /P "IP=Nhap dia chi ip VPS cua ban roi ENTER: "
echo %IP% > IP-VPS.txt
Pushd "%~dp0"
SET dd=%cd%
echo "Vui long doi..."
cd "%dd%\admin\src"
powershell -Command "(gc project.js) -replace '127.0.0.1', '%IP%' | Out-File -encoding ASCII project.js"
cd "%dd%\go88\src"
powershell -Command "(gc project.js) -replace '127.0.0.1', '%IP%' | Out-File -encoding ASCII project.js"
cd "%dd%\pt68\src"
powershell -Command "(gc project.js) -replace '127.0.0.1', '%IP%' | Out-File -encoding ASCII project.js"
cd "%dd%\rvip\src"
powershell -Command "(gc project.79c2b.js) -replace '127.0.0.1', '%IP%' | Out-File -encoding ASCII project.79c2b.js"
cd "%dd%\sunwin\src"
powershell -Command "(gc project.js) -replace '127.0.0.1', '%IP%' | Out-File -encoding ASCII project.js"
echo "Da xong, ban co the khoi chay server de choi ONLINE"
timeout 5
exit

