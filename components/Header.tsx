import Image from 'next/image'
import Link from 'next/link'

import { siteConfig } from '@/lib/config'

import { ModeToggle } from './ModeToggle'
import { Button } from './ui/button'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-2 p-4 sm:flex-row">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <h1 className="text-2xl font-bold">{siteConfig.title}</h1>
        </div>
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <Button>
            <Link href={siteConfig.github} target="_blank" rel="noopener noreferrer">
              Star on GitHub
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
