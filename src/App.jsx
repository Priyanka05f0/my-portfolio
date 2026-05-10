import { useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  useMotionValueEvent,
} from 'framer-motion'
import {
  Accessibility,
  ArrowRight,
  Atom,
  Braces,
  Boxes,
  Code2,
  Coffee,
  Database,
  Download,
  Gauge,
  GitFork,
  Globe2,
  GraduationCap,
  Briefcase,
  LayoutDashboard,
  Layers,
  Mail,
  Palette,
  PenTool,
  Search,
  Server,
  Smartphone,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react'

const easePortfolio = [0.25, 0.46, 0.45, 0.94]

function Reveal({ children, className = '', delay = 0, y = 40, x = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, x }}
      whileInView={reduce ? false : { opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: easePortfolio }}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ children }) {
  return (
    <div className="mb-5 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
      <span className="h-px w-8 bg-[var(--accent)]" aria-hidden />
      {children}
    </div>
  )
}

function SkillBar({ label, percent, delay }) {
  const reduce = useReducedMotion()
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs text-[var(--text2)]">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-1 overflow-hidden rounded-sm bg-[var(--surface2)]">
        <motion.div
          className="h-full rounded-sm bg-gradient-to-r from-[var(--accent)] to-[var(--accent3)]"
          initial={reduce ? { width: `${percent}%` } : { width: 0 }}
          whileInView={reduce ? false : { width: `${percent}%` }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 1.2,
            delay: reduce ? 0 : 0.2 + delay,
            ease: easePortfolio,
          }}
        />
      </div>
    </div>
  )
}

function SkillBadge({ Icon, label }) {
  return (
    <span className="flex cursor-default items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--surface2)] px-2 py-1.5 text-[0.8rem] font-normal text-[var(--text2)] transition-colors duration-[0.35s] [transition-timing-function:var(--ease-portfolio)] hover:border-[rgba(124,106,247,0.3)] hover:bg-[rgba(124,106,247,0.12)] hover:text-[var(--accent)]">
      <Icon className="size-3.5 shrink-0 opacity-80" aria-hidden strokeWidth={1.75} />
      {label}
    </span>
  )
}

function SkillCard({ title, Icon, badges, bars, revealDelay }) {
  return (
    <Reveal delay={revealDelay} className="group relative overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-7 transition-transform duration-[0.35s] [transition-timing-function:var(--ease-portfolio)] hover:-translate-y-1 hover:border-[rgba(124,106,247,0.3)]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(124,106,247,0.05)] to-transparent opacity-0 transition-opacity duration-[0.35s] group-hover:opacity-100" />
      <div className="relative mb-5 flex items-center gap-2 font-display text-[0.9rem] font-bold tracking-wide text-[var(--accent)]">
        <Icon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
        {title}
      </div>
      <div className="relative mb-6 flex flex-wrap gap-2">{badges}</div>
      <div className="relative mt-6 flex flex-col gap-3">
        {bars.map((b, i) => (
          <SkillBar key={b.label} label={b.label} percent={b.percent} delay={i * 0.05} />
        ))}
      </div>
    </Reveal>
  )
}

function SectionDivider() {
  return (
    <div
      className="mx-auto h-px max-w-none bg-gradient-to-r from-transparent via-[var(--border)] to-transparent px-[clamp(1.5rem,8vw,8rem)]"
      style={{ marginLeft: 'clamp(1.5rem, 8vw, 8rem)', marginRight: 'clamp(1.5rem, 8vw, 8rem)' }}
      aria-hidden
    />
  )
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const [navElevated, setNavElevated] = useState(false)

  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 800], [0, 320])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setNavElevated(latest > 16)
  })

  const closeMenu = () => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }

  const toggleMenu = () => {
    setMobileOpen((open) => {
      const next = !open
      document.body.style.overflow = next ? 'hidden' : ''
      return next
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setFormSent(true)
    e.target.reset()
    setTimeout(() => setFormSent(false), 3000)
  }

  const navLinkClass =
    'relative text-[0.85rem] font-medium uppercase tracking-[0.08em] text-[var(--text2)] transition-colors duration-[0.35s] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[var(--accent)] after:transition-[width] after:duration-[0.35s] hover:text-[var(--text)] hover:after:w-full'

  const skillCards = [
    {
      title: 'Frontend',
      Icon: Palette,
      revealDelay: 0.08,
      badges: (
        <>
          <SkillBadge Icon={Atom} label="React" />
          <SkillBadge Icon={Braces} label="JavaScript" />
          <SkillBadge Icon={Code2} label="TypeScript" />
          <SkillBadge Icon={LayoutDashboard} label="HTML5" />
          <SkillBadge Icon={Palette} label="CSS3" />
          <SkillBadge Icon={Zap} label="Tailwind" />
          <SkillBadge Icon={Gauge} label="Vite" />
        </>
      ),
      bars: [
        { label: 'React', percent: 85 },
        { label: 'JavaScript', percent: 80 },
        { label: 'CSS / Tailwind', percent: 90 },
      ],
    },
    {
      title: 'Tools & DevOps',
      Icon: Wrench,
      revealDelay: 0.16,
      badges: (
        <>
          <SkillBadge Icon={GitFork} label="Git" />
          <SkillBadge Icon={Server} label="Node.js" />
          <SkillBadge Icon={Boxes} label="Docker" />
          <SkillBadge Icon={Zap} label="Vercel" />
          <SkillBadge Icon={Code2} label="VS Code" />
          <SkillBadge Icon={Layers} label="npm" />
          <SkillBadge Icon={Gauge} label="CI/CD" />
        </>
      ),
      bars: [
        { label: 'Git & GitHub', percent: 88 },
        { label: 'Node.js', percent: 70 },
        { label: 'Deployment', percent: 75 },
      ],
    },
    {
      title: 'Design & Other',
      Icon: PenTool,
      revealDelay: 0.24,
      badges: (
        <>
          <SkillBadge Icon={Palette} label="Figma" />
          <SkillBadge Icon={Braces} label="Python" />
          <SkillBadge Icon={Coffee} label="Java" />
          <SkillBadge Icon={Database} label="SQL" />
          <SkillBadge Icon={Smartphone} label="Responsive" />
          <SkillBadge Icon={Accessibility} label="a11y" />
          <SkillBadge Icon={Search} label="SEO" />
        </>
      ),
      bars: [
        { label: 'Figma / UI Design', percent: 78 },
        { label: 'Python', percent: 65 },
        { label: 'Problem Solving', percent: 92 },
      ],
    },
  ]

  const projects = [
    {
      num: '01',
      title: 'Task Manager App',
      desc: 'A full-featured task management application with drag-and-drop, filtering, priority levels, and local storage persistence. Built with clean component architecture.',
      stack: ['React', 'Tailwind CSS', 'Local Storage'],
      github: 'https://github.com/yourusername/task-manager',
      live: '#',
      gradientClass:
        'bg-gradient-to-br from-[rgba(124,106,247,0.3)] via-transparent to-transparent',
    },
    {
      num: '02',
      title: 'Weather Dashboard',
      desc: 'A responsive weather app consuming the OpenWeatherMap API. Features 5-day forecasts, location search, unit toggling, and animated weather icons.',
      stack: ['React', 'REST API', 'CSS Modules'],
      github: 'https://github.com/yourusername/weather-app',
      live: '#',
      gradientClass:
        'bg-gradient-to-br from-[rgba(247,106,106,0.3)] via-transparent to-transparent',
    },
    {
      num: '03',
      title: 'E-Commerce UI',
      desc: 'A pixel-perfect e-commerce product page with cart functionality, image gallery, size selection, and smooth animations. Fully responsive across all devices.',
      stack: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/yourusername/ecommerce-ui',
      live: '#',
      gradientClass:
        'bg-gradient-to-br from-[rgba(106,247,200,0.3)] via-transparent to-transparent',
    },
    {
      num: '04',
      title: 'Quiz App',
      desc: 'An interactive quiz application with timer, score tracking, multiple categories, and a results summary screen. Includes API integration with Open Trivia DB.',
      stack: ['React', 'REST API', 'Vite'],
      github: 'https://github.com/yourusername/quiz-app',
      live: '#',
      gradientClass:
        'bg-gradient-to-br from-[rgba(247,200,106,0.3)] via-transparent to-transparent',
    },
  ]

  return (
    <div className="min-h-[100svh] bg-[var(--bg)] text-[var(--text)] [--nav-h:70px] [--radius:12px]">
      <motion.nav
        className={`fixed left-0 right-0 top-0 z-[100] flex h-[var(--nav-h)] items-center justify-between border-b px-[clamp(1.5rem,5vw,4rem)] backdrop-blur-xl transition-[box-shadow] duration-300 ${navElevated ? 'shadow-[0_8px_32px_rgba(0,0,0,0.35)]' : ''}`}
        style={{
          background: 'rgba(10,10,15,0.85)',
          borderBottomColor: 'var(--border)',
        }}
      >
        <a href="#hero" className="font-display text-xl font-extrabold tracking-[-0.03em] text-[var(--text)]">
          [Your<span className="text-[var(--accent)]">.</span>Name]
        </a>
        <ul className="hidden list-none items-center gap-10 md:flex">
          <li>
            <a href="#about" className={navLinkClass}>
              About
            </a>
          </li>
          <li>
            <a href="#skills" className={navLinkClass}>
              Skills
            </a>
          </li>
          <li>
            <a href="#projects" className={navLinkClass}>
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="rounded-md border border-[var(--accent)] px-5 py-2 text-[0.8rem] font-medium uppercase tracking-[0.1em] text-[var(--accent)] transition-colors duration-[0.35s] [transition-timing-function:var(--ease-portfolio)] hover:bg-[var(--accent)] hover:text-white"
              style={{ textDecoration: 'none' }}
            >
              Contact
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="relative z-[101] flex w-8 flex-col gap-[5px] py-1 md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={toggleMenu}
        >
          <span
            className={`block h-0.5 rounded-[2px] bg-[var(--text)] transition-[transform] duration-[0.35s] [transition-timing-function:var(--ease-portfolio)] ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 rounded-[2px] bg-[var(--text)] transition-opacity duration-[0.35s] ${mobileOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 rounded-[2px] bg-[var(--text)] transition-[transform] duration-[0.35s] [transition-timing-function:var(--ease-portfolio)] ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
          />
        </button>
      </motion.nav>

      <AnimatePresence mode="wait">
        {mobileOpen ? (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8 bg-[var(--bg)] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: easePortfolio }}
          >
            {[
              ['#about', 'About'],
              ['#skills', 'Skills'],
              ['#projects', 'Projects'],
              ['#contact', 'Contact'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className="font-display text-3xl font-bold text-[var(--text2)] transition-colors duration-[0.35s] hover:text-[var(--accent)] sm:text-[2rem]"
              >
                {label}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section
        id="hero"
        className="relative flex min-h-screen items-center overflow-hidden px-[clamp(1.5rem,8vw,8rem)] pb-24 pt-[calc(var(--nav-h)+4rem)]"
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <motion.div
            className="absolute inset-0 will-change-transform bg-[radial-gradient(ellipse_80%_50%_at_70%_40%,rgba(124,106,247,0.08)_0%,transparent_60%),radial-gradient(ellipse_60%_40%_at_20%_80%,rgba(247,106,106,0.06)_0%,transparent_50%)]"
            style={{ y: reduceMotion ? 0 : parallaxY }}
          />
          <div
            className="animate-portfolio-float absolute -right-24 top-[-100px] h-[600px] w-[600px] rounded-full bg-[var(--accent)] blur-[100px]"
            style={{ opacity: 0.18 }}
          />
          <div
            className="animate-portfolio-float absolute bottom-[-50px] left-[10%] h-[400px] w-[400px] rounded-full bg-[var(--accent2)] blur-[100px]"
            style={{ opacity: 0.18, animationDelay: '-4s' }}
          />
          <div
            className="animate-portfolio-float absolute left-[40%] top-[40%] h-[300px] w-[300px] rounded-full bg-[var(--accent3)] blur-[100px]"
            style={{ opacity: 0.1, animationDelay: '-2s' }}
          />
        </div>

        <div className="relative z-[1] max-w-[900px]">
          <motion.div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[rgba(124,106,247,0.3)] bg-[rgba(124,106,247,0.08)] px-4 py-1.5 text-[0.8rem] uppercase tracking-[0.08em] text-[var(--accent)]"
            initial={reduceMotion ? false : { opacity: 0, y: -20 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles className="size-3.5 shrink-0" aria-hidden />
            <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-[var(--accent3)]" aria-hidden />
            Available for opportunities
          </motion.div>
          <motion.h1
            className="mb-6 font-display text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-none tracking-[-0.04em]"
            initial={reduceMotion ? false : { opacity: 0, y: -20 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="bg-gradient-to-br from-[var(--accent)] to-[var(--accent3)] bg-clip-text text-transparent">
            LAKSHMI PRIYANKA BETHAMPUDI
            </span>
            <span className="mt-[0.3em] block text-[0.6em] font-normal tracking-[-0.01em] text-[var(--text2)]">
              Frontend Developer & UI Craftsman
            </span>
          </motion.h1>
          <motion.p
            className="mb-10 max-w-[520px] text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-[var(--text2)]"
            initial={reduceMotion ? false : { opacity: 0, y: -20 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            I build fast, beautiful, and accessible web experiences using React, modern CSS, and thoughtful design.
            Passionate about clean code and pixel-perfect interfaces.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4"
            initial={reduceMotion ? false : { opacity: 0, y: -20 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-8 py-[0.85rem] font-display text-[0.9rem] font-semibold tracking-[0.02em] text-white shadow-[0_0_40px_rgba(124,106,247,0.3)] transition-[transform,box-shadow,background] duration-[0.35s] [transition-timing-function:var(--ease-portfolio)] hover:-translate-y-0.5 hover:bg-[#8f7fff] hover:shadow-[0_0_60px_rgba(124,106,247,0.5)]"
            >
              View My Work
              <ArrowRight className="size-3.5" strokeWidth={1.75} aria-hidden />
            </a>
            <a
              href="#"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-8 py-[0.85rem] font-display text-[0.9rem] font-semibold text-[var(--text2)] transition-[border-color,color,transform] duration-[0.35s] [transition-timing-function:var(--ease-portfolio)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Download Resume
              <Download className="size-3.5" strokeWidth={1.75} aria-hidden />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 z-[1] flex -translate-x-1/2 flex-col items-center gap-2 text-[0.7rem] uppercase tracking-[0.15em] text-[var(--text3)]"
          initial={reduceMotion ? false : { opacity: 0, y: -16 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Scroll
          <div
            className="h-[50px] w-px animate-portfolio-scroll-line bg-gradient-to-b from-[var(--accent)] to-transparent"
            aria-hidden
          />
        </motion.div>
      </section>

      <SectionDivider />

      <section id="about" className="px-[clamp(1.5rem,8vw,8rem)] py-[clamp(5rem,10vw,9rem)] lg:py-36" style={{ background: 'var(--bg2)' }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
          <Reveal x={-40} y={0} className="mx-auto max-w-[320px] md:mx-0 md:max-w-none">
            <div className="relative">
              <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--surface2)] before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-[rgba(124,106,247,0.15)] before:to-transparent">
                <Code2 className="size-[5rem] text-[var(--text)] opacity-[0.35]" strokeWidth={1.25} aria-hidden />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-xl border border-[var(--border)] bg-[var(--surface2)]/95 p-4 pr-7 backdrop-blur-md">
                <div className="font-display text-[2rem] font-extrabold leading-none text-[var(--accent)]">2+</div>
                <div className="mt-1 text-[0.75rem] uppercase tracking-[0.05em] text-[var(--text2)]">Years of Experience</div>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <SectionLabel>About Me</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mb-4 text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--text)]">
                Turning ideas into
                <br />
                digital reality
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="space-y-4 text-[1.05rem] text-[var(--text2)]">
              <p>
                Hi! I&apos;m <strong className="font-medium text-[var(--text)]">LAKSHMI PRIYANKA BETHAMPUDI</strong>, a passionate frontend developer
                based in [Your City]. I specialize in building modern, performant web applications with a focus on user experience
                and clean code.
              </p>
              <p>
                Currently pursuing my degree in [Your Field] at [Your College/University]. I love learning new technologies and
                applying them to real-world problems.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new design trends, contributing to open-source projects, or
                leveling up my skills through online courses and hackathons.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-6 flex flex-wrap gap-2">
              {[
                { Icon: GraduationCap, label: 'Computer Science' },
                { Icon: Globe2, label: 'Open Source' },
                { Icon: Palette, label: 'UI Design' },
                { Icon: Zap, label: 'Performance' },
                { Icon: Accessibility, label: 'Accessibility' },
              ].map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-2 text-[0.8rem] text-[var(--text2)] transition-colors duration-[0.35s] [transition-timing-function:var(--ease-portfolio)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <Icon className="size-3.5" strokeWidth={2} aria-hidden />
                  {label}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="skills" className="bg-[var(--bg)] px-[clamp(1.5rem,8vw,8rem)] py-[clamp(5rem,10vw,9rem)] lg:py-36">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>What I Know</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mb-4 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] text-[var(--text)]">
              Skills & Technologies
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mb-12 max-w-[540px] text-[1.05rem] leading-relaxed text-[var(--text2)]">
              A visual overview of the tools and technologies I work with daily.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
            {skillCards.map((card) => (
              <SkillCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="projects" className="px-[clamp(1.5rem,8vw,8rem)] py-[clamp(5rem,10vw,9rem)] lg:py-36" style={{ background: 'var(--bg2)' }}>
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>My Work</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display mb-4 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] text-[var(--text)]">
              Featured Projects
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mb-12 max-w-[540px] text-[1.05rem] leading-relaxed text-[var(--text2)]">
              A selection of projects I&apos;ve built — each one taught me something new.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-none transition-[transform,border-color,box-shadow] duration-[0.35s] [transition-timing-function:var(--ease-portfolio)] hover:-translate-y-1.5 hover:border-[rgba(124,106,247,0.25)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                  <div className="relative flex h-[200px] items-center justify-center overflow-hidden bg-[var(--surface2)]">
                    <div className={`absolute inset-0 opacity-60 ${p.gradientClass}`} aria-hidden />
                    <span className="pointer-events-none font-display select-none text-[5rem] font-extrabold leading-none text-[var(--border)]">
                      {p.num}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display mb-2 text-[1.1rem] font-bold text-[var(--text)]">{p.title}</h3>
                    <p className="mb-5 flex-1 text-[0.9rem] leading-relaxed text-[var(--text2)]">{p.desc}</p>
                    <div className="mb-5 flex flex-wrap gap-2">
                      {p.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-[var(--surface2)] px-2 py-1 text-[0.72rem] font-medium uppercase tracking-[0.04em] text-[var(--accent)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] px-3 py-2 text-[0.8rem] font-medium text-[var(--text2)] transition-colors duration-[0.35s] [transition-timing-function:var(--ease-portfolio)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        <GitFork className="size-3.5" strokeWidth={1.75} />
                        GitHub
                      </a>
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 rounded-md border border-[var(--accent)] bg-[var(--accent)] px-3 py-2 text-[0.8rem] font-medium text-white transition-colors duration-[0.35s] [transition-timing-function:var(--ease-portfolio)] hover:border-[var(--accent)] hover:bg-[#8f7fff]"
                      >
                        Live Demo
                        <ArrowRight className="size-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="contact" className="bg-[var(--bg)] px-[clamp(1.5rem,8vw,8rem)] py-[clamp(5rem,10vw,9rem)] lg:py-36">
        <div className="mx-auto grid max-w-6xl items-start gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
          <div>
            <Reveal>
              <SectionLabel>Get In Touch</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mb-4 text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--text)]">
                Let&apos;s work
                <br />
                together
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mb-8 max-w-[540px] text-[1.05rem] leading-relaxed text-[var(--text2)]">
                I&apos;m currently open to freelance projects and full-time opportunities. Feel free to reach out!
              </p>
            </Reveal>
            <Reveal delay={0.28} className="flex flex-col gap-4">
              <a
                href="mailto:youremail@example.com"
                className="flex items-center gap-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-5 py-[1.1rem] text-[var(--text2)] transition-[border-color,color,transform] duration-[0.35s] [transition-timing-function:var(--ease-portfolio)] hover:translate-x-1 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <Mail className="size-7 shrink-0 text-[var(--accent)] opacity-90" strokeWidth={1.75} />
                <div>
                  <div className="font-medium text-[var(--text)]">Email</div>
                  <div className="text-[0.8rem] text-[var(--text3)]">youremail@example.com</div>
                </div>
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-5 py-[1.1rem] text-[var(--text2)] transition-[border-color,color,transform] duration-[0.35s] [transition-timing-function:var(--ease-portfolio)] hover:translate-x-1 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <GitFork className="size-7 shrink-0 opacity-90" strokeWidth={1.75} />
                <div>
                  <div className="font-medium text-[var(--text)]">GitHub</div>
                  <div className="text-[0.8rem] text-[var(--text3)]">github.com/yourusername</div>
                </div>
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-5 py-[1.1rem] text-[var(--text2)] transition-[border-color,color,transform] duration-[0.35s] [transition-timing-function:var(--ease-portfolio)] hover:translate-x-1 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <Briefcase className="size-7 shrink-0 opacity-90" strokeWidth={1.75} />
                <div>
                  <div className="font-medium text-[var(--text)]">LinkedIn</div>
                  <div className="text-[0.8rem] text-[var(--text3)]">linkedin.com/in/yourprofile</div>
                </div>
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[0.8rem] font-medium uppercase tracking-[0.05em] text-[var(--text2)]">
                LAKSHMI PRIYANKA BETHAMPUDI
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-[0.85rem] text-[0.9rem] text-[var(--text)] transition-[border-color] duration-[0.35s] [transition-timing-function:var(--ease-portfolio)] placeholder:text-[var(--text3)] focus:border-[var(--accent)] focus:outline-none"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[0.8rem] font-medium uppercase tracking-[0.05em] text-[var(--text2)]">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-[0.85rem] text-[0.9rem] text-[var(--text)] transition-[border-color] duration-[0.35s] placeholder:text-[var(--text3)] focus:border-[var(--accent)] focus:outline-none"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[0.8rem] font-medium uppercase tracking-[0.05em] text-[var(--text2)]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me about your project..."
                  className="min-h-[130px] w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-[0.85rem] text-[0.9rem] text-[var(--text)] transition-[border-color] duration-[0.35s] placeholder:text-[var(--text3)] focus:border-[var(--accent)] focus:outline-none"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>
              <motion.button
                type="submit"
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-[var(--accent)] px-8 py-[0.85rem] font-display text-[0.9rem] font-semibold tracking-[0.02em] text-white shadow-[0_0_40px_rgba(124,106,247,0.3)] transition-[background] duration-[0.35s] [transition-timing-function:var(--ease-portfolio)] hover:bg-[#8f7fff]"
                whileTap={{ scale: 0.98 }}
                animate={
                  formSent
                    ? { backgroundColor: '#22c55e', boxShadow: '0 8px 32px rgba(34,197,94,0.35)' }
                    : {}
                }
              >
                {formSent ? 'Message sent!' : 'Send Message'}
                {!formSent ? <ArrowRight className="size-3.5" strokeWidth={1.75} /> : null}
              </motion.button>
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] px-[clamp(1.5rem,8vw,8rem)] py-10">
        <div className="font-display text-[1.1rem] font-extrabold tracking-[-0.03em]">
          [Your<span className="text-[var(--accent)]">.</span>Name]
        </div>
        <p className="text-[0.8rem] text-[var(--text3)]">© 2026 — Built with React + Vite</p>
        <div className="flex gap-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="flex size-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text2)] transition-colors duration-[0.35s] [transition-timing-function:var(--ease-portfolio)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <GitFork className="size-4" />
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="flex size-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text2)] transition-colors duration-[0.35s] hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <Briefcase className="size-4" />
          </a>
        </div>
      </footer>
    </div>
  )
}
