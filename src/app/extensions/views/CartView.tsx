/**
 * Displays cart contents, allows item removal, and quote generation.
 * Renders empty state when no items present.
 */

import React from 'react';
import { Box, Text, Button, Flex, Image, Alert, Table, TableHead, TableBody, TableCell, TableHeader, TableRow } from "@hubspot/ui-extensions";
import type { Book } from '../types/book';

interface CartViewProps {
  items: Book[];
  onRemoveItem: (bookKey: string) => void;
  onCreateQuote: () => Promise<void>;
  isCreatingQuote?: boolean;
  quoteError?: string;
}

export const CartView = ({
  items,
  onRemoveItem,
  onCreateQuote,
  isCreatingQuote,
  quoteError
}: CartViewProps) => {
  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  if (items.length === 0) {
    return (
      <Box>
        <Text>Your cart is empty</Text>
      </Box>
    );
  }

  return (
    <Flex direction="column" gap="md">
      {quoteError && (
        <Alert
          title="Error creating quote"
          variant="error"
        >
          {quoteError}
        </Alert>
      )}

      <Table>
        <TableHead>
        <TableRow>
            <TableHeader>Book Details</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Action</TableHeader>
          </TableRow>
        </TableHead>


        <TableBody>
          {items.map((book) => (
            <TableRow key={book.key}>
              <TableCell>
                <Flex gap="md" align="center">
                  <Image
                    src={book.cover_i
                      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                      : 'https://placehold.co/200x250?text=No+Cover+Found'
                    }
                    alt={`Cover of ${book.title}`}
                    width={100}
                    height={125}
                  />
                  <Flex direction="column" gap="xs">
                    <Text format={{ fontWeight: "bold" }}>{book.title}</Text>
                    <Text>by {book.author_name?.[0] || 'Unknown'}</Text>
                  </Flex>
                </Flex>
              </TableCell>
              <TableCell>
                <Text>${book.price}</Text>
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => onRemoveItem(book.key)}
                  size="xs"
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Flex direction="column" gap="md" align="end">
        <Text format={{ fontWeight: "bold" }}>
          Total: ${total.toFixed(2)}
        </Text>
        <Button
          onClick={onCreateQuote}
          variant="primary"
          disabled={isCreatingQuote}
        >
          {isCreatingQuote ? 'Creating Quote...' : 'Generate Quote'}
        </Button>
      </Flex>
    </Flex>
  );
};
