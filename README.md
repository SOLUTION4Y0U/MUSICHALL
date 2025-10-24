<p align="center">
  <br>
  <img width="240" src="./src/assets/tapps.png" alt="logo of telegram web apps">
  <br>
  <br>
</p>

# MUSICHALL - Telegram Web App

Международный поставщик мобильных телефонов, портативной электроники и бытовой техники.

## 📍 Versions
`0` - working fix. works in browser and tgapp
`1` - UI fix. works in browser and tgapp

---

# 🔧 Инструкция по совместной работе в Git/GitHub

## 🌊 **1. Workflow (Рабочий процесс)**

### **Стратегия веток:**
```
main (или master) - стабильная ветка, только работающий код
├── feature/your-feature-name - ваши новые функции
├── feature/colleague-feature - функции коллеги
├── bugfix/fix-name - исправления багов
└── hotfix/urgent-fix - срочные исправления
```

## 📋 **2. Пошаговый алгоритм работы**

### **🚀 Начало работы над новой задачей:**

```bash
# 1. Переключаемся на main и получаем последние изменения
git checkout main
git pull origin main

# 2. Создаем новую ветку для вашей задачи
git checkout -b feature/add-brands-page

# 3. Работаем, делаем изменения...
# Редактируем файлы в вашем редакторе

# 4. Добавляем изменения в staging
git add .
# или выборочно: git add src/components/BrandCard.tsx

# 5. Делаем коммит с понятным сообщением
git commit -m "feat: add brands page with search and filters"

# 6. Отправляем ветку на GitHub
git push origin feature/add-brands-page
```

### **🔄 Синхронизация с коллегой:**

```bash
# Регулярно (несколько раз в день) синхронизируемся с main
git checkout main
git pull origin main

# Переключаемся обратно на свою ветку
git checkout feature/add-brands-page

# Подтягиваем изменения из main в свою ветку
git merge main
# или git rebase main (более чистая история)
```

## 🎯 **3. Основные команды Git**

### **Ежедневные команды:**
```bash
# Посмотреть статус файлов
git status

# Посмотреть изменения
git diff

# Посмотреть историю коммитов
git log --oneline --graph

# Посмотреть все ветки
git branch -a

# Переключиться между ветками
git checkout branch-name

# Создать новую ветку и переключиться на неё
git checkout -b new-branch-name

# Удалить ветку (после merge)
git branch -d feature-branch-name
```

### **Команды для отправки изменений:**
```bash
# Добавить все изменения
git add .

# Добавить конкретные файлы
git add src/components/Header.tsx src/pages/Home.tsx

# Коммит
git commit -m "fix: resolve navigation bug in header"

# Отправить на GitHub
git push origin your-branch-name

# Первый push новой ветки
git push -u origin new-branch-name
```

## 🛡️ **4. Правила безопасной работы**

### **✅ DO (Делайте):**
- Всегда работайте в отдельных ветках
- Делайте частые коммиты с понятными сообщениями
- Синхронизируйтесь с main несколько раз в день
- Создавайте Pull Request для каждой функции
- Тестируйте код перед push

### **❌ DON'T (Не делайте):**
- Никогда не пушьте напрямую в main
- Не делайте `git push --force` на общие ветки
- Не коммитьте неработающий код
- Не игнорируйте конфликты

## 🔀 **5. Pull Requests (PR)**

### **Создание PR:**
1. Заходите на GitHub в ваш репозиторий
2. Нажимаете "Compare & pull request"
3. Заполняете описание:
```markdown
## Что сделано
- Добавлена страница брендов
- Реализован поиск по брендам
- Добавлена навигация

## Как тестировать
1. Перейти на `/brands`
2. Попробовать поиск
3. Кликнуть на карточку бренда
```
4. Назначаете коллегу reviewer
5. Создаете PR

## ⚔️ **6. Разрешение конфликтов**

### **Когда возникают конфликты:**
```bash
# При попытке merge может возникнуть конфликт
git merge main

# Git покажет конфликтующие файлы
# Редактируете файлы, убираете маркеры конфликтов:
# <<<<<<< HEAD
# ваш код
# =======
# код коллеги
# >>>>>>> main

# После разрешения конфликтов
git add .
git commit -m "resolve: merge conflicts with main"
```

## 📝 **7. Соглашения по коммитам**

```bash
# Примеры хороших коммитов:
git commit -m "feat: add user authentication"
git commit -m "fix: resolve button alignment issue"
git commit -m "docs: update README with setup instructions"
git commit -m "refactor: optimize product card component"
git commit -m "style: fix eslint warnings"

# Типы коммитов:
# feat: новая функция
# fix: исправление бага
# docs: документация
# style: форматирование
# refactor: рефакторинг
# test: тесты
# chore: обновление зависимостей
```

## 🔄 **8. Ежедневный workflow**

### **Утром (начало работы):**
```bash
git checkout main
git pull origin main
git checkout your-branch
git merge main  # или git rebase main
```

### **В течение дня:**
```bash
# Каждые 1-2 часа
git add .
git commit -m "progress: working on brands functionality"
git push origin your-branch
```

### **Вечером (конец дня):**
```bash
git add .
git commit -m "feat: complete brands page implementation"
git push origin your-branch
# Создать PR если функция готова
```

## 🚨 **9. Экстренные ситуации**

### **Если что-то пошло не так:**
```bash
# Отменить последний коммит (не отправленный)
git reset --soft HEAD~1

# Отменить изменения в файле
git checkout -- filename.tsx

# Вернуться к определенному коммиту
git reset --hard commit-hash

# Если случайно удалили ветку
git reflog  # найти hash коммита
git checkout -b recovered-branch commit-hash
```

## 📱 **10. Инструменты**

### **Рекомендуемые:**
- **VS Code** с Git расширениями
- **GitKraken** или **SourceTree** (GUI клиенты)
- **GitHub Desktop** (простой GUI)

### **Полезные команды для проверки:**
```bash
# Кто что менял в файле
git blame filename.tsx

# Найти когда был добавлен баг
git bisect start

# Поиск по коммитам
git log --grep="fix"

# Посмотреть изменения между ветками
git diff main..feature-branch
```

## 💡 **11. Лучшие практики**

1. **Общайтесь:** Договоритесь кто над чем работает
2. **Мелкие коммиты:** Лучше много маленьких чем один большой
3. **Описания:** Всегда пишите понятные commit messages
4. **Тестирование:** Проверяйте код перед PR
5. **Ревью:** Внимательно смотрите код друг друга
6. **Документация:** Обновляйте README при необходимости

---

## 📚 Docs

## 🚀 Deploy

### Deploy to GitHub Pages

Workflow is set up to deploy to GitHub Pages when a push is made to the `main` branch.
`/.github/workflows/static.yml`

### Run locally

```bash
# npm
npm install
npm run dev --host
```
```bash
# yarn
yarn
yarn dev --host
```

### Docker

Configuration for running multiple applications in one network on a single server

Initial setup (performed once)

```bash
# Create a common network for all containers
docker network create tma_network
# Create .env file for the first application
cat > .env << EOF
APP_NAME=app1
APP_PORT=3001
EOF
```

Run container

```bash
docker-compose up -d
```

Nginx Proxy configuration on a separate server

# Links
- [Doc](https://docs.ton.org/develop/dapps/twa)
- [Example TMA](https://t.me/vite_twa_example_bot/app)
- [Link](https://twa-dev.github.io/vite-boilerplate/)
# Test trigger Fri Oct 24 13:59:31 CEST 2025
