# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

example_user = User.new(first_name: "Grace", middle_name: "Brewster Murray", last_name: "Hopper", birthday: Date.new(1906,12,9), email: "GHopper@example.com", password: "example", password_confirmation: "example")

example_user.skip_confirmation!
example_user.save

definition_titles = ["Number", "English", "French", "Hindi", "Japanese", "Korean", "Spanish", "Swahili"]

definition_titles.each do |def_t|
  DefinitionTitle.create(title: def_t)
end

deck_attributes = [
  {name: "Numbers", definition_title_id: 1},
  {name: "Days of the Week", definition_title_id: 1}
]

deck_attributes.each do |attributes|
  deck = Deck.create(attributes)
  UserDeck.create(user: example_user, deck: deck)
end

card_attributes = [
  {term: "1", deck_id: 1, sequence: 1},
  {term: "2", deck_id: 1, sequence: 2},
  {term: "3", deck_id: 1, sequence: 3},
  {term: "4", deck_id: 1, sequence: 4},
  {term: "5", deck_id: 1, sequence: 5},
  {term: "6", deck_id: 1, sequence: 6},
  {term: "7", deck_id: 1, sequence: 7},
  {term: "8", deck_id: 1, sequence: 8},
  {term: "9", deck_id: 1, sequence: 9},
  {term: "10", deck_id: 1, sequence: 10},
  {term: "Sunday", deck_id: 2, sequence: 1},
  {term: "Monday", deck_id: 2, sequence: 2},
  {term: "Tuesday", deck_id: 2, sequence: 3},
  {term: "Wednesday", deck_id: 2, sequence: 4},
  {term: "Thursday", deck_id: 2, sequence: 5},
  {term: "Friday", deck_id: 2, sequence: 6},
  {term: "Saturday", deck_id: 2, sequence: 7}
]

card_attributes.each do |attributes|
  Card.create(attributes)
end

definition_attributes = [
  {definition: "One", card_id: 1, definition_title_id: 2, sequence: 1},
  {definition: "Two", card_id: 2, definition_title_id: 2, sequence: 1},
  {definition: "Three", card_id: 3, definition_title_id: 2, sequence: 1},
  {definition: "Four", card_id: 4, definition_title_id: 2, sequence: 1},
  {definition: "Five", card_id: 5, definition_title_id: 2, sequence: 1},
  {definition: "Six", card_id: 6, definition_title_id: 2, sequence: 1},
  {definition: "Seven", card_id: 7, definition_title_id: 2, sequence: 1},
  {definition: "Eight", card_id: 8, definition_title_id: 2, sequence: 1},
  {definition: "Nine", card_id: 9, definition_title_id: 2, sequence: 1},
  {definition: "Ten", card_id: 10, definition_title_id: 2, sequence: 1},
  {definition: "Un", card_id: 1, definition_title_id: 3, sequence: 2},
  {definition: "Deux", card_id: 2, definition_title_id: 3, sequence: 2},
  {definition: "Trois", card_id: 3, definition_title_id: 3, sequence: 2},
  {definition: "Quatre", card_id: 4, definition_title_id: 3, sequence: 2},
  {definition: "Cinq", card_id: 5, definition_title_id: 3, sequence: 2},
  {definition: "Six", card_id: 6, definition_title_id: 3, sequence: 2},
  {definition: "Sept", card_id: 7, definition_title_id: 3, sequence: 2},
  {definition: "Huit", card_id: 8, definition_title_id: 3, sequence: 2},
  {definition: "Neuf", card_id: 9, definition_title_id: 3, sequence: 2},
  {definition: "Dix", card_id: 10, definition_title_id: 3, sequence: 2},
  {definition: "एक", card_id: 1, definition_title_id: 4, sequence: 3},
  {definition: "दो", card_id: 2, definition_title_id: 4, sequence: 3},
  {definition: "तीन", card_id: 3, definition_title_id: 4, sequence: 3},
  {definition: "चार", card_id: 4, definition_title_id: 4, sequence: 3},
  {definition: "पांच", card_id: 5, definition_title_id: 4, sequence: 3},
  {definition: "छह", card_id: 6, definition_title_id: 4, sequence: 3},
  {definition: "सात", card_id: 7, definition_title_id: 4, sequence: 3},
  {definition: "आठ", card_id: 8, definition_title_id: 4, sequence: 3},
  {definition: "नौ", card_id: 9, definition_title_id: 4, sequence: 3},
  {definition: "दस", card_id: 10, definition_title_id: 4, sequence: 3},
  {definition: "一", card_id: 1, definition_title_id: 5, sequence: 4},
  {definition: "二", card_id: 2, definition_title_id: 5, sequence: 4},
  {definition: "三", card_id: 3, definition_title_id: 5, sequence: 4},
  {definition: "四", card_id: 4, definition_title_id: 5, sequence: 4},
  {definition: "五", card_id: 5, definition_title_id: 5, sequence: 4},
  {definition: "六", card_id: 6, definition_title_id: 5, sequence: 4},
  {definition: "七", card_id: 7, definition_title_id: 5, sequence: 4},
  {definition: "八", card_id: 8, definition_title_id: 5, sequence: 4},
  {definition: "九", card_id: 9, definition_title_id: 5, sequence: 4},
  {definition: "十", card_id: 10, definition_title_id: 5, sequence: 4},
  {definition: "하나", card_id: 1, definition_title_id: 6, sequence: 5},
  {definition: "둘", card_id: 2, definition_title_id: 6, sequence: 5},
  {definition: "셋", card_id: 3, definition_title_id: 6, sequence: 5},
  {definition: "넷", card_id: 4, definition_title_id: 6, sequence: 5},
  {definition: "다섯", card_id: 5, definition_title_id: 6, sequence: 5},
  {definition: "여섯", card_id: 6, definition_title_id: 6, sequence: 5},
  {definition: "일곱", card_id: 7, definition_title_id: 6, sequence: 5},
  {definition: "여덟", card_id: 8, definition_title_id: 6, sequence: 5},
  {definition: "아홉", card_id: 9, definition_title_id: 6, sequence: 5},
  {definition: "열", card_id: 10, definition_title_id: 6, sequence: 5},
  {definition: "Uno", card_id: 1, definition_title_id: 7, sequence: 6},
  {definition: "Dos", card_id: 2, definition_title_id: 7, sequence: 6},
  {definition: "Tres", card_id: 3, definition_title_id: 7, sequence: 6},
  {definition: "Cuatro", card_id: 4, definition_title_id: 7, sequence: 6},
  {definition: "Cinco", card_id: 5, definition_title_id: 7, sequence: 6},
  {definition: "Seis", card_id: 6, definition_title_id: 7, sequence: 6},
  {definition: "Siete", card_id: 7, definition_title_id: 7, sequence: 6},
  {definition: "Ocho", card_id: 8, definition_title_id: 7, sequence: 6},
  {definition: "Nueve", card_id: 9, definition_title_id: 7, sequence: 6},
  {definition: "Diez", card_id: 10, definition_title_id: 7, sequence: 6},
  {definition: "Moja", card_id: 1, definition_title_id: 8, sequence: 7},
  {definition: "Mbili", card_id: 2, definition_title_id: 8, sequence: 7},
  {definition: "Tatu", card_id: 3, definition_title_id: 8, sequence: 7},
  {definition: "Nne", card_id: 4, definition_title_id: 8, sequence: 7},
  {definition: "Tano", card_id: 5, definition_title_id: 8, sequence: 7},
  {definition: "Sita", card_id: 6, definition_title_id: 8, sequence: 7},
  {definition: "Saba", card_id: 7, definition_title_id: 8, sequence: 7},
  {definition: "Nane", card_id: 8, definition_title_id: 8, sequence: 7},
  {definition: "Tisa", card_id: 9, definition_title_id: 8, sequence: 7},
  {definition: "Kumi", card_id: 10, definition_title_id: 8, sequence: 7},
  {definition: "Dimanche", card_id: 11, definition_title_id: 3, sequence: 1},
  {definition: "Lundi", card_id: 12, definition_title_id: 3, sequence: 1},
  {definition: "Mardi", card_id: 13, definition_title_id: 3, sequence: 1},
  {definition: "Mercredi", card_id: 14, definition_title_id: 3, sequence: 1},
  {definition: "Jeudi", card_id: 15, definition_title_id: 3, sequence: 1},
  {definition: "Vendredi", card_id: 16, definition_title_id: 3, sequence: 1},
  {definition: "Samedi", card_id: 17, definition_title_id: 3, sequence: 1}
]

definition_attributes.each do |attributes|
  Definition.create(attributes)
end

note_attributes = [
  {
    name: "Regex",
    note: "{\"blocks\":[{\"key\":\"759sd\",\"text\":\"Two way to create regex\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"eg5fm\",\"text\":\"Slash notation:\",\"type\":\"header-five\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"dp6oe\",\"text\":\"let [variable name] = /[pattern]/[flag]\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":39,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"17fmq\",\"text\":\"replace the [...] with appropriate text.\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":12,\"length\":5,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"2dcr7\",\"text\":\"e.g., let reSlash = /^matchthis$/i \",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":6,\"length\":28,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"2438j\",\"text\":\"Constructor notation:\",\"type\":\"header-five\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"9s561\",\"text\":\"let [variable name] = newRegExp(\\\"[pattern]\\\",\\\"[flag]\\\")\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":53,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"ckjq8\",\"text\":\"e.g., let reConstructor = newRegExp(\\\"^matchthis$\\\",\\\"i\\\")\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":6,\"length\":48,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"bhdih\",\"text\":\"Generates regex on run time, so good for when you don't know ahead of time.\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"avcs7\",\"text\":\"You can replace the pattern and flag with variables\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"af1m4\",\"text\":\"Flags\",\"type\":\"header-four\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"dk5a1\",\"text\":\"g - Global match\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":1,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3056h\",\"text\":\"m - Multiline\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":1,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"thb3\",\"text\":\"i - Ignore case/Case insensitive\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":1,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"eitm1\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"5cgps\",\"text\":\"Special Characters\",\"type\":\"header-four\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"b7jch\",\"text\":\"[], (), {}, \\\\, ^, $,., |, ?, *, +\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":2,\"style\":\"CODE\"},{\"offset\":4,\"length\":2,\"style\":\"CODE\"},{\"offset\":8,\"length\":2,\"style\":\"CODE\"},{\"offset\":12,\"length\":1,\"style\":\"CODE\"},{\"offset\":15,\"length\":1,\"style\":\"CODE\"},{\"offset\":18,\"length\":1,\"style\":\"CODE\"},{\"offset\":20,\"length\":1,\"style\":\"CODE\"},{\"offset\":23,\"length\":1,\"style\":\"CODE\"},{\"offset\":26,\"length\":1,\"style\":\"CODE\"},{\"offset\":29,\"length\":1,\"style\":\"CODE\"},{\"offset\":32,\"length\":1,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"4ucth\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"bbml8\",\"text\":\"Other Syntax\",\"type\":\"header-four\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"6petr\",\"text\":\"^ - denotes the beginning of a string\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":1,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"836vi\",\"text\":\"$ - denotes the end of a string\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":1,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"5dcj7\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"fpp26\",\"text\":\"To Test\",\"type\":\"header-four\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"c5f4f\",\"text\":\"- e.g., reSlash.test(\\\"MATCHTHIS\\\") => true\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":8,\"length\":25,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"d5j25\",\"text\":\"- e.g., reConstructor.test(\\\" MATCHTHIS\\\") => false\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":8,\"length\":32,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"9kd3\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"3d55h\",\"text\":\"Matching Special Characters\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"ce91d\",\"text\":\"Have to escape all the special characters\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"5sl2v\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"8ub2f\",\"text\":\"[]+ means one of them inside the bracket.\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":3,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3seg7\",\"text\":\"d means digit\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":1,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"1i9\",\"text\":\"s means space\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":1,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"630pg\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"cn9sb\",\"text\":\"let reMatchTheSpecialChars = \\\"/[\\\\(\\\\{\\\\}\\\\)\\\\]\\\\\\\\\\\\^\\\\$\\\\/\\\\|\\\\?\\\\*\\\\+/\\\"\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"675l4\",\"text\":\"\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"5hke7\",\"text\":\"let phoneNumber = \\\"+01-857-544-0796 \\\"\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"28qkt\",\"text\":\"letValidNumber = phoneNumber.match(/^[\\\\+\\\\d\\\\-\\\\s]+$) => true\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"1fm5\",\"text\":\"\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"eh9j1\",\"text\":\"let phoneNumber = \\\"+01-857-544-0796 sjd\\\"\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"4h6mv\",\"text\":\"letValidNumber = phoneNumber.match(/^[\\\\+\\\\d\\\\-\\\\s]+$) => false\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"9a9d\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"c0oip\",\"text\":\"Matching\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"c0r3d\",\"text\":\"a{6} will look for 6 a in a row.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":4,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"crvbo\",\"text\":\"a{4,} will look for 4 or more in a row\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":5,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"c7hgi\",\"text\":\"a{4,5} will look for at least 4 and most max of 5 a in a row\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":6,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"ch19f\",\"text\":\"a{0,} or a* will match zero or all a\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":5,\"style\":\"CODE\"},{\"offset\":9,\"length\":2,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"4ot0i\",\"text\":\"a{0,} or a? will match one a or none\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":5,\"style\":\"CODE\"},{\"offset\":9,\"length\":2,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"6pnh2\",\"text\":\"a+ or a{1,} at least one a\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":2,\"style\":\"CODE\"},{\"offset\":5,\"length\":7,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"7o78v\",\"text\":\"[xyz] looks each one in any order\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":5,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"60idl\",\"text\":\"[xyz]+ matches at least one or more and in any order.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":6,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"82s9p\",\"text\":\"[0-9]+ or [0123456789] or [\\\\d]+ anything from 0 to 9. Doesn't understand decimals or commas.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":7,\"style\":\"CODE\"},{\"offset\":9,\"length\":13,\"style\":\"CODE\"},{\"offset\":25,\"length\":6,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"5udp5\",\"text\":\"[-\\\\d]+ will allow for negatives (but doesn't check where or number of occurrence)\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":6,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"3nc8n\",\"text\":\"[-\\\\d\\\\.]+ will allow for negatives and decimals (doesn't check number of occurrence)\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":8,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"aepep\",\"text\":\"[a-z]+ anything from a to z, lowercase\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":6,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"dqmkt\",\"text\":\"[a-z0-9]+ anything from a to z or 0-9, lowercase\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":9,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"b70qk\",\"text\":\"[a-z0-9A-Z]+ anything from a to z or 0-9, lowercase and upper case\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":12,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"5jb3k\",\"text\":\"[\\\\w]+ or [a-z0-9A-Z_]+ same as above, but with underscore\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":5,\"style\":\"CODE\"},{\"offset\":9,\"length\":13,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"2hkkf\",\"text\":\"\\\\s match space\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":2,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"693vs\",\"text\":\"^ beginning matches only if it is in the beginning\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":1,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"9mv2o\",\"text\":\"end$ matches only the end\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":4,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"ck8jp\",\"text\":\". means anything\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":1,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"f9o7j\",\"text\":\".+ matches anything\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":2,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"e4114\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"99t5r\",\"text\":\"Extraction\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"f3ka\",\"text\":\"let text = \\\"david is writing code. david is in a video. david like regex\\\"\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"97tdv\",\"text\":\"let extractDavid = text.match(/david/g)\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"aq7mt\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"eekfr\",\"text\":\"Replacement\",\"type\":\"header-three\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"5rnv6\",\"text\":\"let replacedDavid = text.replace(/david/g, \\\"devtips\\\")\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"3ajsr\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}"
  },
  {
    name: "Week 1: Advanced Oop",
    note: "{\"blocks\":[{\"key\":\"7v4nj\",\"text\":\"Classes: Readers, Writers & Accessors\",\"type\":\"header-two\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"a9i8u\",\"text\":\"Getter\",\"type\":\"header-four\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"39csm\",\"text\":\"Classes are blueprints for objects. Example below:\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"9bfbs\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"8enaj\",\"text\":\"class Person\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"1ct8c\",\"text\":\"  def initialize(name)\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"cdaq\",\"text\":\"    @name = name\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"eq3ae\",\"text\":\"  end\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"bn29q\",\"text\":\"end\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"flbhg\",\"text\":\"\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"8go79\",\"text\":\"person1 = Person.new(\\\"Ken\\\")\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"cr3c7\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"bv7tm\",\"text\":\"Classes need getters and setters. Above, person.name would return NoMethodError: undefined method 'name', because it does not have a getter.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":13,\"length\":7,\"style\":\"BOLD\"},{\"offset\":25,\"length\":7,\"style\":\"BOLD\"},{\"offset\":41,\"length\":11,\"style\":\"CODE\"},{\"offset\":66,\"length\":38,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"e4vm\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"245cl\",\"text\":\"Below, def name is a way of defining a getter. However, this can be repetitive, so attr_reader is used as a shorthand.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":7,\"length\":8,\"style\":\"CODE\"},{\"offset\":83,\"length\":11,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"9uibj\",\"text\":\"This allows for the value to be retrieved using: person.name. Example below:\",\"type\":\"unordered-list-item\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":49,\"length\":11,\"style\":\"CODE\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"9fr72\",\"text\":\"class Person\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"14sv6\",\"text\":\"  attr_reader :name, :age\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"1dvv3\",\"text\":\"\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"78m2e\",\"text\":\"  def initialize(name, age)\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"8oau9\",\"text\":\"    @name = name\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"gd8t\",\"text\":\"    @age = age\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"1scls\",\"text\":\"  end\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"d4762\",\"text\":\"\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"7q9id\",\"text\":\"  # def name\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"1omaj\",\"text\":\"  #   @name\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"ci7cv\",\"text\":\"  # end\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"2m9db\",\"text\":\"end\",\"type\":\"code-block\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"5hubt\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}"
  }
]

note_attributes.each do |attributes|
  note = Note.create(attributes)
  UserNote.create(user: example_user, note: note, owner: true)
end
