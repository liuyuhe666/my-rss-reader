import type { NextRequest } from 'next/server'
import Parser from 'rss-parser'

import type { RssData } from '@/types'

const parser = new Parser()

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')
  if (!url) {
    return Response.json({ code: -1, message: 'url 不能为空' })
  }
  try {
    const feed = await parser.parseURL(url)
    const data: RssData = {
      title: feed.title || '',
      items: feed.items.map(item => ({
        title: item.title || '',
        link: item.link || '',
      })),
    }
    return Response.json({ code: 0, message: '获取数据成功', data })
  }
  catch (error) {
    return Response.json({ code: -1, message: error instanceof Error ? error.message : '获取数据失败' })
  }
}
