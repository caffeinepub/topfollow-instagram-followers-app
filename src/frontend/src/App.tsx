import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import {
  useIncrementDownload,
  useListReviews,
  useRegister,
} from "@/hooks/useQueries";
import {
  Bot,
  Check,
  ChevronDown,
  Download,
  Gift,
  Heart,
  Instagram,
  Loader2,
  Menu,
  Rocket,
  Send,
  Shield,
  Star,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const APK_URL = "https://dl.niva-roid.com/apk/TopFollow-v833-Bata.apk";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

const STATIC_REVIEWS = [
  {
    username: "sarah_bloom",
    avatar: "SB",
    rating: 5,
    text: "Amazing app! I went from 500 to 3,000 followers in just one week. The interface is so easy to use and the results are real!",
  },
  {
    username: "mike_dev23",
    avatar: "MD",
    rating: 5,
    text: "TopFollow is the best Instagram growth tool I've tried. Free coins daily keep everything running smoothly. Highly recommend!",
  },
  {
    username: "glamour_kate",
    avatar: "GK",
    rating: 5,
    text: "Finally found an app that actually works! My engagement has skyrocketed and the follower growth is consistent. 10/10!",
  },
  {
    username: "tech_raj99",
    avatar: "TR",
    rating: 4,
    text: "Great app overall. The speed is impressive and customer support is helpful. Only minor UI nitpicks but definitely worth using.",
  },
];

const FEATURES = [
  {
    icon: Shield,
    title: "Completely Safe",
    desc: "Advanced encryption & privacy protection. Your main account stays secure with our trusted system.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: Bot,
    title: "Auto Bot",
    desc: "Automated follower delivery works 24/7. Set it and forget it — growth never sleeps.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    icon: Rocket,
    title: "High Speed",
    desc: "Get followers delivered fast. No waiting days — see results within hours of placing an order.",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
  {
    icon: Gift,
    title: "Daily Gifts",
    desc: "Earn free coins every day just by logging in. Keep growing without spending a single cent.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Download Top Follow",
    desc: "Download the APK file directly to your Android device. Quick install, no Play Store required.",
    icon: Download,
  },
  {
    num: "02",
    title: "Login with Instagram Account",
    desc: "Login using a secondary or test Instagram account for full access to follower and like services.",
    icon: Instagram,
  },
  {
    num: "03",
    title: "Place an Order",
    desc: "Choose followers, likes, or comments. Use your coins to place orders and watch your stats grow instantly.",
    icon: Users,
  },
];

const FAQS = [
  {
    q: "Why can't I login to my Instagram account?",
    a: "Make sure you're using the correct username and password. If you face issues, try resetting your password via Instagram first. Using a secondary account is recommended for best experience.",
  },
  {
    q: "Is my account safe to use with TopFollow?",
    a: "Yes! TopFollow uses industry-standard encryption. We strongly recommend using a secondary or dedicated account to keep your main profile fully protected.",
  },
  {
    q: "How do I collect my daily coins?",
    a: "Simply open the app every day and tap the 'Daily Reward' button. You'll receive free coins that can be used to order followers, likes, and comments.",
  },
  {
    q: "How fast will I see new followers?",
    a: "Most orders are processed within 30 minutes to a few hours. High-speed delivery is our core feature — you'll see real results quickly.",
  },
  {
    q: "Will using TopFollow restrict my account?",
    a: "We use safe delivery methods that comply with Instagram's usage patterns. Using a dedicated account and staying within reasonable limits will minimize any risks.",
  },
];

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          style={{
            color: i <= rating ? "oklch(0.84 0.17 80)" : "oklch(0.4 0 0)",
            fill: i <= rating ? "oklch(0.84 0.17 80)" : "none",
          }}
        />
      ))}
    </div>
  );
}

function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const register = useRegister();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!username.trim()) {
        toast.error("Please enter your Instagram username");
        return;
      }
      try {
        await register.mutateAsync({
          username: username.trim(),
          email: email.trim() || null,
        });
        toast.success("Login successful! Welcome to TopFollow.");
        onClose();
        setUsername("");
        setEmail("");
      } catch {
        toast.error("Login failed. Please try again.");
      }
    },
    [username, email, register, onClose],
  );

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="border max-w-md"
        style={{
          background: "oklch(0.16 0.09 285)",
          borderColor: "oklch(0.27 0.09 290)",
        }}
        data-ocid="login.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white text-center">
            Login to TopFollow
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <label
              htmlFor="login-username"
              className="text-sm font-medium"
              style={{ color: "oklch(0.78 0.06 290)" }}
            >
              Instagram Username
            </label>
            <Input
              id="login-username"
              data-ocid="login.input"
              placeholder="@your_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-white placeholder:text-white/30"
              style={{
                background: "oklch(0.22 0.07 290)",
                borderColor: "oklch(0.27 0.09 290)",
              }}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="login-email"
              className="text-sm font-medium"
              style={{ color: "oklch(0.78 0.06 290)" }}
            >
              Email (optional)
            </label>
            <Input
              id="login-email"
              data-ocid="login.email_input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-white placeholder:text-white/30"
              style={{
                background: "oklch(0.22 0.07 290)",
                borderColor: "oklch(0.27 0.09 290)",
              }}
            />
          </div>
          <p
            className="text-xs text-center"
            style={{ color: "oklch(0.78 0.06 290)" }}
          >
            🔒 Login directly through Instagram – we have no access to your
            password
          </p>
          <Button
            type="submit"
            data-ocid="login.submit_button"
            disabled={register.isPending}
            className="w-full py-3 text-base font-bold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.66 0.22 0), oklch(0.60 0.24 355))",
              borderRadius: "9999px",
            }}
          >
            {register.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ReviewCard({
  username,
  rating,
  text,
  avatar,
}: { username: string; rating: number; text: string; avatar: string }) {
  return (
    <div
      className="p-5 flex flex-col gap-3 rounded-2xl border"
      style={{
        background: "oklch(0.20 0.07 290)",
        borderColor: "oklch(0.27 0.09 290)",
      }}
    >
      <StarRating rating={rating} />
      <p
        className="text-sm leading-relaxed"
        style={{ color: "oklch(0.82 0.05 290)" }}
      >
        {text}
      </p>
      <div className="flex items-center gap-2 mt-auto">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.52 0.22 280), oklch(0.66 0.22 0))",
          }}
        >
          {avatar}
        </div>
        <span className="text-sm font-semibold text-white">@{username}</span>
      </div>
    </div>
  );
}

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const incrementDownload = useIncrementDownload();
  const { data: reviews } = useListReviews();

  const handleDownload = useCallback(() => {
    incrementDownload.mutate();
  }, [incrementDownload]);

  const allReviews = [
    ...STATIC_REVIEWS,
    ...(reviews?.map((r) => ({
      username: r.username,
      avatar: r.username.slice(0, 2).toUpperCase(),
      rating: Number(r.rating),
      text: r.reviewText,
    })) ?? []),
  ];

  const computedAvg =
    allReviews.length > 0
      ? (
          allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length
        ).toFixed(1)
      : "4.9";

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.11 0.07 290)" }}
    >
      <Toaster />

      {/* ——— NAV ——— */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          background: "oklch(0.11 0.07 290 / 0.9)",
          borderColor: "oklch(0.27 0.09 290)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2"
            data-ocid="nav.link"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.66 0.22 0), oklch(0.52 0.22 280))",
              }}
            >
              <Users size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg text-white">TopFollow</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid="nav.link"
                className="text-sm font-medium transition-colors hover:text-white"
                style={{ color: "oklch(0.78 0.06 290)" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              data-ocid="nav.login_button"
              onClick={() => setLoginOpen(true)}
              className="text-sm font-semibold transition-colors hover:text-white"
              style={{ color: "oklch(0.78 0.06 290)" }}
            >
              LOGIN
            </button>
            <a
              href={APK_URL}
              target="_blank"
              rel="noreferrer"
              data-ocid="nav.download_button"
              onClick={handleDownload}
              className="px-4 py-2 text-sm flex items-center gap-1.5 text-white font-bold"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.66 0.22 0), oklch(0.60 0.24 355))",
                borderRadius: "9999px",
              }}
            >
              <Download size={14} /> DOWNLOAD
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden text-white"
            data-ocid="nav.toggle"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t"
              style={{
                background: "oklch(0.13 0.08 290)",
                borderColor: "oklch(0.27 0.09 290)",
              }}
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    data-ocid="nav.link"
                    className="text-sm font-medium text-white/70"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  type="button"
                  data-ocid="nav.login_button"
                  onClick={() => {
                    setLoginOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm font-semibold text-white/70 text-left"
                >
                  LOGIN
                </button>
                <a
                  href={APK_URL}
                  target="_blank"
                  rel="noreferrer"
                  data-ocid="nav.download_button"
                  onClick={handleDownload}
                  className="px-4 py-2.5 text-sm text-center text-white font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.66 0.22 0), oklch(0.60 0.24 355))",
                    borderRadius: "9999px",
                  }}
                >
                  DOWNLOAD APK
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ——— HERO ——— */}
      <section
        id="hero"
        className="pt-16 min-h-screen flex items-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.09 0.07 290) 0%, oklch(0.14 0.10 285) 50%, oklch(0.12 0.09 280) 100%)",
        }}
      >
        {/* Background blobs */}
        <div
          className="absolute top-20 left-[-100px] w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "oklch(0.52 0.22 280 / 0.15)" }}
        />
        <div
          className="absolute bottom-[-50px] right-[-100px] w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "oklch(0.66 0.22 0 / 0.12)" }}
        />

        <div className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold w-fit"
              style={{
                background: "oklch(0.66 0.22 0 / 0.15)",
                border: "1px solid oklch(0.66 0.22 0 / 0.3)",
                color: "oklch(0.66 0.22 0)",
              }}
            >
              <Star
                size={12}
                style={{
                  fill: "oklch(0.66 0.22 0)",
                  color: "oklch(0.66 0.22 0)",
                }}
              />{" "}
              #1 Instagram Growth App
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Grow Your Instagram
              <span
                className="block"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.66 0.22 0), oklch(0.52 0.22 280))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Followers Fast & Free
              </span>
            </h1>

            <p
              className="text-lg leading-relaxed"
              style={{ color: "oklch(0.78 0.06 290)" }}
            >
              The most powerful Instagram growth tool. Get real followers,
              likes, and comments with just a few taps. 100% free with daily
              rewards.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={APK_URL}
                target="_blank"
                rel="noreferrer"
                data-ocid="hero.download_button"
                onClick={handleDownload}
                className="px-7 py-3.5 text-base flex items-center gap-2 text-white font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.66 0.22 0), oklch(0.60 0.24 355))",
                  borderRadius: "9999px",
                  boxShadow: "0 0 40px oklch(0.66 0.22 0 / 0.4)",
                }}
              >
                <Download size={18} /> DOWNLOAD APK FREE
              </a>
              <button
                type="button"
                data-ocid="hero.login_button"
                onClick={() => setLoginOpen(true)}
                className="px-7 py-3.5 text-base font-bold text-white rounded-full border-2 transition-colors hover:bg-white/10"
                style={{ borderColor: "oklch(0.35 0.12 285)" }}
              >
                LOGIN
              </button>
            </div>

            <div
              className="flex flex-wrap items-center gap-5 text-sm"
              style={{ color: "oklch(0.78 0.06 290)" }}
            >
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-green-400" /> Free Forever
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-green-400" /> No Root Needed
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-green-400" /> Android APK
              </span>
            </div>
          </motion.div>

          {/* Right — phone mockup image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center animate-float"
          >
            <img
              src="/assets/generated/phone-mockup-transparent.dim_400x700.png"
              alt="TopFollow App Dashboard"
              className="w-[280px] md:w-[340px] drop-shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <span className="text-xs" style={{ color: "oklch(0.60 0.06 290)" }}>
            Scroll down
          </span>
          <ChevronDown
            size={16}
            style={{ color: "oklch(0.60 0.06 290)" }}
            className="animate-bounce"
          />
        </div>
      </section>

      {/* ——— FEATURES ——— */}
      <section
        id="features"
        className="py-24"
        style={{ background: "oklch(0.12 0.08 290)" }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Why Top Follow is the Best?
            </h2>
            <p
              className="text-lg max-w-xl mx-auto"
              style={{ color: "oklch(0.78 0.06 290)" }}
            >
              Powerful features designed to grow your Instagram presence
              effectively and safely.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 flex flex-col gap-4 rounded-2xl border transition-all"
                style={{
                  background: "oklch(0.20 0.07 290)",
                  borderColor: "oklch(0.27 0.09 290)",
                }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${f.bg}`}
                >
                  <f.icon size={22} className={f.color} />
                </div>
                <h3 className="text-lg font-bold text-white">{f.title}</h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.78 0.06 290)" }}
                >
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— HOW IT WORKS ——— */}
      <section
        id="how-it-works"
        className="py-24"
        style={{ background: "oklch(0.11 0.07 290)" }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              How It Works
            </h2>
            <p
              className="text-lg max-w-xl mx-auto"
              style={{ color: "oklch(0.78 0.06 290)" }}
            >
              Get started in 3 simple steps. No technical knowledge required.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="relative">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.52 0.22 280 / 0.3), oklch(0.66 0.22 0 / 0.2))",
                      border: "1px solid oklch(0.35 0.12 285)",
                    }}
                  >
                    <step.icon
                      size={32}
                      style={{ color: "oklch(0.66 0.22 0)" }}
                    />
                  </div>
                  <span
                    className="absolute -top-2 -right-2 text-xs font-black"
                    style={{ color: "oklch(0.66 0.22 0 / 0.5)" }}
                  >
                    {step.num}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.78 0.06 290)" }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— REVIEWS ——— */}
      <section
        id="reviews"
        className="py-24"
        style={{ background: "oklch(0.12 0.08 290)" }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              What Users Say
            </h2>
            <div
              className="inline-flex items-center gap-3 rounded-full px-6 py-2.5 mb-4"
              style={{
                background: "oklch(0.84 0.17 80 / 0.15)",
                border: "1px solid oklch(0.84 0.17 80 / 0.3)",
              }}
            >
              <StarRating rating={5} size={18} />
              <span className="font-bold text-white">{computedAvg}</span>
              <span
                className="text-sm"
                style={{ color: "oklch(0.78 0.06 290)" }}
              >
                ·
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: "oklch(0.84 0.17 80)" }}
              >
                50,000+ Downloads
              </span>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allReviews.map((r, i) => (
              <motion.div
                // biome-ignore lint/suspicious/noArrayIndexKey: static+dynamic list with stable index
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-ocid={`reviews.item.${i + 1}`}
              >
                <ReviewCard {...r} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— CTA BAND ——— */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.12 280), oklch(0.15 0.10 285))",
          borderTop: "1px solid oklch(0.35 0.12 285)",
          borderBottom: "1px solid oklch(0.35 0.12 285)",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready to Grow Your Instagram?
            </h2>
            <p
              className="text-lg mb-8"
              style={{ color: "oklch(0.78 0.06 290)" }}
            >
              Join 50,000+ users who already trust TopFollow for their Instagram
              growth.
            </p>
            <a
              href={APK_URL}
              target="_blank"
              rel="noreferrer"
              data-ocid="cta.download_button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-10 py-4 text-lg text-white font-bold"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.66 0.22 0), oklch(0.60 0.24 355))",
                borderRadius: "9999px",
                boxShadow: "0 0 40px oklch(0.66 0.22 0 / 0.4)",
              }}
            >
              <Download size={20} /> DOWNLOAD APK FREE
            </a>
          </motion.div>
        </div>
      </section>

      {/* ——— FAQ ——— */}
      <section
        id="faq"
        className="py-24"
        style={{ background: "oklch(0.11 0.07 290)" }}
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <Accordion
            type="single"
            collapsible
            className="space-y-3"
            data-ocid="faq.panel"
          >
            {FAQS.map((faq, i) => (
              <AccordionItem
                // biome-ignore lint/suspicious/noArrayIndexKey: stable static FAQ list
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border px-5"
                style={{
                  background: "oklch(0.20 0.07 290)",
                  borderColor: "oklch(0.27 0.09 290)",
                }}
                data-ocid={`faq.item.${i + 1}`}
              >
                <AccordionTrigger className="text-white font-semibold text-left hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className="pb-4"
                  style={{ color: "oklch(0.78 0.06 290)" }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ——— FOOTER ——— */}
      <footer
        className="py-12 border-t"
        style={{
          background: "oklch(0.09 0.06 290)",
          borderColor: "oklch(0.20 0.07 290)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.66 0.22 0), oklch(0.52 0.22 280))",
                }}
              >
                <Users size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg text-white">TopFollow</span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {["Home", "Features", "How it works", "FAQ", "Contact"].map(
                (l) => (
                  <a
                    key={l}
                    href={
                      l === "Home"
                        ? "#hero"
                        : `#${l.toLowerCase().replace(/ /g, "-")}`
                    }
                    data-ocid="footer.link"
                    className="transition-colors hover:text-white"
                    style={{ color: "oklch(0.60 0.06 290)" }}
                  >
                    {l}
                  </a>
                ),
              )}
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                data-ocid="footer.link"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                style={{ background: "oklch(0.20 0.07 290)" }}
              >
                <Instagram size={16} style={{ color: "oklch(0.66 0.22 0)" }} />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                data-ocid="footer.link"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                style={{ background: "oklch(0.20 0.07 290)" }}
              >
                <Send size={16} style={{ color: "oklch(0.52 0.22 280)" }} />
              </a>
            </div>
          </div>

          <div
            className="border-t pt-6 text-center text-sm"
            style={{
              borderColor: "oklch(0.20 0.07 290)",
              color: "oklch(0.55 0.05 290)",
            }}
          >
            © {new Date().getFullYear()} TopFollow. All rights reserved. |
            Owner: MD Arbaz Mondol · Built with{" "}
            <Heart
              size={12}
              className="inline text-pink-400"
              fill="currentColor"
            />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
