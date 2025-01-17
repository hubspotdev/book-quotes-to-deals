/**
 * HubSpot extension card that enables users to search books, manage a cart,
 * and create quote deals directly from the contact record.
 */

import React, { useState } from 'react';
import { hubspot, Flex, Text, Divider, Link, Alert } from "@hubspot/ui-extensions";
import { CartToggle } from './components/CartToggle';
import { CartView } from './views/CartView';
import { SearchView } from './views/SearchView';
import type { Book } from './types/book';

hubspot.extend(({context}) => <Extension context={context} />);

const Extension = ({context}) => {
  // Cart-related state
  const [cart, setCart] = useState<Book[]>([]);
  const [isCartView, setIsCartView] = useState(false);

  // Quote-related state
  const [dealURL, setDealURL] = useState<string>('');
  const [isCreatingQuote, setIsCreatingQuote] = useState(false);
  const [quoteError, setQuoteError] = useState<string | undefined>();

  const cartOperations = {
    handleAddToCart: (book: Book) => setCart(prev => [...prev, book]),
    handleRemoveFromCart: (key: string) => setCart(prev => prev.filter(item => item.key !== key)),
    isBookInCart: (key: string) => cart.some(item => item.key === key)
  };

  const handleCreateQuote = async () => {
    setIsCreatingQuote(true);
    setQuoteError(undefined);

    const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

    try {
      const response = await hubspot.fetch('https://bree-book-quote-card.com/api/deals', {
        method: 'POST',
        body: {
          books: cart,
          total,
          contactId: context.crm.objectId
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create quote');
      }

      setDealURL(`https://app.hubspot.com/contacts/${context.portal.id}/deal/${data.deal.id}`);
      setCart([]);
      setIsCartView(false);

    } catch (error) {
      setQuoteError('Failed to create quote. Please try again.');
      console.error('Error creating quote:', error);

    } finally {
      setIsCreatingQuote(false);
    }
  };

  return (
    <Flex direction="column" gap="md">
      {dealURL && (
        <Alert title="Quote Created" variant="success">
          <Text>View it <Link href={dealURL}>here</Link>!</Text>
        </Alert>
      )}

      <Flex direction="row" justify="between" align="center">
        <Text>Search for books, add to cart, and create a deal in HubSpot.</Text>
        <CartToggle
          itemCount={cart.length}
          isCartView={isCartView}
          onToggle={() => setIsCartView(!isCartView)}
        />
      </Flex>

      <Divider />

      {isCartView ? (
        <CartView
          items={cart}
          onRemoveItem={cartOperations.handleRemoveFromCart}
          onCreateQuote={handleCreateQuote}
          isCreatingQuote={isCreatingQuote}
          quoteError={quoteError}
        />
      ) : (
        <SearchView
          onAddToCart={cartOperations.handleAddToCart}
          isBookInCart={cartOperations.isBookInCart}
        />
      )}
    </Flex>
  );
};

