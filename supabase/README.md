# Supabase — Kanji Sprint

Cette configuration stocke le catalogue et la progression dans PostgreSQL tout en conservant un cache local hors connexion.

## Sécurité

- Le navigateur utilise uniquement une clé **publishable** (`sb_publishable_...`).
- Ne jamais placer une clé `sb_secret_...` ou `service_role` dans `dist/`, Git ou GitHub Pages.
- Toutes les tables exposées utilisent Row Level Security.
- Chaque utilisateur ne peut lire ou modifier que sa propre progression.
- Le catalogue actif est lisible publiquement, mais son écriture reste réservée à l’administration Supabase.

## Ordre de déploiement

1. Appliquer `migrations/202611240001_initial_schema.sql`.
2. Importer les cartes existantes dans `public.vocabulary`.
3. Activer l’authentification par e-mail avec lien magique.
4. Ajouter les URL de redirection GitHub Pages et ChatGPT Sites dans Supabase Auth.
5. Configurer la PWA avec l’URL du projet et la clé publishable.
