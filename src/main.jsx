import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronRight, Heart, Menu, ShoppingBag, Sparkles, WandSparkles, X } from 'lucide-react'
import './styles.css'

const looks = [
  {
    label: 'DOWNTOWN',
    title: 'The Night Edit',
    detail: 'Sharp, glossy, impossible to ignore.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=90',
    color: '#dc3e82',
  },
  {
    label: 'OFF DUTY',
    title: 'Soft Power',
    detail: 'Relaxed tailoring with a clean finish.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=90',
    color: '#f2a7c8',
  },
  {
    label: 'WEEKEND',
    title: 'Colour Theory',
    detail: 'A bright mood, styled in one tap.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=90',
    color: '#ef4b8f',
  },
]

const shopLooks = [
  {
    name: 'After Dark',
    mood: 'Night out',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=90',
  },
  {
    name: 'Soft Structure',
    mood: 'Work mode',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=90',
  },
  {
    name: 'Pink Energy',
    mood: 'Main character',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=90',
  },
  {
    name: 'Street Smart',
    mood: 'Off duty',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=90',
  },
]

function Phone({ look, loading, onGenerate }) {
  return (
    <div className="phone-wrap">
      <div className="phone">
        <div className="phone-screen">
          <div className="island" />
          <div className="phone-top">
            <span>9:41</span><span>•••</span>
          </div>
          <div className="phone-brand">Dress Me <i>AI</i></div>
          <div className={`look-image ${loading ? 'is-loading' : ''}`}>
            <img src={look.image} alt={look.title} />
            <div className="look-shade" />
            {loading && <div className="scan-line" />}
          </div>
          <div className="look-copy">
            <small>{loading ? 'READING YOUR MOOD...' : look.label}</small>
            <strong>{loading ? 'Styling...' : look.title}</strong>
            <span>{loading ? 'Just a second.' : look.detail}</span>
          </div>
          <button className="generate" onClick={onGenerate} disabled={loading}>
            <WandSparkles size={17} />
            {loading ? 'Creating look' : 'Style me again'}
          </button>
          <div className="phone-nav"><span>Home</span><Heart size={18}/><Sparkles size={18}/></div>
        </div>
      </div>
      <div className="orbit orbit-one">AI</div>
      <div className="orbit orbit-two"><Heart size={16} fill="currentColor"/></div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lookIndex, setLookIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(3)

  const generate = () => {
    if (loading) return
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

  const scrollShop = (direction) => {
    document.querySelector('.shop-track')?.scrollBy({
      left: direction * Math.min(window.innerWidth * 0.75, 520),
      behavior: 'smooth',
    })
  }

  const look = looks[lookIndex]

  return (
    <main>
      <div className="scroll-progress" />
      <header className="nav">
        <a href="#top" className="logo">DRESS ME<span>AI</span></a>
        <nav className={menuOpen ? 'open' : ''}>
          <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>The story</a>
          <a href="#credits" onClick={() => setMenuOpen(false)}>Credits</a>
          <button className="nav-cta" onClick={() => { setMenuOpen(false); generate() }}>TRY THE MAGIC <ArrowUpRight size={15}/></button>
        </nav>
        <button className="menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

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
          <Phone look={look} loading={loading} onGenerate={generate} />
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
                <div className="quick-view"><ShoppingBag size={16}/> BUILD THIS LOOK</div>
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
          <a href={`${import.meta.env.BASE_URL}design-study.webp`} target="_blank">VIEW ORIGINAL DESIGN STUDY <ArrowUpRight size={17}/></a>
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
