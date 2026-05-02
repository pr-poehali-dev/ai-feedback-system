import { useState, useEffect, MouseEvent } from "react"
import { cn } from "../lib/utils"
import { ArrowRight, X } from "lucide-react"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [modalOpen])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  const scrollToTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const openModal = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault()
    setModalOpen(true)
    setStatus("idle")
    setName("")
    setPhone("")
    closeMobileMenu()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("https://functions.poehali.dev/06985602-9a2f-42f5-87e2-92a8f5891b01", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      })
      setStatus(res.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  return (
    <>
      <header
        className={cn(
          "fixed z-50 transition-all duration-500 my-0 py-0 rounded-none",
          scrolled || mobileMenuOpen
            ? "bg-primary backdrop-blur-md py-4 top-4 left-4 right-4 rounded-2xl"
            : "bg-black/60 backdrop-blur-sm py-4 top-0 left-0 right-0",
        )}
      >
        <nav className="container mx-auto px-6 flex items-center justify-between md:px-[24]">
          <a href="/" className="flex items-center gap-3 group" onClick={scrollToTop}>
            <img src="https://cdn.poehali.dev/projects/6c589f2b-9696-4123-b52d-1a228cfa295f/bucket/ddd31756-312e-410c-a14b-b08ec6c3e562.png" alt="Гранат" className="w-auto h-16" />
          </a>

          <ul className="hidden md:flex items-center gap-10 text-sm tracking-wide">
            {[
              { label: "Главная", href: "#hero" },
              { label: "О посёлке", href: "#about" },
              { label: "Объекты", href: "#projects" },
              { label: "Преимущества", href: "#services" },
              { label: "Вопросы", href: "#faq" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="hover:text-[rgb(251,146,60)] transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-[rgb(251,146,60)] after:transition-all after:duration-300 text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex flex-col items-end gap-1">
            <a href="tel:+79219644800" className="text-white text-sm font-medium tracking-wide hover:text-orange-200 transition-colors">
              8-921-964-48-00
            </a>
            <a
              href="#"
              onClick={openModal}
              className="inline-flex items-center gap-2 text-xs px-4 py-1.5 bg-white text-foreground border border-foreground/20 hover:bg-foreground hover:text-white transition-all duration-300"
            >
              Записаться на показ
            </a>
          </div>

          <button
            className="md:hidden z-50 transition-colors duration-300 text-white"
            aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            )}
          </button>
        </nav>

        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-[600px] opacity-100 mt-8" : "max-h-0 opacity-0",
          )}
        >
          <div className="container mx-auto px-6">
            <ul className="flex flex-col gap-6 mb-8">
              {[
                { label: "Главная", href: "#hero" },
                { label: "О посёлке", href: "#about" },
                { label: "Объекты", href: "#projects" },
                { label: "Преимущества", href: "#services" },
                { label: "Вопросы", href: "#faq" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-[rgb(251,146,60)] transition-colors duration-300 text-white text-4xl font-light block"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#"
              onClick={openModal}
              className="inline-flex items-center justify-center gap-2 text-sm px-5 py-2.5 bg-white text-foreground border border-foreground/20 hover:bg-foreground hover:text-white transition-all duration-300 mb-4"
            >
              Записаться на показ
            </a>
          </div>
        </div>
      </header>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-md p-8 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">Запись на показ</p>
            <h3 className="text-2xl font-medium mb-2 text-foreground">Приезжайте и увидите сами</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Оставьте заявку — мы перезвоним и согласуем удобное время.
            </p>

            {status === "success" ? (
              <div className="text-center py-6">
                <p className="text-lg font-medium text-foreground mb-1">Заявка отправлена!</p>
                <p className="text-gray-500 text-sm">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border border-gray-200 px-4 py-3 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="border border-gray-200 px-4 py-3 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 bg-foreground text-white px-6 py-3 text-sm tracking-wide hover:bg-foreground/80 transition-colors duration-300 disabled:opacity-60 group mt-1"
                >
                  {status === "loading" ? "Отправка..." : "Записаться на показ"}
                  {status !== "loading" && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                </button>
                {status === "error" && (
                  <p className="text-red-500 text-xs text-center">Ошибка отправки. Позвоните нам: 8-921-964-48-00</p>
                )}
              </form>
            )}

            <a href="tel:+79219644800" className="block text-center text-sm text-gray-400 hover:text-foreground transition-colors mt-4">
              8-921-964-48-00
            </a>
          </div>
        </div>
      )}
    </>
  )
}