import { createPool, PoolConnection } from 'mysql2/promise';
import bcrypt from 'bcrypt';

const pool = createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'personal_trainer',
});

interface User {
  id?: number;
  email: string;
  password: string; 
}

export async function registerUser(email: string, password: string): Promise<{ success: boolean; message: string }> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const connection: PoolConnection = await pool.getConnection();

    const [existingUsers] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      connection.release();
      return { success: false, message: 'User already exists' };
    }

    await connection.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );

    connection.release();
    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Registration failed' };
  }
}

export async function loginUser(email: string, password: string): Promise<{ success: boolean; message: string; user?: Omit<User, 'password'> }> {
  try {
    const connection: PoolConnection = await pool.getConnection();

   
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    connection.release();

    if (!Array.isArray(users) || users.length === 0) {
      return { success: false, message: 'User not found' };
    }

    const user = users[0] as User;

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return { success: false, message: 'Invalid password' };
    }

    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Login failed' };
  }
}

export async function setupDatabase(): Promise<{ success: boolean; message: string }> {
  try {
    const connection: PoolConnection = await pool.getConnection();
    
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    connection.release();
    return { success: true, message: 'Database setup completed successfully' };
  } catch (error) {
    console.error('Database setup error:', error);
    return { success: false, message: 'Database setup failed' };
  }
}

