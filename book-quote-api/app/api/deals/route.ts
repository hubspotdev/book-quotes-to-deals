import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('Received request to create deal');
  try {
    const { books, total, contactId } = await request.json();
    console.log('Received request to create deal:', { books, total, contactId });

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
              associationTypeId: 3
            }
          ]
        }
      ]
    };
    console.log(JSON.stringify(dealData.associations))
    console.log('Deal data being sent to HubSpot:', dealData);

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
    console.log('Deal created successfully:', deal);
    return NextResponse.json({ success: true, deal });

  } catch (error: any) {
    console.error('Error creating deal:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
