# Food Blog SEO Dashboard

A Next.js application for managing and optimizing SEO for food blogs. This dashboard helps food bloggers manage their content, keywords, and SEO metadata efficiently.

## Features

- Dashboard for managing food blog posts
- SEO optimization tools
- Bulk keyword suggestion updates
- Recipe management system
- Equipment and instruction tracking
- FAQ management

## Tech Stack

- Next.js 15.3.1
- TypeScript
- Prisma (PostgreSQL)
- Tailwind CSS

## Getting Started

1. Clone the repository:

```bash
git clone [your-repo-url]
cd seoforfoodblog
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:
   Create a `.env` file in the root directory with the following:

```
DATABASE_URL="your-postgresql-connection-string"
```

4. Run database migrations:

```bash
npx prisma generate
npx prisma db push
```

5. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

- `/src/app` - Next.js application routes and components
- `/src/app/api` - API routes for blog management
- `/prisma` - Database schema and migrations
- `/public` - Static assets

## Database Schema

The application uses a PostgreSQL database with the following main model:

```prisma
model FoodBlogs {
  id                String   @id @default(uuid())
  author            String
  quote             String
  section           String
  subsection        String
  subsubsection     String
  title             String   @unique
  slug              String   @unique
  imageurl          String
  imagealt          String
  content           Json[]
  instructions      String[]
  recipedescription String
  recipedetails     Json
  seo               Json
  faq               Json
  equipments        String[]
  creationDate      DateTime @default(now())
  updatedAt         DateTime @default(now()) @updatedAt
  reviews           Json[]
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
