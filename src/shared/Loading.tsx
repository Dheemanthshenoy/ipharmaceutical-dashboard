import { Loader } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex items-center justify-center'>
        <div className='animate-spin'>
            <Loader />
        </div>
    </div>
  )
}

export default Loading