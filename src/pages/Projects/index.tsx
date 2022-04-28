import React, { FC, useEffect } from 'react'

const Projects: FC = () => {
  console.log('project')
  useEffect(() => {
    console.log('useEffect')
  }, [])

  return (
    <div>
      Projects Page
    </div>
  )
}

export default Projects
