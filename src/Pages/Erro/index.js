import React from 'react'
import { Link } from 'react-router-dom';
import './erro.css'

const Erro = () => {
  return (
    <div className='container'>
     <strong>404</strong>
     <h1>Página não encontrada</h1>
     <p>voltar para <Link to="/">os filmes</Link></p>
    </div>
  )
}

export default Erro;