-- Cartes de vocabulaire avec exemples de lecture.
insert into public.vocabulary (
  jlpt_level, kanji, word, reading, romaji, meaning_fr, clue_fr,
  example_jp, example_reading, example_fr
)
values
  ('N5', '毎', '毎日', 'まいにち', 'mainichi', 'chaque jour', 'chaque', '毎日、日本語を勉強します。', 'まいにち、にほんごをべんきょうします。', 'J’étudie le japonais tous les jours.'),
  ('N5', '分', '五分', 'ごふん', 'gofun', 'cinq minutes', 'minute · partie', '五分だけ待ってください。', 'ごふんだけまってください。', 'Attendez cinq minutes, s’il vous plaît.'),
  ('N5', '曜', '日曜日', 'にちようび', 'nichiyoubi', 'dimanche', 'jour de la semaine', '日曜日に休みます。', 'にちようびにやすみます。', 'Je me repose le dimanche.'),
  ('N5', '午', '午前', 'ごぜん', 'gozen', 'matin · avant midi', 'midi', '午前九時に出ます。', 'ごぜんくじにでます。', 'Je pars à neuf heures du matin.'),
  ('N5', '前', '駅前', 'えきまえ', 'ekimae', 'devant la gare', 'devant · avant', '駅前で会いましょう。', 'えきまえであいましょう。', 'Retrouvons-nous devant la gare.'),
  ('N5', '後', '午後', 'ごご', 'gogo', 'après-midi', 'après · derrière', '午後に本を読みます。', 'ごごにほんをよみます。', 'Je lis un livre l’après-midi.'),
  ('N5', '東', '東口', 'ひがしぐち', 'higashiguchi', 'sortie est', 'est', '駅の東口で待ちます。', 'えきのひがしぐちでまちます。', 'J’attends à la sortie est de la gare.'),
  ('N5', '西', '西口', 'にしぐち', 'nishiguchi', 'sortie ouest', 'ouest', '西口に店があります。', 'にしぐちにみせがあります。', 'Il y a un magasin à la sortie ouest.'),
  ('N5', '北', '北口', 'きたぐち', 'kitaguchi', 'sortie nord', 'nord', '北口から出ます。', 'きたぐちからでます。', 'Je sors par la sortie nord.'),
  ('N5', '南', '南口', 'みなみぐち', 'minamiguchi', 'sortie sud', 'sud', '南口はどこですか。', 'みなみぐちはどこですか。', 'Où est la sortie sud ?'),
  ('N5', '半', '七時半', 'しちじはん', 'shichijihan', 'sept heures et demie', 'moitié', '七時半に起きます。', 'しちじはんにおきます。', 'Je me lève à sept heures et demie.'),
  ('N5', '外', '外国', 'がいこく', 'gaikoku', 'pays étranger', 'extérieur', '外国へ行きたいです。', 'がいこくへいきたいです。', 'J’aimerais aller à l’étranger.'),
  ('N5', '語', '日本語', 'にほんご', 'nihongo', 'langue japonaise', 'langue · mot', '日本語を話します。', 'にほんごをはなします。', 'Je parle japonais.'),
  ('N5', '新', '新しい', 'あたらしい', 'atarashii', 'nouveau · neuf', 'nouveau', '新しい本を買いました。', 'あたらしいほんをかいました。', 'J’ai acheté un nouveau livre.'),
  ('N5', '古', '古い', 'ふるい', 'furui', 'ancien · vieux', 'ancien', 'これは古い家です。', 'これはふるいいえです。', 'C’est une vieille maison.'),
  ('N5', '白', '白い', 'しろい', 'shiroi', 'blanc', 'blanc', '白い猫がいます。', 'しろいねこがいます。', 'Il y a un chat blanc.'),
  ('N5', '長', '長い', 'ながい', 'nagai', 'long', 'long', 'この道は長いです。', 'このみちはながいです。', 'Cette route est longue.'),
  ('N5', '高', '高い', 'たかい', 'takai', 'haut · cher', 'haut', 'この店は高いです。', 'このみせはたかいです。', 'Ce magasin est cher.'),
  ('N5', '安', '安い', 'やすい', 'yasui', 'bon marché', 'bon marché · tranquille', 'このお茶は安いです。', 'このおちゃはやすいです。', 'Ce thé est bon marché.'),
  ('N5', '多', '多い', 'おおい', 'ooi', 'nombreux', 'beaucoup', '今日は人が多いです。', 'きょうはひとがおおいです。', 'Il y a beaucoup de monde aujourd’hui.'),
  ('N4', '切', '切手', 'きって', 'kitte', 'timbre-poste', 'couper', '切手を二枚買いました。', 'きってをにまいかいました。', 'J’ai acheté deux timbres.'),
  ('N4', '物', '荷物', 'にもつ', 'nimotsu', 'bagages · colis', 'chose', '荷物を駅に置きました。', 'にもつをえきにおきました。', 'J’ai laissé mes bagages à la gare.'),
  ('N4', '便', '便利', 'べんり', 'benri', 'pratique', 'commodité', 'このアプリは便利です。', 'このアプリはべんりです。', 'Cette application est pratique.'),
  ('N4', '強', '勉強', 'べんきょう', 'benkyou', 'étude · travail scolaire', 'fort', '図書館で勉強します。', 'としょかんでべんきょうします。', 'J’étudie à la bibliothèque.'),
  ('N4', '図', '図書館', 'としょかん', 'toshokan', 'bibliothèque', 'plan · dessin', '図書館で本を借りました。', 'としょかんでほんをかりました。', 'J’ai emprunté un livre à la bibliothèque.'),
  ('N4', '質', '質問', 'しつもん', 'shitsumon', 'question', 'qualité · nature', '先生に質問しました。', 'せんせいにしつもんしました。', 'J’ai posé une question au professeur.'),
  ('N4', '答', '答える', 'こたえる', 'kotaeru', 'répondre', 'réponse', '質問に答えます。', 'しつもんにこたえます。', 'Je réponds à la question.'),
  ('N4', '洗', '洗う', 'あらう', 'arau', 'laver', 'laver', '食べる前に手を洗います。', 'たべるまえにてをあらいます。', 'Je me lave les mains avant de manger.'),
  ('N4', '帰', '帰る', 'かえる', 'kaeru', 'rentrer · retourner', 'retour', '夜に家へ帰ります。', 'よるにいえへかえります。', 'Je rentre chez moi le soir.'),
  ('N4', '用', '用事', 'ようじ', 'youji', 'chose à faire · affaire', 'usage · affaire', '午後は用事があります。', 'ごごはようじがあります。', 'J’ai quelque chose à faire cet après-midi.')
on conflict (word) do update set
  example_jp = excluded.example_jp,
  example_reading = excluded.example_reading,
  example_fr = excluded.example_fr
where public.vocabulary.example_jp is null;
