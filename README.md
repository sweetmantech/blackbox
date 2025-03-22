# ⚡ Black Box Team

Hi there! 👋

Black Box Team is a proprietary platform that provides instant access to specialized professional teams for your startup. Our platform offers a curated selection of HR, Marketing, and Legal experts ready to join your team.

## Features

- **Specialized Agents**: Access to three types of professional agents:

  - HR Services Specialist
  - Marketing Strategist
  - Legal Counsel

- **Smart Search & Filtering**:

  - Real-time search functionality
  - Filter by agent type
  - View availability status

- **Detailed Agent Profiles**:
  - Professional experience
  - Specializations
  - Skill ratings
  - Hourly and monthly rates
  - Performance ratings

## Tech Stack

- **Frontend**: Next.js 14 with React
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Type Safety**: TypeScript
- **User authentication**: Supabase
- **Email notifications**: Mailgun

## Docker Setup

Black Box Team provides Docker configurations for both **development** and **production** environments. Below, you'll find the structure of the Docker files and the commands to get started.

### Docker File Structure

The Docker files are organized as follows:

```
docker
├── dev
│   ├── Dockerfile                  # Dockerfile for development
│   ├── docker-compose.yml          # Base development setup
│   ├── docker-compose.mongodb.yml  # Development setup with MongoDB
│   └── docker-compose.postgres.yml # Development setup with PostgreSQL
└── prod
    ├── Dockerfile                  # Dockerfile for production
    ├── docker-compose.yml          # Base production setup
    ├── docker-compose.mongodb.yml  # Production setup with MongoDB
    └── docker-compose.postgres.yml # Production setup with PostgreSQL
```

### Development Environment

In development, the project runs in **watch mode**, meaning it automatically detects changes in your code and rebuilds the application. This is ideal for local development but should **never** be used in production.

#### Commands for Development

1. **Base Setup** (without a database):

   ```bash
   docker-compose -f docker/dev/docker-compose.yml up --build
   ```

2. **With PostgreSQL**:

   ```bash
   docker-compose -f docker/dev/docker-compose.yml -f docker/dev/docker-compose.postgres.yml up --build
   ```

3. **With MongoDB**:
   ```bash
   docker-compose -f docker/dev/docker-compose.yml -f docker/dev/docker-compose.mongodb.yml up --build
   ```

### Production Environment

The production environment is optimized for performance and security. It uses a multi-stage build to reduce the image size and includes only the necessary dependencies.

#### Commands for Production

1. **Base Setup** (without a database):

   ```bash
   docker-compose -f docker/prod/docker-compose.yml up --build -d
   ```

2. **With PostgreSQL**:

   ```bash
   docker-compose -f docker/prod/docker-compose.yml -f docker/prod/docker-compose.postgres.yml up --build -d
   ```

3. **With MongoDB**:
   ```bash
   docker-compose -f docker/prod/docker-compose.yml -f docker/prod/docker-compose.mongodb.yml up --build -d
   ```

### Portainer Integration

Portainer is included in both development and production setups to help you manage your Docker containers via a web interface.

- **Access Portainer**: `http://localhost:9000`
- **Default credentials**: Set up during the first login.

## Project Structure

```
blackbox/
├── src/
│   ├── app/
│   │   └── agents/           # Agents page
│   ├── components/           # Reusable components
│   │   └── AgentCard.tsx    # Agent card component
│   └── lib/
│       └── agents-data.ts   # Agent data and types
├── public/
│   └── agents/              # Agent avatars and images
└── docker/                  # Docker configuration files
```

## Available Agents

### HR Services Specialist

- 8 years experience
- Expertise in talent acquisition and HR compliance
- Specializes in employee relations and policy development
- Rate: $85/hr or $12,000/month

### Marketing Strategist

- 6 years experience
- Digital marketing and brand development expert
- Specializes in growth marketing and analytics
- Rate: $95/hr or $14,000/month

### Legal Counsel

- 10 years experience
- Business and startup law specialist
- Specializes in contracts and compliance
- Rate: $150/hr or $20,000/month

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=your_database_url

# Authentication
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Email
MAILGUN_API_KEY=your_mailgun_key
MAILGUN_DOMAIN=your_mailgun_domain
```

## Contributing

For people who want to contribute, please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## License & Legal

**PROPRIETARY AND CONFIDENTIAL**

Copyright (c) 2024 Black Box Team. All Rights Reserved.

This software is proprietary and confidential. Unauthorized copying, transferring, or reproduction of this software, via any medium is strictly prohibited. The software is protected by copyright law and international treaties.

For licensing inquiries, please contact: legal@blackboxteam.com

## Confidentiality

This repository and its contents are confidential. By accessing this software you agree to:

- Maintain the confidentiality of the software
- Not share or distribute any part of the codebase
- Not use the code for any purpose without explicit permission
- Report any unauthorized access or use

## Support & Contact

For support:

- Email: support@blackboxteam.com
- Phone: [Your support phone number]
- Business Hours: Monday-Friday, 9:00 AM - 6:00 PM EST

For business inquiries:

- Email: business@blackboxteam.com
- Partnership: partners@blackboxteam.com

---

Built with ❤️ by Black Box Team | © 2024 Black Box Team. All rights reserved.
