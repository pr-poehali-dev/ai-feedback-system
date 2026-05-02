import { useState } from "react"
import { X, Phone, User, CheckCircle } from "lucide-react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      setError("Пожалуйста, заполните все поля")
      return
    }
    setError("")
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSuccess(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setName("")
      setPhone("")
      setSuccess(false)
      setError("")
    }, 300)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative bg-white w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-medium mb-2">Заявка принята!</h3>
            <p className="text-gray-500 mb-6">
              Наш менеджер свяжется с вами в ближайшее время и согласует удобное время показа.
            </p>
            <button
              onClick={handleClose}
              className="bg-foreground text-white px-8 py-3 text-sm hover:bg-foreground/80 transition-colors"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-2">Дворцовые предместья</p>
            <h3 className="text-2xl font-medium mb-1">Записаться на показ</h3>
            <p className="text-gray-500 text-sm mb-6">
              Оставьте имя и телефон — мы перезвоним и согласуем время.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Номер телефона"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors"
                />
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-foreground text-white py-3 text-sm tracking-wide hover:bg-foreground/80 transition-colors disabled:opacity-60"
              >
                {loading ? "Отправляем..." : "Записаться на показ"}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
