import { MongoClient, Db, Collection } from 'mongodb';

export class MongoStorage implements IStorage {
  private db: Db;
  private collection: Collection<Message>;

  constructor(mongoUrl: string, dbName: string) {
    const client = new MongoClient(mongoUrl);
    this.db = client.db(dbName);
    this.collection = this.db.collection('messages');
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const message = {
      ...insertMessage,
      id: Date.now(), // or use MongoDB ObjectId
      createdAt: new Date().toISOString()
    };
    await this.collection.insertOne(message);
    return message;
  }

  
export type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export type InsertMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export interface IStorage {
  getAllMessages(): Promise<Message[]>;
  getMessageById(id: number): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private messages: Map<number, Message>;
  currentId: number;

  constructor() {
    this.messages = new Map();
    this.currentId = 1;
  }

  async getAllMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }

  async getMessageById(id: number): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentId++;
    const createdAt = new Date().toISOString();
    const message: Message = { ...insertMessage, id, createdAt };
    this.messages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();