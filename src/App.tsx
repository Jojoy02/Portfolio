import { useEffect, useRef, useState } from "react"

const validHashes = new Set([
  "#tab1",
  "#tab2",
  "#tab3",
  "#tab4",
  "#tab5",
  "#tab6",
])

function currentHash() {
  return validHashes.has(window.location.hash) ? window.location.hash : "#tab1"
}

export default function App() {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [loaded, setLoaded] = useState(false)
  // 部署到子路径（如 GitHub Pages 的 /Portfolio/）时，静态资源需带上 base 前缀
  const base = import.meta.env.BASE_URL

  useEffect(() => {
    const syncIntoFrame = () => {
      const frameWindow = frameRef.current?.contentWindow
      if (frameWindow && frameWindow.location.hash !== currentHash()) {
        frameWindow.location.hash = currentHash()
      }
    }

    const syncFromFrame = (event: MessageEvent) => {
      if (event.source !== frameRef.current?.contentWindow) return
      if (event.data?.type !== "flyq-hash" || !validHashes.has(event.data.hash))
        return
      if (window.location.hash !== event.data.hash) {
        window.history.replaceState(null, "", event.data.hash)
      }
    }

    window.addEventListener("hashchange", syncIntoFrame)
    window.addEventListener("message", syncFromFrame)
    return () => {
      window.removeEventListener("hashchange", syncIntoFrame)
      window.removeEventListener("message", syncFromFrame)
    }
  }, [])

  return (
    <main className={`replica-shell ${loaded ? "is-loaded" : ""}`}>
      <div className="replica-loader" aria-hidden={loaded}>
        <img src={`${base}replica/images/logo.svg`} alt="Ren Zhuoyi'Portfolio" />
        <i />
      </div>
      <iframe
        ref={frameRef}
        title="Ren Zhuoyi'Portfolio"
        src={`${base}replica/index.html${currentHash()}`}
        onLoad={() => setLoaded(true)}
        allow="autoplay; fullscreen; picture-in-picture"
      />
    </main>
  )
}
