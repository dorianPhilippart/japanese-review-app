# Kanji Sprint

Application PWA mobile pour réviser le vocabulaire et les kanji japonais.

## Fonctionnalités

- reconnaissance du sens ;
- saisie de lectures en hiragana ou rōmaji ;
- QCM ;
- cartes mémoire interactives ;
- niveaux JLPT N5 et N4 ;
- bibliothèque de 160 cartes avec recherche et prononciation, dont 60 avec un exemple traduit ;
- répertoire hors ligne de 2 383 kanjis du N5 au N1, avec recherche et cartes mémoire ;
- révisions dues avec répétition espacée ;
- révision ciblée selon les résultats ;
- prononciation japonaise automatique, réglable sur l’accueil ;
- sessions personnalisables de 5, 10 ou 20 cartes ;
- objectif quotidien configurable ;
- progression locale hors ligne et synchronisation Supabase avec connexion par e-mail ;
- installation sur Android et iPhone ;
- fonctionnement hors connexion.
- interface et fiches en français ou en anglais, choix mémorisé sur l’appareil.

## Déploiement

Le workflow GitHub Actions publie automatiquement le contenu de `dist/` sur GitHub Pages à chaque push sur `main`.

## Développement

`npm ci` installe les versions verrouillées, puis `npm run build` génère le client Supabase destiné au navigateur. `dist/config.js` ne contient qu’une clé publique Supabase ; aucune clé secrète ne doit être ajoutée au dépôt.

## Sources du répertoire de kanjis

Le classement suit les listes indicatives de [Jonathan Waller](https://www.tanos.co.uk/jlpt/) via [OpenJLPT](https://github.com/evanclan/OpenJLPT/blob/0d1d3410bec90bd4098a7c72de820543cb4f707c/NOTICE.md). OpenJLPT s’appuie aussi sur JMdict et KANJIDIC2 (EDRDG) et sur Tatoeba. Le JLPT actuel ne publie pas de liste officielle.

`dist/kanji-catalog.json` contient un extrait d’OpenJLPT enrichi des sens français de [KANJIDIC2](https://www.edrdg.org/wiki/KANJIDIC_Project.html). Ces données sont utilisées conformément à la [licence EDRDG](https://www.edrdg.org/edrdg/licence.html) et distribuées sous [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Pour les actualiser, exécute `node src/build-kanji-catalog.mjs <révision-openjlpt>` et renouvelle la version du JSON dans l’application et son cache.
