import { useEffect } from 'react';
import Card, { CardProps } from './Card';
import { useFetch, useInView } from '../../hooks';
import "./Container.css";
import axios, { AxiosError } from 'axios';

function Container() {
  const { data, setData, setPage, page, isLoading, error } = useFetch<CardProps>(import.meta.env.VITE_API_KEY + "/flashcards", 1, 10);
  const [lastItemRef, isLastItemInView] = useInView(1);

  useEffect(() => { if (isLastItemInView) setPage(page + 1); }, [isLastItemInView]);

  const handleDeleteCard = (cardId: number) => {
    axios.delete(`${import.meta.env.VITE_API_KEY}/flashcards/${cardId}`)
      .then(() => {
        setData(prevData => {
          const newData = [...prevData];
          const findIndex = newData.findIndex(card => cardId == card.id)
          newData[findIndex] = { ...newData[findIndex], id: -1 };
          return newData;
        })
      })
      .catch((error: AxiosError) => {
        console.error("Error deleting card: ", error.message);
      });
  };


  return (
    <div className='flashcards-grid'>
      {data.map((c: CardProps, i: number) => {
        if (i + 1 === data.length) {
          return <div className='lastitem-container' ref={lastItemRef} key={i}><Card deleteCard={() => { handleDeleteCard(c.id) }} card={c} key={i} /></div>
        }
        return <Card deleteCard={() => { handleDeleteCard(c.id) }} card={c} key={i} />;
      })}

      {error && <div>{error}</div>}
      {isLoading && <div className='mt-1'>Loading...</div>}
    </div>
  );
}

export default Container;
