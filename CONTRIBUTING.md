# Contributing to StockPilot

Thank you for your interest in contributing to StockPilot!

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a new branch for your feature
4. Make your changes
5. Test your changes
6. Commit and push
7. Create a pull request

## Commit Message Guidelines

We follow conventional commit format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:
```
feat: add user authentication
fix: resolve login validation issue
docs: update README with deployment steps
```

## Code Style

- Use ESLint and Prettier for code formatting
- Follow the existing code structure
- Write meaningful variable and function names
- Add comments for complex logic

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Ensure all tests pass
3. Update documentation as needed
4. Request review from maintainers

## Project Structure

```
StockPilot/
├── client/          # Next.js frontend (Amplify)
├── server/          # Express.js backend (EC2)
└── docs/            # Documentation
```

## Development Environment

### Frontend (Client)
```bash
cd client
npm install
npm run dev
# Opens at http://localhost:3000
```

### Backend (Server)
```bash
cd server
npm install
npm run dev
# Opens at http://localhost:8000
```

## Live Environments

| Environment | URL |
|-------------|-----|
| Production Frontend | [https://main.d47qigns6kh3.amplifyapp.com](https://main.d47qigns6kh3.amplifyapp.com) |
| Production API | [http://54.176.27.132:8000](http://54.176.27.132:8000) |

## Questions?

For any questions about contributing, please contact:
- **Email:** [Swarajbangar77@gmail.com](mailto:Swarajbangar77@gmail.com)

---

© 2025 StockPilot. All rights reserved.

