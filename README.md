# Kanji Sprint

Application PWA mobile pour réviser le vocabulaire et les kanji japonais.

## Fonctionnalités

- reconnaissance du sens ;
- saisie de lectures en hiragana ou rōmaji ;
- QCM ;
- cartes mémoire interactives ;
- niveaux JLPT N5 et N4 ;
- bibliothèque de 160 cartes avec recherche et prononciation, dont 60 avec un exemple traduit ;
- révisions dues avec répétition espacée ;
- révision ciblée selon les résultats ;
- prononciation japonaise automatique, réglable sur l’accueil ;
- sessions personnalisables de 5, 10 ou 20 cartes ;
- objectif quotidien configurable ;
- progression locale hors ligne et synchronisation Supabase avec connexion par e-mail ;
- installation sur Android et iPhone ;
- fonctionnement hors connexion.

## Déploiement

Le workflow GitHub Actions publie automatiquement le contenu de `dist/` sur GitHub Pages à chaque push sur `main`.

## Développement

`npm ci` installe les versions verrouillées, puis `npm run build` génère le client Supabase destiné au navigateur. `dist/config.js` ne contient qu’une clé publique Supabase ; aucune clé secrète ne doit être ajoutée au dépôt.
