import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const day = searchParams.get('day');
    const locale = searchParams.get('locale');

    if (!day || !locale) {
      return new NextResponse('Missing day or locale parameter', { status: 400 });
    }

    const audioFilePath = path.join(process.cwd(), 'public', `Day ${day} Audio.mp3`);
    
    try {
      const audioBuffer = await readFile(audioFilePath);
      
      return new NextResponse(audioBuffer, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': audioBuffer.length.toString(),
        },
      });
    } catch (error) {
      console.error('Error reading audio file:', error);
      return new NextResponse('Audio file not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error in audio API:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
