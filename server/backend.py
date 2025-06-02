import requests
import json
import time

def get_product_list():
    """Получает список товаров"""
    url = "https://api-seller.ozon.ru/v3/product/list"

    headers = {
        "Client-Id": "69819",
        "Api-Key": "dfd3581a-04ad-4149-aead-563e17f6f3a8",
        "Content-Type": "application/json"
    }

    payload = {
        "filter": {
            "visibility": "ALL"
        },
        "last_id": "",
        "limit": 100
    }

    try:
        response = requests.post(url, headers=headers, json=payload)

        if response.status_code == 200:
            print("Список товаров получен успешно!")
            print("Статус код:", response.status_code)
            print("\nСписок товаров:")
            print(json.dumps(response.json(), indent=2, ensure_ascii=False))
            return response.json()
        else:
            print(f"Ошибка при получении списка товаров! Статус код: {response.status_code}")
            print("Ответ:", response.text)
            return None

    except requests.exceptions.RequestException as e:
        print(f"Ошибка при выполнении запроса списка товаров: {e}")
        return None

def parse_active_products(product_list_response):
    """Парсит ответ и возвращает offer_id и product_id для неархивированных товаров"""
    if not product_list_response or 'result' not in product_list_response:
        print("Некорректный ответ от сервера")
        return []

    items = product_list_response['result'].get('items', [])
    active_products = []

    for item in items:
        if not item.get('archived', True):  # Если archived = false или отсутствует
            product_info = {
                'offer_id': item.get('offer_id'),
                'product_id': item.get('product_id')
            }
            active_products.append(product_info)

    print(f"\nНайдено {len(active_products)} активных товаров:")
    for product in active_products:
        print(f"  offer_id: {product['offer_id']}, product_id: {product['product_id']}")

    return active_products

def get_product_attributes():
    """Получает характеристики товаров"""
    url = "https://api-seller.ozon.ru/v4/product/info/attributes"

    headers = {
        "Client-Id": "69819",
        "Api-Key": "dfd3581a-04ad-4149-aead-563e17f6f3a8",
        "Content-Type": "application/json"
    }

    payload = {
        "filter": {
            "product_id": [
                "1149507605"
            ],
            "offer_id": [
                "DLC8601P/74"
            ],
            "visibility": "ALL"
        },
        "limit": 100,
        "sort_dir": "ASC"
    }

    try:
        response = requests.post(url, headers=headers, json=payload)

        if response.status_code == 200:
            print("\n" + "="*50)
            print("Характеристики товаров получены успешно!")
            print("Статус код:", response.status_code)
            print("\nХарактеристики товаров:")
            print(json.dumps(response.json(), indent=2, ensure_ascii=False))
        else:
            print(f"Ошибка при получении характеристик! Статус код: {response.status_code}")
            print("Ответ:", response.text)

    except requests.exceptions.RequestException as e:
        print(f"Ошибка при выполнении запроса характеристик: {e}")

def get_product_attributes_for_active_products(active_products):
    """Получает характеристики для всех активных товаров"""
    url = "https://api-seller.ozon.ru/v4/product/info/attributes"

    headers = {
        "Client-Id": "69819",
        "Api-Key": "dfd3581a-04ad-4149-aead-563e17f6f3a8",
        "Content-Type": "application/json"
    }

    all_attributes = []

    for i, product in enumerate(active_products):
        print(f"\nПолучение характеристик для товара {i+1}/{len(active_products)}")
        print(f"offer_id: {product['offer_id']}, product_id: {product['product_id']}")

        payload = {
            "filter": {
                "product_id": [str(product['product_id'])],
                "offer_id": [product['offer_id']],
                "visibility": "ALL"
            },
            "limit": 100,
            "sort_dir": "ASC"
        }

        try:
            response = requests.post(url, headers=headers, json=payload)

            if response.status_code == 200:
                attributes_data = response.json()
                print(f"✓ Характеристики получены успешно!")

                # Добавляем идентификаторы товара к характеристикам для удобства
                attributes_data['offer_id'] = product['offer_id']
                attributes_data['product_id'] = product['product_id']

                all_attributes.append(attributes_data)

                # Выводим краткую информацию
                if 'result' in attributes_data and attributes_data['result']:
                    items_count = len(attributes_data['result'])
                    print(f"  Найдено характеристик: {items_count}")

            else:
                print(f"✗ Ошибка при получении характеристик! Статус код: {response.status_code}")
                print("Ответ:", response.text)

        except requests.exceptions.RequestException as e:
            print(f"✗ Ошибка при выполнении запроса: {e}")

        # Небольшая задержка между запросами, чтобы не перегружать API
        if i < len(active_products) - 1:
            time.sleep(0.5)

    print(f"\n" + "="*50)
    print(f"Обработано товаров: {len(all_attributes)}/{len(active_products)}")

    return all_attributes

def create_mock_data_from_json(json_file_path='product_attributes.json', output_file='../src/api/mock-data.ts'):
    """Создает mock-data.ts файл из JSON с характеристиками товаров"""
    try:
        # Читаем JSON файл
        with open(json_file_path, 'r', encoding='utf-8') as f:
            all_attributes = json.load(f)

        print(f"Загружено {len(all_attributes)} товаров из {json_file_path}")

        # Собираем категории и товары
        categories = {}
        products = []

        for i, item in enumerate(all_attributes):
            if 'result' not in item or not item['result']:
                continue

            product_data = item['result'][0]  # Берем первый результат
            offer_id = item.get('offer_id', f'product_{i+1}')

            # Извлекаем основные данные товара
            name = product_data.get('name', f'Товар {i+1}')
            description = product_data.get('description', 'Описание товара')

            # Извлекаем изображения напрямую из структуры товара
            primary_image = product_data.get('primary_image', '')
            product_images = product_data.get('images', [])

            # Собираем все изображения: primary_image + остальные images
            images = []
            if primary_image and primary_image.startswith('http'):
                images.append(primary_image)

            for img in product_images:
                if img and img.startswith('http') and img not in images:
                    images.append(img)

            # Ищем атрибуты товара для извлечения бренда и других данных
            attributes = product_data.get('attributes', [])

            # Извлекаем нужные атрибуты
            category_name = 'Общая категория'
            brand = 'MusicHall'
            price = 999.99

            for attr in attributes:
                attr_id = attr.get('id', 0)
                values = attr.get('values', [])

                # ID 85 - это бренд
                if attr_id == 85 and values:
                    brand = values[0].get('value', brand)
                # Можно добавить другие атрибуты по их ID если нужно

            # Добавляем категорию
            if category_name not in categories:
                categories[category_name] = str(len(categories) + 1)

            # Создаем товар с ID по порядку
            product = {
                'id': str(len(products) + 1),  # Генерируем ID по порядку начиная с 1
                'title': name,
                'description': description,
                'price': price,
                'rating': round(4.0 + (i % 10) * 0.1, 1),  # Генерируем рейтинг 4.0-4.9
                'stock': 10 + (i % 20),  # Генерируем остаток 10-29
                'brand': brand,
                'category': categories[category_name],
                'thumbnail': images[0] if images else 'https://via.placeholder.com/300x300',
                'images': images if images else ['https://via.placeholder.com/300x300']
            }

            # Добавляем скидку для некоторых товаров
            if i % 3 == 0:
                product['discountPercentage'] = 5 + (i % 15)

            products.append(product)

            # Выводим информацию о найденных изображениях
            if images:
                print(f"✓ Товар {len(products)}: {name[:50]}... - найдено {len(images)} изображений")
            else:
                print(f"⚠ Товар {len(products)}: {name[:50]}... - изображения не найдены")

        # Формируем TypeScript код
        ts_content = '''import { Product, Category } from '../types/product';

export const categories: Category[] = [
'''

        # Добавляем категории
        for name, id in categories.items():
            ts_content += f"  {{ id: '{id}', name: '{name}'}},\n"

        ts_content += '''];

export const products: Product[] = [
'''

        # Добавляем товары
        for product in products:
            ts_content += '  {\n'
            ts_content += f"    id: '{product['id']}',\n"
            ts_content += f"    title: `{product['title']}`,\n"  # Используем template literal для длинных названий
            ts_content += f"    description: `{product['description']}`,\n"
            ts_content += f"    price: {product['price']},\n"

            if 'discountPercentage' in product:
                ts_content += f"    discountPercentage: {product['discountPercentage']},\n"

            ts_content += f"    rating: {product['rating']},\n"
            ts_content += f"    stock: {product['stock']},\n"
            ts_content += f"    brand: '{product['brand']}',\n"
            ts_content += f"    category: '{product['category']}',\n"
            ts_content += f"    thumbnail: '{product['thumbnail']}',\n"
            ts_content += f"    images: [\n"

            for img in product['images']:
                ts_content += f"      '{img}',\n"

            ts_content += '    ]\n'
            ts_content += '  },\n'

        ts_content += '];\n'

        # Записываем файл
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(ts_content)

        print(f"\n✓ Файл {output_file} успешно создан!")
        print(f"  Категорий: {len(categories)}")
        print(f"  Товаров: {len(products)}")

        # Статистика по изображениям
        products_with_images = sum(1 for p in products if p['thumbnail'] != 'https://via.placeholder.com/300x300')
        print(f"  Товаров с реальными изображениями: {products_with_images}/{len(products)}")

        return True

    except FileNotFoundError:
        print(f"✗ Файл {json_file_path} не найден!")
        return False
    except json.JSONDecodeError:
        print(f"✗ Ошибка при чтении JSON файла {json_file_path}")
        return False
    except Exception as e:
        print(f"✗ Ошибка при создании mock-data.ts: {e}")
        return False

# Основная функция
if __name__ == "__main__":
    # Сначала получаем список товаров
    product_list = get_product_list()

    if product_list:
        # Парсим активные товары
        active_products = parse_active_products(product_list)

        if active_products:
            # Получаем характеристики для всех активных товаров
            all_attributes = get_product_attributes_for_active_products(active_products)

            # Сохраняем результат в файл для удобства
            with open('product_attributes.json', 'w', encoding='utf-8') as f:
                json.dump(all_attributes, f, indent=2, ensure_ascii=False)
            print(f"\nВсе характеристики сохранены в файл 'product_attributes.json'")

            # Создаем mock-data.ts файл
            create_mock_data_from_json()

    # Затем получаем характеристики товаров (старая функция - можно удалить)
    # get_product_attributes()
