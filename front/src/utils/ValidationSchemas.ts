import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});
export const registerSchema = z.object({
  role: z.string({ message: 'Role is required' }).optional(),
  name: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export const formContent = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  thematic: z.string().nonempty({ message: 'Thematic is required' }),
  category: z.string().nonempty({ message: 'Category is required' }),
  file: z.record(z.any()).refine(obj => Object.keys(obj).length > 0, { message: 'File is required' }).optional(),
  url: z.string().nonempty({ message: 'URL is required' }).optional(),
});