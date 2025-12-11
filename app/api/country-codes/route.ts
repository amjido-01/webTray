import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const { data } = await axios.get('https://country-code.com/api/countries');
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch country codes' },
      { status: 500 }
    );
  }
}