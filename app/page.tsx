import process from 'node:process'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import MyCard from '@/components/MyCard'

export default async function Home() {
  const response = await fetch(`https://api.github.com/gists/${process.env.GIST_ID}`, { cache: 'no-cache' })
  const jsonData = await response.json()
  const { files } = jsonData
  const rssList: string[] = []
  files[process.env.GIST_FILENAME!].content.split('\n').forEach((line: string) => {
    if (line.trim() !== '') {
      rssList.push(line.trim())
    }
  })
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <main className="grid max-w-screen-2xl grid-cols-1 gap-4 px-4 py-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {rssList.map(url => (
          <MyCard key={url} url={url} />
        ))}
      </main>
      <Footer />
    </div>
  )
}
