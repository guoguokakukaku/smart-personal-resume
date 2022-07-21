import { BrowserRouter, Routes, Route, MemoryRouter } from 'react-router-dom'
import Top from '../pages/Top'
import TimeLine from '../pages/TimeLine'
import Project from '../pages/Project'
import Loading from '../pages/Loading'
import React, { useState } from 'react'
import { UserContext, useUserContext } from '../hooks/UserContext'

export default function Router() {
  const user = useUserContext()

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path='/top' element={<Top />}></Route>
          <Route path='/project' element={<Project />}></Route>
          <Route path='/timeline' element={<TimeLine />}></Route>
          <Route path='*' element={<Loading />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}
