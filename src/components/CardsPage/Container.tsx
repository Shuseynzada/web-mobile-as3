import { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import Card from './Card'
import "./Container.css"
function Container() {

  const { data} = useFetch(import.meta.env.VITE_API_KEY + "/flashcards", 1, 10)

  useEffect(()=>{
    console.log(data)
  },[data])

  return (
    <div className='flashcards-grid'>
      <Card question="What is the capital of France?" answer="Paris" />
      <Card question="What is the capital of France?" answer="Paris" />
      <Card question="What is the capital of France?" answer="Paris" />
    </div>
  )
}

export default Container
