import React, { useState } from 'react';
import { hubspot, Flex } from "@hubspot/ui-extensions";
import { SearchBar } from '../components/SearchBar';
import { BookItem } from '../components/BookItem';
import type { Book } from '../types/book';

interface SearchViewProps {
  onAddToCart: (book: Book) => void;
  isBookInCart: (key: string) => boolean;
}

export const SearchView = ({ onAddToCart, isBookInCart }: SearchViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setSearchResults([]);  // Clear previous results

    try {
      const url = new URL('https://bree-book-quote-card.com/api/books/search');
      url.searchParams.append('q', searchQuery.trim());

      const response = await hubspot.fetch(url.toString());
      const { books } = await response.json();
      setSearchResults(books);
    } catch (error) {
      console.error('Error searching books:', error);
      setSearchResults([]);  // Clear on error
    } finally {
      setIsLoading(false);
    }
  };

  const renderBookResults = () => (
    <Flex direction="row" wrap="wrap" gap="medium" justify='between'>
      {searchResults.map((book) => (
        <BookItem
          key={book.key}
          book={book}
          onAddToCart={onAddToCart}
          isInCart={isBookInCart(book.key)}
        />
      ))}
    </Flex>
  );

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
        isLoading={isLoading}
      />
      {renderBookResults()}
    </>
  );
};
