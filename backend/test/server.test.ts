import { server } from "../src/server"
import axios from 'axios';
import { Entry } from '@prisma/client';

describe("server test", () => {
  it("should assert 1 + 1 is 2", () => {
    expect(1 + 1).toEqual(2);
  });
});

// Start the server before running the tests
beforeAll(async () => {
  await server.listen(3001);
});

// Stop the server after running the tests
afterAll(async () => {
  await server.close();
});

describe('Entry API', () => {
  let createdEntryId: string;

  // Test GET /get/
  describe('GET /get/', () => {
    it('should return all entries', async () => {
      const response = await axios.get<Entry[]>('http://localhost:3001/get/');
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });
  });

  // Test GET /get/:id
  describe('GET /get/:id', () => {
    it('should return an entry by ID', async () => {
      const response = await axios.get<Entry[]>('http://localhost:3001/get/:id');
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });
  });

  describe('POST /create/', () => {
    it('should create a new entry', async () => {
      const entryData = {
        title: 'Test Entry',
        description: 'This is a test entry',
        created_at: new Date(),
        scheduled_date: new Date(),
      };

      const response = await axios.post<Entry>('http://localhost:3001/create/', entryData);
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('id');
      createdEntryId = response.data.id;
    });
  });

  // Test DELETE /delete/:id
  describe('DELETE /delete/:id', () => {
    it('should delete an entry by ID', async () => {
      const response = await axios.delete(`http://localhost:3001/delete/${createdEntryId}`);
      expect(response.status).toBe(200);
      expect(response.data.msg).toBe('Deleted successfully');
    });
  });

  // Test PUT /update/:id
  describe('PUT /update/:id', () => {
    it('should update an entry by ID', async () => {
      const entryData = {
        title: 'Updated Test Entry',
        description: 'This is an updated test entry',
        created_at: new Date(),
        scheduled_date: new Date(),
      };

      const response = await axios.put(`http://localhost:3001/update/${createdEntryId}`, entryData);
      expect(response.status).toBe(200);
      expect(response.data.msg).toBe('Updated successfully');
    });
  });
});
