import type { NextRequest } from 'next/server'
import Parser from 'rss-parser'

import type { RssData } from '@/types'

const parser = new Parser({
  maxRedirects: 100,
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36' },
})

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')
  if (!url) {
    return Response.json({ code: 40000, message: 'url 不能为空' })
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
    return Response.json({ code: 20000, message: '获取数据成功', data })
  }
  catch (error) {
    console.error(error)
    return Response.json({ code: 50000, message: error instanceof Error ? error.message : '获取数据失败' })
  }
}
