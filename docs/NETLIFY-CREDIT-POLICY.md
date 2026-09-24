# Netlify credit policy

The project deliberately prevents routine coding saves from consuming Netlify build credits.

## Active-development rule
- Development happens on `preview`.
- Every push is verified by GitHub Actions.
- Netlify is not connected during rapid construction.
- When Netlify is connected, automatic Deploy Previews and branch deploys stay disabled for active-development branches.
- `main` receives approved milestones only, so a Netlify production build happens only at a deliberate milestone.

This makes GitHub CI the continuous checker and Netlify the deliberate presentation/production layer.
