'use client'

import { RefreshCcwIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { RssData } from '@/types'

import { Button } from './ui/button'
import { Spinner } from './ui/spinner'

export default function MyCard({ url }: { url: string }) {
  const [rssData, setRssData] = useState<RssData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRssData = async () => {
      const response = await fetch(`/api/rss?url=${encodeURIComponent(url)}`)
      const { code, message, data } = await response.json()
      if (code === 0) {
        setRssData(data)
        setIsLoading(false)
      }
      else {
        toast.error(message || '获取数据失败')
      }
    }
    fetchRssData()
  }, [url])

  const refreshRssData = async () => {
    setIsLoading(true)
    const response = await fetch(`/api/rss?url=${encodeURIComponent(url)}`)
    const { code, message, data } = await response.json()
    if (code === 0) {
      setRssData(data)
      setIsLoading(false)
    }
    else {
      toast.error(message || '获取数据失败')
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{rssData?.title}</CardTitle>
        <CardAction>
          <Button variant="outline" size="icon" onClick={refreshRssData}>
            <RefreshCcwIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {isLoading
          ? (<Spinner className="size-8" />)
          : (
              <ScrollArea className="h-96">
                <div className="flex flex-col gap-2">
                  {rssData?.items.map((item, index) => (
                    <Item variant="outline" size="sm" asChild key={item.link}>
                      <a href={item.link} target="_blank">
                        <ItemMedia>
                          {index + 1}
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>{item.title}</ItemTitle>
                        </ItemContent>
                      </a>
                    </Item>
                  ))}
                </div>
              </ScrollArea>
            )}
      </CardContent>
    </Card>
  )
}
