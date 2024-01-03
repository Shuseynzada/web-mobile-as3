import { useEffect, useState } from 'react';
import Card, { CardProps } from './Card';
import { useFetch, useInView } from '../../hooks';
import "./Container.css";
import axios, { AxiosError, AxiosResponse } from 'axios';
import AddCardModal from './AddCardModal';

function Container() {
  const { data, error, isLoading, page, hasMore, setPage, setData, setHasMore } = useFetch<CardProps>(import.meta.env.VITE_API_KEY + "/flashcards", 1, 10);
  const [dataForRender, setDataForRender] = useState(data)
  const [lastItemRef, isLastItemInView] = useInView(0.5);
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOption, setFilterOption] = useState("")
  const [sortrOption, setSortrOption] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  useEffect(() => { if (isLastItemInView && hasMore) setPage(page + 1); }, [isLastItemInView]);
  const handleSelectCard = (cardId: number, isSelected: boolean) => {
    setSelectedCards(prevSelected => {
      if (isSelected) {
        return [...prevSelected, cardId];
      } else {
        return prevSelected.filter(id => id !== cardId);
      }
    });
  };


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
    } else if (sortrOption === "Create Date") {
      filteredData.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime())
    } else if (sortrOption === "Update Date") {
      filteredData.sort((a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime())
    }

    // Filter by status
    if (filterOption != "All" && filterOption != "") {
      filteredData = filteredData.filter(a => a.status == filterOption)
    }

    if (hasMore && filteredData.length < 10) setPage(page + 1)

    setDataForRender(filteredData);
  }, [data, searchQuery, filterOption, sortrOption]);

  const handleAddCard = (question: string, answer: string, status: string) => {
    axios.post(import.meta.env.VITE_API_KEY + "/flashcards", { question, answer, status, created: new Date(), updated: new Date() })
      .then((res: AxiosResponse) => {
        console.log("Created")
        console.log(res.data.id)
        if (page - 1 <= res.data.id / 10) setPage((res.data.id / 10) + 1)
        setHasMore(true)
      })
  }

  const handleShare = () => {
    const selectedCardsData = data.filter(card => selectedCards.includes(card.id));

    const emailSubject = 'Sharing Selected Cards';
    const emailBody = JSON.stringify(selectedCardsData, null, 2); // Use JSON.stringify with pretty-printing (2 spaces for indentation)
    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;
    window.open(mailtoLink, '_blank');
  }



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
            <option>Create Date</option>
            <option>Update Date</option>
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
        <div className="action-button" onClick={() => setIsModalOpen(true)}>
          <button>Add Card</button>
        </div>
        <div className="action-button" onClick={handleShare}>
          <button>Share cards</button>
        </div>
      </div>
      {
        isModalOpen &&
        <AddCardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddCard={handleAddCard}
        />
      }
      {dataForRender.map((c: CardProps, i: number) => {
        if (i + 1 === dataForRender.length) {
          return <div className='lastitem-container' ref={lastItemRef} key={i}>
            <Card deleteCard={() => { handleDeleteCard(c.id) }} card={c} key={i}
              selectCard={(isSelected) => handleSelectCard(c.id, isSelected)}
            />
          </div>
        }
        return <Card deleteCard={() => { handleDeleteCard(c.id) }}
          selectCard={(isSelected) => handleSelectCard(c.id, isSelected)}
          card={c} key={i}
        />;
      })}

      {error && <div>{error}</div>}
      {isLoading && <div className='mt-1'>Loading...</div>}
    </div>
  );
}

export default Container;
