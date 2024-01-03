import { useEffect } from 'react';
import Card, { CardProps } from './Card';
import { useFetch, useInView } from '../../hooks';
import "./Container.css";

function Container() {
  const { data, setPage, page, isLoading, error } = useFetch<CardProps>(import.meta.env.VITE_API_KEY + "/flashcards", 1, 10);
  const [lastItemRef, isLastItemInView] = useInView(1);

  useEffect(() => {
    if (isLastItemInView) setPage(page+1);
  }, [isLastItemInView]);

  useEffect(() => {
    console.log(data)
  }, [data]);


  return (
    <div className='flashcards-grid'>
      {data.map((c: CardProps, i: number) => {
        if (i + 1 === data.length) {
          return <div className='lastitem-container' ref={lastItemRef} key={i}><Card card={c} key={i} /></div>
        }
        return <Card card={c} key={i} />;
      })}
      
      {error && <div>{error}</div>}
      {isLoading && <div className='mt-1'>Loading...</div>}
    </div>
  );
}

export default Container;
