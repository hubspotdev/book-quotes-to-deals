/**
 * Search input with loading state for book queries.
 */

import React from 'react';
import { Input, Flex, LoadingButton } from "@hubspot/ui-extensions";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const SearchBar = ({ searchQuery, onSearchChange, onSearch, isLoading }: SearchBarProps) => {
  return (
    <Flex direction="column" gap="sm">
      <Input
        label="Search for books"
        name="searchQuery"
        value={searchQuery}
        onChange={(e) => onSearchChange(e)}
      />
      <LoadingButton
        loading={isLoading}
        onClick={onSearch}
        disabled={!searchQuery || isLoading}
      >Search</LoadingButton>
    </Flex>
  );
};
