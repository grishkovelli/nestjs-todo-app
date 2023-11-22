import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { mongooseTestModule, closeMongodConnection } from '../../helpers/test';
import { todoInput } from '../../fixtures';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.interface';
import { AppModule } from '../../app.module';

const endpoint = '/graphql';

describe('todos (QUERY)', () => {
  let app: INestApplication;
  let module: TestingModule;
  let service: TodoService;
  let defaultTodo: Todo;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [mongooseTestModule(), AppModule],
    }).compile();

    app = module.createNestApplication();
    service = module.get<TodoService>(TodoService);

    await app.init();
    defaultTodo = await service.addTodo(todoInput);
  });

  afterAll(async () => {
    closeMongodConnection();
    module.close();
  });

  describe('without filter', () => {
    it('returns todos', async () => {
      const query = '{todos {id name }}';
      const { status, body } = await request(app.getHttpServer())
        .post(endpoint)
        .send({ query });

      expect(status).toEqual(200);
      expect(body.data.todos[0]).toHaveProperty('name', defaultTodo.name);
    });
  });

  describe('with "text" filter', () => {
    const query = (value) => `{
      todos (
        filter: { name: { text: "${value}" } }
      ) { id name }
    }`;

    it('returns todos', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post(endpoint)
        .send({ query: query('st') });

      expect(status).toEqual(200);
      expect(body.data.todos[0]).toHaveProperty('name', defaultTodo.name);
    });

    it('returns empty array', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post(endpoint)
        .send({ query: query('non-existent-pattern') });

      expect(status).toEqual(200);
      expect(body.data.todos).toStrictEqual([]);
    });
  });
});
