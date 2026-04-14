'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { signSession, setSessionCookie } from '@/lib/auth';

export async function loginAction(formData: FormData): Promise<{ error?: string } | undefined> {
  const email = (formData.get('email') ?? '').toString().trim().toLowerCase();
  const password = (formData.get('password') ?? '').toString();

  const expectedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedEmail || !passwordHash) {
    return { error: 'Server is misconfigured' };
  }

  if (email !== expectedEmail) {
    return { error: 'Invalid credentials' };
  }

  const ok = await bcrypt.compare(password, passwordHash);
  if (!ok) {
    return { error: 'Invalid credentials' };
  }

  const token = await signSession(email);
  await setSessionCookie(token);
  redirect('/admin');
}
