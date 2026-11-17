import * as fs from 'fs';
import * as path from 'path';

const TEST_DATA_DIR = path.resolve(__dirname, '..', 'testdata');

export function loadJson<T>(filename: string): T {
  const filePath = path.join(TEST_DATA_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export function uniqueEmail(template: string): string {
  return template.replace('{timestamp}', Date.now().toString());
}

export function randomString(length: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
