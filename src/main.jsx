import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BatteryFull, CalendarDays, Check, ChevronRight, CloudSun, Download, Heart, Info, Menu, Share2, Shirt, ShoppingBag, Signal, Sparkles, Wifi, X } from 'lucide-react'
import { registerSW } from 'virtual:pwa-register'
import './styles.css'

registerSW({ immediate: true })

const looks = [
  {
    label: 'OFFICE',
    title: 'Soft Structure',
    detail: 'Polished tailoring with a warm modern finish.',
    image: `${import.meta.env.BASE_URL}assets/app/office-look.webp`,
    color: '#dc3e82',
  },
  {
    label: 'EVENING',
    title: 'Berry After Dark',
    detail: 'Satin, sharp lines, and effortless evening energy.',
    image: `${import.meta.env.BASE_URL}assets/app/evening-look.webp`,
    color: '#f2a7c8',
  },
  {
    label: 'POWER LOOK',
    title: 'Midnight Tailoring',
    detail: 'Confident monochrome for a statement arrival.',
    image: `${import.meta.env.BASE_URL}assets/app/welcome-model.webp`,
    color: '#ef4b8f',
  },
]

const shopLooks = [
  {
    name: 'After Dark',
    mood: 'Night out',
    label: 'NIGHT OUT',
    detail: 'Sculptural tailoring for an elegant late-night entrance.',
    image: `${import.meta.env.BASE_URL}assets/app/shop-after-dark.webp`,
  },
  {
    name: 'Soft Structure',
    mood: 'Work mode',
    label: 'WORK MODE',
    detail: 'Quiet luxury layers with effortless authority.',
    image: `${import.meta.env.BASE_URL}assets/app/shop-soft-structure.webp`,
  },
  {
    name: 'Pink Energy',
    mood: 'Main character',
    label: 'MAIN CHARACTER',
    detail: 'Joyful colour and a silhouette that owns the room.',
    image: `${import.meta.env.BASE_URL}assets/app/shop-pink-energy.webp`,
  },
  {
    name: 'Street Smart',
    mood: 'Off duty',
    label: 'OFF DUTY',
    detail: 'Relaxed denim and leather with clean urban confidence.',
    image: `${import.meta.env.BASE_URL}assets/app/shop-street-smart.webp`,
  },
]

const DESIGN_STUDY_URL = 'https://www.behance.net/gallery/248535429/Get-ready-in-3-second'

function DeviceFrame({ className, children }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => setTime(new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(new Date()))
    updateTime()
    const timer = window.setInterval(updateTime, 30000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className={`demo-device ${className}`}>
      <div className="demo-device-edge">
        <div className="demo-device-screen">
          <div className="demo-notch" />
          <div className="demo-status">
            <span>{time}</span>
            <span className="status-icons"><Signal/><Wifi/><BatteryFull/></span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

function InteractivePhone({ look, loading, onGenerate, requestId }) {
  const [screen, setScreen] = useState('welcome')
  const [saved, setSaved] = useState(false)
  const [liked, setLiked] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Office')
  const categories = [
    ['Office', 'Linen blazer'],
    ['Casual', 'Denim'],
    ['Party', 'One piece dress'],
    ['Dinner', 'Skirt & top'],
  ]

  useEffect(() => {
    if (loading) setScreen('result')
  }, [loading])

  useEffect(() => {
    if (!requestId) return
    setScreen('result')
    setSaved(false)
    setDetailsOpen(false)
  }, [requestId])

  const startStyling = () => {
    setScreen('result')
    setSaved(false)
    setDetailsOpen(false)
    onGenerate()
  }

  const chooseCategory = (category) => {
    setSelectedCategory(category)
    startStyling()
  }

  return (
    <div className="single-phone-demo">
      <DeviceFrame className={`interactive-device screen-${screen}`}>
        {screen === 'welcome' && (
          <div className="app-welcome">
            <div className="welcome-header">
              <div className="welcome-brand">Dress Me <i>AI</i></div>
              <small>YOUR PERSONAL AI STYLIST</small>
            </div>
            <div className="welcome-model-wrap">
              <img className="welcome-model" src={`${import.meta.env.BASE_URL}assets/app/welcome-model.webp`} alt="Original Dress Me AI welcome model" />
            </div>
            <div className="welcome-promise"><Sparkles size={12}/><span>YOUR LOOK, READY IN 3 SECONDS</span></div>
            <button onClick={() => setScreen('dashboard')}>Get Started</button>
          </div>
        )}

        {screen === 'dashboard' && (
          <div className="app-dashboard">
            <div className="dashboard-head">
              <div><span>Good Morning, Mahima!</span><small>Delhi · 28°C · Sunny</small></div>
              <button aria-label="Profile">MG</button>
            </div>
            <div className="ready-card">
              <Sparkles size={24}/>
              <strong>GET READY IN 3 SECONDS</strong>
              <span>Let AI curate your perfect look based on today's events and weather.</span>
              <button onClick={startStyling}>Start Styling</button>
            </div>
            <div className="suggestion-title"><b>Today's Suggestion</b><span>View closet</span></div>
            <div className="category-list">
              {categories.map(([title, detail], index) => (
                <button key={title} className={selectedCategory === title ? 'selected' : ''} onClick={() => chooseCategory(title)}>
                  <span className={`category-thumb category-${index + 1}`}/>
                  <p><b>{title}</b><small>{detail}</small></p>
                  <ChevronRight size={15}/>
                </button>
              ))}
            </div>
            <div className="dashboard-nav"><button aria-label="Saved looks"><Heart size={17}/></button><button className="active" aria-label="AI stylist"><Sparkles size={20}/></button><button aria-label="Closet"><Shirt size={17}/></button></div>
          </div>
        )}

        {screen === 'result' && (
          <div className="app-result">
            <div className="result-head">
              <button aria-label="Back to suggestions" onClick={() => setScreen('dashboard')}>←</button>
              <p>Dress Me AI<small>CURATED FOR YOU</small></p>
              <div className="result-head-actions">
                <button aria-label="Share look"><Share2 size={14}/></button>
                <button className={liked ? 'liked' : ''} aria-label="Like look" onClick={() => setLiked(!liked)}><Heart size={15} fill={liked ? 'currentColor' : 'none'}/></button>
              </div>
            </div>
            <div className="result-title-row">
              <div><small>{selectedCategory} EDIT</small><h3>{loading ? 'Creating your look...' : "Today's Best Look"}</h3></div>
              <span className="match-score">96% MATCH</span>
            </div>
            <div className="result-context">
              <span><CloudSun size={12}/> 28°C Sunny</span>
              <span><CalendarDays size={12}/> Evening plans</span>
            </div>
            <div className={`result-look ${loading ? 'is-loading' : ''}`}>
              <img src={look.image} alt={look.title}/>
              {loading && <div className="scan-line"/>}
              <span className="look-chip chip-one">✦</span>
              <button className="look-chip chip-two" aria-label="Show outfit details" onClick={() => setDetailsOpen(!detailsOpen)}><Info size={14}/></button>
              {!loading && <div className="result-label"><small>{look.label}</small><strong>{look.title}</strong></div>}
              {detailsOpen && (
                <div className="outfit-sheet">
                  <div><span className="swatch swatch-one"/><p><b>Main piece</b><small>Tailored silhouette</small></p></div>
                  <div><span className="swatch swatch-two"/><p><b>Accessories</b><small>Warm metallic accents</small></p></div>
                  <div><span className="swatch swatch-three"/><p><b>Why it works</b><small>Balanced for your plans</small></p></div>
                </div>
              )}
            </div>
            <div className="result-actions">
              <button onClick={onGenerate} disabled={loading}>{loading ? 'Styling...' : 'Regenerate'}</button>
              <button className={saved ? 'saved' : ''} onClick={() => setSaved(!saved)}><Heart size={14} fill={saved ? 'currentColor' : 'none'}/> {saved ? 'Saved' : 'Save look'}</button>
            </div>
          </div>
        )}
      </DeviceFrame>

      <div className="demo-orbit single-orbit-one">AI</div>
      <div className="demo-orbit single-orbit-two"><Heart size={15} fill="currentColor"/></div>
      <div className="screen-dots" aria-label={`Current app screen: ${screen}`}>
        {['welcome', 'dashboard', 'result'].map((item) => (
          <button key={item} className={screen === item ? 'active' : ''} aria-label={`Show ${item} screen`} onClick={() => setScreen(item)}/>
        ))}
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lookIndex, setLookIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(3)
  const [installPrompt, setInstallPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIos, setIsIos] = useState(false)
  const [showIosInstall, setShowIosInstall] = useState(false)
  const [showRedirect, setShowRedirect] = useState(false)
  const [redirectCount, setRedirectCount] = useState(3)
  const [featuredLook, setFeaturedLook] = useState(null)
  const [phoneRequest, setPhoneRequest] = useState(0)

  const generate = () => {
    if (loading) return
    setFeaturedLook(null)
    setLoading(true)
    setCount(3)
  }

  useEffect(() => {
    if (!loading) return
    const timer = setInterval(() => {
      setCount((current) => {
        if (current <= 1) {
          clearInterval(timer)
          setLookIndex((index) => (index + 1) % looks.length)
          setLoading(false)
          return 3
        }
        return current - 1
      })
    }, 650)
    return () => clearInterval(timer)
  }, [loading])

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
      })
    }, { threshold: 0.15 })

    const revealItems = document.querySelectorAll('.reveal')
    revealItems.forEach((item) => revealObserver.observe(item))

    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      document.documentElement.style.setProperty('--scroll-progress', `${maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0}%`)
      document.documentElement.style.setProperty('--hero-shift', `${Math.min(window.scrollY * 0.12, 90)}px`)
    }

    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => {
      revealObserver.disconnect()
      window.removeEventListener('scroll', updateScroll)
    }
  }, [])

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone
    setIsInstalled(Boolean(standalone))
    setIsIos(/iphone|ipad|ipod/i.test(window.navigator.userAgent))

    const captureInstallPrompt = (event) => {
      event.preventDefault()
      setInstallPrompt(event)
    }
    const markInstalled = () => {
      setInstallPrompt(null)
      setIsInstalled(true)
    }

    window.addEventListener('beforeinstallprompt', captureInstallPrompt)
    window.addEventListener('appinstalled', markInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', captureInstallPrompt)
      window.removeEventListener('appinstalled', markInstalled)
    }
  }, [])

  const installApp = async () => {
    if (isIos && !installPrompt) {
      setShowIosInstall(true)
      setMenuOpen(false)
      return
    }
    if (!installPrompt) return
    await installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
    setMenuOpen(false)
  }

  useEffect(() => {
    if (!showRedirect) return
    if (redirectCount === 0) {
      window.location.assign(DESIGN_STUDY_URL)
      setShowRedirect(false)
      setRedirectCount(3)
      return
    }

    const timer = window.setTimeout(() => setRedirectCount((current) => current - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [showRedirect, redirectCount])

  const startRedirect = () => {
    setRedirectCount(3)
    setShowRedirect(true)
  }

  const cancelRedirect = () => {
    setShowRedirect(false)
    setRedirectCount(3)
  }

  const openDesignStudy = () => {
    window.location.assign(DESIGN_STUDY_URL)
  }

  const scrollShop = (direction) => {
    document.querySelector('.shop-track')?.scrollBy({
      left: direction * Math.min(window.innerWidth * 0.75, 520),
      behavior: 'smooth',
    })
  }

  const buildLook = (item) => {
    setFeaturedLook({
      label: item.label,
      title: item.name,
      detail: item.detail,
      image: item.image,
      color: '#ef4b8f',
    })
    setPhoneRequest((current) => current + 1)
    document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })
  }

  const look = featuredLook || looks[lookIndex]

  return (
    <main>
      <div className="scroll-progress" />
      <header className="nav">
        <a href="#top" className="logo">DRESS ME<span>AI</span></a>
        <nav className={menuOpen ? 'open' : ''}>
          <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>The story</a>
          <a href="#credits" onClick={() => setMenuOpen(false)}>Credits</a>
          {(installPrompt || isIos) && !isInstalled && (
            <button className="install-button" onClick={installApp}><Download size={16}/> Install app</button>
          )}
          <button className="nav-cta" onClick={() => { setMenuOpen(false); generate() }}>TRY THE MAGIC <ArrowUpRight size={15}/></button>
        </nav>
        <button className="menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      {showIosInstall && (
        <aside className="ios-install-tip" role="dialog" aria-label="Install Dress Me AI">
          <button aria-label="Close install instructions" onClick={() => setShowIosInstall(false)}><X size={18}/></button>
          <Download size={22}/>
          <div><strong>Install Dress Me AI</strong><span>In Safari, tap Share, then choose “Add to Home Screen.”</span></div>
        </aside>
      )}
      {showRedirect && (
        <div className="redirect-backdrop" role="presentation" onMouseDown={cancelRedirect}>
          <section className="redirect-dialog" role="dialog" aria-modal="true" aria-labelledby="redirect-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="redirect-close" aria-label="Cancel redirect" onClick={cancelRedirect}><X size={19}/></button>
            <div className="redirect-count" aria-live="polite">{redirectCount}</div>
            <small>LEAVING DRESS ME AI</small>
            <h2 id="redirect-title">OPENING THE ORIGINAL<br/><i>DESIGN STUDY.</i></h2>
            <p>You’ll be redirected to Mahima Gupta’s project on Behance in {redirectCount} {redirectCount === 1 ? 'second' : 'seconds'}.</p>
            <div className="redirect-actions">
              <button onClick={cancelRedirect}>CANCEL</button>
              <button onClick={openDesignStudy}>OPEN NOW <ArrowUpRight size={16}/></button>
            </div>
          </section>
        </div>
      )}

      <section className="hero" id="top">
        <div className="noise" />
        <div className="hero-copy">
          <div className="eyebrow"><span/> YOUR CLOSET. SUPERCHARGED.</div>
          <h1>GET DRESSED<br/><em>BEFORE YOU</em><br/>OVERTHINK IT.</h1>
          <p>Your AI stylist turns the pieces you own into a look you love. No outfit anxiety. No wardrobe avalanche.</p>
          <button className="primary" onClick={generate}>
            {loading ? `YOUR LOOK IN ${count}` : 'GET READY IN 3 SECONDS'}
            <span><ChevronRight /></span>
          </button>
        </div>
        <div className="hero-visual">
          <div className="three">{loading ? count : '3'}</div>
          <InteractivePhone look={look} loading={loading} onGenerate={generate} requestId={phoneRequest} />
          <div className="seconds">SECONDS<br/><span>TO FEEL GOOD</span></div>
        </div>
        <a href="#how" className="scroll">SCROLL TO DISCOVER <ArrowDown size={16}/></a>
      </section>

      <section className="ticker">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-set" aria-hidden={copy === 1} key={copy}>
              <span>LESS THINKING</span><Sparkles/>
              <span>MORE WEARING</span><Heart fill="currentColor"/>
              <span>LESS THINKING</span><Sparkles/>
              <span>MORE WEARING</span><Heart fill="currentColor"/>
            </div>
          ))}
        </div>
      </section>

      <section className="how" id="how">
        <div className="section-tag reveal">01 / THE MAGIC</div>
        <div className="section-head reveal">
          <h2>YOUR PERSONAL STYLIST<br/>NEVER <i>OVERSLEEPS.</i></h2>
          <p>We designed the quickest route from “I have nothing to wear” to “wait, I look incredible.”</p>
        </div>
        <div className="steps">
          {[
            ['01','SHOW US YOUR CLOSET','Snap, upload, or add the pieces you actually own.'],
            ['02','TELL US THE VIBE','Date night? Big pitch? Coffee run? We read the room.'],
            ['03','WEAR THE LOOK','Get a complete outfit in seconds, then make it yours.'],
          ].map(([n,title,text]) => (
            <article className="step reveal" key={n}>
              <span>{n}</span><div className="step-icon"><Check/></div>
              <h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shop" id="looks">
        <div className="shop-head reveal">
          <div>
            <div className="section-tag">SHOPPING ENERGY / ZERO CHECKOUT</div>
            <h2>SHOP THE <i>MOOD.</i></h2>
          </div>
          <div className="shop-controls">
            <button aria-label="Previous looks" onClick={() => scrollShop(-1)}><ArrowLeft /></button>
            <button aria-label="Next looks" onClick={() => scrollShop(1)}><ArrowRight /></button>
          </div>
        </div>
        <div className="shop-track">
          {shopLooks.map((item, index) => (
            <article className="product-card reveal" key={item.name}>
              <div className="product-image">
                <img src={item.image} alt={item.name} />
                <span>0{index + 1}</span>
                <button aria-label={`Save ${item.name}`}><Heart size={18}/></button>
                <button className="quick-view" onClick={() => buildLook(item)}><ShoppingBag size={16}/> BUILD THIS LOOK</button>
              </div>
              <div className="product-info">
                <div><small>{item.mood}</small><h3>{item.name}</h3></div>
                <ArrowUpRight />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="manifesto" id="story">
        <div className="manifesto-image reveal">
          <img src="https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1200&q=90" alt="Fashion details" />
          <span>OUTFIT<br/>ANXIETY</span>
        </div>
        <div className="manifesto-copy reveal">
          <div className="section-tag">02 / WHY IT MATTERS</div>
          <blockquote>“A FULL WARDROBE<br/>SHOULDN’T FEEL LIKE<br/><i>NOTHING TO WEAR.</i>”</blockquote>
          <p>Dress Me AI brings calm to the chaos. It learns your style, works with your real wardrobe, and makes getting ready feel like the best part of going out.</p>
          <div className="stat-row"><div><b>3<span>sec</span></b><small>to your first look</small></div><div><b>0</b><small>meltdowns required</small></div></div>
        </div>
      </section>

      <section className="design-note">
        <div className="pink-card reveal">
          <small>DESIGN PRINCIPLE</small>
          <h2>SPEED OVER<br/>CONTROL.</h2>
          <p>Fewer choices. Better decisions. More time for living.</p>
        </div>
        <div className="note-copy reveal">
          <div className="section-tag">03 / BUILT WITH INTENT</div>
          <h2>A LITTLE TECH.<br/>A LOT OF <i>YOU.</i></h2>
          <p>The interface stays playful, direct and human. Every interaction moves you closer to an outfit, never deeper into a menu.</p>
          <button className="study-link" onClick={startRedirect}>VIEW ORIGINAL DESIGN STUDY <ArrowUpRight size={17}/></button>
        </div>
      </section>

      <footer id="credits">
        <div className="footer-mark">DRESS ME <i>AI</i></div>
        <div className="credit-grid">
          <div><small>UI CONCEPT & DESIGN</small><strong>MAHIMA GUPTA</strong></div>
          <div><small>TECHNICAL OWNER</small><strong>ABHIMANYU SINGH</strong></div>
          <div><small>PROJECT</small><strong>GET READY IN 3 SECONDS</strong></div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 MAHIMA GUPTA &amp; ABHIMANYU SINGH. ALL RIGHTS RESERVED.</span>
          <span>ORIGINAL UI CONCEPT BY MAHIMA GUPTA.</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
