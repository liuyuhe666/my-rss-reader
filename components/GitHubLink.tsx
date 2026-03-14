import Link from 'next/link'
import * as React from 'react'

import { siteConfig } from '@/lib/config'

import { Icons } from './Icons'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

export function GitHubLink() {
  return (
    <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
      <Link href={siteConfig.github} target="_blank" rel="noreferrer">
        <Icons.gitHub />
        <React.Suspense fallback={<Skeleton className="h-4 w-10.5" />}>
          <StarsCount />
        </React.Suspense>
      </Link>
    </Button>
  )
}

export async function StarsCount() {
  const data = await fetch(`https://api.github.com/repos/${siteConfig.repo}`, {
    next: { revalidate: 86400 },
  })
  const json = await data.json()

  const formattedCount
    = json.stargazers_count >= 1000
      ? `${Math.round(json.stargazers_count / 1000)}k`
      : json.stargazers_count?.toLocaleString()

  return (
    <span className="text-xs">
      {formattedCount}
    </span>
  )
}
