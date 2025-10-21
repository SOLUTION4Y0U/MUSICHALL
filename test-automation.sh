#!/bin/bash

# Test script for automated backend runs
echo "🧪 Testing automated backend setup..."

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 is not installed"
    exit 1
fi

echo "✅ Python3 is available"

# Check if required files exist
required_files=(
    "server/backend.py"
    "server/requirements.txt"
    ".github/workflows/update-data.yml"
    ".github/workflows/static.yml"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Required file missing: $file"
        exit 1
    fi
    echo "✅ Found: $file"
done

# Check if Python dependencies can be installed
echo "📦 Testing Python dependencies..."
cd server
if python3 -m pip install -r requirements.txt --dry-run; then
    echo "✅ Python dependencies can be installed"
else
    echo "❌ Failed to install Python dependencies"
    exit 1
fi

echo ""
echo "🎉 All tests passed! Your automated backend setup is ready."
echo ""
echo "📋 Next steps:"
echo "1. Push these changes to your GitHub repository"
echo "2. The workflow will run automatically at 6 AM and 6 PM UTC daily"
echo "3. You can also trigger it manually from the GitHub Actions tab"
echo "4. Monitor the workflow runs in the Actions section of your repository"
echo ""
echo "🔧 Manual testing:"
echo "You can test the backend script locally by running:"
echo "  cd server && python3 backend.py"
