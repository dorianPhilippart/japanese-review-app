# Kanji Sprint

Application PWA mobile pour réviser le vocabulaire et les kanji japonais.

## Fonctionnalités

- reconnaissance du sens ;
- saisie de lectures en hiragana ou rōmaji ;
- QCM ;
- cartes mémoire interactives ;
- vocabulaire JLPT N5, N4 et N3 ;
- bibliothèque de 1 328 cartes de vocabulaire avec recherche et prononciation, dont 84 avec un exemple traduit ;
- répertoire hors ligne de 2 383 kanjis du N5 au N1, avec recherche et cartes mémoire ;
- guide pratique bilingue hors ligne, avec phrases de voyage, grammaire de base et vocabulaire du quotidien ;
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

## Sources du vocabulaire N5 et N4

`dist/vocabulary-reference.js` couvre les 674 entrées N5 et 630 entrées N4 d’[OpenJLPT](https://github.com/evanclan/OpenJLPT/blob/0d1d3410bec90bd4098a7c72de820543cb4f707c/NOTICE.md). Le classement indicatif vient des listes de [Jonathan Waller](https://www.tanos.co.uk/jlpt/). La source s’appuie sur JMdict et KANJIDIC2 (EDRDG) et Tatoeba. Les sens français proviennent de [JMdict (EDRDG)](https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project) via [jmdict-simplified](https://github.com/scriptin/jmdict-simplified), avec onze traductions complémentaires. Le fichier de données est distribué sous [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) et les données EDRDG sont utilisées conformément à la [licence EDRDG](https://www.edrdg.org/edrdg/licence.html). Pour reconstruire le fichier, exécute `node src/build-vocabulary-reference.mjs`.
