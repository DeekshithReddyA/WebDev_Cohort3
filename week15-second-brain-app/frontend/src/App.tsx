import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './components/icons/PlusIcon'
import { ShareIcon } from './components/icons/ShareIcon'
import { Card } from './components/ui/Card'
import { CreateContentModal } from './components/ui/CreateContentModal'
import { useState } from 'react'

function App() {

  const [open , setOpen] = useState(false);


  return (
    <div>
      <CreateContentModal open={open} onClose={() => {setOpen(false)}}/>
        <div className='flex justify-end'>
        <Button startIcon={<PlusIcon size='md' />} variant='primary' size='md' onClick={() => setOpen(true)} text='Add content' />
        <Button variant='secondary' size='md' onClick={() => { }} startIcon={<ShareIcon size='md' />} text='Share' />
        </div>
        <div className=''>
        <div className='flex gap-2'>
          <div>
            <Card title='Title' size='sm' type='youtube' link='https://www.youtube.com/watch?v=ilQSmBpd6jQ' />
          </div>
          <div>
            <Card title='Title' size='md' type='youtube' link='https://www.youtube.com/watch?v=ilQSmBpd6jQ' />
          </div>
          <div>
            <Card title='Title' size='sm' type='tweet' link='https://x.com/striver_79/status/1884208970082181547' />
          </div>
          <div>
            <Card title='Title' size='md' type='tweet' link='https://x.com/striver_79/status/1884208970082181547' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
