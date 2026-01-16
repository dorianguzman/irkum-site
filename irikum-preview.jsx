import React, { useState, useEffect, useRef } from 'react';

export default function IrikumWebsite() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      setScrolled(container.scrollTop > 50);
      
      // Check visibility of sections
      const sections = container.querySelectorAll('[data-section]');
      const newVisible = new Set();
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        if (rect.top < containerRect.bottom - 100) {
          newVisible.add(section.dataset.section);
        }
      });
      setVisibleSections(newVisible);
    };
    
    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = containerRef.current?.querySelector(`#${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const AnimatedElement = ({ children, id, delay = 0 }) => (
    <div
      data-section={id}
      className={`transition-all duration-700 ease-out ${
        visibleSections.has(id) 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-y-auto font-light"
      style={{ 
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        backgroundColor: '#FAF8F5',
        color: '#333'
      }}
    >
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-8 h-8">
                <path 
                  d="M50 10 C25 10 10 30 10 55 C10 80 25 90 50 90 C75 90 90 80 90 55 C90 30 75 10 50 10 M50 25 C60 25 70 35 70 50 C70 65 60 75 50 75 C40 75 30 65 30 50 C30 35 40 25 50 25" 
                  fill="none" 
                  stroke="#1A1A1A" 
                  strokeWidth="2"
                />
                <path 
                  d="M50 35 L55 45 L50 55 L45 45 Z M40 40 L50 50 L60 40 M50 50 L50 65" 
                  fill="none" 
                  stroke="#1A1A1A" 
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <span className="text-lg font-medium tracking-wide">Irikum</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['story', 'collections', 'bespoke', 'materials'].map(item => (
              <button 
                key={item}
                onClick={() => scrollTo(item)}
                className="text-xs uppercase tracking-widest hover:text-amber-700 transition-colors"
              >
                {item === 'story' ? 'Our Story' : item}
              </button>
            ))}
            <button 
              onClick={() => scrollTo('contact')}
              className="text-xs uppercase tracking-widest bg-gray-900 text-white px-4 py-2 hover:bg-amber-700 transition-colors"
            >
              Inquire
            </button>
          </div>
          
          <button 
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`w-6 h-0.5 bg-gray-900 transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-900 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-900 transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 20% 80%, rgba(201, 169, 98, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(255, 182, 193, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 50%, rgba(173, 216, 230, 0.08) 0%, transparent 60%)
              `
            }}
          />
          <div 
            className="absolute inset-0 animate-pulse"
            style={{
              background: `linear-gradient(135deg, 
                rgba(255, 182, 193, 0.2) 0%,
                rgba(173, 216, 230, 0.2) 25%,
                rgba(144, 238, 144, 0.15) 50%,
                rgba(255, 218, 185, 0.2) 75%,
                rgba(221, 160, 221, 0.15) 100%
              )`,
              animation: 'shimmer 8s ease-in-out infinite'
            }}
          />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <AnimatedElement id="hero-badge">
            <div className="flex items-center justify-center gap-4 mb-8 text-xs uppercase tracking-[0.3em] text-gray-500">
              <span>Amsterdam</span>
              <span className="text-amber-600 text-[10px]">✦</span>
              <span>México</span>
            </div>
          </AnimatedElement>
          
          <AnimatedElement id="hero-title" delay={100}>
            <h1 className="text-5xl md:text-7xl font-light leading-tight mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              <span className="block">Where Light</span>
              <span 
                className="block italic"
                style={{
                  background: 'linear-gradient(135deg, #1A1A1A 0%, #C9A962 50%, #1A1A1A 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'goldShimmer 4s ease-in-out infinite'
                }}
              >
                Becomes Legacy
              </span>
            </h1>
          </AnimatedElement>
          
          <AnimatedElement id="hero-subtitle" delay={200}>
            <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
              Bespoke jewelry born from the iridescent heart of Mexican opals, 
              designed in Amsterdam, shaped by artisan hands.
            </p>
          </AnimatedElement>
          
          <AnimatedElement id="hero-cta" delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollTo('collections')}
                className="px-8 py-4 bg-gray-900 text-white text-xs uppercase tracking-widest hover:bg-amber-700 transition-colors"
              >
                Discover Collections
              </button>
              <button 
                onClick={() => scrollTo('bespoke')}
                className="px-8 py-4 border border-gray-900 text-xs uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-colors"
              >
                Create Your Own
              </button>
            </div>
          </AnimatedElement>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-600 to-transparent animate-pulse"></div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-24 px-6" style={{ backgroundColor: '#FFFEF9' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <AnimatedElement id="story-label">
                <span className="text-xs uppercase tracking-[0.2em] text-amber-600 mb-4 block">Our Story</span>
              </AnimatedElement>
              <AnimatedElement id="story-title" delay={100}>
                <h2 className="text-4xl md:text-5xl mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                  Two Worlds,<br/>One Vision
                </h2>
              </AnimatedElement>
              <AnimatedElement id="story-text" delay={200}>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>
                    Irikum is born from the convergence of two rich traditions—the refined 
                    design heritage of Amsterdam and the ancient artisanal mastery of Mexico. 
                    Our name whispers of iridescence and Mokum, the beloved old name for Amsterdam.
                  </p>
                  <p>
                    Each piece begins as a dialogue between cultures: conceived in the canal-side 
                    ateliers of Amsterdam, then brought to life by skilled hands in Mexican workshops 
                    where generations have perfected the art of working with precious metals and stones.
                  </p>
                  <p>
                    We believe jewelry should be as unique as the person who wears it—a wearable 
                    story that captures light, memory, and meaning in equal measure.
                  </p>
                </div>
              </AnimatedElement>
            </div>
            
            <AnimatedElement id="story-images" delay={300}>
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-gray-400 text-sm uppercase tracking-wider">
                  Amsterdam Atelier
                </div>
                <div className="absolute -bottom-8 -right-4 w-2/3 aspect-[3/4] bg-gradient-to-br from-amber-50 to-gray-50 shadow-2xl flex items-center justify-center text-gray-400 text-sm uppercase tracking-wider">
                  Mexican Craftsmanship
                </div>
                <div className="absolute -top-4 right-1/4 w-32 h-32 border border-amber-600/30"></div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="py-24 px-6" style={{ backgroundColor: '#FAF8F5' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedElement id="collections-label">
              <span className="text-xs uppercase tracking-[0.2em] text-amber-600 mb-4 block">Collections</span>
            </AnimatedElement>
            <AnimatedElement id="collections-title" delay={100}>
              <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'Georgia, serif' }}>Curated Pieces</h2>
            </AnimatedElement>
            <AnimatedElement id="collections-subtitle" delay={150}>
              <p className="text-gray-600 max-w-xl mx-auto">
                Each collection tells a story of light, form, and the eternal dance between earth and fire.
              </p>
            </AnimatedElement>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Aurora', desc: 'Inspired by the ethereal dance of northern lights captured within each opal.', gradient: 'from-pink-100 via-blue-100 to-green-100' },
              { name: 'Elemento', desc: 'Raw, organic forms that honor the natural geometry found deep within the earth.', gradient: 'from-amber-100 to-amber-50' },
              { name: 'Agua', desc: 'Fluid silhouettes echoing the canals of Amsterdam and cenotes of México.', gradient: 'from-gray-200 to-gray-100' }
            ].map((collection, i) => (
              <AnimatedElement key={collection.name} id={`collection-${i}`} delay={200 + i * 100}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden mb-4">
                    <div className={`w-full h-full bg-gradient-to-br ${collection.gradient} flex items-center justify-center text-gray-400 text-sm uppercase tracking-wider transition-transform duration-700 group-hover:scale-105`}>
                      {collection.name} Collection
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white text-xs uppercase tracking-widest border border-white px-6 py-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        Explore
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl mb-2" style={{ fontFamily: 'Georgia, serif' }}>{collection.name}</h3>
                  <p className="text-sm text-gray-600">{collection.desc}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Section */}
      <section id="bespoke" className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: '#1A1A1A' }}>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, 
              rgba(255, 182, 193, 0.3) 0%,
              rgba(173, 216, 230, 0.3) 50%,
              rgba(144, 238, 144, 0.2) 100%
            )`
          }}
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedElement id="bespoke-label">
            <span className="text-xs uppercase tracking-[0.2em] text-amber-500 mb-4 block">Bespoke Service</span>
          </AnimatedElement>
          <AnimatedElement id="bespoke-title" delay={100}>
            <h2 className="text-4xl md:text-5xl mb-8 text-white" style={{ fontFamily: 'Georgia, serif' }}>
              Your Vision,<br/>Our Craft
            </h2>
          </AnimatedElement>
          <AnimatedElement id="bespoke-intro" delay={150}>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-16 leading-relaxed">
              Our white-glove bespoke service transforms your most precious ideas into 
              heirloom pieces. From initial consultation to final creation, we guide 
              you through an intimate journey of design and discovery.
            </p>
          </AnimatedElement>
          
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { num: '01', title: 'Consultation', desc: 'We begin with a personal conversation to understand your vision.' },
              { num: '02', title: 'Design', desc: 'Our Amsterdam studio creates detailed sketches and 3D renderings.' },
              { num: '03', title: 'Selection', desc: 'Choose from hand-selected Mexican opals, each unique in color.' },
              { num: '04', title: 'Creation', desc: 'Master artisans bring your piece to life through traditional techniques.' }
            ].map((step, i) => (
              <AnimatedElement key={step.num} id={`step-${i}`} delay={200 + i * 100}>
                <div className="text-center">
                  <div className="text-3xl text-amber-500 mb-4" style={{ fontFamily: 'Georgia, serif' }}>{step.num}</div>
                  <h4 className="text-sm uppercase tracking-widest text-white mb-2">{step.title}</h4>
                  <p className="text-sm text-white/50">{step.desc}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
          
          <AnimatedElement id="bespoke-cta" delay={600}>
            <button 
              onClick={() => scrollTo('contact')}
              className="px-10 py-4 bg-amber-600 text-gray-900 text-xs uppercase tracking-widest hover:bg-white transition-colors"
            >
              Begin Your Journey
            </button>
          </AnimatedElement>
        </div>
      </section>

      {/* Materials Section */}
      <section id="materials" className="py-24 px-6" style={{ backgroundColor: '#FFFEF9' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedElement id="materials-label">
              <span className="text-xs uppercase tracking-[0.2em] text-amber-600 mb-4 block">Our Materials</span>
            </AnimatedElement>
            <AnimatedElement id="materials-title" delay={100}>
              <h2 className="text-4xl md:text-5xl" style={{ fontFamily: 'Georgia, serif' }}>Nature's Finest</h2>
            </AnimatedElement>
          </div>
          
          <div className="space-y-24">
            {/* Opal */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedElement id="opal-image">
                <div className="relative">
                  <div 
                    className="aspect-[4/3] flex items-center justify-center text-gray-400 text-sm uppercase tracking-wider"
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(255, 182, 193, 0.3) 0%,
                        rgba(173, 216, 230, 0.3) 25%,
                        rgba(144, 238, 144, 0.2) 50%,
                        rgba(255, 218, 185, 0.3) 75%,
                        rgba(221, 160, 221, 0.2) 100%
                      )`
                    }}
                  >
                    Mexican Opal
                  </div>
                  <div 
                    className="absolute inset-0 blur-3xl opacity-40 animate-pulse"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(173, 216, 230, 0.5), transparent 70%)'
                    }}
                  />
                </div>
              </AnimatedElement>
              
              <AnimatedElement id="opal-content" delay={200}>
                <div>
                  <h3 className="text-2xl mb-4" style={{ fontFamily: 'Georgia, serif' }}>Mexican Opal</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Harvested from the volcanic highlands of Querétaro and Jalisco, Mexican opals 
                    are renowned for their extraordinary fire and brilliance. These stones display 
                    a transparency that allows light to dance within, creating an ever-changing 
                    symphony of color unique to each piece.
                  </p>
                  <ul className="space-y-2">
                    {['Ethically sourced from family-owned mines', 'Hand-selected for exceptional play-of-color', 'Each stone certified and documented'].map(item => (
                      <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                        <span className="text-amber-600 text-xs">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedElement>
            </div>
            
            {/* Gold */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedElement id="gold-content" delay={200}>
                <div className="md:order-2">
                  <h3 className="text-2xl mb-4" style={{ fontFamily: 'Georgia, serif' }}>18K Gold & Silver</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    We work primarily with 18-karat gold—the perfect balance of purity, durability, 
                    and that warm, unmistakable luster. Our silver pieces use .950 sterling, 
                    slightly purer than standard, for a brighter finish and superior craftsmanship.
                  </p>
                  <ul className="space-y-2">
                    {['Responsibly sourced precious metals', 'Yellow, rose, and white gold options', 'Traditional hand-finishing techniques'].map(item => (
                      <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                        <span className="text-amber-600 text-xs">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedElement>
              
              <AnimatedElement id="gold-image">
                <div className="relative md:order-1">
                  <div 
                    className="aspect-[4/3] flex items-center justify-center text-gray-400 text-sm uppercase tracking-wider"
                    style={{
                      background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.3) 0%, rgba(255, 215, 0, 0.2) 50%, rgba(184, 134, 11, 0.3) 100%)'
                    }}
                  >
                    18K Gold
                  </div>
                  <div 
                    className="absolute inset-0 blur-3xl opacity-30 animate-pulse"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(201, 169, 98, 0.6), transparent 70%)'
                    }}
                  />
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-6" style={{ backgroundColor: '#FAF8F5' }}>
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedElement id="testimonial">
            <div className="relative">
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-8xl text-amber-600/20" style={{ fontFamily: 'Georgia, serif' }}>"</span>
              <blockquote className="text-xl md:text-2xl italic text-gray-700 mb-6 leading-relaxed relative z-10" style={{ fontFamily: 'Georgia, serif' }}>
                The moment I saw the opal they selected for my ring, I understood what makes 
                Irikum special. It wasn't just a stone—it was a universe of color, perfectly 
                set in gold that felt like it had always belonged on my hand.
              </blockquote>
              <cite className="text-sm text-gray-500 tracking-wider not-italic">— A Cherished Client, Amsterdam</cite>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6" style={{ backgroundColor: '#FFFEF9' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <AnimatedElement id="contact-label">
                <span className="text-xs uppercase tracking-[0.2em] text-amber-600 mb-4 block">Get in Touch</span>
              </AnimatedElement>
              <AnimatedElement id="contact-title" delay={100}>
                <h2 className="text-4xl md:text-5xl mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                  Begin the<br/>Conversation
                </h2>
              </AnimatedElement>
              <AnimatedElement id="contact-intro" delay={150}>
                <p className="text-gray-600 mb-10 leading-relaxed">
                  Whether you're drawn to a piece from our collections or dreaming of 
                  something uniquely yours, we'd love to hear from you.
                </p>
              </AnimatedElement>
              
              <AnimatedElement id="contact-details" delay={200}>
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-amber-600 block mb-1">Email</span>
                    <a href="mailto:hello@irikum.com" className="text-gray-700 hover:text-amber-600 transition-colors">
                      hello@irikum.com
                    </a>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-amber-600 block mb-1">By Appointment</span>
                    <span className="text-gray-700">Amsterdam, Netherlands</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-amber-600 block mb-1">Social</span>
                    <div className="flex gap-4">
                      <a href="#" className="text-gray-700 hover:text-amber-600 transition-colors">Instagram</a>
                      <a href="#" className="text-gray-700 hover:text-amber-600 transition-colors">Pinterest</a>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            </div>
            
            <AnimatedElement id="contact-form" delay={300}>
              <div className="bg-gray-50 p-8">
                <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-white border border-gray-200 outline-none focus:border-amber-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-4 bg-white border border-gray-200 outline-none focus:border-amber-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">I'm interested in</label>
                    <select className="w-full p-4 bg-white border border-gray-200 outline-none focus:border-amber-600 transition-colors appearance-none cursor-pointer">
                      <option>Select an option</option>
                      <option>Viewing Collections</option>
                      <option>Bespoke Creation</option>
                      <option>General Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">Tell us about your vision</label>
                    <textarea 
                      rows={4}
                      className="w-full p-4 bg-white border border-gray-200 outline-none focus:border-amber-600 transition-colors resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-gray-900 text-white text-xs uppercase tracking-widest hover:bg-amber-700 transition-colors"
                  >
                    Send Inquiry
                  </button>
                </form>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-2xl text-white mb-2 tracking-wider">Irikum</div>
            <p className="text-white/50 text-sm">Artisanal jewelry designed in Amsterdam, handcrafted in México.</p>
          </div>
          <div className="flex justify-center gap-8 mb-8">
            {['Our Story', 'Collections', 'Bespoke', 'Contact'].map(item => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase().replace(' ', ''))}
                className="text-white/50 text-xs uppercase tracking-widest hover:text-amber-500 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="pt-8 border-t border-white/10">
            <p className="text-white/30 text-xs mb-2">© 2025 Irikum. All rights reserved.</p>
            <p className="text-amber-500 italic" style={{ fontFamily: 'Georgia, serif' }}>Where Light Becomes Legacy</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes goldShimmer {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
        @keyframes shimmer {
          0%, 100% { transform: translateX(-5%); opacity: 0.3; }
          50% { transform: translateX(5%); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
