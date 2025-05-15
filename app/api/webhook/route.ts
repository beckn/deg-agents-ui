import { NextResponse } from 'next/server'
import { webhookCache } from '@/app/utils/cache'

export async function GET(request: Request) {
  try {
    // Get all cached webhook data
    const cachedData = webhookCache.getAll();
    
    // Clear the cache only if we have data
    if (cachedData && cachedData.length > 0) {
      webhookCache.clear();
    }
    
    return NextResponse.json(
      { 
        message: "Webhook data retrieved successfully",
        data: cachedData,
        count: cachedData.length,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON data
    const data = await request.json()
    
    // Store the webhook data in cache
    const cacheKey = webhookCache.store(data);
    console.log('Stored webhook data with key:', cacheKey);

    return NextResponse.json(
      { 
        message: "Webhook data received and cached successfully",
        cacheKey,
        receivedData: data 
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process webhook data" },
      { status: 400 }
    )
  }
} 