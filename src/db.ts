import { Pool } from "pg"

export function login(password: string) {
    return new Pool({
        user: "postgres",
        host: "localhost",
        database: "verdant-virgo",
        password,
        port: 5432,
    })
}

export async function createTables(pool: Pool): Promise<void> {
    pool.query(
        `CREATE TABLE COMICS(
        id SERIAL PRIMARY KEY,
        folder VARCHAR(255) UNIQUE,
        name VARCHAR(255),
        artist VARCHAR(255),
        series VARCHAR(255),
        genre VARCHAR(255),
    );`
    )
        .then(console.log)
        .catch(console.log)
}

export async function seedDatabase(pool: Pool): Promise<void> {
    await seedComics(pool)
}

const seedComics = async (pool: Pool): Promise<void> => {}

const pool = login("ejYrkGnzPqZM")
createTables(pool)
