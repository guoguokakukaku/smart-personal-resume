import { BrowserRouter, Routes, Route, MemoryRouter } from 'react-router-dom'
import Top from '../pages/Top'
import TimeLine from '../pages/TimeLine'
import Skills from '../pages/Skills'
import Project from '../pages/Project'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<Top />}></Route> */}
        <Route path='/project' element={<Project />}></Route>
        <Route path='/timeline' element={<TimeLine />}></Route>
        <Route path='*' element={<Top />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
