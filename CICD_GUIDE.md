# Git Workflow and CI/CD Guidelines

## Branch Strategy

### Branch Types
- `main` - Production-ready code, auto-deploys to staging
- `prod` - Production releases, auto-deploys to production  
- `dev` - Development integration branch
- `feature/*` - Feature development branches

### Workflow Process

1. **Feature Development**
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature-name
   # Make changes and commit
   git push origin feature/your-feature-name
   ```

2. **Pull Request Process**
   - Create PR from `feature/*` → `dev`
   - CI pipeline runs automatically (tests, linting, security)
   - Require 1+ code review approvals
   - All CI checks must pass before merge

3. **Release Process**
   ```bash
   # For staging release
   git checkout main
   git merge dev
   git push origin main

   # For production release
   git checkout prod
   git merge main
   git push origin prod
   ```

## CI/CD Pipeline Overview

### Continuous Integration (CI)
- **Triggers**: Push/PR to main, dev, prod branches
- **Actions**: 
  - Run test suite with coverage
  - TypeScript type checking
  - ESLint code quality
  - Security audit
  - Build validation

### Continuous Deployment (CD)
- **Web App**: Auto-deploy on push to main/prod
- **Mobile Apps**: Manual trigger or tag-based release
- **Environment Mapping**:
  - `dev` → Development environment
  - `main` → Staging environment  
  - `prod` → Production environment

## Required GitHub Secrets

**No secrets required for basic setup!** 🎉

Optional secrets for enhanced deployment:

### Web Deployment (Optional)
- `NETLIFY_AUTH_TOKEN` - Only if using Netlify instead of GitHub Pages
- `NETLIFY_SITE_ID` - Only if using Netlify instead of GitHub Pages

### GitHub Pages (Default - No secrets needed)
- Uses built-in `GITHUB_TOKEN` (automatically provided)

## Local Development Setup

1. **Install dependencies**
   ```bash
   cd mobile
   npm install --legacy-peer-deps
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

3. **Run locally**
   ```bash
   npm start          # Start Expo dev server
   npm run ios        # Run on iOS simulator
   npm run android    # Run on Android emulator
   npm run web        # Run web version
   ```

4. **Testing**
   ```bash
   npm test           # Run tests
   npm run test:watch # Run tests in watch mode
   npm run test:coverage # Generate coverage report
   ```

## Code Quality Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Expo/React Native configuration
- **Prettier**: Consistent code formatting
- **Test Coverage**: Maintain >80% coverage
- **Git Commits**: Use conventional commits format
