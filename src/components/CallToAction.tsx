import { ArrowRight } from "lucide-react"
import { HighlightedText } from "./HighlightedText"
import { useState } from "react"

export function CallToAction() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("https://functions.poehali.dev/06985602-9a2f-42f5-87e2-92a8f5891b01", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      })
      if (res.ok) {
        setStatus("success")
        setName("")
        setPhone("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-32 md:py-29 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">Запись на показ</p>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8 text-balance">
            Приезжайте и
            <br />
            увидите <HighlightedText>сами</HighlightedText>
          </h2>

          <p className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Запишитесь на бесплатный показ — мы проведём вас по посёлку, покажем готовые дома и ответим на все вопросы.
          </p>

          {status === "success" ? (
            <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded px-8 py-6 max-w-md mx-auto">
              <p className="text-primary-foreground text-lg font-medium mb-1">Заявка отправлена!</p>
              <p className="text-primary-foreground/70 text-sm">Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6">
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex-1 bg-transparent border border-primary-foreground/30 px-5 py-4 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/70 transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="flex-1 bg-transparent border border-primary-foreground/30 px-5 py-4 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/70 transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-foreground px-6 py-4 text-sm tracking-wide hover:bg-primary-foreground/90 transition-colors duration-300 disabled:opacity-60 group"
              >
                {status === "loading" ? "Отправка..." : "Записаться"}
                {status !== "loading" && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-red-400 text-sm mb-4">Ошибка отправки. Позвоните нам напрямую.</p>
          )}

          <a
            href="tel:+79219644800"
            className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-8 py-3 text-sm tracking-wide hover:bg-primary-foreground/10 transition-colors duration-300"
          >
            8-921-964-48-00
          </a>
        </div>
      </div>
    </section>
  )
}
