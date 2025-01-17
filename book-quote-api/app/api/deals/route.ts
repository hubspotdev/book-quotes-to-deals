/**
 * Creates a HubSpot deal from the book quote with contact association
 */

import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { books, total, contactId } = await request.json();

    const dealData = {
      properties: {
        dealname: `Book Quote - ${new Date().toLocaleDateString()}`,
        amount: total.toString(),
        dealstage: "presentationscheduled",
        pipeline: "default",
        description: books.map((book: any) => `${book.title} - $${book.price}`).join('\n')
      },
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED",
              associationTypeId: 3  // Standard contact-to-deal association type
            }
          ]
        }
      ]
    };

    const response = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dealData)
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('HubSpot API error:', error);
      throw new Error(error.message || 'Failed to create deal');
    }

    const deal = await response.json();
    return NextResponse.json({ success: true, deal });

  } catch (error: any) {
    console.error('Error creating deal:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
