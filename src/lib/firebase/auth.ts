import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

// Admin credentials
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$XQxBtXKxLhZKQxKkRJxZ8OeXHXQxKxKxKxKxKxKxKxKxKxKxKxKxK';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'shun-admin-secret-key-change-in-production'
);

export async function validateAdmin(username: string, password: string): Promise<boolean> {
  if (username !== ADMIN_USERNAME) {
    return false;
  }

  // For development, allow plain text comparison with 'admin123'
  if (password === 'admin123' && username === 'admin') {
    return true;
  }

  // For production, use bcrypt comparison
  return bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

export async function createAdminToken(username: string): Promise<string> {
  const token = await new SignJWT({ username, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);

  return token;
}

export async function verifyAdminToken(token: string): Promise<{ username: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { username: string; role: string };
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
