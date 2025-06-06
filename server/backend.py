
import logging
import requests
import json
import time
import os


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
        if item.get('has_fbo_stocks', True):  # Если archived = false или отсутствует
            product_info = {
                'offer_id': item.get('offer_id'),
                'product_id': item.get('product_id')
            }
            active_products.append(product_info)

    print(f"\nНайдено {len(active_products)} активных товаров:")
    for product in active_products:
        print(f"  offer_id: {product['offer_id']}, product_id: {product['product_id']}")

    return active_products

# def get_product_attributes():
#     """Получает характеристики товаров"""
#     url = "https://api-seller.ozon.ru/v4/product/info/attributes"

#     headers = {
#         "Client-Id": "69819",
#         "Api-Key": "dfd3581a-04ad-4149-aead-563e17f6f3a8",
#         "Content-Type": "application/json"
#     }

#     payload = {
#         "filter": {
#             "product_id": [
#                 "1149507605"
#             ],
#             "offer_id": [
#                 "DLC8601P/74"
#             ],
#             "visibility": "ALL"
#         },
#         "limit": 100,
#         "sort_dir": "ASC"
#     }

#     try:
#         response = requests.post(url, headers=headers, json=payload)

#         if response.status_code == 200:
#             print("\n" + "="*50)
#             print("Характеристики товаров получены успешно!")
#             print("Статус код:", response.status_code)
#             print("\nХарактеристики товаров:")
#             print(json.dumps(response.json(), indent=2, ensure_ascii=False))
#         else:
#             print(f"Ошибка при получении характеристик! Статус код: {response.status_code}")
#             print("Ответ:", response.text)

#     except requests.exceptions.RequestException as e:
#         print(f"Ошибка при выполнении запроса характеристик: {e}")

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
        print(f"✓ Запрос к API: product_id={product['product_id']}, offer_id={product['offer_id']}")

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


def get_product_prices(product_ids):
    """Получает цены товаров"""
    url = "https://api-seller.ozon.ru/v5/product/info/prices"
    headers = {
        "Client-Id": "69819",
        "Api-Key": "dfd3581a-04ad-4149-aead-563e17f6f3a8",
        "Content-Type": "application/json"
    }
    payload = {
        "filter": {
            "product_id": product_ids,
            "visibility": "ALL"
        },
        "limit": 100
    }
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s",
        handlers=[
            logging.FileHandler("output.log"),  # Запись в файл
            logging.StreamHandler()            # Вывод в терминал
        ]
    )
    try:
        response = requests.post(url, headers=headers, json=payload)
        if response.status_code == 200:
            prices_response = response.json()
            print("Ответ сервера:")
            print(json.dumps(prices_response, indent=2, ensure_ascii=False))
            logging.info("Ответ сервера: %s", json.dumps(prices_response, indent=2, ensure_ascii=False))

            # Проверяем наличие ключа 'items'
            items = prices_response.get('items', [])
            if not items:
                logging.error("✗ Ошибка: Нет данных о ценах (ключ 'items' отсутствует или пуст).")
                return {}

            product_prices = {}
            for item in prices_response['items']:
                product_id = item.get('product_id')
                price_data = item.get('price', {})
                net_price = price_data.get('price', None)  # Берем значение price

                if product_id and net_price is not None:
                    product_prices[product_id] = net_price
                else:
                    print(f"✗ Ошибка при обработке товара с product_id: {product_id}. Цена не найдена.")
            print(product_prices)
            return product_prices
        else:
            try:
                error_data = response.json()
                print(f"Ошибка API: {error_data.get('message', 'Неизвестная ошибка')}")
            except ValueError:
                print(f"Ошибка API: {response.text}")
            return None

    except requests.exceptions.RequestException as e:
        print(f"Ошибка при выполнении запроса цен товаров: {e}")
        return None

import logging

# def get_product_attributes_for_active_products(active_products):
    # """Получает характеристики и цены для всех активных товаров"""
    # url = "https://api-seller.ozon.ru/v4/product/info/attributes"
    # headers = {
    #     "Client-Id": "69819",  # Замените на реальные данные
    #     "Api-Key": "dfd3581a-04ad-4149-aead-563e17f6f3a8",      # Замените на реальные данные
    #     "Content-Type": "application/json"
    # }
    # all_attributes = []
    # # Получаем список product_ids для запроса цен
    # product_ids = [str(product['product_id']) for product in active_products]

    # # Получаем цены товаров
    # prices_response = get_product_prices(product_ids)

    # # Проверяем, что prices_response является словарем
    # if not isinstance(prices_response, dict):
    #     logging.error("✗ Ошибка: Некорректный формат данных о ценах.")
    #     return []

    # # Создаем словарь product_prices для быстрого доступа к ценам по product_id
    # product_prices = prices_response
    # for i, product in enumerate(active_products):
    #     logging.info(f"\nПолучение характеристик для товара {i+1}/{len(active_products)}")
    #     logging.info(f"offer_id: {product['offer_id']}, product_id: {product['product_id']}")
    #     payload = {
    #         "filter": {
    #             "product_id": [str(product['product_id'])],
    #             "offer_id": [product['offer_id']],
    #             "visibility": "ALL"
    #         },
    #         "limit": 100,
    #         "sort_dir": "ASC"
    #     }
    #     try:
    #         response = requests.post(url, headers=headers, json=payload)
    #         if response.status_code == 200:
    #             attributes_data = response.json()
    #             logging.info(f"✓ Характеристики получены успешно!")
    #             # Добавляем идентификаторы товара к характеристикам для удобства
    #             attributes_data['offer_id'] = product['offer_id']
    #             attributes_data['product_id'] = product['product_id']
    #             # Добавляем цену из product_prices
    #             product_id = product['product_id']
    #             price = product_prices.get(product_id, 0)  # Берем цену или 0, если цена отсутствует
    #             attributes_data['marketing_seller_price'] = price
    #             all_attributes.append(attributes_data)
    #             # Выводим краткую информацию
    #             if attributes_data.get('result'):
    #                 items_count = len(attributes_data['result'])
    #                 logging.info(f"  Найдено характеристик: {items_count}")
    #         else:
    #             logging.error(f"✗ Ошибка при получении характеристик! Статус код: {response.status_code}")
    #             logging.error(f"Ответ: {response.text}")
    #             continue  # Пропускаем текущий товар
    #     except requests.exceptions.RequestException as e:
    #         logging.error(f"✗ Ошибка при выполнении запроса: {e}")

    #     # Небольшая задержка между запросами, чтобы не перегружать API
    #     time.sleep(0.2)

    # logging.info(f"\n" + "="*50)
    # logging.info(f"Обработано товаров: {len(all_attributes)}/{len(active_products)}")
    # return all_attributes




def create_mock_data_from_json(json_file_path='product_attributes.json', output_file='src/api/mock-data.ts'):
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

            # Извлекаем описание из атрибута с id: 4191
            description = "Описание товара"
            attributes = product_data.get('attributes', [])
            for attr in attributes:
                if attr.get('id') == 4191 and attr.get('values'):
                    description = attr['values'][0].get('value', description)
                    break

            # Извлекаем изображения напрямую из структуры товара
            primary_image = product_data.get('primary_image', '')
            product_images = product_data.get('images', [])

            # Собираем все изображения: primary_image + остальные images
            images = []
            if primary_image and primary_image.startswith('http'):
                images.append(primary_image.strip())
            for img in product_images:
                if img and img.startswith('http') and img.strip() not in images:
                    images.append(img.strip())

            # Извлекаем размеры и вес
            height = product_data.get('height', 0)
            depth = product_data.get('depth', 0)
            width = product_data.get('width', 0)
            dimension_unit = product_data.get('dimension_unit', 'mm')
            weight = product_data.get('weight', 0)
            weight_unit = product_data.get('weight_unit', 'g')
            category = product_data.get('description_category_id', 1)

            # Ищем атрибуты товара для извлечения бренда, цвета и других данных
            category_name = 'Общая категория'
            brand = 'MusicHall'
            color = 'Не указано'
            # price = item.get('price', 999.99)  # Цена из retail_price
            for attr in attributes:
                attr_id = attr.get('id', 0)
                values = attr.get('values', [])
                # ID 85 - это бренд
                if attr_id == 85 and values:
                    brand = values[0].get('value', brand)
                # ID 10096 - это цвет
                if attr_id == 10096 and values:
                    color = values[0].get('value', color)
                # Можно добавить другие атрибуты по их ID если нужно


            # Извлекаем цену из marketing_seller_price или retail_price
            # price = item.get('marketing_seller_price', item.get('retail_price', 999.99))
            # Извлекаем product_id
            product_id = item.get('product_id')
            product_ids = [str(product['product_id']) for product in active_products]

            # Получаем цены товаров
            prices_response = get_product_prices(product_ids)
            # Ищем цену в словаре product_prices
            price = prices_response.get(product_id, 0)
            # Логируем цену для отладки
            print(f"✓ Товар {len(products)}: {name[:50]}... - цена: {price}")
            # Создаем товар с ID по порядку
            product = {
                'id': str(len(products) + 1),  # Генерируем ID по порядку начиная с 1
                'title': name,
                'description': description,  # Используем описание из атрибута
                'price': price,
                'rating': round(4.0 + (i % 10) * 0.1, 1),  # Генерируем рейтинг 4.0-4.9
                'stock': 10 + (i % 20),  # Генерируем остаток 10-29
                'brand': brand,
                'color': color,  # Добавляем цвет
                'category': category,
                'thumbnail': images[0] if images else 'https://via.placeholder.com/300x300',
                'images': images if images else ['https://via.placeholder.com/300x300'],
                'dimensions': {
                    'height': height,
                    'depth': depth,
                    'width': width,
                    'unit': dimension_unit
                },
                'weight': {
                    'value': weight,
                    'unit': weight_unit
                }
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


        ts_content += '''];
export const products: Product[] = [
'''
        # Добавляем товары
        for product in products:
            ts_content += '  {\n'
            ts_content += f"    id: '{product['id']}',\n"
            ts_content += f"    title: `{product['title']}`,\n"
            ts_content += f"    description: `{product['description']}`,\n"
            ts_content += f"    price: {product['price']},\n"
            if 'discountPercentage' in product:
                ts_content += f"    discountPercentage: {product['discountPercentage']},\n"
            ts_content += f"    rating: {product['rating']},\n"
            ts_content += f"    stock: {product['stock']},\n"
            ts_content += f"    brand: '{product['brand']}',\n"
            ts_content += f"    color: '{product['color']}',\n"
            ts_content += f"    category: '{product['category']}',\n"
            ts_content += f"    thumbnail: '{product['thumbnail']}',\n"
            ts_content += f"    images: [\n"
            for img in product['images']:
                ts_content += f"      '{img}',\n"
            ts_content += '    ],\n'
            ts_content += f"    dimensions: {{\n"
            ts_content += f"      height: {product['dimensions']['height']},\n"
            ts_content += f"      depth: {product['dimensions']['depth']},\n"
            ts_content += f"      width: {product['dimensions']['width']},\n"
            ts_content += f"      unit: '{product['dimensions']['unit']}'\n"
            ts_content += '    },\n'
            ts_content += f"    weight: {{\n"
            ts_content += f"      value: {product['weight']['value']},\n"
            ts_content += f"      unit: '{product['weight']['unit']}'\n"
            ts_content += '    }\n'
            ts_content += '  },\n'
        ts_content += '];\n'

        # Выводим содержимое файла для отладки
        print("✓ Содержимое файла mock-data.ts:")
        print(ts_content[:500])  # Выводим первые 500 символов

        # Создаем директорию, если её нет
        output_dir = os.path.dirname(output_file)
        os.makedirs(output_dir, exist_ok=True)

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
        import traceback
        traceback.print_exc()  # Выводим трассировку стека
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
            try:
                with open('product_attributes.json', 'w', encoding='utf-8') as f:
                    json.dump(all_attributes, f, indent=2, ensure_ascii=False)
                print("✓ Файл 'product_attributes.json' успешно создан!")
            except Exception as e:
                print(f"✗ Ошибка при записи файла 'product_attributes.json': {e}")
            print(f"\nВсе характеристики сохранены в файл 'product_attributes.json'")
            # Создаем mock-data.ts файл
            create_mock_data_from_json()