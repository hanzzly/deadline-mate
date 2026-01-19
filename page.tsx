"use client"

import React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  Clock, 
  Bell, 
  CheckCircle2, 
  Zap, 
  Shield, 
  Sparkles,
  ArrowRight,
  Calendar,
  Target
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Clock className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Deadline Mate</span>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link href="/app">
                <Button size="sm" className="gap-2">
                  Mulai Sekarang
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Gratis & Tanpa Login</span>
            </div>
            
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
              Jangan Sampai{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Lupa Deadline
              </span>{" "}
              Lagi!
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl text-pretty">
              Bantu siswa dan pekerja mengatur deadline dengan mudah. 
              Simpel, cepat, dan langsung bisa digunakan tanpa ribet.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/app">
                <Button size="lg" className="gap-2 px-8 text-base">
                  Mulai Sekarang
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="gap-2 px-8 text-base bg-transparent" asChild>
                <a href="#features">
                  Lihat Fitur
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border pt-8">
              <div>
                <div className="text-3xl font-bold text-foreground sm:text-4xl">100%</div>
                <div className="mt-1 text-sm text-muted-foreground">Gratis</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground sm:text-4xl">0</div>
                <div className="mt-1 text-sm text-muted-foreground">Akun Dibutuhkan</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground sm:text-4xl">{"<"}1s</div>
                <div className="mt-1 text-sm text-muted-foreground">Waktu Loading</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Fitur yang Kamu Butuhkan
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Semua fitur dirancang untuk membantu kamu tetap on-track dengan deadline.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Clock className="h-6 w-6" />}
              title="Countdown Real-time"
              description="Lihat berapa lama waktu tersisa untuk setiap deadline dengan hitungan mundur yang akurat."
            />
            <FeatureCard
              icon={<Bell className="h-6 w-6" />}
              title="Prioritas Visual"
              description="Warna yang berbeda untuk setiap tingkat urgensi agar kamu tahu mana yang harus dikerjakan duluan."
            />
            <FeatureCard
              icon={<CheckCircle2 className="h-6 w-6" />}
              title="Tandai Selesai"
              description="Centang deadline yang sudah selesai dan rasakan kepuasan melihat progressmu."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Data Tersimpan Lokal"
              description="Datamu tersimpan di browsermu sendiri. Privasi terjaga, tidak perlu khawatir."
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Super Cepat"
              description="Tidak ada loading yang lama. Langsung buka, langsung pakai."
            />
            <FeatureCard
              icon={<Target className="h-6 w-6" />}
              title="Kategori Fleksibel"
              description="Kelompokkan deadline berdasarkan kategori: Kerja, Belajar, Pribadi, atau lainnya."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border bg-secondary/30 py-20 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Cara Pakainya Gampang Banget
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Tiga langkah simpel untuk mulai mengatur deadline-mu.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <StepCard
              number="1"
              title="Buka Aplikasi"
              description="Langsung klik 'Mulai Sekarang' tanpa perlu daftar atau login."
            />
            <StepCard
              number="2"
              title="Tambah Deadline"
              description="Isi judul, tanggal, dan kategori deadline-mu."
            />
            <StepCard
              number="3"
              title="Pantau & Selesaikan"
              description="Lihat countdown dan centang yang sudah selesai."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center sm:px-16 sm:py-24">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
            </div>
            
            <Calendar className="mx-auto h-12 w-12 text-primary-foreground/80" />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
              Siap Mengatur Deadline-mu?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
              Mulai sekarang dan jangan biarkan deadline terlewat lagi. 
              Gratis selamanya, tanpa iklan.
            </p>
            <Link href="/app" className="mt-8 inline-block">
              <Button 
                size="lg" 
                variant="secondary" 
                className="gap-2 px-8 text-base"
              >
                Mulai Sekarang
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Clock className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Deadline Mate</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Dibuat untuk membantu kamu tetap produktif.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-card-foreground">{title}</h3>
      <p className="mt-2 text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

function StepCard({ 
  number, 
  title, 
  description 
}: { 
  number: string
  title: string
  description: string 
}) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
        {number}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  )
}
