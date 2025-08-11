import Link from "next/link"
import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Check, ImageIcon, Video, Wand2, Download, PlayCircle, Sparkles } from "lucide-react"

function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-10 md:h-12 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <div className="h-7 w-7 rounded-md bg-gradient-to-tr from-fuchsia-600 via-violet-600 to-rose-500" />
          <span className=" text-2xl">Clipora</span>
          
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#features" className="text-md text-muted-foreground hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="text-md text-muted-foreground hover:text-foreground">
            How it works
          </a>
          <a href="#faq" className="text-md text-muted-foreground hover:text-foreground">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size={"lg"} variant="ghost">
            <Link href="/sign-in"><span className="font-semibold">Sign in</span></Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white hover:from-fuchsia-700 hover:to-rose-600"
          >
            <Link href="/sign-up">Create account</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

function SocialPreview() {
  return (
    <Card className="overflow-hidden border-0 bg-white/60 backdrop-blur shadow-xl">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Social format preview</CardTitle>
          <Badge variant="outline" className="gap-1">
            <Wand2 className="h-3.5 w-3.5" /> Auto-crop
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="instagram" className="w-full">
          <TabsList className="m-3 grid w-[calc(100%-24px)] grid-cols-3">
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
            <TabsTrigger value="twitter">Twitter/X</TabsTrigger>
            <TabsTrigger value="original">Original</TabsTrigger>
          </TabsList>
          <div className="grid gap-4 p-4 pt-0 md:grid-cols-2">
            <TabsContent value="instagram" className="m-0">
              <div className="relative w-full overflow-hidden rounded-lg border bg-white">
                <div className="aspect-[4/5] w-full bg-muted">
                  <img
                    src="/instagram-portrait-preview.png"
                    alt="Instagram 4:5 preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="twitter" className="m-0">
              <div className="relative w-full overflow-hidden rounded-lg border bg-white">
                <div className="aspect-[16/9] w-full bg-muted">
                  <img
                    src="/twitter-landscape-preview.png"
                    alt="Twitter/X 16:9 preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="original" className="m-0">
              <div className="relative w-full overflow-hidden rounded-lg border bg-white md:col-span-2">
                <div className="aspect-[3/2] w-full bg-muted">
                  <img
                    src="/original-photo-preview-3x2.png"
                    alt="Original aspect ratio preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            <div className="grid gap-3">
              <div className="rounded-lg border border-dashed p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Image uploader</div>
                    <p className="text-xs text-muted-foreground">
                      Drag & drop or click to upload. We&apos;ll generate Instagram & Twitter-ready crops automatically.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                  <Video className="h-4 w-4" />
                  Video upload preview
                </div>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/90">
                  <img
                    src="/video-thumbnail-preview.png"
                    alt="Video thumbnail preview"
                    className="h-full w-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full bg-white/90 text-foreground hover:bg-white"
                    >
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Play
                    </Button>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">1080p</Badge>
                  <Badge variant="secondary">H.264</Badge>
                  <Badge variant="secondary">MP4</Badge>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function LandingHero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-fuchsia-500/30 via-violet-500/20 to-rose-500/30 blur-3xl" />
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-12 md:py-24">
        <div className="flex flex-col items-start gap-6">
          <Badge className="gap-1 bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white hover:from-fuchsia-700 hover:to-rose-600">
            <Sparkles className="h-3.5 w-3.5" />
            AI-assisted crops
          </Badge>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Upload once. Download perfectly formatted for Instagram and Twitter. Videos too.
          </h1>
          <p className="text-pretty text-muted-foreground sm:text-lg">
            Clipora streamlines your social workflow: smart image crops for each platform, instant downloads, and a home
            feed for your videos.
          </p>
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white hover:from-fuchsia-700 hover:to-rose-600"
            >
              <Link href="/sign-up">Create your account</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </div>
          <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" />
              No credit card required
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <Check className="h-4 w-4 text-emerald-600" />
              Free tier available
            </div>
          </div>
        </div>
        <div className="relative">
          <SocialPreview />
        </div>
      </div>
    </section>
  )
}

function FeatureGrid() {
  const features = [
    {
      icon: <Wand2 className="h-5 w-5" />,
      title: "Smart social crops",
      desc: "One upload, multiple outputs. We prep 4:5 for Instagram and 16:9 for Twitter/X automatically.",
      image: "/social-crop-previews.png",
    },
    {
      icon: <Download className="h-5 w-5" />,
      title: "Instant downloads",
      desc: "Grab optimized files with correct dimensions and metadata for each platform.",
      image: "/instant-download-buttons.png",
    },
    {
      icon: <Video className="h-5 w-5" />,
      title: "Video uploads + feed",
      desc: "Upload videos and showcase them on your personal home feed.",
      image: "/video-feed-grid.png",
    },
  ]
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need for social visuals</h2>
        <p className="mt-3 text-muted-foreground">
          Designed for creators and teams. Fast, consistent, and on-brand across platforms.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-muted">{f.icon}</span>
                <span className="font-medium text-foreground">{f.title}</span>
              </div>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </CardHeader>
            <CardContent>
              <div className="aspect-[7/4] overflow-hidden rounded-md border bg-muted">
                <img
                  src={f.image || "/placeholder.svg"}
                  alt={`${f.title} preview`}
                  className="h-full w-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Sign up or sign in",
      desc: "Create your Clipora account to unlock uploads and your personal video feed.",
    },
    {
      step: "2",
      title: "Upload images and videos",
      desc: "Drag & drop. We generate social-ready variants automatically.",
    },
    {
      step: "3",
      title: "Download & share",
      desc: "Export with perfect dimensions for Instagram and Twitter/X. Your videos appear on your home feed.",
    },
  ]
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 pb-16 md:pb-24">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
        <p className="mt-3 text-muted-foreground">From upload to publish in seconds.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <Card key={s.step}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white">
                  {s.step}
                </div>
                <CardTitle className="text-base">{s.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{s.desc}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 pb-20">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-semibold tracking-tight">Frequently asked questions</h3>
        <p className="mt-2 text-sm text-muted-foreground">Quick answers about Clipora.</p>
      </div>
      <div className="space-y-6">
        <div>
          <h4 className="font-medium">Do I need an account?</h4>
          <p className="text-sm text-muted-foreground">
            Yes. Please create an account to upload and manage your media.
          </p>
        </div>
        <Separator />
        <div>
          <h4 className="font-medium">Which formats do you support?</h4>
          <p className="text-sm text-muted-foreground">
            Images (JPG, PNG, WebP) and videos (MP4, MOV). Outputs include Instagram 4:5 and Twitter/X 16:9.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button
          asChild
          className="bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white hover:from-fuchsia-700 hover:to-rose-600"
        >
          <Link href="/sign-up">Get started</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/sign-in">I already have an account</Link>
        </Button>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground md:h-16 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-gradient-to-tr from-fuchsia-600 via-violet-600 to-rose-500" />
          <span>Clipora</span>
          <span className="opacity-60">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#features" className="hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-foreground">
            How it works
          </a>
          <a href="#faq" className="hover:text-foreground">
            FAQ
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function Page() {
  return (
    <main className="bg-white">
      <SiteHeader />
      <Suspense fallback={<div className="mx-auto max-w-6xl p-4">Loading...</div>}>
        <LandingHero />
      </Suspense>
      <FeatureGrid />
      <HowItWorks />
      <FAQ />
      <SiteFooter />
    </main>
  )
}
