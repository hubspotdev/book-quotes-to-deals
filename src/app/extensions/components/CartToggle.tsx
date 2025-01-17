/**
 * Toggles between search and cart views, displaying current cart item count.
 */

import React from 'react';
import { Button, Flex } from "@hubspot/ui-extensions";

interface CartToggleProps {
  itemCount: number;
  isCartView: boolean;
  onToggle: () => void;
}

export const CartToggle = ({ itemCount, isCartView, onToggle }: CartToggleProps) => {
  return (
      <Button
        variant="secondary"
        onClick={onToggle}
      >
        {isCartView ? 'Back to Search' : `View Cart (${itemCount})`}
      </Button>
  );
};

