@echo off
setlocal
cd /d "%~dp0"

echo [1/5] Kontrola repozitare...
git init || goto :error
git remote get-url origin >nul 2>&1
if errorlevel 1 (
  git remote add origin https://github.com/janvavrusa/seznam_potrebne_vybavenosti.git || goto :error
) else (
  git remote set-url origin https://github.com/janvavrusa/seznam_potrebne_vybavenosti.git || goto :error
)
echo [2/5] Odstraneni chybneho zaznamu vnoreneho repozitare...
git rm --cached --ignore-unmatch -f -- seznam_potrebne_vybavenosti || goto :error
echo [3/5] Pridavani souboru do indexu...
git add -A || goto :error

git diff --cached --quiet
if %errorlevel%==0 goto :empty_commit

echo [4/5] Vytvareni commitu se zmenami...
git commit -m "Update App Seznam Potrebne Vybavenosti" || goto :error
goto :push

:empty_commit
echo [4/5] Repo je ciste, vytvarim retry commit pro GitHub Pages...
git commit --allow-empty -m "Retry GitHub Pages deployment" || goto :error

:push
echo [5/5] Odesilani na GitHub...
for /f %%B in ('git branch --show-current') do set "BRANCH=%%B"
if not defined BRANCH (
  echo Nelze zjistit aktualni vetev.
  goto :error
)
git push --set-upstream origin "%BRANCH%" || goto :error

echo Hotovo. Zkontrolujte GitHub Actions, zda deployment uspesne dobehl.
pause
exit /b 0

:error
echo.
echo CHYBA: Deploy se nepodaril. Zkontrolujte vystup vyse.
pause
exit /b 1
