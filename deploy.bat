@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

echo ========================================================
echo   [로운네 파티게임] 자동 검증 및 깃허브 커밋/배포 도구
echo ========================================================
echo.

echo 1. 문제 데이터(questions.js) 유효성 검사 중...
node tools/validate.js
if %ERRORLEVEL% neq 0 (
    echo.
    echo [오류] 문제 데이터에 결함이 있어 커밋을 중단합니다!
    echo 위 오류 메시지를 확인하고 수정한 뒤 다시 실행해 주세요.
    pause
    exit /b 1
)

echo.
echo 2. Git 변경 사항 확인 및 추가...
git add .

git diff-index --quiet HEAD --
if %ERRORLEVEL% equ 0 (
    echo [알림] 변경된 파일이 없습니다.
) else (
    set "COMMIT_MSG=%~1"
    if "!COMMIT_MSG!"=="" (
        set "COMMIT_MSG=업데이트 (%date% %time:~0,5%)"
    )
    echo 3. 커밋 생성 중: "!COMMIT_MSG!"
    git commit -m "!COMMIT_MSG!"
)

echo.
echo 4. GitHub 저장소로 푸시(업로드) 중...
git push origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ========================================================
    echo   [완료] GitHub 푸시 성공! Netlify에서 자동 배포됩니다.
    echo ========================================================
) else (
    echo.
    echo [안내] 푸시에 실패했거나 원격 저장소(GitHub) 설정이 필요합니다.
    echo GitHub 레포지토리 연결 가이드를 확인해 주세요.
)

echo.
pause
