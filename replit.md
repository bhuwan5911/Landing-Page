# FitSync Project Documentation

## Overview

FitSync is a professional fitness landing page and contact system. It features a React-based frontend with server-side Express backend that allows visitors to send contact messages which are stored in a database. The application is built with a modern, component-based architecture using React, TypeScript, and Tailwind CSS with the shadcn/ui component library.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

FitSync follows a typical full-stack web application architecture with the following components:

1. **Frontend**: React application built with TypeScript, Tailwind CSS, and shadcn/ui components. The UI is designed to be responsive and user-friendly, with smooth animations provided by Framer Motion.

2. **Backend**: Express.js server that handles API requests, form submissions, and serves the React application in production.

3. **Database**: Drizzle ORM with a schema defined for storing contact messages. The database is designed to be pluggable, currently using an in-memory storage implementation with the ability to connect to a PostgreSQL database.

4. **API Layer**: RESTful API endpoints for contact form submission and message retrieval.

The application structure follows a clear separation of concerns with client-side code in the `client` directory and server-side code in the `server` directory. Shared code, such as database schemas, is located in the `shared` directory.

## Key Components

### Frontend

1. **UI Components**: Built with shadcn/ui, a collection of reusable, accessible components based on Radix UI primitives. The UI follows a consistent design system with proper theming support.

2. **Pages**: The application includes:
   - Home: Landing page with features, gallery, and testimonials
   - About: Information about services and expertise
   - Contact: Form for visitors to send messages

3. **Navigation**: Seamless navigation using Wouter for routing and Framer Motion for page transitions.

4. **State Management**: Uses React Query for remote data fetching and local state for UI interactions.

### Backend

1. **Express Server**: Handles API requests and serves the static React application in production.

2. **API Routes**: RESTful endpoints for contact form submission and message retrieval.

3. **Storage Layer**: Abstracted storage interface with a memory implementation, allowing for easy database switching.

4. **Data Validation**: Uses Zod for schema validation of incoming data.

### Storage

1. **Schema**: Messages table with fields for name, email, subject, message, and timestamp.

2. **Storage**: In-memory storage using MemStorage class for simplicity.

3. **Data Persistence**: Messages are stored temporarily in memory during server runtime.

## Data Flow

1. **Contact Form Submission**:
   - User completes the contact form on the frontend
   - Form data is validated client-side
   - React submits data to `/api/contact` endpoint
   - Server validates data using Zod schema
   - Data is stored in the database
   - Response is sent back to the client
   - UI shows success or error message to the user

2. **Message Retrieval**:
   - Server receives request to `/api/messages`
   - Storage layer retrieves all messages
   - Server returns messages as JSON response

## External Dependencies

### Frontend Dependencies
- **React**: Core UI library
- **Framer Motion**: Animation library
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library based on Radix UI
- **React Query**: Data fetching library
- **Wouter**: Lightweight routing library
- **react-hook-form**: Form handling
- **Zod**: Schema validation
- **Three.js**: 3D visualization

### Backend Dependencies
- **Express**: Web server framework
- **Drizzle ORM**: Database ORM
- **Vite**: Development server and build tool

## Deployment Strategy

The application is set up for deployment on Replit with the following configuration:

1. **Development**: `npm run dev` starts both the Express server and Vite dev server.

2. **Production Build**: `npm run build` builds the React application with Vite and bundles the server code with esbuild.

3. **Production Start**: `npm run start` runs the compiled server code which serves the static assets.

4. **Database**: The application is ready to connect to a PostgreSQL database via environment variables.

5. **Environment Variables**:
   - `DATABASE_URL`: Connection string for PostgreSQL
   - `NODE_ENV`: Environment mode (development/production)

The Replit configuration includes modules for Node.js 20, web, and PostgreSQL 16, making it ready for production deployment with proper database support.

## Development Workflow

1. **Setup**: Clone the repository and install dependencies with `npm install`.

2. **Development**: Run `npm run dev` to start the development server.

3. **Database**: Use `npm run db:push` to sync schema changes with the database.

4. **TypeScript**: Run `npm run check` to verify TypeScript types.

5. **Build**: Run `npm run build` to create a production build.

## Additional Notes

- The application uses a dark/light theme system with CSS variables for consistent styling.
- The custom cursor feature provides a unique user experience.
- The contact form includes validation for all required fields.
- The memory storage implementation can be replaced with a PostgreSQL implementation by updating the storage.ts file.