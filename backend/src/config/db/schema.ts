import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  studentId: text('studentId').notNull().unique(),
  type: text('type').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
});

export const books = sqliteTable('books', {
  isbn: text('isbn').primaryKey().unique(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  editorial: text('editorial').notNull(),
  publicationYear: integer('publicationYear').notNull(),
  imageUrl: text('imageUrl'),
});

export const copies = sqliteTable('copies', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  bookId: text('bookId').references(() => books.isbn),
});

export const loans = sqliteTable('loans', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  studentId: text('studentId').references(() => users.studentId),
  copyId: text('copyId')
    .references(() => copies.id)
    .unique(),
  loanDate: text('loanDate')
    .default(sql`(CURRENT_DATE)`)
    .notNull(),
  devolutionDate: text('devolutionDate')
    .default(sql`(date(CURRENT_DATE, '+10 days'))`)
    .notNull(),
});
