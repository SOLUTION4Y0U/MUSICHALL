#!/usr/bin/env node

/**
 * Скрипт для генерации UTM-ссылок для сайта oneen.ru
 * Запуск: node scripts/generate-utm-links.js
 */

const baseUrl = 'https://oneen.ru';

// Конфигурация источников
const sources = [
  { name: 'Источник 1', source: 'yoga_fest', description: 'Описание первого источника' },
  { name: 'Источник 2', source: 'yoga_club', description: 'Описание второго источника' },
  { name: 'Источник 3', source: 'yoga_tg', description: 'Описание третьего источника' },
  { name: 'Источник 4', source: 'yoga_chat', description: 'Описание четвертого источника' },
  { name: 'Источник 5', source: 'yoga_personal', description: 'Описание пятого источника' },
  { name: 'Источник 6', source: 'yoga_reg', description: 'Описание шестого источника' },
];

// Функция для создания UTM-ссылки
function createUTMLink(source, medium = 'referral', campaign = null) {
  const url = new URL(baseUrl);
  url.searchParams.set('utm_source', source);
  url.searchParams.set('utm_medium', medium);
  
  if (campaign) {
    url.searchParams.set('utm_campaign', campaign);
  } else {
    url.searchParams.set('utm_campaign', `${source}_campaign`);
  }
  
  return url.toString();
}

// Генерация ссылок
console.log('🔗 UTM-ссылки для сайта oneen.ru\n');
console.log('=' .repeat(80));

sources.forEach((sourceConfig, index) => {
  const link = createUTMLink(sourceConfig.source);
  
  console.log(`\n${index + 1}. ${sourceConfig.name}`);
  console.log(`   Описание: ${sourceConfig.description}`);
  console.log(`   Ссылка: ${link}`);
  console.log(`   UTM Source: ${sourceConfig.source}`);
  console.log(`   UTM Medium: referral`);
  console.log(`   UTM Campaign: ${sourceConfig.source}_campaign`);
});

console.log('\n' + '=' .repeat(80));
console.log('\n📊 Для отслеживания в Яндекс.Метрике:');
console.log('   - ID счетчика: 103508983');
console.log('   - Все данные автоматически отправляются в метрику');
console.log('   - UTM-метки сохраняются в localStorage на 30 дней');

console.log('\n📋 Рекомендации:');
console.log('   1. Замените generic названия источников на реальные');
console.log('   2. Настройте уникальные кампании для каждого источника');
console.log('   3. Используйте utm_content для A/B тестирования');

console.log('\n🔧 Дополнительные ссылки:');
console.log('   - Страница генератора: https://oneen.ru/#/utm-links');
console.log('   - Документация: docs/UTM_SETUP.md');

console.log('\n✅ Готово! Используйте эти ссылки для размещения на ваших источниках трафика.\n'); 