import { useCallback, useContext, useMemo, useState } from 'react'
import { BookContext } from '../../App';

const useFilteredBooks = () => {
  const { books } = useContext(BookContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const categories = useMemo(() => ["All", ...new Set(books.map((book) => book.category))], [books])


  const FilteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
      const matchesSearch = book.bookTitle.toLowerCase().includes(appliedSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [books, selectedCategory, appliedSearch])

  const applyFilters = useCallback(()=>{
    setAppliedSearch(searchTerm)
  }, [searchTerm])

  return { categories, selectedCategory, setSelectedCategory, searchTerm, setSearchTerm, FilteredBooks, applyFilters };
};

export default useFilteredBooks;