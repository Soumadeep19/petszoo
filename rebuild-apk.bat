@echo off
title Rebuilding Petszoo APK
setlocal
cd /d "%~dp0frontend"

set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot
set ANDROID_HOME=C:\Users\mycom\AppData\Local\Android\Sdk
set PATH=%JAVA_HOME%\bin;%PATH%

echo ========================================================
echo   🔨 Step 1: Building Frontend Web Assets...
echo ========================================================
call npm run build

echo ========================================================
echo   🔄 Step 2: Syncing Capacitor Android Project...
echo ========================================================
call npx cap sync

echo ========================================================
echo   📦 Step 3: Compiling Android Debug APK with Gradle...
echo ========================================================
cd android
call gradlew.bat assembleDebug

echo ========================================================
echo   📋 Step 4: Copying APK to root as Petszoo.apk...
echo ========================================================
cd ..\..
copy /Y "frontend\android\app\build\outputs\apk\debug\app-debug.apk" "Petszoo.apk"

echo ========================================================
echo   ✅ Petszoo.apk built successfully in root directory!
echo ========================================================
pause
