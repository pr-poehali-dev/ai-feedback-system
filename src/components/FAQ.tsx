import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Где находится коттеджный посёлок?",
    answer:
      "Посёлок расположен в живописном месте в 30 км от города, окружён лесом. Удобный выезд на трассу — до центра города около 40 минут на автомобиле.",
  },
  {
    question: "Можно ли купить дом в ипотеку?",
    answer:
      "Да, мы работаем с ведущими банками — Сбербанк, ВТБ, Альфа-Банк. Первоначальный взнос от 20%. Наш менеджер поможет подобрать удобную программу и оформить документы.",
  },
  {
    question: "Что входит в стоимость дома?",
    answer:
      "В стоимость включены: земельный участок, строительство дома под ключ, подключение всех коммуникаций (газ, вода, канализация, электричество), черновая отделка. Чистовая отделка — опционально, по вашему желанию.",
  },
  {
    question: "Когда можно заехать?",
    answer:
      "Ряд домов готов к немедленному заселению. Для строящихся объектов срок сдачи — 3–6 месяцев. Точные сроки уточняйте по каждому конкретному варианту у нашего менеджера.",
  },
  {
    question: "Есть ли рядом школы, садики и магазины?",
    answer:
      "В 5 минутах езды — школа и детский сад. В 10 минутах — торговый центр с супермаркетом, аптекой и кафе. Внутри посёлка есть детские площадки и зоны для прогулок.",
  },
  {
    question: "Как оформить покупку?",
    answer:
      "Оставьте заявку на сайте или позвоните нам. Менеджер проведёт показ, ответит на все вопросы и поможет оформить договор. Сделка оформляется официально через Росреестр.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}