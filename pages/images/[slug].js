import { useRouter } from 'next/router'
import React from 'react'

const ImagePage = () => {
  const router = useRouter();
  const slug = router.query.slug;

  return (
    <div className='min-h-screen flex justify-center items-center'>
        <img src={`/images/${slug}`} className='w-[450px] mx-auto' />
    </div>
  )
}

export default ImagePage