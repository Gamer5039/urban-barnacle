import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const filePath = path.join(process.cwd(), 'lib', 'data', 'defaultUsers.ts');
    const fileContent = `export const defaultUsers = ${JSON.stringify(data, null, 2)};`;
    fs.writeFileSync(filePath, fileContent, 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating users:', error);
    return NextResponse.json({ success: false, error: 'Failed to update users' }, { status: 500 });
  }
}
