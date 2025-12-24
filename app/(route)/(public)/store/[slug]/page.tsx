// app/store/[slug]/page.tsx
import React from 'react'
import StorefrontUI from '@/components/store-front-ui'

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  
  return (
    <StorefrontUI slug={slug}/>
  )
}

export default Page