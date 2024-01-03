import { useEffect, useState } from 'react';
import Card, { CardProps } from './Card';
import { useFetch, useInView } from '../../hooks';
import "./Container.css";
import axios, { AxiosError } from 'axios';

function Container() {
  const { data, setData, setPage, page, isLoading, error, hasMore } = useFetch<CardProps>(import.meta.env.VITE_API_KEY + "/flashcards", 1, 10);
  const [dataForRender, setDataForRender] = useState(data)
  const [lastItemRef, isLastItemInView] = useInView(1);
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOption, setFilterOption] = useState("")
  const [sortrOption, setSortrOption] = useState("")

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
        console.log("Delete Successful")
      })
      .catch((error: AxiosError) => {
        console.error("Error deleting card: ", error.message);
      });
  };

  useEffect(() => {
    let filteredData = data.filter(card => card.id !== -1);

    // Search functionality
    if (searchQuery) {
      filteredData = filteredData.filter(card =>
        card.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Sort functionality
    if (sortrOption === 'Question') {
      filteredData.sort((a, b) => a.question.localeCompare(b.question));
    } else if (sortrOption === 'Answer') {
      filteredData.sort((a, b) => a.answer.localeCompare(b.answer));
    }

    // Filter by status
    if (filterOption != "All" && filterOption != "") {
      filteredData = filteredData.filter(a => a.status == filterOption)
    }

    if (hasMore && filteredData.length < 10) setPage(page + 1)

    setDataForRender(filteredData);
  }, [data, searchQuery, filterOption, sortrOption]);

  return (
    <div className='flashcards-grid'>
      <div className='list-operations'>
        <div className="search-operation">
          <label>Search</label>
          <input onChange={(e) => { setSearchQuery(e.currentTarget.value) }} type="text" value={searchQuery} placeholder="Search..." />
        </div>
        <div className="sort-operation">
          <label>Sort by</label>
          <select value={sortrOption} onChange={(e) => { setSortrOption(e.currentTarget.value) }}>
            <option>Default</option>
            <option>Question</option>
            <option>Answer</option>
          </select>
        </div>
        <div className="filter-operation">
          <label>Filter</label>
          <select value={filterOption} onChange={(e) => { setFilterOption(e.currentTarget.value) }}>
            <option>All</option>
            <option>Learned</option>
            <option>Want to Learn</option>
            <option>Noted</option>
          </select>
        </div>
        <div className="action-button">
          <button>Add Card</button>
        </div>
      </div>
      {dataForRender.map((c: CardProps, i: number) => {
        if (i + 1 === dataForRender.length) {
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
