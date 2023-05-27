import dynamic from 'next/dynamic'

const Page = dynamic(() => import('@/components/Page'), {ssr: false})

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Page />
    </section>
  )
}
