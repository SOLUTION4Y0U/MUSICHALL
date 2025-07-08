import { useState } from 'react';
import { ROUTES } from '../../constants/routes';
import '../../styles/landing.css';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const navigate = useNavigate();

  // Toggle FAQ accordion
  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };
  const handleContactsClick = () => {
    
      sessionStorage.setItem('scrollToContacts', 'true');
      navigate(ROUTES.HOME);
    
  };
  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex min-h-[100vh] flex-col bg-black text-white">
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] w-full max-w-[100vw] flex-col overflow-hidden">
       
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        <div className="relative z-10 flex h-full min-h-[50vh] w-full flex-col place-content-center gap-6 p-[5%] max-xl:place-items-center max-lg:p-4">
          <div className="flex flex-col place-content-center items-center">
            <div className="gradient-text text-center text-6xl font-semibold uppercase leading-[80px] max-lg:text-4xl max-md:leading-snug">
              <span>Часто задаваемые</span>
              <br />
              <span>вопросы</span>
            </div>
            <div className="mt-10 max-w-[600px] text-2xl p-2 text-center text-gray-300 max-lg:max-w-full">
              Ответы на самые популярные вопросы о нашей компании и услугах
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="flex w-full flex-col place-content-center place-items-center gap-[10%] p-[5%] px-[10%]">
        <h3 className="text-4xl font-medium text-gray-300 max-md:text-2xl">
          FAQ
        </h3>
        <div className="mt-5 flex min-h-[300px] w-full max-w-[850px] flex-col gap-4">
          <div className="faq w-full rounded-md border-[1px] border-solid border-[#1F2123] bg-[#080808]">
            <div
              className="faq-accordion flex w-full select-none text-xl max-md:text-lg cursor-pointer"
              onClick={() => toggleFaq(0)}
            >
              <span>Предоставляется ли гарантия на товар?</span>
              <i className={`bi ${activeFaq === 0 ? 'bi-dash' : 'bi-plus'} ml-auto font-semibold`}></i>
            </div>
            <div className={`content ${activeFaq === 0 ? 'active' : ''}`}>
            Информация о гарантии
              <br /><br />
              Гарантия на товар 2 года. Уполномоченная организация по гарантийному обслуживанию: ООО «СЕРВИСПРОВАЙДЕР», г. Москва, ул. Нарвская, д. 15а, стр. 5
              <br /><br />
              Тел.: +7 495 984-06-02/ +7 800 200-67-19, перечень сервисных центров указан на официальном сайте: <br />
              <a 
                href="https://www.serviceprovider.ru/" 
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.serviceprovider.ru/
              </a>
            </div>
          </div>

          <div className="faq w-full rounded-md border-[1px] border-solid border-[#1F2123] bg-[#080808]">
            <div
              className="faq-accordion flex w-full select-none text-xl max-md:text-lg cursor-pointer"
              onClick={() => toggleFaq(1)}
            >
              <span>Можно ли оформить возврат?</span>
              <i className={`bi ${activeFaq === 1 ? 'bi-dash' : 'bi-plus'} ml-auto font-semibold`}></i>
            </div>
            <div className={`content ${activeFaq === 1 ? 'active' : ''}`}>
              Да
            </div>
          </div>

          <div className="faq w-full rounded-md border-[1px] border-solid border-[#1F2123] bg-[#080808]">
            <div
              className="faq-accordion flex w-full select-none text-xl max-md:text-lg cursor-pointer"
              onClick={() => toggleFaq(2)}
            >
              <span>Представлены ли вы на маркетплейсах?</span>
              <i className={`bi ${activeFaq === 2 ? 'bi-dash' : 'bi-plus'} ml-auto font-semibold`}></i>
            </div>
            <div className={`content ${activeFaq === 2 ? 'active' : ''}`}>
              <div className="text-lg mb-4">
                Да, вы можете найти наши магазины на следующих маркетплейсах:
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Ozon */}
                <div className="flex flex-col items-center p-4 rounded-lg border border-gray-600 bg-black">
                  <div className="w-24 h-16 mb-3 flex items-center justify-center">
                    <img 
                      src="/logos_partners/1200px-ОЗОН_ЛОГО.png" 
                      alt="Ozon" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <a 
                    href="https://www.ozon.ru/seller/oneenergy-69819/?__rr=1&abt_att=1&origin_referer=www.ozon.ru&miniapp=seller_69819" 
                    className="text-white hover:text-blue-300 underline mb-3 text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Перейти в магазин
                  </a>
                  <div className="w-24 h-24 rounded-lg flex items-center justify-center">
                    <img 
                      src="/QR-codes/qr-code-ozon.png" 
                      alt="QR код Ozon" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Wildberries */}
                <div className="flex flex-col items-center p-4 rounded-lg border border-gray-600 bg-black">
                  <div className="w-24 h-16 mb-3 flex items-center justify-center">
                    <img 
                      src="/logos_partners/Wildberries_Logo.png" 
                      alt="Wildberries" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <a 
                    href="https://www.wildberries.ru/seller/159267" 
                    className="text-white hover:text-blue-300 underline mb-3 text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Перейти в магазин
                  </a>
                  <div className="w-24 h-24 rounded-lg flex items-center justify-center">
                    <img 
                      src="/QR-codes/qr-code-wildberries.png" 
                      alt="QR код Wildberries" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Яндекс.Маркет */}
                <div className="flex flex-col items-center p-4 rounded-lg border border-gray-600 bg-black">
                  <div className="w-30 h-16 mb-3 flex items-center justify-center">
                    <img 
                      src="/logos_partners/yandex_market.png" 
                      alt="Яндекс.Маркет" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <a 
                    href="https://market.yandex.ru/business--oneenergy-llc/1044944?generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D1044944%3B&rs=eJwzUv_EqMLBKLDwEKsEg8azbh6NnqOsGhuBuPE4q8aPU6waZ0-zajzv5gEAEloOnw%2C%2C&searchContext=sins_ctx" 
                    className="text-white hover:text-blue-300 underline mb-3 text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Перейти в магазин
                  </a>
                  <div className="w-24 h-24 rounded-lg flex items-center justify-center">
                    <img 
                      src="/QR-codes/qr-code-yandex.png" 
                      alt="QR код Яндекс.Маркет" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col place-items-center gap-4">
          <div className="text-3xl max-md:text-2xl">
            Остались вопросы?
          </div>
          <button
            onClick={handleContactsClick}
            className="btn2 !rounded-full !border-[1px] !border-solid !border-gray-300 !bg-transparent transition-colors duration-[0.3s]"
          >
            Свяжитесь с нами
          </button>
        </div>
      </section>
    </div>
  );
};

export default FAQ; 