import { User } from '@models/User/user.model';

// Function to check if a given ID is unique
async function isUniqueId(val: string): Promise<boolean> {
  try {
    const count = await User.count({
      where: { id: val },
    });
    return count === 0; // Returns true if the ID is unique (count === 0)
  } catch (error) {
    console.error('Error checking unique ID:', error);
    throw new Error('Database error while checking unique ID');
  }
}

// Function to check if a given email is unique
async function isUniqueEmail(val: string): Promise<boolean> {
  try {
    const count = await User.count({
      where: { email: val },
    });
    return count === 0; // Returns true if the email is unique (count === 0)
  } catch (error) {
    console.error('Error checking unique email:', error);
    throw new Error('Database error while checking unique email');
  }
}

export { isUniqueId, isUniqueEmail };
