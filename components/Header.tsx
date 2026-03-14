import Image from 'next/image'

import { siteConfig } from '@/lib/config'

import { GitHubLink } from './GitHubLink'
import { ModeToggle } from './ModeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between p-4 sm:flex-row">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <h1 className="text-2xl font-bold">{siteConfig.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <GitHubLink />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
