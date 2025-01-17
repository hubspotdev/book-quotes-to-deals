/**
 * Renders individual book card with cover image, details, and cart interaction.
 */

import React from 'react';
import { Text, Box, Button, Flex, Image } from "@hubspot/ui-extensions";
import type { Book } from '../types/book';

interface BookItemProps {
  book: Book;
  onAddToCart: (book: Book) => void;
  isInCart: boolean;
}

export const BookItem = ({ book, onAddToCart, isInCart }: BookItemProps) => {
  // Prefer cover_i over ISBN as it's more reliable
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://placehold.co/200x250?text=No+Cover+Found';

  return (
    <Box >
      <Image
        src={coverUrl}
        alt={`Cover of ${book.title}`}
        width={200}
       height={250}
      />
      <Flex direction="column" gap="xs">
        <Text format={{ fontWeight: "bold" }} truncate={{maxWidth: 200}}>{book.title}</Text>
        <Text>by {book.author_name?.[0] || 'Unknown'}</Text>
        <Text>${book.price}</Text>
        <Button
          variant={isInCart ? "secondary" : "primary"}
          onClick={() => onAddToCart(book)}
          disabled={isInCart}
          size='xs'
        >
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </Button>
      </Flex>
    </Box>
  );
};
