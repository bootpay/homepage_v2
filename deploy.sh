#!/bin/bash

# GitHub Pages 배포 스크립트
echo "🚀 BootPay 웹사이트를 GitHub Pages에 배포합니다..."

# Git 상태 확인
echo "📋 Git 상태 확인 중..."
git status

# 변경사항이 있으면 커밋
if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "📝 변경사항을 커밋합니다..."
    git add .
    git commit -m "Update BootPay website for deployment"
else
    echo "✅ 커밋할 변경사항이 없습니다."
fi

# GitHub에 푸시
echo "⬆️  GitHub에 푸시합니다..."
git push origin main

# GitHub Pages 상태 확인
echo "🔍 GitHub Pages 상태를 확인합니다..."
curl -s -H "Accept: application/vnd.github.v3+json" \
     https://api.github.com/repos/bootpay/homepage_v2/pages \
     | grep -q '"status":"built"' && echo "✅ Pages가 이미 활성화되어 있습니다." || echo "⚠️  Pages 설정이 필요합니다."

echo "🌐 배포가 완료되면 다음 URL에서 확인하실 수 있습니다:"
echo "   https://bootpay.github.io/homepage_v2/"
echo ""
echo "📌 처음 배포하는 경우:"
echo "   1. https://github.com/bootpay/homepage_v2/settings/pages 방문"
echo "   2. Source: Deploy from a branch 선택" 
echo "   3. Branch: main, Folder: / (root) 선택"
echo "   4. Save 클릭"
echo ""
echo "🕐 배포 완료까지 2-3분 소요됩니다."