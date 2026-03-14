import Link from 'next/link'

import { siteConfig } from '@/lib/config'

export default function Footer() {
  return (
    <footer className="w-full border-t">
      <p className="py-12 text-center">
        Made with ❤️ by
        {' '}
        <Link
          className="hover:underline"
          href={siteConfig.author.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {siteConfig.author.name}
        </Link>
      </p>
    </footer>
  )
}
