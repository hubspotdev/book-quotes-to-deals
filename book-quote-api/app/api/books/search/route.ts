import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from OpenLibrary');
    }

    const data = await response.json();
    const books = data.docs.slice(0, 5).map((book: any) => ({
      ...book,
      price: Math.floor(Math.random() * 10) + 10,
      isbn: book.isbn || [],
    }));

    return NextResponse.json({ books });

  } catch (error: any) {
    console.error('Error searching books:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to search books' },
      { status: 500 }
    );
  }
}
