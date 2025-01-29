import { Button } from '../ui/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Card } from '../ui/Card'
import { CreateContentModal } from '../ui/CreateContentModal'
import { useState } from 'react'
import { Sidebar } from '../ui/Sidebar'
import { Navbar } from '../ui/Navbar'

export function Dashboard() {

  const [createContentModalOpen , setCreateContentModalOpen] = useState(false);
  return (
    <div className=''>
        <Navbar />
        <Sidebar/>
        {/* <div className='flex ml-15 md:ml-64 mt-4 gap-4 sm:columns-2 md:columns-3 lg-columns-4'>*/}
        <div className='md:ml-64 ml-12 mt-4 px-2'>
          <div className='columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-1'>
          <div className='break-inside-avoid-column mb-4'>
          <Card size='sm' title='Youtube' type='youtube' link='https://www.youtube.com/watch?v=hpwoGjpYygI'/>
          </div>
          <div className='break-inside-avoid-column mb-4'>
            <Card size='sm' title='Twitter' type='tweet' link='https://x.com/NimishaChanda/status/1884569004808999011'/>
          </div>
          <div className='break-inside-avoid-column mb-4'>
          <Card size='sm' title='Youtube' type='youtube' link='https://www.youtube.com/watch?v=hpwoGjpYygI'/>
          </div>
          <div className='break-inside-avoid mb-4'>
          <Card size='sm' title='Twitter' type='tweet' link='https://x.com/NimishaChanda/status/1884569004808999011'/>
          </div>
          <div className='break-inside-avoid mb-4'>
          <Card size='sm' title='Twitter' type='tweet' link='https://x.com/NimishaChanda/status/1884569004808999011'/>
          </div>
                    <div className='break-inside-avoid-column mb-4'>
          <Card size='sm' title='Youtube' type='youtube' link='https://www.youtube.com/watch?v=hpwoGjpYygI'/>
          </div>
                    <div className='break-inside-avoid-column mb-4'>
          <Card size='sm' title='Youtube' type='youtube' link='https://www.youtube.com/watch?v=hpwoGjpYygI'/>
          </div>
                    <div className='break-inside-avoid-column mb-4'>
          <Card size='sm' title='Youtube' type='youtube' link='https://www.youtube.com/watch?v=hpwoGjpYygI'/>
          </div>
                    <div className='break-inside-avoid mb-4'>
          <Card size='sm' title='Twitter' type='tweet' link='https://x.com/NimishaChanda/status/1884569004808999011'/>
          </div>
                              <div className='break-inside-avoid-column mb-4'>
          <Card size='sm' title='Youtube' type='youtube' link='https://www.youtube.com/watch?v=hpwoGjpYygI'/>
          </div>
                    <div className='break-inside-avoid mb-4'>
          <Card size='sm' title='Twitter' type='tweet' link='https://x.com/NimishaChanda/status/1884569004808999011'/>
          </div>
                              <div className='break-inside-avoid-column mb-4'>
          <Card size='sm' title='Youtube' type='youtube' link='https://www.youtube.com/watch?v=hpwoGjpYygI'/>
          </div>
          </div>
        </div>
    </div>
  )
}


