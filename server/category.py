import requests
import json


def get_product_categories():
    """Получает список категорий товаров из API Ozon"""
    url = "https://api-seller.ozon.ru/v1/description-category/tree"    
    headers = {
        "Client-Id": "69819",  # Замените на ваш Client-Id
        "Api-Key": "dfd3581a-04ad-4149-aead-563e17f6f3a8",    # Замените на ваш Api-Key
        "Content-Type": "application/json"
    }
    payload = {
        "language": "DEFAULT"
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        if response.status_code == 200:
            print("Список категорий получен успешно!")
            categories = parse_categories(response.json())
            return categories
        else:
            print(f"Ошибка при получении списка категорий! Статус код: {response.status_code}")
            print("Ответ:", response.text)
            return None
    except requests.exceptions.RequestException as e:
        print(f"Ошибка при выполнении запроса списка категорий: {e}")
        return None

def parse_categories(response):
    """Рекурсивно парсит ответ и возвращает список категорий с их ID и названиями"""
    categories = []
    
    def extract_categories(data):
        for item in data:
            category_id = item.get('description_category_id')
            category_name = item.get('category_name')
            if category_id and category_name:
                categories.append({
                    'id': str(category_id),  # Преобразуем ID в строку
                    'name': category_name
                })
            # Рекурсивно обрабатываем дочерние категории
            children = item.get('children', [])
            if children:
                extract_categories(children)
    
    if 'result' in response:
        extract_categories(response['result'])
    
    print(f"Найдено {len(categories)} категорий:")
    for category in categories:
        print(f"  ID: {category['id']}, Название: {category['name']}")
    return categories

def format_categories_for_typescript(categories):
    """Форматирует категории для TypeScript"""
    ts_content = "export const categories: Category[] = [\n"
    for category in categories:
        ts_content += f"  {{ id: '{category['id']}', name: '{category['name']}' }},\n"
    ts_content += "];\n"
    return ts_content


def extract_unique_category_ids(json_file_path='product_attributes.json'):
    """Извлекает уникальные description_category_id из product_attributes.json"""
    try:
        with open(json_file_path, 'r', encoding='utf-8') as f:
            all_attributes = json.load(f)
        
        unique_category_ids = set()
        for item in all_attributes:
            # Проверяем наличие ключа 'result' и что это список
            if 'result' in item and isinstance(item['result'], list):
                for result_item in item['result']:
                    category_id = result_item.get('description_category_id')
                    if category_id:
                        unique_category_ids.add(str(category_id))  # Преобразуем ID в строку для удобства

        print(f"Найдено {len(unique_category_ids)} уникальных description_category_id:")
        for cid in unique_category_ids:
            print(f"  ID: {cid}")
        return unique_category_ids
    except FileNotFoundError:
        print(f"✗ Файл {json_file_path} не найден!")
        return set()
    except json.JSONDecodeError:
        print(f"✗ Ошибка при чтении JSON файла {json_file_path}")
        return set()

def filter_categories_by_ids(categories, category_ids):
    """Фильтрует категории по заданным description_category_id"""
    filtered_categories = []
    for category in categories:
        if str(category['id']) in category_ids:
            filtered_categories.append(category)
    
    print(f"Отфильтровано {len(filtered_categories)} категорий:")
    for category in filtered_categories:
        print(f"  ID: {category['id']}, Название: {category['name']}")
    return filtered_categories

def update_mock_data_with_filtered_categories(filtered_categories, output_file='../src/api/mock-data.ts'):
    """Обновляет mock-data.ts, добавляя или заменяя секцию с отфильтрованными категориями"""
    try:
        # Читаем текущий файл mock-data.ts
        with open(output_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Формируем TypeScript код для категорий
        ts_content = "export const categories: Category[] = [\n"
        for category in filtered_categories:
            ts_content += f"  {{ id: '{category['id']}', name: '{category['name']}' }},\n"
        ts_content += "];\n"

        # Находим начало и конец секции с категориями
        start_marker = "export const categories: Category[] = ["
        end_marker = "];"

        start_index = content.find(start_marker)
        end_index = content.find(end_marker, start_index)

        if start_index != -1 and end_index != -1:
            # Заменяем старую секцию категорий на новую
            updated_content = (
                content[:start_index] + 
                ts_content + 
                content[end_index + len(end_marker):]
            )
        else:
            # Если секция категорий не найдена, добавляем её в конец файла
            updated_content = content + "\n" + ts_content

        # Записываем обновленное содержимое обратно в файл
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(updated_content)

        print(f"\n✓ Файл {output_file} успешно обновлен!")

    except FileNotFoundError:
        print(f"✗ Файл {output_file} не найден!")
    except Exception as e:
        print(f"✗ Ошибка при обновлении mock-data.ts: {e}")

if __name__ == "__main__":
    # Шаг 1: Извлекаем уникальные description_category_id
    unique_category_ids = extract_unique_category_ids()

    if not unique_category_ids:
        print("Не найдено ни одного description_category_id. Завершение работы.")
        exit(1)

    # Шаг 2: Получаем список всех категорий из API Ozon
    categories = get_product_categories()
    if not categories:
        print("Не удалось получить список категорий. Завершение работы.")
        exit(1)

    # Шаг 3: Фильтруем категории по description_category_id
    filtered_categories = filter_categories_by_ids(categories, unique_category_ids)

    if not filtered_categories:
        print("Не найдено ни одной подходящей категории. Завершение работы.")
        exit(1)

    # Шаг 4: Обновляем mock-data.ts с отфильтрованными категориями
    update_mock_data_with_filtered_categories(filtered_categories)

