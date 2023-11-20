import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import {
  mongooseTestModule,
  closeMongodConnection,
} from '../../../src/helpers/test';
import { todoInput } from '../../fixtures';
import { TodoModule } from '../todo.module';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.interface';

describe('TodoController (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;
  let service: TodoService;
  let defaultTodo: Todo;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [mongooseTestModule(), TodoModule],
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

  it('/todo (GET)', async () => {
    const { status, body } = await request(app.getHttpServer()).get('/todos');

    expect(status).toEqual(200);
    expect(body.length).toEqual(1);
    expect(body).toMatchObject([
      {
        id: expect.any(String),
        name: 'TestTodoList',
        completed: expect.any(Boolean),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);
  });

  describe('/todos (POST)', () => {
    describe('with bad params', () => {
      it('returns exception', async () => {
        const { status } = await request(app.getHttpServer())
          .post('/todos')
          .send();

        expect(status).toEqual(422);
      });
    });

    describe('with right params', () => {
      it('creates todo', async () => {
        const expectedProps = { name: 'New todo list' };

        const { status, body } = await request(app.getHttpServer())
          .post('/todos')
          .send(expectedProps);

        expect(status).toEqual(201);
        expect(body).toMatchObject(expectedProps);
      });
    });
  });

  describe('/todos/:id (PUT)', () => {
    describe('with bad params', () => {
      it('returns exception', async () => {
        const { status } = await request(app.getHttpServer())
          .put('/todos/nonexisted-record-id')
          .send({});

        expect(status).toEqual(422);
      });
    });
    describe('with right params', () => {
      it('updates todo', async () => {
        const name = 'Renamed Todo List';
        const { status, body } = await request(app.getHttpServer())
          .put(`/todos/${defaultTodo.id}`)
          .send({ name });

        expect(status).toEqual(200);
        expect(body.name).toEqual(name);
      });
    });
  });

  describe('/todos/:id (DELETE)', () => {
    describe('with bad id', () => {
      it('returns exception', async () => {
        const { status } = await request(app.getHttpServer()).delete(
          '/todos/nonexsistent id',
        );

        expect(status).toEqual(404);
      });
    });
    describe('with right id', () => {
      it('deletes todo', async () => {
        const { status } = await request(app.getHttpServer()).delete(
          `/todos/${defaultTodo.id}`,
        );

        expect(status).toEqual(200);

        const todoIds = (await service.getAll()).map(({ id }) => id);
        expect(todoIds).not.toContain(defaultTodo.id);
      });
    });
  });
});
