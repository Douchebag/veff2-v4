import './App.css'
import { Routes, Route } from 'react-router'
import { Layout } from './components/Layout/Layout'
import { IndexPage } from './pages/IndexPage'
import { NewsPage } from './pages/NewsPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { NewNewsPage } from './pages/NewNewsPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/frettir/:slug" element={<NewsPage />} />
        <Route path="/ny-frett" element={<NewNewsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App
