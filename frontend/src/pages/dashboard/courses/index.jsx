import { Link } from 'react-router-dom'
import Card from '@/components/Card'

import { cursos } from '@/data/cursos.json'

function Courses() {
  return (
    <div>
      <h1 className="mb-8">Cursos</h1>
      <div className="flex gap-8">
        {cursos.map((curso) => (
          <Link to={`${encodeURIComponent(curso.id)}`} key={curso.id}>
            <Card element={curso} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Courses
