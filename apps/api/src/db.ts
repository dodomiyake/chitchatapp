import mongoose from 'mongoose';

/**
 * Optional local Mongo connection for later milestones.
 * M1 does not require or open a production database.
 */
export async function connectMongoIfConfigured(uri: string): Promise<boolean> {
  if (!uri.trim()) {
    return false;
  }

  await mongoose.connect(uri);
  return true;
}
