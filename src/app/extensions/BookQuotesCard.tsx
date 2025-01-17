import React, { useState } from 'react';
import { hubspot, Flex, Text, Divider, Link, Alert } from "@hubspot/ui-extensions";
import { CartToggle } from './components/CartToggle';
import { CartView } from './views/CartView';
import { SearchView } from './views/SearchView';
import type { Book } from './types/book';

hubspot.extend(({context}) => <Extension context={context} />);

const Extension = ({context}) => {
  const [cart, setCart] = useState<Book[]>([]);
  const [isCartView, setIsCartView] = useState(false);
  const [dealURL, setDealURL] = useState<string>('');
  const [isCreatingQuote, setIsCreatingQuote] = useState(false);
  const [quoteError, setQuoteError] = useState<string | undefined>();

  const handleAddToCart = (book: Book) => setCart(prev => [...prev, book]);
  const handleRemoveFromCart = (key: string) => setCart(prev => prev.filter(item => item.key !== key));
  const isBookInCart = (key: string) => cart.some(item => item.key === key);

  const handleCreateQuote = async () => {
    setIsCreatingQuote(true);
    try {
      const response = await hubspot.fetch('https://bree-book-quote-card.com/api/deals', {
        method: 'POST',
        body: {
          books: cart,
          total: cart.reduce((sum, item) => sum + (item.price || 0), 0),
          contactId: context.crm.objectId
        }
      });

      const data = await response.json();
      if (response.ok) {
        const dealId = data.deal.id;
        setDealURL(`https://app.hubspot.com/contacts/${context.portal.id}/deal/${dealId}`);
        setCart([]);
        setIsCartView(false);
      } else {
        throw new Error(data.error || 'Failed to create quote');
      }
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
          onRemoveItem={handleRemoveFromCart}
          onCreateQuote={handleCreateQuote}
          isCreatingQuote={isCreatingQuote}
          quoteError={quoteError}
        />
      ) : (
        <SearchView
          onAddToCart={handleAddToCart}
          isBookInCart={isBookInCart}
        />
      )}
    </Flex>
  );
};

