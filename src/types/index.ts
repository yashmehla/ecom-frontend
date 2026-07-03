export interface Product {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  tag?: string
  image: string
  hoverImage?: string
  desc: string
  colors: string[]
  sizes: string[]
  rating: number
  reviews: number
}

export interface CartItem extends Product {
  qty: number
  selectedSize?: string
}

export interface Review {
  id: number
  text: string
  handle: string
  stars: number
  verified: boolean
}

export interface HeroData {
  dropNumber: string
  eyebrow: string
  line1: string
  line2: string
  sub: string
  cta: string
  image: string
  image2: string
  countdownSeconds: number
}

export interface StatItem {
  value: string
  label: string
}

export interface NavItem {
  label: string
  href: string
}

export interface FooterColumn {
  heading: string
  links: { label: string; href: string }[]
}

export interface ColorSwatch {
  name: string
  hex: string
}