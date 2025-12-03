import { NextRequest, NextResponse } from 'next/server';
import { contactDb } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { minecraft_username, email, subject, message } = body;

    // Validation
    if (!minecraft_username || !subject || !message) {
      return NextResponse.json(
        { error: 'Minecraft username, subject, and message are required' },
        { status: 400 }
      );
    }

    // Validate Minecraft username format (3-16 alphanumeric characters and underscores)
    const minecraftUsernameRegex = /^\w{3,16}$/;
    if (!minecraftUsernameRegex.test(minecraft_username)) {
      return NextResponse.json(
        { error: 'Invalid Minecraft username format' },
        { status: 400 }
      );
    }

    // Optional email validation
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }
    }

    // Insert into database
    const id = contactDb.insert({
      minecraft_username,
      email: email || undefined,
      subject,
      message,
    });

    return NextResponse.json(
      { success: true, id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json(
      { error: 'Failed to save message' },
      { status: 500 }
    );
  }
}
