import { nanoid } from 'nanoid';

function generateUserName(name: string | null) {
  if (!name) {
    return null;
  }

  // Remove spaces from the name
  const cleanedName = name.replace(/\s/g, '');

  // Generate a random ID using nanoid
  const randomId = nanoid(10);

  // Concatenate the cleaned name and random ID
  const userId = `${cleanedName}-${randomId}`.toLowerCase();

  return userId;
}

export { generateUserName };
