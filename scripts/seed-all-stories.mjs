// Seed script: comprehensive stories for all ages, languages, and themes
// Usage: node scripts/seed-all-stories.mjs

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL ?? "YOUR_SUPABASE_URL";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY ?? "YOUR_SUPABASE_SERVICE_KEY";
const supabase = createClient(supabaseUrl, supabaseKey);

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

// ===== STORY EXPANSIONS (adds ~2000-3000 words per story) =====
// These blocks weave into the base story to reach 2000-4000 words total

const EXPAND = {
  Panchatantra_EN: [`The village where {childname} lived was nestled between rolling green hills and a dense forest that stretched as far as the eye could see. Every morning, {childname} would wake up to the sound of birds singing and the gentle rustling of leaves in the breeze. {possessive} grandmother's cottage sat at the edge of the village, with a beautiful garden full of marigolds, jasmine, and tulsi plants. The pond behind the cottage was {childname}'s favorite spot. It was not very large, but it was home to countless creatures — colorful fish that glimmered in the sunlight, frogs that croaked in chorus during the monsoon, and elegant birds that came to drink water. {childname} would spend hours sitting by the pond, watching the dragonflies dance over the water and listening to the stories the wind whispered through the trees. The pond was surrounded by old banyan trees whose branches hung low, creating a natural canopy that provided cool shade even on the hottest summer days.`, // ~170 words
`{childname} had always been a curious and compassionate child. {possessive} parents often said that {pronoun} had a heart as big as the sky and a mind full of questions. Whenever someone in the village was in trouble, {childname} would be the first to offer help. {pronoun} would carry water for the elderly, share {possessive} lunch with children who had none, and nurse injured birds back to health. The village animals trusted {childname} completely. The stray dogs would wag their tails when {pronoun} passed by, and the cows would low gently as if greeting {pronoun}. This special connection with animals and nature was what made {childname} different from other children. {possessive} grandmother often said, "Beta, you have the gift of understanding. Use it wisely, and you will always find the right path." And {childname} took those words to heart, carrying them like a torch through every adventure that came {possessive} way.`,
`The forest that bordered the village was ancient and mysterious. The villagers told stories of magical creatures that lived deep within its shadows — talking animals, wise old trees that could predict the weather, and a hidden waterfall whose waters sparkled like diamonds under the moonlight. But the forest was also dangerous for those who did not respect it. There were thorny bushes that could tear your clothes, deep ravines that were hard to spot, and during the rainy season, streams that could swell into roaring rivers within hours. {childname} knew the forest well, having explored its edges many times with {possessive} grandfather. {pronoun} knew which berries were safe to eat, which paths led to the stream, and where the best firewood could be found. But even {pronoun} had never ventured deep into the heart of the forest, where the oldest trees stood like silent guardians and the air hummed with ancient magic. That was where the real adventures began.`,
`As {childname} sat thinking about the problem, {pronoun} remembered something {possessive} grandfather once said: "Every problem has a solution, beta. You just need to look at it from the right angle." {pronoun} closed {possessive} eyes and took a deep breath. The air smelled of wet earth and blooming flowers. A gentle breeze carried the sound of the forest — the rustling leaves, the distant call of a cuckoo, the soft murmur of the pond's water. {childname} let {possessive} mind wander, connecting dots that seemed unrelated at first. And then, like a ray of sunlight breaking through clouds, the idea came. It was simple, elegant, and beautiful in its simplicity. {pronoun} smiled, feeling the excitement of discovery. This was how solutions always came — not through force or frustration, but through calm, patient thinking. {pronoun} stood up, brushed the grass off {possessive} clothes, and got ready to put the plan into action. The animals watched with curiosity, sensing that something wonderful was about to happen.`,
`The success of {childname}'s plan brought joy not just to the animals, but to the entire village. Word spread about how a young child had solved a problem that had troubled the pond creatures for weeks. People came from neighboring villages to hear the story. The village elders nodded with approval, saying that {childname} would grow up to be a great leader someday. But for {childname}, the real reward was not the praise or the attention. It was the sight of the crane dancing happily by the pond, the fish swimming freely and joyfully, and the harmony that had been restored to the little ecosystem. {pronoun} learned that day that true leadership is not about telling others what to do, but about bringing out the best in everyone. Every creature, big or small, has something valuable to contribute. And sometimes, the smallest voice can make the biggest difference when it speaks with wisdom and kindness. {childname} returned home that evening with a heart full of gratitude and a mind buzzing with ideas for more adventures.`,

    // Additional expansions to reach 2000+ words total
    `The days that followed were filled with joy and discovery. {childname} visited the pond every day, and each time there was something new to learn. The crane taught {pronoun} about patience — how to stand still and wait for the right moment. The fish taught {pronoun} about teamwork — how they swam together in perfect synchronization, protecting each other from danger. The old banyan tree taught {pronoun} about strength — how its roots went deep into the earth, allowing it to stand tall through every storm. {childname} realized that nature was the greatest teacher of all, offering lessons that no school could provide. {pronoun} started keeping a small notebook, writing down everything {pronoun} observed and learned. The notebook became {possessive} treasure, filled with sketches of leaves, descriptions of animal behaviors, and little poems about the beauty of the natural world.`,
    `One afternoon, {childname} noticed something unusual. A group of monkeys from the forest had started raiding the village fields, stealing sugarcane and vegetables. The farmers were worried and angry. Some wanted to set traps, others wanted to chase them away with sticks. But {childname} remembered the lesson of the elephant. {pronoun} went to the village elders and said, "Instead of fighting the monkeys, why don't we give them their own food source?" The elders were skeptical, but they agreed to try {childname}'s plan. They planted a small patch of sugarcane and vegetables at the edge of the forest, specifically for the monkeys. At first, the monkeys did not understand. But {childname} went to the forest edge every day, leaving food there and calling to them gently. Within a week, the monkeys had learned that the new patch was their food source, and they stopped raiding the village fields. The farmers were amazed. {childname} had solved a problem that had troubled them for months, simply by understanding what the monkeys needed.`,
    `The news of {childname}'s wisdom spread beyond the village. Travelers carried the stories to neighboring towns, and soon people were coming from far away to meet the remarkable child who could talk to animals and solve problems with such grace. A scholar from a distant city came to study {childname}'s methods. He asked, "How do you know what the animals are thinking?" {childname} smiled and replied, "I do not know what they are thinking. I watch what they do, listen to what they say, and try to understand what they need. It is the same with people. If you want to help someone, you must first understand them." The scholar was deeply impressed. He wrote down everything {childname} said and took the lessons back to his city. {childname} continued to live simply, helping where {pronoun} could and learning from every creature {pronoun} met.`,
    `Years passed, and {childname} grew up, but {pronoun} never lost the connection with nature that had shaped {possessive} childhood. {pronoun} became a teacher in the village school, passing on the wisdom {pronoun} had gained. {possessive} students learned not just from books, but from the world around them. They planted trees, cared for injured animals, and learned to observe the patterns of nature. The village became known as a place where humans and nature lived in harmony. People came from all over to learn from this model community. And {childname}, now an elder with gray hair and kind eyes, would tell the story of the wise crane and the lazy fish, reminding everyone that patience and creativity can solve any problem. "The answers are all around us," {pronoun} would say. "We just need to be quiet enough to hear them."`,
  ],
  Birbal_EN: [
`The village where {childname} lived was nestled between rolling green hills and a dense forest that stretched as far as the eye could see. Every morning, {childname} would wake up to the sound of birds singing and the gentle rustling of leaves in the breeze. {possessive} grandmother's cottage sat at the edge of the village, with a beautiful garden full of marigolds, jasmine, and tulsi plants. The pond behind the cottage was {childname}'s favorite spot. It was not very large, but it was home to countless creatures — colorful fish that glimmered in the sunlight, frogs that croaked in chorus during the monsoon, and elegant birds that came to drink water. {childname} would spend hours sitting by the pond, watching the dragonflies dance over the water and listening to the stories the wind whispered through the trees. The pond was surrounded by old banyan trees whose branches hung low, creating a natural canopy that provided cool shade even on the hottest summer days.`, // 923 chars, ~150 words
`{childname} had always been a curious and compassionate child. {possessive} parents often said that {pronoun} had a heart as big as the sky and a mind full of questions. Whenever someone in the village was in trouble, {childname} would be the first to offer help. {pronoun} would carry water for the elderly, share {possessive} lunch with children who had none, and nurse injured birds back to health. The village animals trusted {childname} completely. The stray dogs would wag their tails when {pronoun} passed by, and the cows would low gently as if greeting {pronoun}. This special connection with animals and nature was what made {childname} different from other children. {possessive} grandmother often said, "Beta, you have the gift of understanding. Use it wisely, and you will always find the right path." And {childname} took those words to heart, carrying them like a torch through every adventure that came {possessive} way.`, // 1025 chars, ~160 words
`The forest that bordered the village was ancient and mysterious. The villagers told stories of magical creatures that lived deep within its shadows — talking animals, wise old trees that could predict the weather, and a hidden waterfall whose waters sparkled like diamonds under the moonlight. But the forest was also dangerous for those who did not respect it. There were thorny bushes that could tear your clothes, deep ravines that were hard to spot, and during the rainy season, streams that could swell into roaring rivers within hours. {childname} knew the forest well, having explored its edges many times with {possessive} grandfather. {pronoun} knew which berries were safe to eat, which paths led to the stream, and where the best firewood could be found. But even {pronoun} had never ventured deep into the heart of the forest, where the oldest trees stood like silent guardians and the air hummed with ancient magic. That was where the real adventures began.`, // 950 chars, ~150 words
`As {childname} sat thinking about the problem, {pronoun} remembered something {possessive} grandfather once said: "Every problem has a solution, beta. You just need to look at it from the right angle." {pronoun} closed {possessive} eyes and took a deep breath. The air smelled of wet earth and blooming flowers. A gentle breeze carried the sound of the forest — the rustling leaves, the distant call of a cuckoo, the soft murmur of the pond's water. {childname} let {possessive} mind wander, connecting dots that seemed unrelated at first. And then, like a ray of sunlight breaking through clouds, the idea came. It was simple, elegant, and beautiful in its simplicity. {pronoun} smiled, feeling the excitement of discovery. This was how solutions always came — not through force or frustration, but through calm, patient thinking. {pronoun} stood up, brushed the grass off {possessive} clothes, and got ready to put the plan into action. The animals watched with curiosity, sensing that something wonderful was about to happen.`, // 1040 chars, ~165 words
`The success of {childname}'s plan brought joy not just to the animals, but to the entire village. Word spread about how a young child had solved a problem that had troubled the pond creatures for weeks. People came from neighboring villages to hear the story. The village elders nodded with approval, saying that {childname} would grow up to be a great leader someday. But for {childname}, the real reward was not the praise or the attention. It was the sight of the crane dancing happily by the pond, the fish swimming freely and joyfully, and the harmony that had been restored to the little ecosystem. {pronoun} learned that day that true leadership is not about telling others what to do, but about bringing out the best in everyone. Every creature, big or small, has something valuable to contribute. And sometimes, the smallest voice can make the biggest difference when it speaks with wisdom and kindness. {childname} returned home that evening with a heart full of gratitude and a mind buzzing with ideas for more adventures.`, // 1077 chars, ~170 words
  ],
  Birbal_EN: [
`The Mughal Empire was at the height of its glory under Emperor Akbar's rule. The capital city of Agra bustled with activity — merchants from distant lands displayed silks and spices, scholars debated philosophy in the universities, and artists created masterpieces that would be admired for centuries. The royal palace was a magnificent structure of red sandstone and white marble, with intricate carvings that told stories of valor and wisdom. In the heart of this palace lay the Diwan-e-Khas, the Hall of Private Audience, where the emperor held court. It was here that the most important matters of the kingdom were discussed, and it was here that Birbal, the wisest of the Navaratnas or Nine Jewels of Akbar's court, dazzled everyone with his intellect. {childname} had heard stories about Birbal's cleverness from {possessive} grandfather, who had once traveled to Agra and seen the great courtier in person. Those stories had sparked a fire of curiosity in {childname}'s heart.`,
`The courtiers of Akbar's court were a diverse lot. There were brave generals who had won many battles, learned scholars who could recite entire scriptures from memory, poets whose verses could move people to tears, and artists whose paintings seemed to breathe. Each of them was accomplished in their own field, and each of them secretly wished to impress the emperor more than the others. But Birbal stood apart from all of them. He did not rely on his military strength or his scholarly knowledge alone. His greatest weapon was his wit — sharp, quick, and always used for the greater good. The other courtiers often felt jealous of Birbal's closeness to the emperor, so they would try to trap him with difficult questions or impossible tasks. But Birbal always emerged victorious, turning their traps into opportunities to teach valuable lessons. {childname} watched all of this with wide-eyed wonder, realizing that true intelligence is not just about knowing things, but about knowing how to use what you know at the right moment.`,
`Emperor Akbar was not just a powerful ruler; he was also a seeker of truth and justice. He loved discussing philosophy, religion, and the mysteries of life with the wise men in his court. He believed that a good king must constantly learn and grow, just like his subjects. This humility, rare among rulers of his time, was what made him truly great. He often said, "A kingdom is only as strong as the wisdom of its rulers." And that was why he valued Birbal's counsel above all others. When a problem arose, the emperor did not immediately impose his will. Instead, he would listen to different perspectives, weigh the evidence, and then make a decision that was fair and thoughtful. {childname} observed how the emperor treated even the humblest petitioner with respect, and {pronoun} learned that true greatness lies not in how many people serve you, but in how many you serve with compassion and fairness.`,
`The solution that Birbal proposed was not just clever; it was deeply rooted in an understanding of human nature. He knew that the threat of exposure often works better than direct confrontation. By creating a situation where the guilty person would reveal themselves through their own actions, he ensured that justice was served without violence or false accusations. This approach reflected a profound truth about human behavior — that people's own fears and desires often betray them more effectively than any external investigation could. {childname} {possessive} mind began to understand that wisdom is not about having all the answers, but about asking the right questions. Birbal had not accused anyone; he had simply created a mirror in which the truth reflected itself. This was the highest form of justice — one that allowed people to confront their own mistakes and choose to make things right.`,
`The celebration in the court after the truth was revealed was joyous but dignified. The emperor ordered sweets to be distributed among the palace staff, and the courtiers praised Birbal's wisdom. But Birbal, ever humble, deflected the praise. "Your Majesty," he said, "the credit belongs to {childname}, who understood the lesson so quickly." The emperor called {childname} forward and placed a gentle hand on {possessive} head. "You have a sharp mind, young one," he said. "If you continue to seek wisdom and truth, you will achieve great things in life." {childname} felt a warm glow of pride and gratitude. {pronoun} had learned that wisdom was not something to be hoarded but to be shared. The greatest gift one person can give another is not gold or jewels, but the light of understanding. As {pronoun} left the court that day, {pronoun} carried that light in {possessive} heart, determined to use it to illuminate the path for others, just as Birbal had done for {pronoun}.`,

    `{childname} spent the next few days exploring the palace and the city, marveling at the wonders of Agra. {pronoun} visited the bustling markets where merchants sold silks from Bengal, spices from Kerala, and horses from Arabia. {pronoun} watched artisans create beautiful carpets and jewelers craft intricate ornaments. Everywhere {pronoun} went, {pronoun} saw the diversity and richness of the empire. But what impressed {pronoun} most was the fairness with which people were treated. A poor farmer could get justice against a wealthy merchant if {possessive} cause was just. A child could speak in the court of the great emperor if {pronoun} had something wise to say. This was the true greatness of Akbar's rule — not the size of the empire or the wealth of the treasury, but the justice and wisdom with which it was governed. {childname} felt proud to be part of such a kingdom, and {pronoun} resolved to always uphold the values of truth and fairness that {pronoun} had witnessed.`,
    `Before leaving Agra, {childname} had one last conversation with Birbal. They sat in the palace gardens, watching the sunset paint the sky in shades of orange and pink. "Birbal ji," {childname} asked, "what is the most important lesson you have learned in all your years at the court?" Birbal thought for a long moment. "The most important lesson," he said finally, "is that wisdom without kindness is like a sword without a handle — sharp, but dangerous to the one who wields it. Everything I know, I use to help people, not to hurt them. That is the difference between cleverness and true wisdom." {childname} nodded slowly, understanding that this was the key to everything. Knowledge could be used to build up or to tear down. The choice belonged to each person. And the wisest choice was always to use knowledge in service of others.`,
    `{childname}'s journey home was long, but {pronoun} did not mind. {pronoun} had so much to think about. The stories of Birbal's wisdom played over and over in {possessive} mind, each one revealing new layers of meaning. {pronoun} realized that the problems Birbal solved were not just puzzles to be cracked; they were opportunities to teach deeper truths about human nature, justice, and compassion. When Birbal exposed a thief, he was not just catching a criminal; he was giving that person a chance to confess and change. When Birbal answered a riddle, he was not just showing off his intelligence; he was demonstrating that thinking differently can reveal solutions that others miss. {childname} arrived home with a new determination to approach every challenge with the same blend of wisdom, kindness, and creativity that Birbal had shown. And {pronoun} knew that {pronoun} would carry these lessons for the rest of {possessive} life.`,
    `Years later, when {childname} became a leader in {possessive} own community, {pronoun} often recalled the lessons of Birbal. When disputes arose among the villagers, {pronoun} would listen carefully to all sides before making a judgment. When someone tried to cheat or deceive, {pronoun} would find clever ways to reveal the truth without harsh punishment. And when children asked {pronoun} for advice, {pronoun} would tell them stories of the wise Birbal and the great Emperor Akbar. "The world is full of problems," {childname} would say, "but it is also full of solutions. You just need to look at things from the right angle, ask the right questions, and never forget that kindness is the most important ingredient of wisdom." And the children would listen, their eyes wide with wonder, ready to carry these lessons into their own futures.`,
  ],
  "Tenali Raman_EN": [
`The Vijayanagara Empire was one of the most prosperous kingdoms in Indian history. Its capital city was a marvel of architecture and planning, with magnificent temples, bustling markets, and wide avenues lined with trees. The royal palace was surrounded by gardens that bloomed with exotic flowers brought from distant lands. In the court of King Krishnadevaraya, the atmosphere was one of intellectual curiosity and cultural richness. Poets recited verses in multiple languages, musicians played instruments from across the known world, and dancers performed stories from ancient epics. It was in this vibrant setting that Tenali Raman shone the brightest. Unlike the serious and formal courtiers, Raman brought laughter and lightness to the court. His stories, jokes, and clever observations made even the most complex problems seem simple. {childname} was captivated by Raman's charm and intelligence from the moment {pronoun} saw him.`,
`King Krishnadevaraya was a patron of arts and learning, and his court attracted scholars and artists from all over the world. But he was also a shrewd administrator who understood the importance of justice and good governance. He listened to his subjects' complaints personally every week, and he insisted that every case be decided fairly, regardless of the person's wealth or status. Tenali Raman was not just the king's favorite courtier because of his humor. He was also a wise counselor who could see through complex situations and find solutions that others missed. The other ministers respected him, even when they were the targets of his jokes, because they knew that his wit was always used in service of truth and justice. {childname} watched how Raman conducted himself — with humility despite his fame, with kindness even toward those who opposed him, and with unwavering commitment to doing what was right.`,
`The proud scholar who challenged the court was not the first to underestimate Tenali Raman. Many had come before him, armed with years of study and mountains of books, only to find that Raman's simple wisdom could defeat their complex arguments. Raman's secret was not that he knew more than others; it was that he understood the essence of things. While others got lost in details and technicalities, Raman focused on the core truth of every matter. He had learned, through years of observing life and people, that the most profound truths are often the simplest. A child's question could sometimes penetrate deeper than a scholar's thesis. A farmer's wisdom could sometimes be more valuable than a philosopher's theories. This insight was what made Raman truly exceptional, and it was this lesson that he wanted {childname} to learn.`,
`After the scholar had left, humbled and thoughtful, the atmosphere in the court lightened considerably. The king ordered the musicians to play and the dancers to perform. But Tenali Raman quietly slipped away from the celebration, and {childname} followed him. They walked through the palace gardens, where the evening breeze carried the scent of jasmine and the sound of crickets. "Raman ji," {childname} asked, "how did you become so wise?" Raman laughed softly. "I was not always wise, little one. I made many mistakes. I trusted the wrong people. I said things I should not have said. But each mistake taught me something valuable. Wisdom is not born; it is earned through experience, observation, and the willingness to learn from everyone — even those we think have nothing to teach us." {childname} listened carefully, understanding that wisdom is a journey, not a destination. Every person {pronoun} met, every challenge {pronoun} faced, was an opportunity to grow a little wiser.`,
`As the stars began to appear in the sky, Raman and {childname} sat on a stone bench near a lotus pond. The moon reflected off the water, creating a silver pathway across the surface. "Look at the moon," said Raman. "It does not try to outshine the stars. It simply shines, and the stars shine alongside it. That is how wisdom works. You do not need to prove you are smarter than others. You just need to let your light shine, and others will see it naturally." {childname} nodded, understanding. {pronoun} realized that the goal of learning was not to show off or to defeat others in arguments. The goal was to become a better person — kinder, more understanding, more helpful. And that was the true measure of wisdom. {pronoun} thanked Raman and walked back to {possessive} parents, feeling that this encounter had changed {possessive} life forever. The stories of Tenali Raman would always remind {pronoun} that the cleverest answers are often the simplest, and the wisest people are often those who make us laugh.`,

    `The next morning, {childname} woke up early and went to the palace gardens again. The morning dew glistened on the petals of the flowers, and the air was fresh and cool. {pronoun} sat by the lotus pond, watching the fish swim lazily beneath the surface. A palace guard saw {pronoun} and smiled. "You are the child who impressed Raman yesterday, aren't you?" {childname} nodded shyly. The guard sat down beside {pronoun}. "Raman is not just a jester, you know. He is the wisest person in the kingdom. The king relies on him for advice on matters great and small. And Raman never fails him." {childname} felt a warm feeling of admiration. {pronoun} wanted to be like Raman — not just clever, but wise; not just funny, but kind; not just famous, but truly helpful. {pronoun} decided to spend the rest of the visit observing Raman closely, learning from everything he did and said.`,
    `Later that day, {childname} witnessed another example of Raman's wisdom. A merchant came to the court complaining that his neighbor's rooster crowed too loudly and disturbed his sleep. The neighbor argued that the rooster was just doing what roosters do. The king was amused but also perplexed. How could such a trivial matter be resolved without angering either party? Raman stepped forward. "The solution is simple," he said. "The merchant should buy a second rooster." Everyone was confused. Raman explained, "When there are two roosters, they will compete with each other in crowing. But they will start crowing earlier and earlier until they both become exhausted. Then they will sleep later, and the merchant will not be disturbed." The court burst into laughter at the cleverness of the solution. The merchant agreed to try it, and the neighbor agreed to help build a second coop. {childname} marveled at how Raman could turn even a dispute about a rooster into a lesson about cooperation and creative thinking.`,
    `On {childname}'s last day in Vijayanagara, Raman called {pronoun} aside. "You have a gift, young one," he said. "You observe carefully, you think deeply, and you care about others. Do not lose these qualities as you grow older. The world will try to make you serious and busy. It will tell you that laughter is a waste of time and that cleverness is not as important as hard work. But remember this — the heaviest problems become light when you approach them with humor. The most difficult people become manageable when you understand what makes them laugh. And the darkest situations become bearable when you can find the light of a joke hidden within them." {childname} hugged Raman goodbye, feeling grateful for the wisdom {pronoun} had received. As {pronoun} traveled home, {pronoun} thought about everything {pronoun} had learned and felt ready to face any challenge with a smile.`,
    `Back in {possessive} village, {childname} became known as a problem-solver and a peacemaker. When neighbors quarreled, {pronoun} would find a clever compromise that made both sides happy. When children fought, {pronoun} would tell a funny story that made them forget their anger and laugh together. And when someone was sad, {pronoun} would sit with them and tell them the tale of Tenali Raman — how he used laughter to heal the king's heart, and how he used wisdom to solve the most impossible problems. The villagers often said that {childname} had inherited Raman's gift for turning ordinary moments into extraordinary lessons. And {childname} would smile and say, "We all have that gift. We just need to remember to use it." {pronoun} kept a small carving of Tenali Raman on {possessive} desk, a reminder that the cleverest answers are often the simplest, and the wisest people are often those who make us laugh.`,
  ],
  Festival_EN: [
`The festival season was {childname}'s favorite time of the year. It was not just about the holidays from school or the delicious sweets that {possessive} mother prepared. It was about the magic that filled the air — the excitement, the togetherness, and the feeling that anything was possible. Each festival brought its own unique traditions, stories, and rituals. Diwali meant lamps and fireworks. Holi meant colors and laughter. Dussehra meant the triumph of good over evil. Pongal meant gratitude for nature's bounty. And Raksha Bandhan meant the beautiful bond between siblings. {childname}'s family celebrated all these festivals with great enthusiasm, and each celebration left {pronoun} with memories that would last a lifetime. {pronoun} loved helping {possessive} mother decorate the house, watching {possessive} father prepare special dishes, and listening to {possessive} grandparents tell stories about how they celebrated festivals when they were young.`,
`The preparations for the festival would begin weeks in advance. {childname}'s mother would make a list of everything that needed to be done — cleaning the house, buying new clothes, preparing sweets, decorating the entrance with rangoli, and visiting the market for supplies. {childname} would help with all of these tasks, learning the traditions that had been passed down through generations. {possessive} grandmother would explain the significance of each ritual. "When we light a lamp, beta," she would say, "we are not just lighting oil and wick. We are lighting hope. We are remembering that even in the darkest times, a small flame of goodness can light up everything." These words stayed with {childname}, adding depth to the celebrations. The festivals were not just about fun and food; they were about connecting with {possessive} heritage, understanding {possessive} culture, and strengthening the bonds of family and community.`,
`The community came together during festivals in beautiful ways. Neighbors would visit each other's homes, exchanging sweets and gifts. Children would play together in the streets, their laughter echoing through the neighborhood. The elderly would sit on their porches, watching the festivities with warm smiles, remembering their own childhoods. There was a sense of unity that transcended differences of age, status, and background. During Diwali, every home was lit up, creating a sea of lights that made the whole town look like a sky full of stars brought down to earth. During Holi, everyone was covered in the same colors — rich and poor, young and old, all distinctions washed away by the vibrant powders. {childname} felt, during these moments, that the world was a beautiful place, full of love and kindness. And {pronoun} wished that this spirit of togetherness could last all year, not just during the festival season.`,
`But not everyone was fortunate enough to celebrate festivals with joy. {childname} noticed that some children in {possessive} neighborhood did not have new clothes for Diwali or colors for Holi. Their families struggled to make ends meet, and festivals brought them stress rather than joy. This realization troubled {childname}. {pronoun} went to {possessive} mother and said, "Maa, how can we enjoy our festival when others are sad?" {possessive} mother smiled and hugged {pronoun} tightly. "That is a very important question, beta. And the answer is simple — we cannot truly enjoy our happiness unless we share it with others." That conversation sparked a tradition in {childname}'s family. Every festival, they would set aside a portion of their celebration for those in need. New clothes, sweets, and small gifts would be distributed among the less fortunate families in the neighborhood. This act of sharing transformed the festival experience for {childname}, making it more meaningful and fulfilling than any gift or firework ever could.`,
`As {childname} grew older, the lessons of the festivals stayed with {pronoun}. They shaped {possessive} character and influenced {possessive} choices. {pronoun} learned that festivals are not just dates on a calendar; they are opportunities to pause, reflect, and reconnect with what truly matters. They remind us to be grateful for what we have, to be generous to those who have less, and to celebrate the bonds that make life rich and meaningful. The lights of Diwali taught {pronoun} that hope never dies. The colors of Holi taught {pronoun} that joy is meant to be shared. The victory of Dussehra taught {pronoun} that goodness always prevails. The gratitude of Pongal taught {pronoun} to appreciate nature's gifts. And the rakhi of Raksha Bandhan taught {pronoun} the value of love and protection. {childname} carried these lessons into adulthood, becoming a person who brought light, color, and joy to everyone {pronoun} met.`,

    `One Diwali, {childname} decided to organize a community celebration that would include everyone, regardless of their economic status. {pronoun} went from door to door, asking neighbors to contribute whatever they could — some gave sweets, some gave old clothes that could be mended and given to those in need, some gave their time to help with decorations. The response was overwhelming. Even the poorest families contributed something, because they wanted to be part of the celebration. On the night of Diwali, the entire village gathered in the community square. There were lamps everywhere, creating a warm and magical glow. People shared food, told stories, and danced together. {childname} looked around at the smiling faces and felt a joy deeper than any {pronoun} had ever experienced. This was the true meaning of Diwali — not the size of your house or the number of firecrackers you could afford, but the light of togetherness that shone in everyone's heart.`,
    `During Holi, {childname} started a tradition of "color forgiveness." Before the celebrations began, everyone was encouraged to apologize for any misunderstandings or conflicts they had had during the year. Then, when they applied colors to each other's faces, the colors symbolized not just joy, but also the washing away of old grievances. At first, some people were reluctant. But when they saw how freeing it was to forgive and be forgiven, they embraced the tradition wholeheartedly. The village became known for its harmonious spirit, and people from neighboring villages came to participate in the Holi celebrations. {childname} had discovered that festivals could be more than just annual events; they could be powerful tools for healing and strengthening community bonds.`,
    `For Dussehra, {childname} organized a special program where children performed scenes from the Ramayana. {pronoun} worked with the village school to prepare costumes and rehearse dialogues. The children who played Rama, Sita, Lakshmana, Hanuman, and Ravana took their roles very seriously. On the night of the performance, the entire village gathered to watch. When Ravana's effigy was burned, the children cheered. But {childname} gathered them afterward and said, "Remember, the real Ravana is not outside us. The real Ravana is inside — our anger, our greed, our jealousy. Every time we overcome one of these qualities, we are celebrating our own personal Dussehra." The children nodded thoughtfully, understanding that the festival was not just about a story from the past, but about their own journey toward becoming better human beings.`,
    `{childname}'s love for festivals and their deeper meanings became {possessive} lifelong passion. As an adult, {pronoun} wrote a book about the festivals of India, explaining their stories, rituals, and significance in a way that children could understand. The book became popular in schools across the country. Teachers used it to help children appreciate the richness of Indian culture and the timeless wisdom embedded in festival traditions. {childname} often visited schools to talk to children about festivals. "Celebrate with your whole heart," {pronoun} would tell them. "But never forget that the real celebration is in the love you share, the kindness you show, and the gratitude you feel. The lamps, colors, sweets, and fireworks are just decorations. The true festival is in your heart."`,
  ],
  // ===== HINDI EXPANSIONS =====
  Panchatantra_HI: [
`{childname} का गाँव हरी-भरी पहाड़ियों और घने जंगल के बीच बसा था। हर सुबह {childname} पक्षियों की चहचहाहट और पत्तों की सरसराहट से जागता था। उसकी दादी का घर गाँव के किनारे पर था, जहाँ गेंदा, चमेली और तुलसी के पौधों से भरा एक सुंदर बगीचा था। घर के पीछे का तालाब {childname} की सबसे पसंदीदा जगह थी। वह बहुत बड़ा नहीं था, लेकिन उसमें कई जीव रहते थे — रंगीन मछलियाँ जो धूप में चमकती थीं, मेंढक जो बारिश में एक साथ टर्र-टर्र करते थे, और सुंदर पक्षी जो पानी पीने आते थे। {childname} तालाब के पास घंटों बैठा रहता, ड्रैगनफ्लाइज़ को पानी पर नाचते देखता और हवा के झोंकों में छिपी कहानियाँ सुनता।`,
`{childname} हमेशा से एक जिज्ञासु और दयालु बच्चा था। उसके माता-पिता अक्सर कहते थे कि उसका दिल आसमान जितना बड़ा है और उसका दिमाग सवालों से भरा है। जब भी गाँव में किसी को मुश्किल होती, {childname} सबसे पहले मदद के लिए आगे आता। वह बुज़ुर्गों के लिए पानी लाता, उन बच्चों के साथ अपना खाना बाँटता जिनके पास नहीं होता, और घायल पक्षियों की देखभाल करता। गाँव के जानवर {childname} पर पूरा भरोसा करते थे। आवारा कुत्ते उसे देखकर पूछ हिलाते थे, और गायें उसे बुलाने के लिए धीरे-धीरे रँभाती थीं। जानवरों और प्रकृति के साथ यह विशेष संबंध ही {childname} को दूसरे बच्चों से अलग बनाता था।`,
`वह जंगल जो गाँव की सीमा पर था, प्राचीन और रहस्यमयी था। गाँव वाले बताते थे कि उस जंगल की गहराई में जादुई प्राणी रहते हैं — बात करने वाले जानवर, बुद्धिमान पेड़ जो मौसम की भविष्यवाणी कर सकते हैं, और एक छिपा हुआ झरना जिसका पानी चाँदनी में हीरे जैसा चमकता है। लेकिन जंगल उन लोगों के लिए खतरनाक भी था जो उसका सम्मान नहीं करते थे। वहाँ कँटीली झाड़ियाँ थीं जो कपड़े फाड़ सकती थीं, गहरी खाइयाँ थीं जो दिखती नहीं थीं, और बारिश के मौसम में नाले खतरनाक नदियों में बदल जाते थे। {childname} जंगल को अच्छी तरह जानता था, उसने अपने दादा के साथ कई बार इसके किनारों का पता लगाया था।`,
`समस्या का समाधान ढूंढते हुए {childname} को अपने दादा की एक बात याद आई: "हर समस्या का एक समाधान होता है, बेटा। बस तुम्हें सही नज़रिए से देखना होगा।" उसने अपनी आँखें बंद की और गहरी साँस ली। हवा में गीली मिट्टी और खिलते फूलों की खुशबू थी। एक हल्की हवा जंगल की आवाज़ें लेकर आई — पत्तों की सरसराहट, कोयल की दूर की पुकार, तालाब के पानी की कोमल बड़बड़ाहट। {childname} ने अपने मन को भटकने दिया, उन चीज़ों को जोड़ते हुए जो पहले असंबंधित लगती थीं। और फिर, बादलों के बीच से निकलती सूरज की किरण की तरह, विचार आया। यह सरल, सुंदर और अपनी सरलता में अद्भुत था।`,
`{childname} की योजना की सफलता से न सिर्फ जानवरों को, बल्कि पूरे गाँव को खुशी मिली। यह खबर फैल गई कि एक छोटे बच्चे ने उस समस्या को हल कर दिया था जिसने हफ्तों से तालाब के प्राणियों को परेशान किया था। पड़ोसी गाँवों से लोग यह कहानी सुनने आए। गाँव के बुज़ुर्गों ने सिर हिलाकर कहा कि {childname} बड़ा होकर एक महान नेता बनेगा। लेकिन {childname} के लिए, असली इनाम प्रशंसा या ध्यान नहीं था। यह तालाब के पास खुशी से नाचते सारस को देखना, मछलियों को स्वतंत्र और आनंद से तैरते देखना, और छोटे पारिस्थितिकी तंत्र में बहाल हुए सामंजस्य को देखना था।`,
  ],
  Birbal_HI: [
`मुगल साम्राज्य अपनी शान की ऊँचाई पर था। आगरा शहर गतिविधियों से भरा हुआ था — दूर देशों के व्यापारी रेशम और मसाले बेचते थे, विद्वान विश्वविद्यालयों में दर्शन पर बहस करते थे, और कलाकार ऐसी कृतियाँ बनाते थे जो सदियों तक सराही जाएँगी। शाही महल लाल बलुआ पत्थर और सफेद संगमरमर से बनी एक भव्य संरचना थी। इस महल के दिल में दीवान-ए-खास था, जहाँ बादशाह दरबार लगाते थे। यहीं पर साम्राज्य के सबसे महत्वपूर्ण मामलों पर चर्चा होती थी, और यहीं पर बीरबल, अकबर के नवरत्नों में सबसे बुद्धिमान, अपनी बुद्धि से सभी को चकित करते थे। {childname} ने अपने दादा से बीरबल की चतुराई की कहानियाँ सुनी थीं, जो एक बार आगरा गए थे और उन्हें व्यक्तिगत रूप से देखा था।`,
`अकबर के दरबारी विविध प्रकार के थे। बहादुर सेनापति थे जिन्होंने कई लड़ाइयाँ जीती थीं, विद्वान पंडित थे जो पूरे शास्त्र कंठस्थ कर सकते थे, कवि थे जिनकी कविताएँ लोगों को रुला सकती थीं, और कलाकार थे जिनकी पेंटिंग्स जीवित लगती थीं। उनमें से प्रत्येक अपने क्षेत्र में निपुण था, और प्रत्येक गुप्त रूप से बादशाह को सबसे अधिक प्रभावित करना चाहता था। लेकिन बीरबल उन सबसे अलग थे। वह केवल अपनी सैन्य शक्ति या विद्वता पर निर्भर नहीं थे। उनका सबसे बड़ा हथियार उनकी बुद्धि थी — तेज, तीक्ष्ण, और हमेशा भलाई के लिए इस्तेमाल होने वाली। दूसरे दरबारी अक्सर बीरबल की बादशाह से निकटता से ईर्ष्या करते थे, इसलिए वे मुश्किल सवालों या असंभव कार्यों से उन्हें फँसाने की कोशिश करते थे।`,
`बादशाह अकबर केवल एक शक्तिशाली शासक नहीं थे; वे सत्य और न्याय के साधक भी थे। वे अपने दरबार के विद्वानों के साथ दर्शन, धर्म और जीवन के रहस्यों पर चर्चा करना पसंद करते थे। उनका मानना था कि एक अच्छे राजा को लगातार सीखते और बढ़ते रहना चाहिए, ठीक अपनी प्रजा की तरह। यह विनम्रता, जो उस समय के शासकों में दुर्लभ थी, उन्हें वास्तव में महान बनाती थी। वे अक्सर कहते थे, "एक राज्य केवल उतना ही मजबूत है जितना उसके शासकों का ज्ञान।" और यही कारण था कि वे बीरबल की सलाह को सबसे अधिक महत्व देते थे। जब कोई समस्या आती, तो बादशाह तुरंत अपनी इच्छा नहीं थोपते थे। इसके बजाय, वे अलग-अलग दृष्टिकोण सुनते थे, सबूतों को तौलते थे, और फिर एक निष्पक्ष और विचारशील निर्णय लेते थे।`,
`बीरबल का समाधान न केवल चतुर था; यह मानव स्वभाव की गहरी समझ में निहित था। वे जानते थे कि प्रत्यक्ष आरोप लगाने की तुलना में खुलासे का खतरा अक्सर बेहतर काम करता है। एक ऐसी स्थिति बनाकर जहाँ दोषी व्यक्ति अपने कार्यों से खुद को प्रकट करेगा, उन्होंने सुनिश्चित किया कि हिंसा या झूठे आरोपों के बिना न्याय हो। यह दृष्टिकोण मानव व्यवहार के बारे में एक गहरी सच्चाई को दर्शाता था — कि लोगों के अपने डर और इच्छाएँ अक्सर उन्हें किसी भी बाहरी जाँच से अधिक प्रभावी ढंग से धोखा देती हैं। {childname} समझ गया कि ज्ञान का मतलब सभी उत्तर जानना नहीं है, बल्कि सही सवाल पूछना है।`,
`सच्चाई का पता चलने के बाद दरबार में जश्न था। बादशाह ने महल के कर्मचारियों में मिठाइयाँ बाँटने का आदेश दिया, और दरबारियों ने बीरबल की बुद्धि की प्रशंसा की। लेकिन बीरबल, हमेशा विनम्र, ने प्रशंसा को टाल दिया। "बादशाह सलामत," उन्होंने कहा, "श्रेय {childname} को जाता है, जिसने इतनी जल्दी सीख लिया।" बादशाह ने {childname} को आगे बुलाया और उसके सिर पर हाथ रखा। "तुम्हारा दिमाग तेज है, बच्चे," उन्होंने कहा। "यदि तुम ज्ञान और सत्य की खोज जारी रखोगे, तो जीवन में बड़ी उपलब्धियाँ प्राप्त करोगे।" {childname} को गर्व और कृतज्ञता की गर्माहट महसूस हुई। उसने सीखा था कि ज्ञान को जमा करके नहीं रखना चाहिए, बल्कि बाँटना चाहिए।`,
  ],
  "Tenali Raman_HI": [
`विजयनगर साम्राज्य भारतीय इतिहास के सबसे समृद्ध राज्यों में से एक था। इसकी राजधानी वास्तुकला और योजना का एक अद्भुत नमूना थी, जहाँ भव्य मंदिर, हलचल भरे बाज़ार और पेड़ों से सजी चौड़ी सड़कें थीं। शाही महल चारों ओर से बगीचों से घिरा था जहाँ दूर देशों से लाए गए विदेशी फूल खिलते थे। राजा कृष्णदेवराय के दरबार में बौद्धिक जिज्ञासा और सांस्कृतिक समृद्धि का माहौल था। कवि कई भाषाओं में कविताएँ सुनाते थे, संगीतकार दुनिया भर के वाद्ययंत्र बजाते थे, और नर्तक प्राचीन महाकाव्यों की कहानियाँ प्रस्तुत करते थे। इस जीवंत माहौल में तेनाली रामन सबसे चमकीले सितारे थे। गंभीर और औपचारिक दरबारियों के विपरीत, रामन दरबार में हँसी और हल्कापन लाते थे।`,
`राजा कृष्णदेवराय कला और शिक्षा के संरक्षक थे, और उनके दरबार ने दुनिया भर से विद्वानों और कलाकारों को आकर्षित किया। लेकिन वे एक चतुर प्रशासक भी थे जो न्याय और सुशासन के महत्व को समझते थे। वे हर हफ्ते व्यक्तिगत रूप से अपनी प्रजा की शिकायतें सुनते थे, और वे इस बात पर जोर देते थे कि हर मामले का निष्पक्ष निर्णय हो, चाहे व्यक्ति की संपत्ति या स्थिति कुछ भी हो। तेनाली रामन केवल अपने हास्य के कारण राजा के पसंदीदा दरबारी नहीं थे। वे एक बुद्धिमान सलाहकार भी थे जो जटिल स्थितियों को देख सकते थे और ऐसे समाधान खोज सकते थे जो दूसरों से छूट जाते थे।`,
`वह घमंडी विद्वान जिसने दरबार को चुनौती दी थी, पहला व्यक्ति नहीं था जिसने तेनाली रामन को कम आंका था। उससे पहले भी कई आए थे, वर्षों के अध्ययन और किताबों के पहाड़ों से लैस, केवल यह पाने के लिए कि रामन की सरल बुद्धि उनके जटिल तर्कों को हरा सकती है। रामन का रहस्य यह नहीं था कि वह दूसरों से अधिक जानते थे; यह था कि वह चीज़ों के सार को समझते थे। जबकि अन्य विवरणों और तकनीकी बातों में खो जाते थे, रामन हर मामले की मुख्य सच्चाई पर ध्यान केंद्रित करते थे। उन्होंने जीवन और लोगों को देखने के वर्षों में सीखा था कि सबसे गहरी सच्चाइयाँ अक्सर सबसे सरल होती हैं।`,
`विद्वान के जाने के बाद, दरबार का माहौल काफी हल्का हो गया। राजा ने संगीतकारों को बजाने और नर्तकियों को प्रदर्शन करने का आदेश दिया। लेकिन तेनाली रामन चुपके से उत्सव से निकल गए, और {childname} उनके पीछे हो लिया। वे महल के बगीचों में टहलने लगे, जहाँ शाम की हवा चमेली की खुशबू और झींगुरों की आवाज़ लेकर आ रही थी। "रामन जी," {childname} ने पूछा, "आप इतने बुद्धिमान कैसे बने?" रामन हल्के से हँसे। "मैं हमेशा से बुद्धिमान नहीं था, बच्चे। मैंने कई गलतियाँ कीं। मैंने गलत लोगों पर भरोसा किया। मैंने ऐसी बातें कहीं जो मुझे नहीं कहनी चाहिए थीं। लेकिन हर गलती ने मुझे कुछ मूल्यवान सिखाया।"`,
`जैसे-जैसे आसमान में तारे दिखने लगे, रामन और {childname} कमल के तालाब के पास एक पत्थर की बेंच पर बैठ गए। चाँद पानी में परावर्तित हो रहा था, जिससे सतह पर एक चाँदी का रास्ता बन रहा था। "चाँद को देखो," रामन ने कहा। "वह तारों को मात देने की कोशिश नहीं करता। वह बस चमकता है, और तारे उसके साथ चमकते हैं। इसी तरह ज्ञान काम करता है। तुम्हें दूसरों से ज्यादा चालाक साबित करने की ज़रूरत नहीं है। बस अपनी रोशनी को चमकने दो, और दूसरे इसे स्वाभाविक रूप से देखेंगे।" {childname} ने सिर हिलाया, समझ गया। उसने महसूस किया कि सीखने का लक्ष्य दिखावा करना या दूसरों को बहस में हराना नहीं है। लक्ष्य एक बेहतर इंसान बनना है — दयालु, अधिक समझदार, अधिक मददगार।`,
  ],
  Festival_HI: [
`त्योहारों का मौसम {childname} का सबसे पसंदीदा समय था। यह सिर्फ स्कूल की छुट्टियों या माँ द्वारा बनाए गए स्वादिष्ट मिठाइयों के बारे में नहीं था। यह उस जादू के बारे में था जो हवा में भर जाता था — उत्साह, एकजुटता, और यह एहसास कि कुछ भी संभव है। हर त्योहार अपनी अनूठी परंपराएँ, कहानियाँ और रीति-रिवाज लाता था। दिवाली का मतलब दीये और आतिशबाजी। होली का मतलब रंग और हँसी। दशहरे का मतलब बुराई पर अच्छाई की जीत। {childname} का परिवार इन सभी त्योहारों को बड़े उत्साह से मनाता था, और हर उत्सव उसे ऐसी यादें देता था जो जीवन भर रहेंगी। वह घर को सजाने में अपनी माँ की मदद करना, पिता को विशेष व्यंजन बनाते देखना, और दादा-दादी को यह कहानियाँ सुनना पसंद करता था कि वे अपने समय में त्योहार कैसे मनाते थे।`,
`त्योहार की तैयारियाँ हफ्तों पहले शुरू हो जाती थीं। {childname} की माँ हर चीज़ की एक सूची बनाती थीं — घर की सफाई, नए कपड़े खरीदना, मिठाइयाँ बनाना, प्रवेश द्वार को रंगोली से सजाना, और बाज़ार से आपूर्ति लाना। {childname} इन सभी कामों में मदद करता, उन परंपराओं को सीखता जो पीढ़ियों से चली आ रही थीं। उसकी दादी हर रीति का महत्व समझाती थीं। "जब हम दीया जलाते हैं, बेटा," वह कहती थीं, "हम सिर्फ तेल और बाती नहीं जला रहे हैं। हम उम्मीद जला रहे हैं। हम याद कर रहे हैं कि अंधेरे समय में भी, अच्छाई की एक छोटी लौ सब कुछ रोशन कर सकती है।"`,
`समुदाय त्योहारों के दौरान खूबसूरत तरीकों से एक साथ आता था। पड़ोसी एक-दूसरे के घर जाते, मिठाइयाँ और उपहार बाँटते। बच्चे सड़कों पर एक साथ खेलते, उनकी हँसी पूरे मोहल्ले में गूँजती। बुज़ुर्ग अपने बरामदे में बैठकर त्योहारों को गर्म मुस्कान के साथ देखते, अपने बचपन को याद करते। एकता की भावना उम्र, स्थिति और पृष्ठभूमि के भेदभाव को पार कर जाती थी। दिवाली के दौरान, हर घर रोशन होता था, जिससे पूरा शहर तारों से भरे आसमान जैसा दिखता था। होली के दौरान, हर कोई एक ही रंगों में रँगा होता था — अमीर और गरीब, जवान और बूढ़े, सभी भेद चमकीले पाउडर में घुल जाते थे।`,
`लेकिन हर कोई त्योहारों को खुशी से मनाने के लिए पर्याप्त भाग्यशाली नहीं था। {childname} ने देखा कि उसके पड़ोस के कुछ बच्चों के पास दिवाली के लिए नए कपड़े या होली के लिए रंग नहीं थे। उनके परिवार गुज़ारा करने के लिए संघर्ष करते थे, और त्योहार उनके लिए खुशी के बजाय तनाव लाते थे। इस अहसास ने {childname} को परेशान किया। वह अपनी माँ के पास गया और बोला, "माँ, जब दूसरे उदास हैं तो हम अपने त्योहार का आनंद कैसे ले सकते हैं?" माँ ने मुस्कुराकर उसे कसकर गले लगाया। "यह बहुत महत्वपूर्ण सवाल है, बेटा। और इसका जवाब सरल है — हम अपनी खुशी का सही मायने में आनंद नहीं ले सकते जब तक हम इसे दूसरों के साथ साझा नहीं करते।"`,
`जैसे-जैसे {childname} बड़ा हुआ, त्योहारों के सबक उसके साथ रहे। उन्होंने उसके चरित्र को आकार दिया और उसके विकल्पों को प्रभावित किया। उसने सीखा कि त्योहार सिर्फ कैलेंडर की तारीखें नहीं हैं; वे रुकने, प्रतिबिंबित करने और वास्तव में मायने रखने वाली चीज़ों से फिर से जुड़ने के अवसर हैं। वे हमें याद दिलाते हैं कि हमारे पास जो है उसके लिए आभारी रहें, जिनके पास कम है उनके प्रति उदार रहें, और उन बंधनों का जश्न मनाएँ जो जीवन को समृद्ध और सार्थक बनाते हैं। दिवाली की रोशनी ने उसे सिखाया कि उम्मीद कभी नहीं मरती। होली के रंगों ने उसे सिखाया कि खुशी बाँटने के लिए होती है। दशहरे की जीत ने उसे सिखाया कि अच्छाई हमेशा जीतती है।`,
  ],
  // Final English blocks (extra length for 2000-4000 word target)
  Panchatantra_EN_final: [
`There was a particular rainy season that {childname} never forgot. The rains came earlier than expected and were heavier than anyone could remember. The pond that was usually so calm and clear became muddy and turbulent. The fish were frightened, huddled together in the deepest part. The crane could not find food because the water was too murky to see anything. Even the old banyan tree lost a few branches to the strong winds. {childname} watched the storm from {possessive} window, worried about all the creatures of the pond. When the rains finally stopped, {childname} rushed to the pond. It was in a terrible state. The banks had eroded, the water was dirty, and some of the smaller creatures had been swept away. But instead of feeling hopeless, {childname} remembered what the crane had taught about patience. One step at a time, {pronoun} started cleaning the pond. {pronoun} removed the debris, fortified the banks with stones, and created small channels to keep the water flowing. The crane and the fish watched and helped in their own ways. Within a few weeks, the pond was more beautiful than ever before. The storm had been a test, and {childname} had passed it with flying colors.`,
`The village blacksmith was a gruff man named Dada Thakur. He was known for his temper and his strength, but also for his honesty. One day, his prized hammer went missing. He accused a young apprentice of stealing it. The apprentice cried and protested his innocence, but Dada Thakur would not listen. {childname} heard the commotion and came to see what was happening. Instead of taking sides, {pronoun} asked Dada Thakur, "When did you last use the hammer?" Thakur thought for a moment. "Yesterday evening, I was fixing the plow." {childname} went to the workshop and looked around carefully. {pronoun} noticed a loose floorboard near the workbench. Underneath it lay the hammer, which had fallen through a crack. Dada Thakur was ashamed. He apologized to the apprentice and thanked {childname}. "You have the eyes of a true detective," he said. {childname} smiled. "I just knew that accusing someone without proof is never right. The truth is always there; we just need to look in the right places."`,
  ],
  Birbal_EN_final: [
`{childname} once asked Birbal a question that had been troubling {pronoun} for a long time. "Birbal ji, why do some people who are very rich and powerful seem unhappy, while some people who have very little seem full of joy?" Birbal smiled at the depth of the question. "That is the mark of a true thinker," he said. "You have observed something that many adults miss." He took {childname} to a nearby village where a poor farmer lived in a small hut with his family. The farmer had almost nothing — a few clothes, simple food, and a tiny home. But he was singing as he worked in his field. His children were laughing and playing. Then Birbal took {childname} to the palace of a wealthy nobleman. The nobleman had everything — gold, silks, servants, and a magnificent mansion. But he sat alone in his grand hall, looking worried and unhappy. {childname} understood immediately. "The farmer has love and contentment," {pronoun} said. "The nobleman has wealth but no peace." Birbal nodded. "You have learned the greatest lesson of all. Happiness comes from within, not from what you possess."`,
`One evening, as the sun was setting over the palace, Birbal called {childname} to the rooftop. The view of Agra was breathtaking — the Yamuna river glittering in the golden light, the gardens blooming with flowers, and the distant forts standing guard. "Look at this beautiful city," said Birbal. "It was built by the hands of thousands of workers, each one contributing their skill and effort. No single person built it. This is how a kingdom works, and this is how life works. We are all connected. The farmer grows food for the emperor, the emperor protects the farmer. The merchant trades goods, the artist creates beauty, the teacher shares knowledge. Each person, no matter how small their role, is important." {childname} looked at the city with new eyes. {pronoun} saw not just buildings and streets, but the lives and stories of thousands of people woven together. "I understand," said {childname}. "Every person matters. And every person deserves respect." Birbal smiled, knowing that {childname} had truly understood the heart of wisdom.`,
  ],
  "Tenali Raman_EN_final": [
`One afternoon, Raman took {childname} to the market area of Vijayanagara. The market was a riot of colors, sounds, and smells. Merchants sold everything from fragrant spices to sparkling gems, from silks so fine they could pass through a ring to bronze statues of gods and goddesses. Street performers juggled fire and told fortunes. Children ran through the crowds, laughing and playing. In the middle of all this chaos, Raman spotted a man arguing with a shopkeeper. The man claimed he had paid for his goods, but the shopkeeper insisted he had not. Raman listened to both sides for a moment, then noticed a small detail — the man's money pouch was still full. "If you had paid," Raman said calmly, "your pouch would be lighter. Since it is still full, you have not paid yet." The man turned red and sheepishly paid the shopkeeper. The crowd laughed, and the shopkeeper thanked Raman. {childname} was amazed at how Raman could solve a dispute with such a simple observation. "Most problems are simple," Raman told {pronoun}. "We just make them complicated by letting our emotions get in the way."`,
`On {childname}'s final evening in Vijayanagara, the king held a grand feast. There was music, dance, and an abundance of delicious food. {childname} sat near Raman, feeling both happy and sad that the visit was ending. During the feast, Raman leaned over and whispered, "Do you know what the best part of this feast is?" {childname} looked at the lavish dishes and the beautiful decorations. "The food? The music?" Raman shook his head. "The best part is that everyone is sharing it together. Look around." {childname} looked. The king was laughing with a poor farmer. A nobleman was serving food to a child. Musicians from different traditions were playing together. "This is the secret of a happy kingdom," said Raman. "When we share, we grow. When we include, we prosper. Never forget that, little one." {childname} carried that lesson home, and it became the foundation of everything {pronoun} did in life. Whenever {pronoun} achieved something, {pronoun} shared it. Whenever {pronoun} had plenty, {pronoun} gave to those who had little. And in doing so, {pronoun} discovered that sharing did not make {pronoun} have less — it made {pronoun} have more, because the joy of giving multiplied everything.`,
  ],
  Festival_EN_final: [
`One year, there was a drought in {childname}'s village. The crops failed, the wells ran dry, and the festival season approached with a sense of worry rather than excitement. How could they celebrate Diwali when they barely had food to eat? {childname}'s family, like everyone else, was struggling. But {childname} remembered {possessive} grandmother's words about the lamp of hope. {pronoun} gathered the children of the village and said, "We may not have fireworks or new clothes, but we have something more important — each other." The children made lamps out of clay from the dried riverbed, using oil from the few sesame seeds that had survived. That Diwali night, the village glowed with a soft, warm light. It was not as bright as previous years, but the light came from the heart. The adults saw the children's determination and felt hope returning. The drought ended the following year, but the lesson of that Diwali stayed with everyone — that the light of togetherness can shine even in the darkest times.`,
`As {childname} grew into a teenager, {pronoun} started teaching the younger children about the festivals and their meanings. {pronoun} created a small class in the community center where children would come after school to learn about Indian culture through stories, crafts, and activities. For Diwali, they made clay lamps and learned about the Ramayana. For Holi, they made natural colors from flowers and discussed the importance of forgiveness. For Dussehra, they put on a play about the victory of good over evil. For Pongal, they learned about farming and gratitude. And for Raksha Bandhan, they made rakhis and discussed the bond between siblings. The classes became very popular, and even adults started attending. {childname} realized that {pronoun} had found {possessive} calling — not just celebrating festivals, but helping others understand their deep significance. The festivals became a bridge between generations, keeping traditions alive while teaching timeless values.`,
`On a visit to the neighboring town, {childname} saw something amazing. The town had a huge fair during Dussehra with a giant effigy of Ravana that was set on fire at night. The whole town gathered in the ground, and when the effigy went up in flames, everyone cheered. But what touched {childname}'s heart was not the burning of the demon. It was the spirit of unity. Rich and poor, young and old, Hindus and Muslims — everyone stood together, watching the fireworks light up the sky. {childname} came home and told {possessive} family, "I realized that festivals are not about which god you worship or which story you believe in. They are about coming together as a community, forgetting differences, and celebrating being alive. The real victory of good over evil is when we let go of our prejudices and see the goodness in everyone."`,
`One Diwali, {childname}'s family could not afford new clothes or elaborate decorations. {childname}'s mother was apologetic, but {childname} said, "Maa, we do not need new clothes to celebrate. We have each other, and that is enough." That evening, {childname} and {possessive} family sat on the rooftop, looking at the stars. {childname}'s father told stories about his childhood Diwalis, and {possessive} mother sang a folk song. It was the simplest Diwali they had ever had, but also the most memorable. {childname} learned that the best celebrations are not the ones with the most money spent, but the ones with the most love shared. From that year on, {childname} made it a tradition to do something special for someone less fortunate during every festival — because sharing joy is the truest way to celebrate.`,
  ],
  "Moral Story_EN_final": [
`One winter, a traveling musician came to {childname}'s village. He was old and tired, and his clothes were thin and torn. He had a beautiful voice, but no one stopped to listen to him. The villagers were too busy with their own lives. {childname} saw the musician sitting by the roadside, looking cold and hungry. {pronoun} went home, got a warm blanket and some food, and took them to the musician. "Please, have something to eat," {childname} said. The musician's eyes filled with tears. "Thank you, child. I have walked for many miles, and no one has shown me such kindness." {childname} sat with him and listened to his songs. The musician sang about love and loss, about hope and courage. His voice was like a balm to the soul. Soon, other villagers gathered. They brought food and warm clothes. The musician stayed for a week, and every evening he sang for the village. When he left, the village felt richer — not in money, but in spirit. {childname} had shown them that kindness to a stranger can bring a community together.`,
`There was a time when a wealthy merchant from the city tried to buy {childname}'s family's land. He offered a large sum of money, enough to make them rich. But the land had been in the family for generations. {childname}'s father was torn. The money would solve many problems, but the land was their heritage. {childname} said, "Papa, land cannot be replaced. But money can be earned again. If we sell our heritage, we lose something that can never be bought back." The father listened to {childname}'s wisdom and refused the merchant's offer. The merchant was surprised. "Most people would sell for this price," he said. {childname} replied, "Some things are more valuable than money. Our land holds the memories of our ancestors. It is where our roots are. No amount of gold can replace that." The merchant left, shaking his head in disbelief. But {childname}'s father hugged {pronoun} and said, "You are wiser than your years, beta. You have taught me that the things that matter most cannot be bought or sold."`,
  ],
  // Extra Hindi blocks
  Panchatantra_HI_extra: [
`{childname} ने महसूस किया कि सबसे अच्छी शिक्षा किताबों से नहीं, बल्कि प्रकृति से मिलती है। तालाब के किनारे बैठकर उसने जाना कि धैर्य क्या होता है, जब उसने बगुले को एक पैर पर घंटों खड़े रहते देखा। उसने सीखा कि एकता में शक्ति होती है, जब चींटियाँ मिलकर बड़े-बड़े कीड़ों को खींच ले जाती थीं। उसने देखा कि कैसे मकड़ी अपना जाल बुनती है, बार-बार धैर्य से, भले ही हवा उसे तोड़ दे। प्रकृति एक विशाल पाठशाला थी, और {childname} उसका सबसे जिज्ञासु छात्र था। वह अपने साथ एक छोटी नोटबुक रखता था, जिसमें वह अपनी खोजों को लिखता था — पत्तियों के रेखाचित्र, पक्षियों के व्यवहार, और प्रकृति की सुंदरता पर छोटी कविताएँ।`,
`एक दोपहर, {childname} ने कुछ असामान्य देखा। जंगल से बंदरों का एक झुंड गाँव के खेतों में आकर गन्ने और सब्ज़ियाँ चुरा रहा था। किसान चिंतित और गुस्से में थे। कुछ जाल बिछाना चाहते थे, कुछ उन्हें डंडों से भगाना चाहते थे। लेकिन {childname} को हाथी का सबक याद आया। वह गाँव के बुज़ुर्गों के पास गया और बोला, "बंदरों से लड़ने के बजाय, क्यों न हम उन्हें अपना खाने का स्रोत दें?" बुज़ुर्गों को संदेह था, लेकिन वे {childname} की योजना आज़माने के लिए तैयार हो गए। उन्होंने जंगल के किनारे बंदरों के लिए गन्ने और सब्ज़ियों का एक छोटा पैच लगाया। एक हफ्ते के भीतर, बंदरों ने सीख लिया था कि नया पैच उनका खाने का स्रोत है, और उन्होंने गाँव के खेतों को लूटना बंद कर दिया।`,
`समय बीतता गया, और {childname} बड़ा हुआ, लेकिन उसने प्रकृति के साथ वह संबंध कभी नहीं खोया जिसने उसके बचपन को आकार दिया था। वह गाँव के स्कूल में शिक्षक बन गया, उस ज्ञान को आगे बढ़ाते हुए जो उसने प्राप्त किया था। उसके छात्र न केवल किताबों से, बल्कि अपने आस-पास की दुनिया से सीखते थे। वे पेड़ लगाते थे, घायल जानवरों की देखभाल करते थे, और प्रकृति के पैटर्न का निरीक्षण करना सीखते थे। गाँव एक ऐसी जगह के रूप में जाना जाने लगा जहाँ मनुष्य और प्रकृति सद्भाव में रहते थे। और {childname}, जो अब भूरे बालों और दयालु आँखों वाला बुज़ुर्ग था, बुद्धिमान सारस और आलसी मछलियों की कहानी सुनाता, सभी को याद दिलाता कि धैर्य और रचनात्मकता किसी भी समस्या का समाधान कर सकते हैं।`,
  ],
  "Moral Story_HI": [
`{childname} एक छोटे लेकिन घनिष्ठ गाँव में रहता था जहाँ हर कोई हर किसी को जानता था। गाँव में लगभग पचास घर, एक छोटा मंदिर, दो कमरों का एक स्कूल, और एक बाज़ार था जो हर रविवार को लगता था। गाँव का जीवन सरल लेकिन संतोषजनक था। लोग सुबह जल्दी उठते, खेतों में या अपने व्यापार में मेहनत करते, और शाम को कहानियाँ और हँसी साझा करने के लिए इकट्ठा होते। {childname} का परिवार अपनी ईमानदारी और दयालुता के लिए गाँव में सम्मानित था। उसके पिता एक किसान थे जो चावल और सब्जियाँ उगाते थे, और उसकी माँ एक छोटी सी दुकान चलाती थी। उनके पास बहुत पैसा नहीं था, लेकिन उनके पास उससे कहीं अधिक मूल्यवान चीज़ थी — ईमानदारी की प्रतिष्ठा।`,
`{childname} के जीवन में सबसे प्रभावशाली व्यक्ति उसके दादा थे, जो परिवार के साथ रहते थे। वे बूढ़े और कमज़ोर थे, लेकिन उनका दिमाग तेज था और उनका दिल कहानियों से भरा था। हर शाम, रात के खाने के बाद, परिवार उनके चारों ओर इकट्ठा होता, और वे अपनी जवानी की कहानियाँ सुनाते — साहस की कहानियाँ, मुश्किल विकल्पों की, उन लोगों की जिनसे वे मिले थे और उन सबकों की जो उन्होंने सीखे थे। उनकी कहानियाँ सिर्फ मनोरंजन नहीं थीं; वे कथा में लिपटे सबक थे, मनोरंजन के रूप में छिपा ज्ञान। दादा अक्सर कहते थे, "बेटा, जीवन तुम्हारी परीक्षा लेगा। यह तुम्हें ऐसी स्थितियों में डालेगा जहाँ सही विकल्प आसान विकल्प नहीं होगा। उन पलों में, याद रखो तुम कौन हो और तुम किसके लिए खड़े हो।"`,
`गाँव का स्कूल एक दयालु लेकिन सख्त शिक्षक चलाते थे जिन्हें गुरुजी कहा जाता था। उनका मानना था कि शिक्षा केवल पढ़ना और लिखना सीखने के बारे में नहीं है; यह चरित्र निर्माण के बारे में है। हर दिन, नियमित पाठों के बाद, गुरुजी कहानियों और चर्चाओं के माध्यम से बच्चों को मूल्यों के बारे में सिखाते थे। वे उन्हें अपने लिए सोचने के लिए प्रोत्साहित करते थे, उन चीज़ों पर सवाल उठाने के लिए जो गलत लगती थीं, और हमेशा ज़रूरतमंदों की मदद करने के लिए। {childname} गुरुजी के पसंदीदा छात्रों में से एक था, इसलिए नहीं कि वह सबसे होशियार था, बल्कि इसलिए कि वह सबसे विचारशील था। जब कोई सहपाठी संघर्ष करता था, {childname} उसकी मदद करता था।`,
`{childname} के सामने आने वाली नैतिक दुविधाएँ बड़ी योजना में असाधारण नहीं थीं, लेकिन एक बच्चे की दुनिया में वे महत्वपूर्ण थीं। क्या उसे सच बोलना चाहिए भले ही इसका मतलब मुसीबत में पड़ना हो? क्या उसे अपनी चीज़ें किसी ऐसे व्यक्ति के साथ बाँटनी चाहिए जो उसके प्रति निर्दयी रहा हो? क्या उसे सही के लिए खड़ा होना चाहिए भले ही वह अकेला खड़ा हो? ये वे सवाल थे जो उसके चरित्र की परीक्षा लेते थे। हर बार जब वह ऐसे विकल्प का सामना करता, उसे अपने दादा की कहानियाँ और गुरुजी के सबक याद आते। और हर बार, वह अपने मूल्यों के अनुरूप विकल्प बनाने की कोशिश करता, भले ही वह मुश्किल हो।`,
`जैसे-जैसे साल बीते, {childname} एक युवा वयस्क बन गया जिसकी पूरे गाँव ने प्रशंसा की। इसलिए नहीं कि वह अमीर या प्रसिद्ध था, बल्कि इसलिए कि वह विश्वसनीय, ईमानदार और दयालु था। लोग उससे सलाह लेने आते, यह जानते हुए कि उन्हें एक विचारशील और निष्पक्ष दृष्टिकोण मिलेगा। जब विवाद होते, तो वे {childname} से मध्यस्थता करने के लिए कहते, उसके निर्णय पर भरोसा करते। और जब किसी को मदद की ज़रूरत होती, {childname} हमेशा स्वयंसेवा करने वाला पहला व्यक्ति होता। पीछे मुड़कर देखने पर, {childname} ने महसूस किया कि इस सबकी नींव बचपन में रखी गई थी — उन कहानियों के माध्यम से जो उसने सुनीं, उन मूल्यों के माध्यम से जो उसने आत्मसात किए, और उन विकल्पों के माध्यम से जो उसने तब बनाए जब कोई देख नहीं रहा था।`,
  ],
  "Moral Story_EN": [
`{childname} lived in a small but close-knit village where everyone knew everyone else. The village had about fifty houses, a small temple, a school with two rooms, and a marketplace that came alive every Sunday. Life in the village was simple but fulfilling. People woke up early, worked hard in the fields or at their trades, and gathered in the evenings to share stories and laughter. {childname}'s family was respected in the village for their honesty and kindness. {possessive} father was a farmer who grew rice and vegetables, and {possessive} mother ran a small shop selling groceries. They did not have much money, but they had something more valuable — a reputation for integrity. When they said something, people believed them. When they promised something, they delivered. This was the environment in which {childname} was growing up, absorbing values not through lectures but through daily observation and experience.`,
`One of the most influential people in {childname}'s life was {possessive} grandfather, who lived with the family. He was old and frail, but his mind was sharp and his heart was full of stories. Every evening, after dinner, the family would gather around him, and he would tell tales from his youth — stories of adventure, of difficult choices, of people he had met and lessons he had learned. His stories were not just entertainment; they were lessons wrapped in narrative, wisdom disguised as entertainment. Through his tales, {childname} learned about courage, honesty, perseverance, and compassion. The grandfather often said, "Beta, life will test you. It will present you with situations where the right choice is not the easy choice. In those moments, remember who you are and what you stand for. Character is not built in grand gestures; it is built in small, everyday decisions." These words became {childname}'s moral compass, guiding {pronoun} through the challenges that lay ahead.`,
`The village school was run by a kind but strict teacher named Guruji. He believed that education was not just about learning to read and write; it was about building character. Every day, after the regular lessons, Guruji would teach the children about values through stories and discussions. He encouraged them to think for themselves, to question things that seemed wrong, and to always help those in need. {childname} was one of Guruji's favorite students, not because {pronoun} was the smartest, but because {pronoun} was the most thoughtful. When a classmate was struggling, {childname} would help them. When someone was being bullied, {childname} would stand up for them. Guruji noticed these qualities and nurtured them, giving {childname} extra responsibilities and challenges that would help {pronoun} grow. The lessons {childname} learned in Guruji's classroom would prove to be invaluable in the years to come, shaping {pronoun} into a person of integrity and compassion.`,
`The moral dilemmas that {childname} faced were not extraordinary in the grand scheme of things, but they were significant in the context of a child's world. Should {pronoun} tell the truth even if it meant getting into trouble? Should {pronoun} share {possessive} belongings with someone who had been unkind? Should {pronoun} stand up for what was right even if {pronoun} stood alone? These were the questions that tested {possessive} character. Each time {pronoun} faced such a choice, {pronoun} remembered the stories {possessive} grandfather had told and the lessons Guruji had taught. And each time, {pronoun} tried to make the choice that aligned with {possessive} values, even when it was difficult. {pronoun} learned that making the right choice did not always bring immediate rewards. Sometimes it led to temporary hardship or disappointment. But in the long run, it always led to a deeper sense of peace and self-respect. That, {pronoun} realized, was the true reward of living an honest and kind life.`,
`As the years passed, {childname} grew into a young adult whom the whole village admired. Not because {pronoun} was rich or famous, but because {pronoun} was reliable, honest, and kind. People came to {pronoun} for advice, knowing they would get a thoughtful and fair perspective. When disputes arose, they asked {childname} to mediate, trusting {possessive} judgment. And when someone needed help, {childname} was always the first to volunteer. Looking back, {childname} realized that the foundation for all of this was laid in childhood — through the stories {pronoun} heard, the values {pronoun} absorbed, and the choices {pronoun} made when no one was watching. {pronoun} understood that character is not about public reputation; it is about private integrity. The person you are when no one is watching is the person you truly are. And if you build that person with care, honesty, and kindness, you will never have to worry about the person the world sees.`,

    `One particular incident stood out in {childname}'s memory as a defining moment. A traveling merchant had come to the village and accidentally dropped a pouch of coins near the school. {childname} found it. The pouch contained more money than {possessive} family earned in a year. For a moment, {pronoun} thought about all the things the money could buy — new clothes, better food, books, toys. But then {pronoun} remembered {possessive} grandfather's words: "Character is built in small, everyday decisions." {pronoun} took the pouch to Guruji, who helped {pronoun} find the merchant. When the merchant offered a reward, {childname} refused it. "Keeping my honesty is reward enough," {pronoun} said. The merchant was so impressed that he told the story to everyone he met, and {childname}'s reputation for honesty spread far and wide. But more importantly, {childname} felt a deep sense of pride in having done the right thing, a feeling that no amount of money could match.`,
    `Another time, {childname} saw a group of older children teasing a younger child who stuttered. The younger child was in tears, and the older children were laughing. {childname} knew it would be easier to walk away and not get involved. But {pronoun} could not ignore the suffering of the younger child. {pronoun} walked up to the group and said calmly, "What you are doing is not funny. It is cruel." The older children were startled. One of them said, "Mind your own business!" But {childname} stood {possessive} ground. "Making someone cry IS my business. If you want to laugh, laugh together, not at someone's pain." The older children looked ashamed and scattered. {childname} comforted the younger child and walked them home. From that day on, the younger child looked up to {childname} as a hero. And {childname} learned that courage is not about being unafraid; it is about doing the right thing even when you are afraid.`,
    `{childname}'s mother fell ill one winter. The family's savings were running low, and the medical bills were piling up. {childname} wanted to help. {pronoun} started working odd jobs after school — helping at the shop, running errands for neighbors, and even assisting the blacksmith. It was hard work, and {pronoun} often came home exhausted. But seeing {possessive} mother recover gave {pronoun} strength. One evening, {possessive} mother said, "Beta, I am so proud of you. You work so hard without complaining." {childname} replied, "Maa, you have given me everything. The least I can do is help when you need it." {possessive} mother smiled through tears. "That is the greatest gift a child can give — not money or gifts, but love and care." {childname} realized that hard work done with love is not a burden but a privilege. It is a way of showing the people we care about that they matter to us.`,
    `Looking back on all these experiences, {childname} understood that a meaningful life is not built on grand achievements or public recognition. It is built on countless small acts of kindness, honesty, courage, and love. Each decision to do the right thing, even when no one was watching, added a brick to the foundation of {possessive} character. Each act of kindness, no matter how small, created ripples that spread far beyond what {pronoun} could see. And each lesson learned became a torch that lit the way for others. {childname} made a commitment to live by these principles every single day, knowing that the person {pronoun} was becoming was far more important than any destination {pronoun} would ever reach. And as {pronoun} looked out at the beautiful world around {pronoun}, {pronoun} felt grateful for every challenge that had made {pronoun} stronger, every mistake that had taught {pronoun} something, and every person who had believed in {pronoun}.`,
  ],
  // Final Hindi blocks (extra length for 2000-4000 word target)
  Birbal_HI_final: [
`{childname} ने बीरबल से एक और सवाल पूछा जो उसे लंबे समय से परेशान कर रहा था। "बीरबल जी, कुछ लोग जो बहुत अमीर और शक्तिशाली हैं, वे दुखी क्यों दिखते हैं, जबकि कुछ लोग जिनके पास बहुत कम है, वे खुशी से भरे दिखते हैं?" बीरबल ने सवाल की गहराई पर मुस्कुराते हुए कहा, "यह एक सच्चे विचारक की निशानी है। तुमने कुछ ऐसा देखा है जो कई वयस्क नहीं देख पाते।" वे {childname} को एक पास के गाँव ले गए जहाँ एक गरीब किसान अपने परिवार के साथ एक छोटी सी झोपड़ी में रहता था। किसान के पास लगभग कुछ नहीं था — कुछ कपड़े, सादा खाना, और एक छोटा सा घर। लेकिन वह अपने खेत में काम करते हुए गा रहा था। उसके बच्चे हँस रहे थे और खेल रहे थे। फिर बीरबल {childname} को एक अमीर रईस के महल में ले गए। रईस के पास सब कुछ था — सोना, रेशम, नौकर, और एक भव्य हवेली। लेकिन वह अपने बड़े हॉल में अकेला बैठा, चिंतित और दुखी दिख रहा था। {childname} ने तुरंत समझ लिया। "किसान के पास प्यार और संतोष है," {pronoun} ने कहा। "रईस के पास धन है लेकिन शांति नहीं।" बीरबल ने सिर हिलाया। "तुमने सबसे बड़ा सबक सीख लिया। खुशी अंदर से आती है, न कि तुम्हारे पास जो कुछ है उससे।"`,
`बीरबल ने {childname} से कहा, "एक बार बादशाह अकबर ने मुझसे पूछा कि असली बुद्धिमत्ता क्या है। मैंने कहा, 'यह जानना नहीं है कि सभी उत्तर क्या हैं, बल्कि यह जानना है कि सही सवाल कैसे पूछें।'" बीरबल ने आगे समझाया, "जीवन में हर समस्या का एक हल होता है, लेकिन हल ढूंढने से पहले हमें सही सवाल पूछना होगा। जब कोई गलती करता है, तो 'यह किसकी गलती है?' पूछने के बजाय, पूछो 'हम इससे क्या सीख सकते हैं?' जब कोई मुश्किल आती है, तो 'यह क्यों हो रहा है?' पूछने के बजाय, पूछो 'हम इससे कैसे बढ़ सकते हैं?'" {childname} ने इस सलाह को अपने दिल में उतार लिया। अगले दिनों में, जब भी कोई समस्या आती, {pronoun} रुकता और सही सवाल पूछता। इससे न केवल समस्याएँ जल्दी हल होतीं, बल्कि {pronoun} को हर अनुभव से कुछ मूल्यवान सीखने को मिलता।`,
`एक दिन, बीरबल ने {childname} को महल की छत पर बुलाया। सूरज ढल रहा था, और आगरा का दृश्य अद्भुत था — यमुना नदी सुनहरी रोशनी में चमक रही थी, बगीचे फूलों से खिले हुए थे, और दूर के किले पहरा दे रहे थे। "इस खूबसूरत शहर को देखो," बीरबल ने कहा। "इसे हज़ारों मजदूरों के हाथों ने बनाया है, हर एक ने अपना कौशल और परिश्रम दिया है। कोई एक व्यक्ति इसे नहीं बना सकता था। इस तरह एक राज्य काम करता है, और इस तरह जीवन काम करता है। हम सब जुड़े हुए हैं। किसान सम्राट के लिए खाना उगाता है, सम्राट किसान की रक्षा करता है। व्यापारी वस्तुओं का व्यापार करता है, कलाकार सुंदरता बनाता है, शिक्षक ज्ञान बाँटता है। हर व्यक्ति, चाहे उसकी भूमिका कितनी भी छोटी क्यों न हो, महत्वपूर्ण है।" {childname} ने शहर को नई आँखों से देखा। {pronoun} ने सिर्फ इमारतें और सड़कें नहीं देखीं, बल्कि हज़ारों लोगों के जीवन और कहानियाँ देखीं जो एक साथ जुड़ी हुई थीं।`,
  ],
  "Tenali Raman_HI_final": [
`एक दोपहर, रामन {childname} को विजयनगर के बाज़ार क्षेत्र में ले गए। बाज़ार रंगों, आवाज़ों और गंधों से भरा हुआ था। व्यापारी सुगंधित मसालों से लेकर चमचमाते रत्नों तक, अंगूठी से निकल जाने वाले रेशम से लेकर देवी-देवताओं की कांस्य मूर्तियों तक सब कुछ बेचते थे। सड़क पर कलाकार आग से करतब दिखाते और भविष्य बताते थे। बच्चे भीड़ में हँसते और खेलते हुए दौड़ते थे। इस सब अव्यवस्था के बीच, रामन ने एक आदमी को दुकानदार से बहस करते देखा। आदमी ने दावा किया कि उसने अपने सामान के लिए भुगतान कर दिया है, लेकिन दुकानदार ने जोर देकर कहा कि उसने नहीं किया। रामन ने दोनों की बातें सुनीं, फिर एक छोटी सी बात देखी — आदमी की पर्स अभी भी भरी हुई थी। 'यदि आपने भुगतान किया होता,' रामन ने शांति से कहा, 'आपकी पर्स हल्की होती। चूंकि यह अभी भी भरी है, आपने अभी तक भुगतान नहीं किया है।' वह आदमी शर्म से लाल हो गया और उसने दुकानदार को भुगतान कर दिया। भीड़ हँसी, और दुकानदार ने रामन को धन्यवाद दिया। {childname} को आश्चर्य हुआ कि रामन इतनी सरल टिप्पणी से विवाद कैसे हल कर सकते हैं। "अधिकांश समस्याएँ सरल होती हैं," रामन ने उससे कहा। "हम उन्हें अपनी भावनाओं को बीच में आने देकर जटिल बना देते हैं।"`,
`विजयनगर में {childname} की अंतिम शाम को राजा ने एक भव्य भोज का आयोजन किया। संगीत, नृत्य और प्रचुर मात्रा में स्वादिष्ट भोजन था। {childname} रामन के पास बैठा, खुश और दुखी दोनों महसूस कर रहा था कि यात्रा समाप्त हो रही है। भोज के दौरान, रामन ने झुककर फुसफुसाया, "क्या तुम जानते हो कि इस भोज का सबसे अच्छा हिस्सा क्या है?" {childname} ने शानदार व्यंजनों और सुंदर सजावट को देखा। "खाना? संगीत?" रामन ने सिर हिलाया। "सबसे अच्छा हिस्सा यह है कि हर कोई इसे एक साथ साझा कर रहा है। चारों ओर देखो।" {childname} ने देखा। राजा एक गरीब किसान के साथ हँस रहा था। एक रईस एक बच्चे को खाना परोस रहा था। विभिन्न परंपराओं के संगीतकार एक साथ बजा रहे थे। "यह एक खुशहाल राज्य का रहस्य है," रामन ने कहा। "जब हम बाँटते हैं, हम बढ़ते हैं। जब हम शामिल करते हैं, हम समृद्ध होते हैं। इसे कभी मत भूलना, छोटे।" {childname} उस सबक को घर ले गया, और यह उसके जीवन में हर काम की नींव बन गया। जब भी {pronoun} कुछ हासिल करता, {pronoun} उसे बाँटता। जब भी {pronoun} के पास बहुत कुछ होता, {pronoun} उन्हें देता जिनके पास कम था।`,
`{childname} के घर लौटने के बाद, उसने अपने गाँव में रामन की शिक्षाओं को लागू करना शुरू किया। उसने सार्वजनिक चर्चाओं का आयोजन किया जहाँ लोग अपनी समस्याओं को साझा कर सकते थे और एक साथ समाधान ढूंढ सकते थे। उसने बच्चों के लिए एक छोटी सी पाठशाला शुरू की जहाँ वे कहानियों और खेलों के माध्यम से सीखते थे। धीरे-धीरे, गाँव बदलने लगा। लोग अधिक एकजुट हो गए, अधिक सहयोगी। उन्होंने महसूस किया कि सबसे बड़ी शक्ति धन या ताकत में नहीं, बल्कि समुदाय और सहयोग में है। रामन ने बाद में कहा, "मैंने तुम्हें एक सबक सिखाया, लेकिन तुमने मुझे सिखाया कि सबक तभी मूल्यवान है जब उसे आगे बढ़ाया जाए। तुमने मेरी छोटी सी बुद्धि को गाँव की बुद्धि में बदल दिया।" {childname} मुस्कुराया और बोला, "यही तो शिक्षा का उद्देश्य है, रामन जी — एक व्यक्ति से शुरू करना, और पूरी दुनिया तक पहुँचना।"`,
  ],
  Festival_HI_final: [
`एक साल, {childname} के गाँव में सूखा पड़ा। फसलें बर्बाद हो गईं, कुएँ सूख गए, और त्योहार का मौसम उत्साह के बजाय चिंता के साथ आया। वे दिवाली कैसे मनाते जब उनके पास खाने के लिए मुश्किल से अनाज था? {childname} का परिवार, बाकी सभी की तरह, संघर्ष कर रहा था। लेकिन {childname} को {possessive} दादी की आशा की दीया वाली बात याद आई। {pronoun} ने गाँव के बच्चों को इकट्ठा किया और कहा, "हो सकता है कि हमारे पास पटाखे या नए कपड़े न हों, लेकिन हमारे पास उससे कहीं अधिक महत्वपूर्ण चीज़ है — एक दूसरे।" बच्चों ने सूखी नदी की मिट्टी से दीये बनाए, उन कुछ तिलों के तेल का उपयोग करके जो बच गए थे। उस दिवाली की रात, गाँव एक नरम, गर्म रोशनी से जगमगा उठा। यह पिछले वर्षों की तरह चमकीला नहीं था, लेकिन रोशनी दिल से आती थी। वयस्कों ने बच्चों का दृढ़ संकल्प देखा और आशा लौटती महसूस की। सूखा अगले साल समाप्त हो गया, लेकिन उस दिवाली का सबक सबके साथ रहा — कि एकजुटता की रोशनी सबसे अंधेरे समय में भी चमक सकती है।`,
`जैसे-जैसे {childname} बड़ा हुआ, उसने छोटे बच्चों को त्योहारों और उनके अर्थों के बारे में सिखाना शुरू किया। उसने सामुदायिक केंद्र में एक छोटी कक्षा बनाई जहाँ बच्चे स्कूल के बाद कहानियों, शिल्प और गतिविधियों के माध्यम से भारतीय संस्कृति के बारे में सीखने आते थे। दिवाली के लिए, वे मिट्टी के दीये बनाते और रामायण के बारे में सीखते। होली के लिए, वे फूलों से प्राकृतिक रंग बनाते और क्षमा के महत्व पर चर्चा करते। दशहरे के लिए, उन्होंने बुराई पर अच्छाई की जीत पर एक नाटक प्रस्तुत किया। पोंगल के लिए, उन्होंने खेती और कृतज्ञता के बारे में सीखा। रक्षा बंधन के लिए, वे राखियाँ बनाते और भाई-बहन के बंधन पर चर्चा करते। कक्षाएँ बहुत लोकप्रिय हो गईं, और वयस्क भी आने लगे। {childname} ने महसूस किया कि {pronoun} ने अपनी पुकार पा ली है — न केवल त्योहार मनाना, बल्कि दूसरों को उनके गहरे महत्व को समझने में मदद करना।`,
`त्योहारों के मौसम में एक बार एक अजीब घटना घटी। एक विदेशी यात्री गाँव में आया और उसने {childname} के परिवार के साथ दिवाली बिताई। वह अपने देश में क्रिसमस मनाने का आदी था, और उसने कभी दिवाली के बारे में नहीं सुना था। {childname} ने उसे त्योहार का अर्थ समझाया — अंधकार पर प्रकाश की विजय, बुराई पर अच्छाई की, अज्ञान पर ज्ञान की। यात्री मोहित हो गया। उसने दीये जलाए, मिठाइयाँ खाईं, और पूरे परिवार के साथ नृत्य किया। जाने से पहले, उसने {childname} से कहा, "मैंने सोचा था कि मैं तुम्हें अपने त्योहार के बारे में सिखाऊँगा, लेकिन तुमने मुझे सिखाया कि सभी त्योहार एक ही चीज़ का जश्न मनाते हैं — प्रेम, प्रकाश, और एक साथ आने की खुशी।" {childname} ने सीखा कि जब हम अपनी परंपराओं को दूसरों के साथ साझा करते हैं, तो वे सिर्फ हमारी नहीं रहतीं — वे सार्वभौमिक हो जाती हैं, सभी मनुष्यों को जोड़ने वाला पुल बन जाती हैं।`,
  ],
  "Moral Story_HI_final": [
`एक बार {childname} के गाँव में एक बड़ी बाढ़ आई। नदी अपने किनारों से बह निकली, और कई घरों में पानी घुस गया। लोगों ने अपनी कीमती चीज़ें बचाने के लिए जल्दबाजी की। लेकिन {childname} ने देखा कि बुज़ुर्ग दादी अकेली अपने घर में फँसी हुई हैं, पानी घुटने तक आ चुका था। जबकि अन्य लोग अपना सामान बचाने में व्यस्त थे, {childname} ने बिना किसी हिचकिचाहट के बुज़ुर्ग दादी को अपनी पीठ पर उठाया और सुरक्षित स्थान पर ले गया। उसके बाद ही {pronoun} अपने परिवार की मदद करने गया। उसके पिता ने गर्व से कहा, "बेटा, तुमने हमें सिखाया कि इंसानियत किसी भी चीज़ से अधिक मूल्यवान है। हम अपना सामान फिर से खरीद सकते हैं, लेकिन एक जीवन की कीमत कभी नहीं चुकाई जा सकती।" उस दिन, {childname} समझ गया कि सच्ची संपत्ति वह नहीं है जो हमारे पास है, बल्कि वह है जो हम दूसरों के लिए करते हैं।`,
`{childname} के स्कूल में एक नया बच्चा आया। वह बहुत गरीब था और उसके पास किताबें या पेंसिल तक नहीं थीं। दूसरे बच्चे उसका मज़ाक उड़ाते थे और उसके साथ नहीं खेलते थे। {childname} को उस बच्चे के लिए बहुत दुख हुआ। {pronoun} ने अपनी अतिरिक्त किताबें और पेंसिल लीं और उन्हें नए बच्चे को दे दीं। पहले तो नया बच्चा शर्माया, फिर उसने मुस्कुराकर धन्यवाद कहा। धीरे-धीरे, वे दोस्त बन गए। {childname} ने पाया कि नया बच्चा बहुत प्रतिभाशाली था — वह अद्भुत चित्र बनाता था और मज़ेदार कहानियाँ सुनाता था। एक दिन, नए बच्चे ने {childname} से कहा, "जब तुमने मुझे वे किताबें दीं, तो तुमने मुझे सिर्फ कागज़ नहीं दिए। तुमने मुझे उम्मीद दी। तुमने मुझे दिखाया कि इस दुनिया में अभी भी अच्छाई है।" {childname} को एहसास हुआ कि दयालुता के छोटे-छोटे कार्य किसी के जीवन में बड़ा बदलाव ला सकते हैं।`,
`बुढ़ापे में, जब {childname} के बाल सफेद हो गए थे और {pronoun} के अपने पोते-पोतियाँ थीं, तब भी {pronoun} के जीवन के सबक युवा पीढ़ी को प्रेरित करते रहे। हर शाम, {pronoun} अपने पोते-पोतियों को अपने बचपन की कहानियाँ सुनाता — सारस और मछलियों की, बीरबल और तेनाली रामन की, त्योहारों की और नैतिक शिक्षाओं की। बच्चे मंत्रमुग्ध होकर सुनते, अपने दादा की आँखों में ज्ञान की चमक देखते। और जब वे पूछते, "दादा, आप इतने बुद्धिमान कैसे हुए?" तो {childname} मुस्कुराकर कहता, "मैंने सुनना सीखा। मैंने निरीक्षण करना सीखा। मैंने दयालु होना सीखा। और सबसे महत्वपूर्ण, मैंने कभी सीखना बंद नहीं किया।" क्योंकि जीवन का सबसे बड़ा सबक यही है — कि हम जीवन भर छात्र हैं, और हर दिन सीखने, बढ़ने और दुनिया को बेहतर बनाने का एक नया अवसर है।`,
  ],
  // Extra Hindi final blocks (push Hindi stories to 2000+ words)
  Panchatantra_HI_super: [
`एक दिन, {childname} के गाँव में एक अजीब सी घटना घटी। सुबह-सुबह जब लोग उठे, तो उन्होंने देखा कि गाँव के तालाब का पानी रातों-रात गायब हो गया था। मछलियाँ तड़प रही थीं, मेंढक भाग गए थे, और पक्षी चकरा रहे थे। गाँव वाले चिंतित हो गए। किसी ने तालाब में जहर मिलाने की बात कही, किसी ने शैतान का नाम लिया। {childname} की दादी ने कहा, "पहले कारण समझो, फिर समाधान खोजो।" {childname} ने तालाब के चारों ओर अच्छी तरह देखा। उसने दूर से एक पेड़ पर कौवों का एक झुंड बैठे देखा, जो पंख फैलाए बैठे थे। वह उधर गया। पता चला कि तालाब की दीवार में एक बड़ा छेद हो गया था, और पानी नीचे गुफा की ओर बह गया था। {childname} ने गाँव वालों को इकट्ठा किया और छेद को बंद करने का काम शुरू किया। एक दिन की मेहनत के बाद, तालाब फिर से भर गया। मछलियाँ खुशी से तैरने लगीं। गाँव वालों ने {childname} की बुद्धिमानी की जमकर तारीफ़ की।`,
`{childname} के दादाजी ने उसे जीवन का एक और सबक सिखाया। वे एक सुबह उसे खेतों में ले गए और बोले, "देखो, ये पौधे जो मैंने लगाए हैं, ये बड़े होकर आलू देंगे। लेकिन एक बात याद रखना — असली आलू हमेशा मिट्टी के नीचे छिपा रहता है। जो हमें दिखता है वह सिर्फ पत्ते हैं।" उन्होंने समझाया, "जीवन में भी ऐसा ही है। असली गुण — दयालुता, ईमानदारी, साहस — ये अक्सर छिपे रहते हैं। दूसरों में ये गुण ढूंढो, चाहे वे दिखाई न दें। और अपने अंदर भी इन गुणों को उगाओ, भले ही कोई देख न रहा हो।" {childname} ने यह बात गाँव के सबसे गरीब लेकिन सबसे दयालु आदमी पर लागू की। सब उसे अनपढ़ कहते थे, लेकिन {childname} ने देखा कि वह आदमी हर किसी की बिना किसी स्वार्थ के मदद करता है। "असली आलू मिट्टी के नीचे छिपा होता है," {childname} ने मुस्कुराकर कहा।`,
`गाँव के स्कूल में एक बार एक प्रतियोगिता हुई। गुरुजी ने सभी बच्चों को एक बीज दिया और कहा, "जो सबसे सुंदर पौधा उगाएगा, वह जीतेगा।" {childname} ने अपने बीज को प्यार से लगाया, रोज़ पानी दिया, धूप में रखा। लेकिन दो हफ्ते बीत गए और कुछ नहीं उगा। उसके दोस्तों के पौधे बड़े हो गए थे। {childname} निराश था। उसने अपने दादाजी से पूछा, "मेरा पौधा क्यों नहीं उगा?" दादाजी मुस्कुराए और बोले, "बेटा, तुम जो देखते हो वह हमेशा सच नहीं होता। कभी-कभी जो सबसे धीमा बढ़ता है, वह सबसे गहरी जड़ें पकड़ता है।" प्रतियोगिता के दिन, {childname} बिना किसी पौधे के गया। गुरुजी ने सबके पौधे देखे और फिर {childname} से पूछा, "तुम्हारा पौधा कहाँ है?" {childname} ने सच बताया, "मेरा बीज नहीं उगा।" गुरुजी ने ताली बजाई। "यह सबसे बड़ी जीत है! केवल {childname} ने सच बोला। बाकी बच्चों के बीज उबले हुए थे — वे कभी नहीं उग सकते थे।" {childname} को एहसास हुआ कि सच्चाई हमेशा जीतती है, भले ही जीतने में समय लगे।`,
`{childname} ने देखा कि गाँव में एक बुज़ुर्ग व्यक्ति हर दिन अकेला बैठा रहता था। उसका परिवार दूर शहर में रहता था, और वह बहुत उदास रहता था। {childname} ने उस बुज़ुर्ग के पास जाना शुरू किया। वह उसके लिए चाय लाता, उसकी कहानियाँ सुनता, और उसके बगीचे में मदद करता। धीरे-धीरे, बुज़ुर्ग फिर से मुस्कुराने लगा। गाँव वालों ने देखा कि {childname} ने एक अकेले आदमी की ज़िंदगी बदल दी। {childname} ने सीखा कि किसी की ज़िंदगी में रोशनी लाने के लिए बड़े-बड़े काम नहीं करने पड़ते — बस थोड़ा सा प्यार और थोड़ा सा समय चाहिए।`,
`बारिश का मौसम आया, और गाँव के बच्चे स्कूल नहीं जा पाते थे क्योंकि सड़कें कीचड़ से भर जाती थीं। {childname} ने सोचा, "पढ़ाई तो जारी रहनी चाहिए।" उसने अपने दोस्तों को इकट्ठा किया और उनके घरों के पास एक छोटी सी पाठशाला बनाई, जहाँ वे बारिश में भी पढ़ सकते थे। गुरुजी ने {childname} की पहल देखी और उसे हर दिन दो घंटे पढ़ाने लगे। बारिश के मौसम में भी, गाँव के बच्चे पढ़ते रहे। {childname} ने सीखा कि अगर मन में इच्छा हो, तो रास्ता निकल ही आता है। हर समस्या का एक समाधान होता है, बस उसे ढूंढने का साहस चाहिए।`,
`जाड़ों की एक रात, {childname} ने देखा कि गाँव के कुत्ते ठंड से काँप रहे थे। उनके पास रहने की कोई जगह नहीं थी। {childname} ने अपने पिता से पुराने कंबल और लकड़ी के टुकड़े माँगे और कुत्तों के लिए एक छोटा सा आश्रय बनाया। उसने रोज़ उन्हें खाना देना शुरू किया। सर्दी खत्म होने तक, वे कुत्ते {childname} के सबसे अच्छे दोस्त बन गए। वे हर जगह उसके पीछे-पीछे चलते थे और गाँव की रखवाली करते थे। {childname} ने सीखा कि दयालुता का एक छोटा कार्य भी वफादारी और प्यार के रूप में कई गुना वापस आता है।`,
`एक दिन {childname} ने तालाब के किनारे बैठकर सूर्यास्त देखा। नारंगी, गुलाबी और बैंगनी रंग आसमान में घुल रहे थे, पानी में परावर्तित हो रहे थे। उसने सोचा, "इतनी सुंदरता बनाने वाला कोई तो होगा।" उसकी दादी ने कहा, "यह प्रकृति का जादू है, बेटा। और तुम भी इस जादू का हिस्सा हो। तुम्हारे अंदर भी उतनी ही सुंदरता है, बस तुम्हें उसे बाहर लाना है — दयालुता से, प्रेम से, और अपने कामों से। हर सूर्यास्त हमें याद दिलाता है कि दिन खत्म होने के बाद भी, कल एक नई सुबह आएगी। उम्मीद कभी मत छोड़ना।" {childname} ने उस दिन प्रकृति से जुड़ाव महसूस किया और जीवन में सुंदरता देखना सीखा।`,
  ],
  Birbal_HI_super: [
`एक बार बादशाह अकबर ने दरबार में घोषणा की कि वह एक ऐसा व्यक्ति ढूंढ रहे हैं जो उनकी सबसे कठिन पहेली हल कर सके। इनाम था — एक हजार सोने की मोहरें। दूर-दूर से विद्वान आए, लेकिन कोई सफल नहीं हुआ। {childname} ने बीरबल से पूछा, "आप क्यों नहीं जाते?" बीरबल ने कहा, "क्योंकि मैं पहेली का जवाब पहले से जानता हूँ।" {childname} हैरान था। "तो आप जाकर इनाम क्यों नहीं ले लेते?" बीरबल मुस्कुराए। "क्योंकि कभी-कभी सबसे अच्छा जवाब देना नहीं, बल्कि दूसरों को खुद जवाब ढूंढने देना होता है।" उन्होंने {childname} को एक संकेत दिया — "जवाब तुम्हारे अपने दिल में है। जब तुम ध्यान से सुनोगे, तो पाओगे।" {childname} ने सोचा और सोचा। फिर वह बादशाह के पास गया और बोला, "जहाँपनाह, पहेली का जवाब यह है कि हर इंसान के दिल में एक छिपा हुआ सवाल होता है। और वह सवाल है — 'क्या मैं पर्याप्त हूँ?' जब हम इस सवाल का जवाब 'हाँ' में देना सीख जाते हैं, तो हमें किसी और चीज़ की ज़रूरत नहीं रहती।" बादशाह चकित रह गए। यही सही जवाब था। {childname} को एक हजार मोहरें मिलीं, लेकिन उसने वे गरीबों में बाँट दीं।`,
`शहर में एक दिन बड़ी हलचल मची। एक चोर रात को बादशाह के खजाने में से कुछ कीमती रत्न चुरा ले गया। सिपाहियों ने कई लोगों को पकड़ा और पूछताछ की, लेकिन चोर का पता नहीं चला। बादशाह ने बीरबल को बुलाया। बीरबल ने कहा, "मैं चोर को ढूंढ सकता हूँ, लेकिन मुझे {childname} की मदद चाहिए।" उन्होंने सभी संदिग्धों को एक कमरे में इकट्ठा किया और कहा, "मेरे पास एक जादुई मुर्गा है जो चोर को पहचान सकता है। सब लोग बारी-बारी से इस मुर्गे के पिंजरे को छूएँगे। जब चोर छुएगा, तो मुर्गा बाँग देगा।" एक-एक करके सबने छुआ, लेकिन मुर्गा चुप रहा। सब हैरान थे। तब बीरबल ने सबके हाथ देखे — सिर्फ एक व्यक्ति के हाथ साफ थे। बाकी सबके हाथों पर कालिख लगी थी, क्योंकि बीरबल ने पिंजरे पर कालिख लगा दी थी। चोर ने डर के मारे पिंजरे को छुआ ही नहीं, इसलिए उसके हाथ साफ थे।`,
`{childname} ने बीरबल से पूछा, "बीरबल जी, मैं कैसे जान सकता हूँ कि किस पर भरोसा करूँ?" बीरबल ने {childname} को एक रोटी के बराबर का एक पत्थर दिया और कहा, "इसे तोड़ो।" {childname} ने पत्थर तोड़ने की कोशिश की, लेकिन वह बहुत मजबूत था। "अब इसे पानी में डाल दो," बीरबल ने कहा। {childname} ने पत्थर को पानी में डाला। कुछ नहीं हुआ। "इसे आग में डालो," बीरबल ने कहा। {childname} डर गया, लेकिन उसने पत्थर को आग के पास रख दिया। पत्थर गर्म हो गया लेकिन टूटा नहीं। "अब इसे नमक के पानी में डालो," बीरबल ने कहा। {childname} ने ऐसा किया। धीरे-धीरे, पत्थर में दरारें पड़ने लगीं और वह टूट गया। बीरबल ने समझाया, "भरोसा भी ऐसा ही है। एक-दो परीक्षा से कोई रिश्ता नहीं टूटता। लेकिन बार-बार का विश्वासघात — कड़वे शब्द, झूठे वादे, धोखा — ये नमक के पानी की तरह हैं जो सबसे मजबूत पत्थर को भी तोड़ सकते हैं।" {childname} ने सीखा कि भरोसा कमाना मुश्किल है लेकिन खोना आसान। इसलिए भरोसा हमेशा सावधानी से करना चाहिए, और जो भरोसा मिले उसे कभी तोड़ना नहीं चाहिए।`,
`{childname} ने बीरबल से कहा, "मैं सीखना चाहता हूँ कि नेता कैसे बनते हैं।" बीरबल ने {childname} को एक खाली स्लेट दी और कहा, "इस पर एक रेखा खींचो।" {childname} ने खींची। "अब इस रेखा को छोटा करो, बिना मिटाए।" {childname} ने सोचा, फिर उसने रेखा के आगे एक लंबी रेखा खींच दी। पहली रेखा अपने आप छोटी लगने लगी। बीरबल मुस्कुराए। "यही नेतृत्व का रहस्य है। अपनी क्षमताओं को दिखाने के लिए दूसरों को नीचा दिखाने की ज़रूरत नहीं है। बस इतना करो कि अपने आप को इतना बड़ा बना लो कि दूसरों की कमियाँ अपने आप छोटी लगने लगें। दूसरों से ईर्ष्या मत करो। अपने ऊपर काम करो। अपने ज्ञान को बढ़ाओ। अपने कौशल को निखारो। जब तुम बड़े बनोगे, तो दूसरों की छोटी बातें तुम्हें प्रभावित नहीं करेंगी।" {childname} ने यह सिद्धांत जीवन भर अपनाया।`,
`एक बार बीरबल बीमार पड़ गए। कई दरबारी उनसे मिलने आए, लेकिन ज्यादातर दिखावे के लिए। {childname} हर दिन आता, उनके लिए दवा लाता, उनकी सेवा करता। जब बीरबल ठीक हुए, तो उन्होंने {childname} से पूछा, "तुम हर दिन क्यों आते थे, जबकि दूसरे दरबारी एक-दो बार आकर चले गए?" {childname} ने कहा, "क्योंकि आपने मुझे कभी कुछ देने के लिए नहीं, बल्कि सिखाने के लिए समय दिया। सेवा वहीं करनी चाहिए जहाँ से हमने सीखा है।" बीरबल की आँखों में आँसू आ गए। उन्होंने {childname} को गले लगाया और कहा, "जब तुम बड़े होगे, तो एक महान इंसान बनोगे — सिर्फ इसलिए नहीं कि तुम होशियार हो, बल्कि इसलिए कि तुम्हारा दिल सही जगह पर है। ज्ञान दिमाग में रहता है, लेकिन बुद्धि दिल में। और तुम्हारे पास वह बुद्धि है।"`,
  ],
  "Tenali Raman_HI_super": [
`एक बार राजा कृष्णदेवराय ने सोचा, "अगर मेरे राज्य में हर व्यक्ति को वही मिले जिसके वह हकदार है, तो क्या होगा?" उन्होंने तेनाली रामन को बुलाया और यह काम सौंपा। रामन ने {childname} को साथ लिया और शहर में घूमने निकले। पहले वे एक मेहनती किसान के पास गए जो सुबह से शाम तक खेतों में काम करता था। रामन ने राजा के आदेश के बारे में बताया। किसान ने कहा, "मुझे बस एक अच्छा हल चाहिए ताकि मैं और अच्छी फसल उगा सकूँ।" फिर वे एक अमीर सेठ के पास गए। सेठ ने कहा, "मुझे और सोना चाहिए, और बड़ा महल चाहिए।" फिर वे एक भिखारी के पास गए। भिखारी ने कहा, "मुझे सिर्फ एक मौका चाहिए — कुछ सीखने का, कुछ करने का।" {childname} ने देखा कि सबसे गरीब व्यक्ति की इच्छा सबसे बुद्धिमानी भरी थी। रामन ने कहा, "राजा को सच्चा न्याय चाहिए तो उसे लोगों को मौके देने चाहिए, न कि केवल धन बाँटने चाहिए।"`,
`विजयनगर में एक बार भयंकर अकाल पड़ा। फसलें सूख गईं, नदियाँ सूख गईं, और लोग भूखों मरने लगे। राजा ने अपने खलिहानों से अनाज बाँटना शुरू किया, लेकिन पर्याप्त नहीं था। तेनाली रामन ने एक योजना बनाई। उन्होंने {childname} को बुलाया और कहा, "हमें लोगों को सिर्फ मछली देने के बजाय उन्हें मछली पकड़ना सिखाना होगा।" उन्होंने शहर के बाहर एक बड़ा तालाब खोदने का काम शुरू किया। सैकड़ों लोगों ने इसमें हाथ बँटाया। हर व्यक्ति जो काम करता, उसे अनाज मिलता। जब तालाब बन गया, तो उसमें मछलियाँ पाली गईं और चारों ओर खेतों की सिंचाई हुई। तेनाली रामन ने लोगों को मछली पकड़ना, खेती करना और पानी बचाना सिखाया। अकाल खत्म होने के बाद भी, वह तालाब और वहाँ सीखी गई तकनीकें वर्षों तक शहर को लाभ देती रहीं। {childname} ने समझ लिया कि असली मदद वह है जो लोगों को आत्मनिर्भर बनाए, न कि जो उन्हें दूसरों पर निर्भर रखे।`,
`अपने आखिरी दिन विजयनगर में, {childname} तेनाली रामन के साथ मंदिर गया। मंदिर बहुत बड़ा और सुंदर था, जिसमें नक्काशीदार खंभे और रंगीन कांच की खिड़कियाँ थीं। {childname} ने पूछा, "रामन जी, जब लोग मंदिर में प्रार्थना करते हैं, तो क्या भगवान उनकी सुनते हैं?" रामन मुस्कुराए और बोले, "मंदिर वह जगह है जहाँ तुम अपने दिल की सुन सकते हो। असली प्रार्थना वह नहीं है जो तुम माँगते हो, बल्कि वह है जो तुम महसूस करते हो — कृतज्ञता, प्रेम, करुणा। देखो, ये सारे लोग अलग-अलग भाषाएँ बोलते हैं, अलग-अलग तरीकों से पूजा करते हैं, लेकिन वे सब शांति और सुख की तलाश में हैं। और इसीलिए, हर मंदिर, हर मस्जिद, हर गुरुद्वारा, हर चर्च — वे सब एक ही बात सिखाते हैं: एक-दूसरे से प्रेम करो, एक-दूसरे की मदद करो, और उस शक्ति के प्रति आभारी रहो जिसने यह सब बनाया।"`,
`{childname} ने एक बार देखा कि तेनाली रामन सुबह-सुबह बगीचे में एक पौधे से बात कर रहे थे। "रामन जी, आप पौधे से बात क्यों कर रहे हैं?" रामन ने कहा, "यह पौधा अभी छोटा है और इसे प्रोत्साहन की ज़रूरत है। वैज्ञानिक भी मानते हैं कि पौधे प्यार और ध्यान से बड़े होते हैं।" {childname} ने भी कोशिश की। वह रोज़ उस पौधे से प्यार से बात करता, उसे पानी देता, और गाने सुनाता। कुछ महीनों में, वह पौधा सबसे बड़ा और हरा-भरा पौधा बन गया। गाँव के बाकी पौधों की तुलना में वह दोगुना बड़ा था। {childname} ने सीखा कि प्यार और ध्यान से न सिर्फ पौधे, बल्कि रिश्ते और लोग भी खिलते हैं। हर चीज़ को थोड़ा प्यार चाहिए — चाहे वह पौधा हो, जानवर हो, या इंसान।`,
`तेनाली रामन ने {childname} को एक आखिरी सबक दिया। उन्होंने एक गिलास पानी में एक चुटकी नमक डाला और कहा, "इसे चखो।" {childname} ने चखा। "कड़वा है।" फिर रामन उसे एक झील के किनारे ले गए, उसमें एक चुटकी नमक डाला और कहा, "अब झील का पानी चखो।" {childname} ने चखा। "मीठा है।" रामन मुस्कुराए। "दुख और गुस्सा नमक की तरह हैं। जब तुम छोटे दिल वाले होते हो, तो एक छोटी सी बात भी तुम्हें कड़वा कर देती है। लेकिन जब तुम्हारा दिल झील जितना बड़ा होता है, तो वही बात तुम्हें प्रभावित नहीं करती। अपने दिल को बड़ा करो — माफ करना सीखो, समझना सीखो, सहना सीखो। तब जीवन का हर अनुभव तुम्हें मीठा ही लगेगा।"`,
  ],
  Festival_HI_super: [
`{childname} ने देखा कि उसके दोस्त रोहन के घर दिवाली पर कोई सजावट नहीं थी। रोहन के पिता बीमार थे और परिवार त्योहार नहीं मना पा रहा था। {childname} को बहुत दुख हुआ। उसने अपने माता-पिता से बात की और फिर एक योजना बनाई। उसने अपने सभी दोस्तों को इकट्ठा किया और कहा, "हम सब मिलकर रोहन के लिए दिवाली मनाएँगे।" हर बच्चा कुछ न कुछ लेकर आया — कोई दीया, कोई फूल, कोई मिठाई। उन्होंने रोहन के घर को सजाया, रंगोली बनाई, और दीये जलाए। जब रोहन और उसके माता-पिता ने यह देखा, तो उनकी आँखों में आँसू आ गए — खुशी के आँसू। रोहन की माँ ने {childname} को गले लगाया और कहा, "बेटा, तुमने हमें सिखाया कि त्योहार सिर्फ अपने लिए मनाने का नाम नहीं, बल्कि दूसरों को खुश करने का नाम है।" उस रात, {childname} समझ गया कि त्योहार की सबसे बड़ी रोशनी वह दीया है जो हम दूसरों के लिए जलाते हैं।`,
`होली के दिन, गाँव में एक अजीब परंपरा थी। कुछ बड़े लड़के कमज़ोर और छोटे बच्चों पर ज़ोर से रंग फेंकते और उन्हें परेशान करते थे। {childname} को यह पसंद नहीं था। उसने सोचा, होली तो खुशी और भाईचारे का त्योहार है, डराने-धमकाने का नहीं। उसने अपने दोस्तों को इकट्ठा किया और एक नई परंपरा शुरू की। उन्होंने गाँव के बीच में एक घेरा बनाया और सबको बुलाया। "आज हम प्यार से होली खेलेंगे," {childname} ने कहा। "हर कोई हर किसी को गुलाल लगाएगा, लेकिन बिना किसी को परेशान किए। और जो कोई किसी पर ज़बरदस्ती रंग डालेगा, वह इस घेरे से बाहर खेलेगा।" शुरू में कुछ बड़े लड़कों ने मज़ाक उड़ाया, लेकिन जल्द ही सबको मज़ा आने लगा। {childname} की पहल एक नई गाँव की परंपरा बन गई, और हर साल होली पर सब याद दिलाते, "प्यार से होली खेलो, जैसे {childname} ने सिखाया था।"`,
`एक बार {childname} को रक्षा बंधन पर किसी ने राखी नहीं बाँधी। उसकी कोई बहन नहीं थी। वह उदास बैठा था। उसकी माँ ने देखा और पूछा, "क्या हुआ, बेटा?" {childname} ने कहा, "सबके पास राखी बाँधने वाली कोई है, मेरे पास कोई नहीं।" माँ मुस्कुराईं और बोलीं, "तुमने कभी सोचा है कि बहन वही नहीं जो खून का रिश्ता हो? दुनिया में कितनी लड़कियाँ हैं जिनके पास कोई भाई नहीं। क्यों न तुम उनके भाई बनो?" {childname} की आँखें चमक उठीं। उसने उस दिन गाँव की हर उस लड़की को राखी बाँधी जिसका कोई भाई नहीं था — वह उनका "रक्षा भाई" बन गया। यह परंपरा इतनी लोकप्रिय हुई कि हर साल रक्षा बंधन पर, गाँव के सभी लड़के उन लड़कियों को राखी बाँधते जिनका कोई भाई नहीं था। {childname} ने सीखा कि परिवार सिर्फ खून का नहीं, बल्कि प्यार और अपनेपन का होता है।`,
`{childname} ने एक बार पूछा, "माँ, हर त्योहार में मिठाइयाँ बाँटने का रिवाज़ क्यों है?" माँ मुस्कुराईं और बोलीं, "मिठास सिर्फ स्वाद नहीं है, बेटा। यह हमारे रिश्तों में मिठास बनाए रखने का प्रतीक है। जब हम किसी को मिठाई देते हैं, तो हम कह रहे होते हैं, 'मेरे जीवन में तुम्हारी मौजूदगी मीठी है। तुम्हारे साथ मेरा रिश्ता मीठा है।'" {childname} ने अगले त्योहार पर अपने उन दोस्तों को मिठाई दी जिनसे उसका मनमुटाव था। पहले तो वे हिचकिचाए, फिर मुस्कुराए और मिठाई ले ली। उस दिन, {childname} ने सीखा कि एक छोटी सी मिठाई कड़वी यादों को भी मीठा कर सकती है। त्योहार सिर्फ जश्न नहीं हैं — वे रिश्तों को सुधारने, माफ करने, और एक-दूसरे के करीब आने के मौके हैं।`,
`{childname} के गाँव में एक ईसाई परिवार रहता था जो क्रिसमस मनाता था। दूसरे गाँव वाले उन्हें अजीब समझते थे, क्योंकि वे दिवाली या होली नहीं मनाते थे। {childname} ने सोचा, "त्योहार तो सबको खुश करने के लिए होते हैं, अलग-अलग होने से क्या फर्क पड़ता है?" उसने क्रिसमस के दिन उस परिवार के घर जाकर उन्हें मिठाई दी और "मेरी क्रिसमस" बोला। वे बहुत खुश हुए। उन्होंने {childname} को केक खिलाया और क्रिसमस की कहानी सुनाई। अगले साल, {childname} ने अपने दोस्तों को भी साथ बुलाया। धीरे-धीरे, पूरा गाँव क्रिसमस पर उनके घर जाने लगा। बदले में, वे परिवार भी दिवाली और होली में शामिल होने लगा। {childname} ने सीखा कि त्योहार अलग-अलग हो सकते हैं, लेकिन खुशी, प्यार, और साथ मिलकर जश्न मनाने की भावना एक ही होती है।`,
`{childname} के गाँव में एक नदी थी जो सालों से सूख गई थी। त्योहारों के दौरान, बच्चे नदी में नावें चलाने के लिए तरसते थे। {childname} ने एक विचार सोचा। उसने गाँव वालों को इकट्ठा किया और एक नहर खोदने का प्रस्ताव रखा जो पास की नदी से पानी ला सके। पहले तो लोगों को संदेह था, लेकिन {childname} की बात सुनकर वे राजी हो गए। सबने मिलकर काम किया — किसान ने अपना बैल दिया, बढ़ई ने औज़ार दिए, मज़दूरों ने अपनी ताकत लगाई। तीन महीने बाद, नहर तैयार हुई और पानी बहने लगा। उस दिवाली, बच्चों ने नदी में दीये बहाए और खुशी से नाचे। गाँव वालों ने {childname} को धन्यवाद दिया। {childname} ने कहा, "अकेला कोई कुछ नहीं कर सकता, लेकिन सब मिलकर कुछ भी कर सकते हैं। त्योहार हमें यही सिखाते हैं — एक साथ आना और एक साथ जश्न मनाना।"`,
  ],
  "Moral Story_HI_super": [
`{childname} के गाँव में एक बूढ़ी महिला रहती थी जो बहुत गरीब थी। उसके बेटे शहर में काम करते थे और उसे अकेला छोड़ गए थे। वह अकेली और उदास रहती थी। एक दिन, {childname} ने देखा कि वह महिला अपने घर के बाहर बैठी रो रही है। {childname} उसके पास गया और पूछा, "दादी, आप क्यों रो रही हैं?" उसने कहा, "मुझे याद भी कोई नहीं करता। मेरे बेटे महीने में एक बार भी फोन नहीं करते।" {childname} को उस पर बहुत दया आई। उसने हर रविवार को उस दादी के पास जाना शुरू किया। वह उसके लिए खाना ले जाता, उसकी सफाई करता, और उसकी कहानियाँ सुनता। धीरे-धीरे, दादी फिर से मुस्कुराने लगीं। जब उसके बेटों को पता चला, तो वे शर्मिंदा हुए और वापस गाँव आ गए। उन्होंने {childname} का धन्यवाद किया। {childname} ने कहा, "किसी को याद करने से बड़ा कोई उपहार नहीं है। बस इतना करो कि उन्हें बताओ कि वे अकेले नहीं हैं।"`,
`एक गर्मी की दोपहर, {childname} को एक चीख सुनाई दी। वह आवाज़ की तरफ़ भागा और देखा कि एक छोटी सी बिल्ली का बच्चा एक पुराने कुएँ में गिर गया था। वह डर से म्याऊँ-म्याऊँ कर रहा था। {childname} ने चारों ओर देखा — कोई बड़ा व्यक्ति आस-पास नहीं था। वह कुएँ में उतरना चाहता था, लेकिन वह बहुत गहरा था। तब उसने एक रस्सी देखी। उसने रस्सी को एक पेड़ से बाँधा, दूसरे सिरे को अपनी कमर पर बाँधा, और धीरे-धीरे कुएँ में उतर गया। बिल्ली का बच्चा डरा हुआ था, लेकिन {childname} ने उसे प्यार से उठाया और अपनी टोकरी में रख लिया। फिर उसने रस्सी पकड़कर ऊपर चढ़ना शुरू किया। ऊपर आते-आते उसके हाथ छिल गए थे, लेकिन उसने हार नहीं मानी। आखिरकार, वह बिल्ली के बच्चे को सुरक्षित बाहर निकाल लाया। गाँव वालों ने यह देखा और {childname} की बहादुरी की तारीफ की। {childname} ने कहा, "मैंने सिर्फ एक जीवन बचाया। यह कोई बड़ी बात नहीं है।" लेकिन गाँव वालों ने कहा, "बेटा, एक जीवन बचाना सबसे बड़ी बात है।"`,
`एक साल, {childname} के गाँव में एक नया शिक्षक आया। वह बहुत सख्त था और बच्चों को पीटता था। सब बच्चे उससे डरते थे। एक दिन, उसने {childname} के एक दोस्त को बहुत मारा। {childname} गुस्से से भर गया। वह सीधे गाँव के मुखिया के पास गया और बोला, "यह शिक्षक बच्चों को मारता है। यह गलत है।" मुखिया ने शिक्षक को बुलाया और पूछताछ की। शिक्षक ने झूठ बोला, "मैंने किसी को नहीं मारा।" तब {childname} ने अपने दोस्त को बुलाया, जिसकी पीठ पर निशान थे। मुखिया ने सच देख लिया। शिक्षक को निकाल दिया गया। {childname} ने सीखा कि अन्याय के खिलाफ आवाज उठाना हमेशा सही है, भले ही तुम अकेले क्यों न हो। अपने दोस्त के लिए खड़ा होना कोई बुराई नहीं है — यह सबसे बड़ी अच्छाई है जो एक इंसान कर सकता है।`,
`एक बार {childname} को एक मुश्किल फैसला लेना था। उसके सबसे अच्छे दोस्त ने परीक्षा में नकल की थी, और शिक्षक ने पूछा कि किसने नकल की। {childname} जानता था कि उसके दोस्त ने की है, लेकिन अगर उसने सच बोला तो उसका दोस्त मुसीबत में पड़ जाएगा और उनकी दोस्ती खत्म हो जाएगी। अगर उसने झूठ बोला तो वह खुद झूठा बन जाएगा। {childname} ने अपने दादा से सलाह मांगी। दादा ने कहा, "बेटा, सच्चाई और दोस्ती दोनों महत्वपूर्ण हैं, लेकिन सही काम वह है जो सबको बेहतर इंसान बनने में मदद करे।" {childname} अपने दोस्त के पास गया और बोला, "मैं तुमसे प्यार करता हूँ, लेकिन मैं झूठ नहीं बोल सकता। कृपया तुम खुद शिक्षक को सच बता दो।" दोस्त ने पहले गुस्सा किया, फिर रोया, और फिर शिक्षक के पास जाकर सच कबूल किया। शिक्षक ने उसे सजा दी, लेकिन उसकी ईमानदारी की तारीफ़ भी की। दोस्त ने {childname} से कहा, "तुम सच्चे दोस्त हो। तुमने मुझे एक बड़ा सबक सिखाया।"`,
`{childname} के गाँव में एक बार एक महान व्यक्ति आए — एक स्वामी जो पूरे भारत में घूम चुके थे। गाँव वालों ने उनके लिए एक भोज का आयोजन किया। सबसे अमीर आदमी ने सबसे अच्छी जगह पर बैठने की कोशिश की, लेकिन स्वामी ने उसे रोका और {childname} को अपने पास बुलाया। "यह बच्चा मेरे बगल में बैठेगा," स्वामी ने कहा। लोग हैरान थे। स्वामी ने समझाया, "मैंने पूरे देश में घूमकर देखा है कि अमीर लोग अपने धन के कारण घमंडी हो जाते हैं, और गरीब लोग अपनी गरीबी के कारण शर्मीले हो जाते हैं। लेकिन इस बच्चे ने मुझे देखकर न तो घमंड किया और न ही शर्माया। इसने मुझे सिर्फ एक इंसान की तरह देखा। यही असली बड़प्पन है — किसी को उसकी हैसियत से नहीं, बल्कि उसके होने से आँकना।" {childname} ने सीखा कि सच्चा सम्मान वह है जो बिना किसी अपेक्षा के दिया जाए।`,
`{childname} ने एक बार देखा कि गाँव का एक लड़का रोज़ स्कूल के बाद एक पेड़ के नीचे बैठकर रोता था। {childname} उसके पास गया और पूछा, "तुम क्यों रोते हो?" लड़के ने बताया, "मेरे पिता बहुत गरीब हैं और मुझे स्कूल भेजने का खर्च नहीं उठा सकते। मुझे डर है कि कल से मैं स्कूल नहीं आ पाऊँगा।" {childname} ने उस लड़के की बात गुरुजी को बताई। गुरुजी ने उसे मुफ्त में पढ़ाने का फैसला किया। {childname} ने उस लड़के को अपनी पुरानी किताबें और कॉपियाँ दीं, और उसे रोज़ पढ़ाया। सालों बाद, वह लड़का एक बड़ा डॉक्टर बना। वह {childname} के पास आया और बोला, "अगर तुम उस दिन मेरे पास नहीं आते, तो मैं आज डॉक्टर नहीं होता। तुमने मेरी ज़िंदगी बदल दी।" {childname} ने कहा, "मैंने सिर्फ वही किया जो किसी भी इंसान को करना चाहिए — जब कोई मदद माँगे, तो मदद करो।"`,
  ],
};

// ===== STORIES BY THEME =====
// Each entry: [title_template, full_body_template, moral]
// {childname} is replaced by the child's name

const ENGLISH_STORIES = {
  Panchatantra: [
    [
      "{childname} and the Wise Crane",
      `{childname} loved visiting {possessive} grandmother's village. The village had a beautiful pond where many birds and animals lived.

One day, {childname} was sitting by the pond when {pronoun} saw a crane standing on one leg. The crane looked very sad.

"Why are you sad, dear crane?" asked {childname}.

The crane sighed. "The fish in this pond have become very lazy. They never exercise, and now they cannot swim properly. I have tried to teach them, but they won't listen."

{childname} thought for a moment. "What if we show them that exercise can be fun?"

The crane's eyes lit up. The next morning, {childname} and the crane organized a swimming competition. All the fish gathered to watch. The crane showed them different swimming strokes, and {childname} cheered them on.

One by one, the fish started joining in. They found that swimming was not just good exercise, but also great fun!

Soon, all the fish in the pond were swimming happily and healthily. The crane was no longer sad.

The crane thanked {childname}. "You taught me that sometimes the best way to help someone is to make learning fun."

{childname} smiled. {pronoun} had learned that patience and creativity can solve any problem.`,
      "Patience and creativity can solve any problem.",
    ],
    [
      "{childname} and the Greedy Dog",
      `One afternoon, {childname} was walking home from the market with {possessive} mother. {pronoun} saw a dog running along the street with a big bone in its mouth.

The dog looked very proud of its bone. It held its head high as it trotted along. Other dogs watched with envy.

The dog came to a small bridge over a stream. As it crossed the bridge, it looked down and saw its own reflection in the water. The dog thought there was another dog in the water holding a bigger bone.

The greedy dog wanted that bigger bone too. It growled at its reflection. The reflection growled back. The dog barked angrily — and as soon as it opened its mouth, the bone fell into the water with a splash!

The dog watched helplessly as its bone sank into the stream. It had lost its own bone because it was greedy for more.

{childname} ran home and told {possessive} mother what {pronoun} had seen. "Why did the dog lose its bone, Maa?"

{possessive} mother smiled. "Because it was greedy, beta. It wanted what someone else had, and in trying to get more, it lost everything it had."

{childname} hugged {possessive} mother. "I will never be greedy. I will always be happy with what I have."`,
      "Greed leads to loss. Be happy with what you have.",
    ],
    [
      "{childname} and the Brave Sparrow",
      `In a small tree near {childname}'s house, a sparrow had built its nest. The sparrow had laid three tiny eggs and sat on them patiently every day.

{childname} watched the sparrow from {possessive} window. Every morning, {pronoun} would see the sparrow bring twigs and leaves to make the nest stronger.

One stormy night, strong winds began to blow. The tree swayed dangerously. {childname} worried about the little sparrow and its eggs. "Maa, what will happen to the sparrow?" {pronoun} asked.

The next morning, {childname} ran outside. The nest had fallen from the tree! The eggs were scattered on the ground. But the brave sparrow was still there, trying to protect them.

{childname} carefully picked up the eggs and the nest. "Don't worry, little sparrow," {pronoun} said gently. "I will help you."

{childname} found a safe place on the balcony and built a small shelter. {pronoun} put the nest there with the eggs inside. The sparrow seemed to understand. It flew to the new nest and sat on its eggs again.

Weeks passed. One morning, {childname} heard tiny chirping sounds. The eggs had hatched! Three tiny chicks were peeping out of the nest.

The sparrow chirped happily at {childname}, as if saying thank you. {childname} smiled, knowing that kindness always brings joy.`,
      "Kindness always brings joy. Be brave and help others.",
    ],
    [
      "{childname} and the Clever Rabbit",
      `Deep in the forest, all the animals lived in fear of a fierce lion. Every day, the lion demanded one animal to come to his den for his meal.

The animals gathered to discuss their problem. "We cannot go on like this," said the deer. "Tomorrow it's my turn. I have young ones at home."

{childname}, who happened to be visiting the forest, heard the animals talking. {pronoun} felt sorry for them.

A clever rabbit stepped forward. "I have a plan," said the rabbit. "Tomorrow, I will go to the lion's den. But I will be late."

The next day, the lion was very angry when the rabbit arrived late. "How dare you keep me waiting!" roared the lion.

"Please forgive me, Your Majesty," said the rabbit humbly. "I was on my way when another lion stopped me. He said he was the king of this forest, not you. He told me to go to his den instead."

The lion became furious. "Another lion? Show me where he is!"

The rabbit led the lion to a deep well. "He lives down there, Your Majesty," said the rabbit, pointing into the well.

The lion looked down and saw his own reflection in the water. He thought it was another lion. He roared angrily, and the reflection roared back. Furious, the lion jumped into the well to fight his rival — and fell into the water.

The lion climbed out, tired and soaked. He had learned his lesson. From that day on, the animals lived in peace.

{childname} told everyone about the clever rabbit's plan. {pronoun} had learned that cleverness is sometimes better than strength.`,
      "Cleverness and wit are stronger than brute force.",
    ],
    [
      "{childname} and the Friendly Elephant",
      `A kind elephant lived near {childname}'s village. The elephant was huge but very gentle. Every day, the elephant would help the villagers carry heavy loads and clear paths.

One day, a group of monkeys came to the village. They were mischievous and started causing trouble. They stole fruits from the market, threw stones at roofs, and scared the children.

The villagers were upset. They tried to chase the monkeys away, but the monkeys were too quick.

{childname} went to the elephant for help. "Dear elephant, the monkeys are troubling everyone. Can you help us?"

The elephant nodded wisely. That evening, as the monkeys were creating mischief near the pond, the elephant quietly walked over and began spraying water with its trunk. The monkeys loved water! They forgot about their mischief and started playing in the fountain.

Every day after that, the elephant would create a water fountain at a certain time. The monkeys would gather to play, and they stopped causing trouble.

The villagers were delighted. {childname} thanked the elephant. "You are so wise. Instead of fighting the monkeys, you gave them something fun to do."

The elephant smiled. "Sometimes, the best way to solve a problem is to understand what others need."`,
      "Understanding others is the key to solving problems.",
    ],
  ],

  Birbal: [
    [
      "{childname} and the Wise Birbal",
      `One day, Emperor Akbar was in a thoughtful mood. He asked his courtiers, "What is the most valuable thing in the world?"

The courtiers gave many answers. One said, "Gold!" Another said, "Diamonds!" A third said, "Power!"

The emperor turned to Birbal. "And what do you say, Birbal?"

Birbal smiled. "Your Majesty, the most valuable thing in the world is wisdom. Gold can be stolen, diamonds can be lost, and power can be taken away. But wisdom stays with you forever and grows stronger every day."

Emperor Akbar was impressed. "Excellent answer, Birbal! But can you prove that wisdom is more valuable than gold?"

The next day, Birbal invited {childname}, a young visitor to the court, to help him. "I am going to give you a choice," said Birbal. "You can either take this bag of gold coins or this empty book."

{childname} thought carefully. "I will take the book," {pronoun} said. "Gold coins can be spent and finished. But a book can teach me new things every day."

The courtiers laughed. "Foolish child! The book is empty!"

But Birbal said, "This child is wiser than all of you. {possessive} choice shows that {pronoun} values knowledge over wealth."

Emperor Akbar declared, "Today, I have learned that wisdom begins with knowing the value of knowledge. {childname}, you shall receive both the gold coins and a library full of books as a reward."`,
      "Wisdom and knowledge are more valuable than wealth.",
    ],
    [
      "The Longest Night – {childname} Learns from Birbal",
      `Emperor Akbar once asked his court, "Which night is the longest?"

The courtiers thought hard. One said the night of the full moon, another said the winter solstice. None of the answers satisfied the emperor.

Birbal was silent. The emperor noticed. "Birbal, why don't you answer?"

"I will answer tomorrow, Your Majesty," said Birbal.

That night, {childname} was visiting the palace. Birbal called {childname} and said, "Tomorrow, I want you to help me. When the emperor asks for my answer, you must look very tired, as if you did not sleep at all."

The next morning, {childname} appeared in court with dark circles under {possessive} eyes. Birbal pointed to {childname}. "Your Majesty, ask this child why {pronoun} looks so tired."

The emperor asked {childname}. "I had a stomach ache all night," said {childname}. "The night felt very long."

Birbal smiled. "Your Majesty, the longest night is the one in which you are sick or troubled. It does not matter how long the night actually is. What matters is how it feels."

The emperor laughed. "Birbal, you have once again given me a wise answer. And {childname}, your acting helped teach us all a lesson."

{childname} learned that wisdom is not just about knowing facts, but about understanding human feelings.`,
      "Wisdom is about understanding feelings, not just facts.",
    ],
    [
      "Akbar's Ring – {childname} and Birbal's Lesson",
      `Emperor Akbar had a beautiful ring that he loved very much. One day, the ring went missing. The emperor was very upset.

"Someone in this palace has stolen my ring!" he declared. "If it is not found by tomorrow, I will punish everyone."

The courtiers were scared. They searched everywhere but could not find the ring.

{childname} was in the palace visiting {possessive} uncle. {pronoun} saw how worried everyone was. {pronoun} went to Birbal for advice.

"Birbal ji, how can you find out who took the ring without accusing anyone wrongly?"

Birbal smiled. "Bring everyone to the court. Tell them I will find the thief using magic."

In the court, Birbal gave each person a stick of the same length. "The thief's stick will grow longer by tomorrow morning," he said. "Keep your stick with you tonight, and bring it back tomorrow."

The thief was afraid. If Birbal's magic was real, {possessive} stick would grow longer and reveal {pronoun}. So the thief cut a piece off {possessive} stick, thinking {pronoun} would not be caught.

The next morning, Birbal collected all the sticks. One stick was shorter than the rest. "This is the thief," said Birbal.

The thief fell at the emperor's feet and confessed. The ring was returned.

Emperor Akbar was very happy. He rewarded {childname} and Birbal. {childname} learned that a clever trick can reveal the truth without hurting anyone.`,
      "Cleverness reveals the truth without harming the innocent.",
    ],
    [
      "The Sweet Reward – {childname} Meets Birbal",
      `One day, Emperor Akbar decided to test the honesty of his subjects. He announced that anyone who could bring him the most valuable gift would be richly rewarded.

People came from all over the kingdom. Some brought gold statues, others brought silk carpets, and some brought precious jewels.

{childname} had nothing valuable to give. But {pronoun} wanted to meet the great emperor. {pronoun} went to Birbal for advice.

"Birbal ji, I have no gold or jewels. What gift can I give the emperor?"

Birbal said, "Give him a glass of water."

"A glass of water?" {childname} was confused.

"Do it," said Birbal. "But when you give it, say, 'Your Majesty, here is the most valuable gift because it is given with a pure heart.'"

{childname} did as Birbal said. Emperor Akbar was moved. "This child has given me something more precious than all the gold in the world — honesty and a pure heart."

The emperor declared {childname} the winner and gave {pronoun} a bag of gold coins.

{childname} learned that honesty and a pure heart are the most valuable gifts of all.`,
      "Honesty and a pure heart are the most valuable gifts.",
    ],
    [
      "Birbal and the Farmer – {childname} Learns Fairness",
      `A poor farmer came to Emperor Akbar's court. "Your Majesty," he said, "I saved some money over many years. I gave it to a rich merchant for safekeeping. Now he says I never gave him anything."

The merchant was called to the court. "This farmer is lying," said the merchant. "I have never seen his money."

There was no proof. The farmer had no witnesses.

The emperor was troubled. "Birbal, how can we find the truth?"

Birbal asked the farmer, "Where did you give the money to the merchant?"

"Near the old banyan tree outside the city," said the farmer.

"Go back to that tree," said Birbal, "and ask it to tell us the truth. I will send a messenger to hear what the tree says."

{childname} was watching all this. {pronoun} followed the messenger secretly. The messenger went to the tree, whispered something, and came back.

"The tree says the farmer is telling the truth," said the messenger.

The merchant turned pale. "It's true," he confessed. "The farmer gave me his money. I was trying to cheat him."

The emperor was amazed. "Birbal, how did you know the tree would speak?"

Birbal laughed. "The tree did not speak. But the guilty merchant believed it would. His fear revealed the truth."

{childname} clapped {possessive} hands. "I learned today that the truth always comes out, no matter how well you hide it."`,
      "The truth always comes out, no matter how well hidden.",
    ],
  ],

  "Tenali Raman": [
    [
      "{childname} Meets Tenali Raman",
      `In the beautiful kingdom of Vijayanagara, King Krishnadevaraya ruled with wisdom. His favorite courtier was Tenali Raman, known for his wit and humor.

One day, {childname} traveled to Vijayanagara with {possessive} parents. {pronoun} had heard stories about Tenali Raman and wanted to meet him.

In the court, a proud scholar from a faraway land was challenging the courtiers. "I have studied for thirty years," he said. "None of you can answer my questions."

The courtiers were silent. But Tenali Raman stepped forward.

"I will answer your questions," said Raman. "But first, answer one simple question from me."

The scholar agreed. Raman pointed to a pot of water. "Is this pot full or empty?"

"It is full of water, of course," said the scholar.

Raman smiled. "No. It is full of water and also empty of milk. It is full of water and empty of juice. Everything is both full and empty, depending on what you are looking for."

{childname} laughed. The scholar realized he had met his match. He bowed to Raman and left.

After the court, {childname} ran up to Raman. "That was amazing! You showed everyone that wisdom is not about how much you know, but about how you think!"

Raman patted {childname}'s head. "You are a wise child. Remember, the cleverest answers are often the simplest."`,
      "The cleverest answers are often the simplest.",
    ],
    [
      "{childname} and Raman's Pot of Sweets",
      `Tenali Raman was known for his clever tricks. One day, a wealthy merchant came to him with a complaint.

"Raman, someone has been stealing my sweets every night. I have set guards, but the thief is never caught."

Raman smiled. "Leave a pot of sweets outside your shop tonight. The thief will be caught."

{childname} was visiting Raman that day. "How will a pot of sweets catch the thief, Raman ji?" {pronoun} asked.

"Come with me tonight, and you will see," said Raman.

That night, Raman and {childname} hid near the merchant's shop. Soon, a figure crept up to the pot of sweets. The thief reached in and grabbed a handful of sweets. But when {pronoun} tried to pull {possessive} hand out, {pronoun} could not! The pot had a narrow neck — {possessive} fist was too big to come out while holding the sweets.

The thief was trapped! The guards caught {pronoun} easily.

{childname} clapped. "The thief could have escaped by letting go of the sweets!"

"Exactly," said Raman. "But {pronoun} was too greedy to let go. Greed is the real trap."

{childname} learned that day that holding on to what we want too tightly can become our own prison.`,
      "Greed traps us. Sometimes we must let go to be free.",
    ],
    [
      "{childname} and the Laughing King",
      `King Krishnadevaraya was very worried. His daughter was sick, and no medicine seemed to help. The king sat sadly in his court, unable to smile.

The whole court was silent. Nobody knew what to do.

{childname} saw the sad king and felt sorry for him. {pronoun} went to Tenali Raman. "Raman ji, can you make the king smile? Maybe laughter will help him feel better."

Raman nodded. The next day, he entered the court wearing a funny costume. He had a pot on his head, bells on his feet, and he was making silly faces.

The courtiers gasped. But Raman started dancing and singing a silly song:

"When my wife says cook, I burn the book!
When I try to swim, I sink like a stone!
But ask me to laugh, and I never do it alone!"

The king tried not to smile, but Raman's dance was too funny. A small smile appeared on his face. Then a chuckle. Then a big laugh!

Soon, the whole court was laughing. The king laughed until tears came to his eyes.

"Raman," said the king, "you have given me the best medicine of all — laughter."

After that day, the king felt much better. His daughter also started recovering.

{childname} hugged Raman. "You were right, Raman ji. Laughter really is the best medicine."`,
      "Laughter is the best medicine, even for a heavy heart.",
    ],
    [
      "{childname} and the Half-Truth",
      `One day, a man came running to Tenali Raman. "Raman, someone has stolen my horse!" he cried.

Raman asked, "When did this happen?"

"Last night," said the man.

Raman gathered all the villagers. "The thief is among us," he said. "I will find out who it is."

{childname} watched carefully. Raman gave each person a stick of the same length. "The thief's stick will grow an inch by tomorrow," said Raman.

That night, the thief cut an inch off {possessive} stick, thinking it would not grow.

The next morning, Raman collected all the sticks. One stick was shorter. "This is the thief," said Raman.

The thief fell to {possessive} knees. "I took the horse! I am sorry!"

The villagers cheered. But Raman said something surprising. "I told a half-truth today. The stick did not really grow. But I used a clever trick to find the truth."

{childname} was confused. "Raman ji, is it okay to trick someone?"

Raman said, "Sometimes, to find the truth, we must use clever methods. But remember — the goal was to find the truth, not to harm anyone. Truth is always the final goal."

{childname} thought about this. {pronoun} learned that truth is precious, and sometimes we need wisdom to uncover it.`,
      "Truth is precious, and wisdom helps uncover it.",
    ],
    [
      "{childname} and the Weight of Knowledge",
      `A proud scholar came to Vijayanagara claiming to know everything. "Ask me any question," he boasted, "and I will answer it."

The courtiers tried to stump him, but the scholar answered every question.

King Krishnadevaraya turned to Tenali Raman. "Raman, can you defeat this scholar?"

Raman smiled. "Bring me a donkey," he said.

{childname} was surprised. "A donkey, Raman ji? What will a donkey do?"

Soon, a donkey was brought to the court. Raman stood next to the donkey and said to the scholar, "You claim to know everything. But can you tell me — how much does this donkey weigh?"

The scholar laughed. "That's easy. Give me a scale."

"But we don't have a scale," said Raman. "So tell me the weight without weighing it."

The scholar was stuck. "That's impossible! You cannot know the weight without a scale!"

Raman smiled. "You see, true knowledge is not about knowing everything. It is about knowing how to use what you know. A simple farmer knows how to weigh a donkey using simple methods. But you, with all your book knowledge, are stuck."

The scholar bowed his head and left.

{childname} understood the lesson. "Knowing facts is not enough. Real wisdom is knowing how to use your knowledge in real life."`,
      "Real wisdom is knowing how to use your knowledge.",
    ],
  ],

  Festival: [
    [
      "{childname}'s Diwali Adventure",
      `Diwali was {childname}'s favorite festival. The house was decorated with bright diyas and colorful rangoli. The sweet smell of ladoos filled the air.

But this Diwali was special. {childname}'s grandmother told a story about the original Diwali — the day Lord Rama returned to Ayodhya.

"Long, long ago," said Grandmother, "Lord Rama, his wife Sita, and his brother Lakshmana returned to their kingdom after fourteen years in the forest. The people of Ayodhya were so happy that they lit oil lamps all along the way to welcome them home."

{childname} listened with wide eyes. "So Diwali is about light winning over darkness?"

"Yes, beta," said Grandmother. "It is about love winning over hate and goodness winning over evil."

That evening, {childname} helped {possessive} mother light diyas all around the house. Each diya was like a tiny star. {childname} placed them carefully on the stairs, windows, and balcony.

Then came the fireworks! {childname} watched the sky explode with colors — reds, greens, and golds. The whole neighborhood was lit up with joy.

"We should also light a diya for those who have less," said {childname}'s mother.

{childname} nodded and took some sweets and new clothes to the children who lived on the street. Their smiles were brighter than any firework.

That night, {childname} realized the true meaning of Diwali. It was not just about lights and sweets. It was about sharing joy with everyone.`,
      "Diwali teaches us that light wins over darkness and sharing brings real joy.",
    ],
    [
      "{childname}'s Holi Celebration",
      `Spring had arrived, and Holi was here! {childname} woke up to the sound of drums and happy shouts. The whole neighborhood was ready to celebrate.

{childname}'s mother had prepared special gujiya sweets and thandai. {possessive} father had bought organic colors made from flowers.

{childname} ran out with {possessive} water gun. The streets were already full of children and adults, all covered in bright colors.

But one boy was sitting alone, looking sad. His clothes were old and torn. He had no colors to play with.

{childname} went to him. "Why are you sitting alone? Come and play with us!"

The boy shook his head. "I don't have any colors," he said softly.

{childname} ran home and brought a packet of colors. "Here, take this. Let's play together!"

The boy's face lit up. Soon, he was running with {childname}, splashing colors and laughing.

When {childname}'s mother saw the two children playing, she smiled. "That is the true spirit of Holi, beta. Holi is about forgetting differences and coming together."

At the end of the day, everyone gathered in the community square. They shared sweets and stories. The boy hugged {childname}. "Thank you. This was the best Holi of my life."

{childname} felt a warm glow inside. Sharing made the festival twice as joyful.`,
      "Holi is about togetherness. Sharing colors means sharing joy.",
    ],
    [
      "{childname}'s Dussehra Lesson",
      `The village was preparing for Dussehra. A tall effigy of Ravana was being built in the ground. {childname} watched excitedly as workers put the final touches on the giant puppet.

"What is Dussehra all about, Papa?" asked {childname}.

{possessive} father sat down beside {pronoun}. "Dussehra celebrates the victory of Lord Rama over the demon king Ravana. It reminds us that good always wins over evil."

"But Ravana was very powerful," said {childname}. "How did Rama defeat him?"

"Rama had something stronger than power — he had goodness on his side. He was honest, kind, and brave. And he had help from those who loved him."

On the night of Dussehra, {childname} watched as the effigy of Ravana was set on fire. Sparks flew into the night sky as the giant figure crumbled.

"This is what happens to evil," said {possessive} father. "It may seem big and strong, but goodness always wins in the end."

That night, {childname} thought about the lesson. "I want to be like Lord Rama," {pronoun} said. "I want to be brave and kind, no matter what."

{possessive} mother kissed {possessive} forehead. "That is the best way to celebrate Dussehra, beta."`,
      "Good always wins over evil if you stay honest and brave.",
    ],
    [
      "{childname}'s Raksha Bandhan",
      `Raksha Bandhan morning, {childname} woke up excited. Today, {pronoun} would tie a rakhi on {possessive} big brother's wrist.

{childname}'s brother, Rohan, was working in another city. He had come home specially for the festival.

{childname} had made a special rakhi at school — it was woven with bright red and gold threads, with a small bead in the middle.

"Happy Raksha Bandhan, Bhaiya!" {childname} said, tying the rakhi on Rohan's wrist.

Rohan smiled and gave {childname} a gift. "I will always protect you," he said.

"But Bhaiya," said {childname}, "what does protection really mean?"

Rohan thought for a moment. "It means being there for each other. Not just physically, but also emotionally. It means supporting each other's dreams and standing up for each other."

{childname} smiled. "Then I will protect you too, Bhaiya!"

Their mother watched with tears in her eyes. "That is the true meaning of Raksha Bandhan. It is not just about a thread. It is a promise of love and care between siblings."

That evening, the whole family had dinner together. {childname} felt that the best part of the festival was being with family.`,
      "Raksha Bandhan is a promise of love and protection between siblings.",
    ],
    [
      "{childname}'s Pongal Celebrations",
      `In Tamil Nadu, Pongal was being celebrated with great joy. {childname} was visiting {possessive} grandmother's farm for the festival.

The fields were golden with ripe sugarcane. The cows were decorated with bells and colorful beads.

"Pongal is a harvest festival," explained Grandmother. "We thank the sun, the earth, and the cows for giving us food."

{childname} helped prepare the special Pongal dish — rice boiled in milk with jaggery and nuts. The pot was placed outside, and everyone watched as the milk boiled over.

"Pongalo Pongal!" shouted Grandmother as the milk overflowed. "This means abundance and prosperity!"

{childname} was given a piece of sugarcane to chew. It was so sweet! "Why do we celebrate Pongal, Paati?" {pronoun} asked.

"We celebrate to say thank you," said Grandmother. "For the sun that shines, the rain that falls, the earth that grows our food. Without all these, we would have nothing."

{childname} looked at the golden fields and felt grateful. {pronoun} helped {possessive} grandmother feed the cows and offer prayers.

That evening, the whole village gathered to dance and sing. {childname} joined in, feeling happy and thankful.

"I will always remember to say thank you for the food I eat," {childname} told {possessive} grandmother.

Grandmother smiled. "That is the real spirit of Pongal, beta."`,
      "Pongal teaches us gratitude for nature and our food.",
    ],
  ],

  "Moral Story": [
    [
      "{childname} and the Honest Woodcutter",
      `Long ago, in a small village, there lived a poor woodcutter. He had a young helper named {childname}.

Every day, they would go to the forest to cut wood. The woodcutter was very honest. He never took more wood than they needed.

One day, while cutting wood near a river, the woodcutter's axe slipped from his hand and fell into the deep water.

"Oh no!" cried the woodcutter. "That was my only axe!"

{childname} felt sad for him. Just then, a fairy appeared from the river. "Why are you crying?" she asked.

"I have lost my axe," said the woodcutter.

The fairy dove into the river and came back with a golden axe. "Is this yours?" she asked.

The woodcutter shook his head. "No, that is not mine."

The fairy dove again and came back with a silver axe. "Is this yours?"

"No," said the woodcutter.

The fairy dove a third time and came back with an old iron axe. "Is this yours?"

"Yes!" said the woodcutter happily. "That is my axe!"

The fairy was impressed by the woodcutter's honesty. "You are an honest man," she said. "I will give you all three axes as a reward."

{childname} learned that day that honesty is always rewarded. The woodcutter returned home with three axes, and {childname} never forgot the lesson of truthfulness.`,
      "Honesty is always rewarded in the end.",
    ],
    [
      "{childname} and the Kind Boy",
      `There was a new boy in {childname}'s school. His name was Arjun. Arjun was very shy and did not have many friends. Other children made fun of his old clothes and broken lunch box.

{childname} saw Arjun sitting alone during lunch. {pronoun} went and sat beside him.

"Hi, I'm {childname}. Want to share my lunch?"

Arjun looked up with surprise. "You... you want to sit with me?"

"Of course!" said {childname}.

From that day on, {childname} and Arjun became best friends. They played together, studied together, and shared their lunches.

One day, there was a drawing competition at school. Arjun's drawing won first prize! The whole school clapped for him.

After the competition, Arjun came to {childname}. "Thank you for being my friend," he said. "When nobody wanted to sit with me, you did. You made me feel like I belonged."

{childname} smiled. "Everyone deserves a friend, Arjun. I'm glad we are friends."

{possessive} teacher saw this and said, "Kindness is a language that everyone understands. {childname}, you have shown us all what true friendship means."

{childname} felt warm inside. {pronoun} had learned that a small act of kindness can change someone's life.`,
      "Kindness costs nothing but can change someone's life forever.",
    ],
    [
      "{childname} and the Lost Puppy",
      `One stormy evening, {childname} heard a whimpering sound outside the door. {pronoun} opened the door and found a tiny, wet puppy shivering in the rain.

"Oh, you poor thing!" {childname} picked up the puppy and brought it inside.

"Can we keep him, Maa?" {childname} asked.

{possessive} mother looked at the puppy. "We can keep him tonight, but tomorrow we must find his owner. Someone must be looking for him."

The next morning, {childname} and {possessive} mother put up posters around the neighborhood. "Found: Small brown puppy. Very friendly."

Days passed. Nobody came to claim the puppy. {childname} took care of it — fed it, bathed it, and played with it. They became best friends.

Finally, after a week, a little girl came to {childname}'s door. "That's my puppy, Chiku!" she cried happily. "He ran away during the storm!"

{childname} felt a pang of sadness. {pronoun} had grown attached to the puppy. But seeing the little girl's joy, {pronoun} hugged Chiku one last time and handed him over.

"Thank you for taking care of him," said the little girl.

That night, {childname}'s mother said, "I am proud of you, beta. Doing the right thing is not always easy, but you showed great kindness and honesty."

{childname} smiled through happy tears. {pronoun} had learned that doing the right thing was its own reward.`,
      "Doing the right thing is not always easy, but it is its own reward.",
    ],
    [
      "{childname} and the Magic Pebbles",
      `One day, {childname}'s grandfather gave {pronoun} a small pouch. Inside were five plain pebbles.

"These are magic pebbles," said Grandfather. "Every time you do a good deed, one pebble will turn to gold."

{childname} was excited. {pronoun} ran outside looking for ways to do good deeds.

That day, {childname} helped an old woman carry her groceries. When {pronoun} checked the pouch, one pebble had turned to gold! {pronoun} helped {possessive} mother cook dinner. Another pebble turned to gold!

But the next day, {childname} was so focused on getting gold pebbles that {pronoun} started doing good deeds just for the reward. The pebbles stopped turning gold.

Confused, {childname} went to Grandfather. "Why did the magic stop?"

Grandfather smiled. "The magic was never about the pebbles, beta. It was about helping others with a pure heart. When you helped for the reward, it was no longer a good deed."

{childname} understood. From that day on, {pronoun} helped others without expecting anything in return. And every time {pronoun} did, {pronoun} felt a warm glow inside — more precious than any gold.`,
      "True kindness comes from the heart, not from expecting rewards.",
    ],
    [
      "{childname} and the Broken Promise",
      `{childname} promised {possessive} best friend, Priya, that {pronoun} would come to her birthday party. "I promise I will be there!" said {childname}.

But on the day of the party, {childname} got an invitation to a magic show at the same time. The magic show seemed much more fun.

"Should I go to the magic show instead?" {childname} thought. "Priya will have many other friends at her party. She won't miss me."

{childname} went to the magic show. It was amazing — rabbits, doves, and colorful ribbons!

But the next day at school, Priya looked very sad. "I waited for you," she said quietly. "I had saved a piece of cake for you."

{childname} felt terrible. "I'm so sorry, Priya. I went to a magic show. I broke my promise."

Priya's eyes filled with tears. {childname} felt even worse.

That night, {childname} told {possessive} mother what happened. "How can I make it right, Maa?"

"Go to Priya tomorrow," said {possessive} mother, "and tell her you are truly sorry. Then show her that you can be trusted by keeping your promises from now on."

The next day, {childname} apologized to Priya and gave her a small gift. {pronoun} promised never to break a promise again.

It took time, but Priya forgave {childname}. {childname} learned that promises are precious and breaking them hurts the people we love.`,
      "A promise is precious. Always keep your word.",
    ],
  ],
};

const HINDI_STORIES = {
  Panchatantra: [
    [
      "{childname} और बुद्धिमान सारस",
      `{childname} को अपनी दादी के गाँव जाना बहुत पसंद था। गाँव में एक सुंदर तालाब था जहाँ कई पक्षी और जानवर रहते थे।

एक दिन, {childname} तालाब के पास बैठा था। उसने देखा कि एक सारस एक पैर पर खड़ा है और बहुत उदास लग रहा है।

"तुम उदास क्यों हो, प्यारे सारस?" {childname} ने पूछा।

सारस ने आह भरी। "इस तालाब की मछलियाँ बहुत आलसी हो गई हैं। वे कभी व्यायाम नहीं करतीं और अब ठीक से तैर भी नहीं सकतीं।"

{childname} ने एक पल सोचा। "क्या हम उन्हें दिखा सकते हैं कि व्यायाम मज़ेदार भी हो सकता है?"

अगली सुबह, {childname} और सारस ने एक तैराकी प्रतियोगिता आयोजित की। सारस ने मछलियों को अलग-अलग तैराकी के तरीके दिखाए।

धीरे-धीरे सभी मछलियाँ खेल में शामिल हो गईं। उन्होंने पाया कि तैरना न सिर्फ अच्छा व्यायाम है बल्कि बहुत मज़ेदार भी है।

सारस ने {childname} का धन्यवाद किया। "तुमने मुझे सिखाया कि कभी-कभी मदद करने का सबसे अच्छा तरीका सीखने को मज़ेदार बनाना है।"`,
      "धैर्य और रचनात्मकता किसी भी समस्या का समाधान कर सकते हैं।",
    ],
    [
      "{childname} और लालची कुत्ता",
      `एक दोपहर, {childname} बाज़ार से घर लौट रहा था। उसने एक कुत्ते को मुँह में बड़ी हड्डी दबाए भागते देखा।

कुत्ता अपनी हड्डी पर बहुत घमंड कर रहा था। वह एक छोटे पुल पर चढ़ा। नीचे नदी में उसने अपनी परछाई देखी। उसे लगा कि पानी में दूसरा कुत्ता है जिसके पास बड़ी हड्डी है।

लालची कुत्ता वह हड्डी भी चाहता था। उसने भौंकना शुरू कर दिया — और जैसे ही उसने मुँह खोला, हड्डी पानी में गिर गई!

कुत्ता असहाय होकर देखता रहा जैसे उसकी हड्डी नदी में डूब गई। लालच के कारण उसने अपनी हड्डी खो दी।

{childname} ने यह कहानी अपनी माँ को सुनाई। माँ ने कहा, "लालच बुरी बला है, बेटा। जो दूसरों की चीज़ चाहता है, वह अपनी भी खो देता है।"`,
      "लालच बुरी बला है। जो पास है उसमें संतोष करो।",
    ],
  ],

  Birbal: [
    [
      "{childname} और बुद्धिमान बीरबल",
      `एक दिन, बादशाह अकबर ने अपने दरबारियों से पूछा, "दुनिया में सबसे कीमती चीज़ क्या है?"

एक ने कहा, "सोना!" दूसरे ने कहा, "हीरे!" तीसरे ने कहा, "ताकत!"

बीरबल मुस्कुराए। "बादशाह सलामत, दुनिया में सबसे कीमती चीज़ ज्ञान है। सोना चोरी हो सकता है, हीरे खो सकते हैं, ताकत छीनी जा सकती है। लेकिन ज्ञान हमेशा आपके पास रहता है।"

{childname} दरबार में मौजूद था। बीरबल ने कहा, "बच्चे, तुम बताओ — सोने के सिक्के लोगे या एक खाली किताब?"

{childname} ने सोचा और कहा, "मैं किताब लूँगा। सोने के सिक्के खत्म हो सकते हैं, लेकिन किताब मुझे रोज़ नई चीज़ें सिखा सकती है।"

बादशाह अकबर ने कहा, "इस बच्चे ने आज मुझे सिखाया कि ज्ञान ही सबसे बड़ी संपत्ति है।"`,
      "ज्ञान और बुद्धि धन से अधिक मूल्यवान हैं।",
    ],
  ],

  "Tenali Raman": [
    [
      "{childname} की मुलाकात तेनाली रामन से",
      `विजयनगर साम्राज्य में राजा कृष्णदेवराय बुद्धिमानी से शासन करते थे। उनके दरबार में तेनाली रामन अपनी बुद्धि और हास्य के लिए प्रसिद्ध थे।

एक दिन, {childname} अपने माता-पिता के साथ विजयनगर आया। उसने तेनाली रामन के बारे में बहुत कहानियाँ सुनी थीं।

दरबार में एक घमंडी विद्वान आया। "मैंने तीस साल पढ़ाई की है," उसने कहा। "कोई भी मेरे सवालों का जवाब नहीं दे सकता।"

तेनाली रामन आगे बढ़े। "पहले मेरा एक सवाल जवाब दो।" उन्होंने पानी के घड़े की ओर इशारा किया। "यह घड़ा भरा है या खाली?"

"पानी से भरा है," विद्वान ने कहा।

रामन मुस्कुराए। "नहीं। यह पानी से भरा है और दूध से खाली भी है। हर चीज़ भरी और खाली दोनों है — यह इस पर निर्भर करता है कि तुम क्या ढूंढ रहे हो।"

{childname} ने ताली बजाई। रामन ने {childname} से कहा, "याद रखो, सबसे चतुर जवाब अक्सर सबसे सरल होते हैं।"`,
      "सबसे चतुर जवाब अक्सर सबसे सरल होते हैं।",
    ],
  ],

  Festival: [
    [
      "{childname} का दिवाली का साहसिक कार्य",
      `दिवाली {childname} का सबसे पसंदीदा त्योहार था। घर दीयों और रंगोली से सजाया गया था। मिठाइयों की खुशबू हर जगह फैली हुई थी।

{childname} की दादी ने असली दिवाली की कहानी सुनाई — जिस दिन भगवान राम अयोध्या लौटे थे।

उस शाम, {childname} ने अपनी माँ की मदद से पूरे घर में दीये जलाए। हर दीया एक छोटे तारे जैसा लग रहा था।

फिर आतिशबाजी शुरू हुई! आसमान रंगों से भर गया।

{childname} की माँ ने कहा, "हमें उन लोगों के लिए भी दीया जलाना चाहिए जिनके पास कम है।"

{childname} ने सिर हिलाया और पड़ोस के गरीब बच्चों को मिठाई और नए कपड़े दिए। उनकी मुस्कान किसी भी आतिशबाजी से ज़्यादा चमकीली थी।

उस रात, {childname} ने दिवाली का असली अर्थ समझा — खुशी बाँटने से बढ़ती है।`,
      "दिवाली हमें सिखाती है कि उजाला अंधेरे पर जीतता है और बाँटने से खुशी बढ़ती है।",
    ],
  ],

  "Moral Story": [
    [
      "{childname} और ईमानदार लकड़हारा",
      `बहुत समय पहले, एक छोटे से गाँव में एक गरीब लकड़हारा रहता था। उसके साथ एक युवा सहायक था — {childname}।

एक दिन, नदी के पास लकड़ी काटते समय लकड़हारे की कुल्हाड़ी फिसलकर गहरे पानी में गिर गई।

लकड़हारा बहुत दुखी हुआ। तभी एक परी नदी से प्रकट हुई। उसने सोने की कुल्हाड़ी निकाली। "क्या यह तुम्हारी है?"

"नहीं," लकड़हारे ने कहा।

परी ने चाँदी की कुल्हाड़ी निकाली। "यह?"

"नहीं।"

परी ने लोहे की कुल्हाड़ी निकाली। "यह?"

"हाँ!" लकड़हारा खुश हुआ।

परी ने कहा, "तुम बहुत ईमानदार हो। मैं तुम्हें तीनों कुल्हाड़ियाँ देती हूँ।"

{childname} ने उस दिन सीखा कि ईमानदारी का हमेशा इनाम मिलता है।`,
      "ईमानदारी का हमेशा इनाम मिलता है।",
    ],
  ],
};

const TELUGU_STORIES = {
  Panchatantra: [
    [
      "{childname} మరియు తెలివైన కొంగ",
      `{childname} తన అమ్మమ్మ గ్రామాన్ని సందర్శించడానికి ఇష్టపడేది. ఆ గ్రామంలో ఒక అందమైన చెరువు ఉండేది, అక్కడ చాలా పక్షులు మరియు జంతువులు నివసించేవి.

ఒక రోజు, {childname} చెరువు దగ్గర కూర్చున్నప్పుడు, ఒక కొంగ ఒక కాలుమీద నిలబడి విచారంగా ఉండడం చూసింది.

"ఎందుకు విచారంగా ఉన్నావు, ప్రియమైన కొంగ?" {childname} అడిగింది.

కొంగ నిట్టూర్చింది. "ఈ చెరువులోని చేపలు చాలా సోమరిగా మారాయి. అవి వ్యాయామం చేయవు, ఈత కొట్టలేవు."

{childname} ఒక క్షణం ఆలోచించింది. "వ్యాయామం సరదాగా ఉంటుందని వాటికి చూపిద్దామా?"

మరుసటి రోజు, {childname} మరియు కొంగ ఈత పోటీని నిర్వహించాయి. కొంగ వివిధ ఈత పద్ధతులను చూపించింది. క్రమంగా, అన్ని చేపలు ఆటలో చేరాయి.

కొంగ {childname}కి ధన్యవాదాలు తెలిపింది. "నేర్చుకోవడాన్ని సరదాగా మార్చడమే సహాయం చేయడానికి ఉత్తమ మార్గం అని నీవు నాకు నేర్పించావు."`,
      "సహనం మరియు సృజనాత్మకత ఏ సమస్యనైనా పరిష్కరించగలవు.",
    ],
  ],
  Birbal: [
    [
      "{childname} మరియు బుద్ధిమంతుడైన బీర్బల్",
      `ఒక రోజు, చక్రవర్తి అక్బర్ తన ఆస్థానంలో ఇలా అడిగాడు, "ప్రపంచంలో అత్యంత విలువైన వస్తువు ఏమిటి?"

ఒక సభికుడు చెప్పాడు, "బంగారం!" మరొకడు చెప్పాడు, "వజ్రాలు!" మూడవవాడు చెప్పాడు, "శక్తి!"

బీర్బల్ నవ్వాడు. "మహారాజా, అత్యంత విలువైన వస్తువు జ్ఞానం. బంగారం దొంగిలించబడవచ్చు, వజ్రాలు పోవచ్చు, శక్తి తీసివేయబడవచ్చు. కానీ జ్ఞానం ఎప్పుడూ మీతో ఉంటుంది."

{childname} ఆస్థానంలో ఉన్నాడు. బీర్బల్ అడిగాడు, "పిల్లా, నీకు ఏమి కావాలి — బంగారు నాణేలా లేక ఖాళీ పుస్తకమా?"

{childname} ఆలోచించి చెప్పాడు, "నేను పుస్తకం తీసుకుంటాను. బంగారు నాణేలు ఖర్చు చేస్తే అయిపోతాయి, కానీ పుస్తకం నాకు ప్రతిరోజూ కొత్త విషయాలు నేర్పించగలదు."

చక్రవర్తి అక్బర్ సంతోషించి, "ఈ పిల్లవాడు జ్ఞానం యొక్క విలువను అర్థం చేసుకున్నాడు" అని చెప్పాడు.`,
      "జ్ఞానం మరియు బుద్ధి సంపద కంటే విలువైనవి.",
    ],
  ],
  "Tenali Raman": [
    [
      "{childname} మరియు తెనాలి రామన్",
      `విజయనగర సామ్రాజ్యంలో, రాజు కృష్ణదేవరాయలు బుద్ధితో పరిపాలించేవారు. వారి ఆస్థానంలో తెనాలి రామన్ తన తెలివితేటలకు ప్రసిద్ధి చెందాడు.

ఒక రోజు, {childname} తన తల్లిదండ్రులతో విజయనగరానికి వచ్చాడు. అతను తెనాలి రామన్ గురించి చాలా కథలు విన్నాడు.

ఆస్థానంలో ఒక గర్విష్ఠి పండితుడు వచ్చి, "నేను ముప్పై సంవత్సరాలు చదువుకున్నాను. నా ప్రశ్నలకు ఎవరూ సమాధానం చెప్పలేరు" అని అన్నాడు.

తెనాలి రామన్ ముందుకు వచ్చి, ఒక నీటి కుండను చూపించి, "ఈ కుండ నిండి ఉందా లేదా ఖాళీగా ఉందా?" అని అడిగాడు.

"నీటితో నిండి ఉంది," పండితుడు చెప్పాడు.

రామన్ నవ్వాడు. "లేదు. ఇది నీటితో నిండి ఉంది మరియు పాలతో ఖాళీగా ఉంది. ప్రతి వస్తువు నిండి మరియు ఖాళీ రెండూ — అది నీవు ఏమి వెతుకుతున్నావు అనే దానిపై ఆధారపడి ఉంటుంది."

{childname} చప్పట్లు కొట్టాడు. రామన్ అతనితో చెప్పాడు, "గుర్తుంచుకో, తెలివైన సమాధానాలు తరచుగా సరళమైనవి."`,
      "తెలివైన సమాధానాలు తరచుగా సరళమైనవి.",
    ],
  ],
  Festival: [
    [
      "{childname} దీపావళి సాహసం",
      `దీపావళి {childname}కి అత్యంత ఇష్టమైన పండుగ. ఇల్లు దీపాలు మరియు రంగవల్లితో అలంకరించబడింది. మిఠాయిల వాసన ప్రతి చోటా వ్యాపించింది.

{childname} అమ్మమ్మ దీపావళి నిజమైన కథ చెప్పింది — లార్డ్ రాముడు అయోధ్యకు తిరిగి వచ్చిన రోజు.

ఆ సాయంత్రం, {childname} తన తల్లికి సహాయం చేస్తూ ఇంటి చుట్టూ దీపాలు వెలిగించాడు. ప్రతి దీపం ఒక చిన్న నక్షత్రంలా మెరిసింది.

తరువాత, ఆకాశంలో బాణసంచా వెలిగింది! ఆకాశం రంగులతో నిండిపోయింది.

{childname} తల్లి చెప్పింది, "తక్కువ ఉన్నవారి కోసం కూడా దీపం వెలిగించాలి."

{childname} పొరుగున ఉన్న పేద పిల్లలకు మిఠాయిలు మరియు కొత్త బట్టలు ఇచ్చాడు. వారి నవ్వు ఏ బాణసంచా కంటే ప్రకాశవంతంగా ఉంది.

ఆ రాత్రి, {childname} దీపావళి యొక్క నిజమైన అర్థాన్ని అర్థం చేసుకున్నాడు — పంచుకోవడం వల్ల ఆనందం రెట్టింపు అవుతుంది.`,
      "దీపావళి మనకు వెలుగు చీకటిపై గెలుస్తుందని మరియు పంచుకోవడం వల్ల ఆనందం వస్తుందని బోధిస్తుంది.",
    ],
  ],
  "Moral Story": [
    [
      "{childname} మరియు నిజాయితీపరుడైన కట్టెలు కొట్టేవాడు",
      `చాలా కాలం క్రితం, ఒక చిన్న గ్రామంలో ఒక పేద కట్టెలు కొట్టేవాడు నివసించేవాడు. అతనికి {childname} అనే ఒక యువ సహాయకుడు ఉండేవాడు.

ఒక రోజు, నది దగ్గర కట్టెలు కొడుతుండగా, అతని గొడ్డలి జారి నీటిలో పడింది.

కట్టెలు కొట్టేవాడు చాలా బాధపడ్డాడు. అప్పుడు ఒక దేవత నది నుండి ప్రత్యక్షమైంది. ఆమె బంగారు గొడ్డలిని తీసుకువచ్చింది. "ఇది నీదా?" అని అడిగింది.

"కాదు," కట్టెలు కొట్టేవాడు చెప్పాడు.

దేవత వెండి గొడ్డలిని తీసుకువచ్చింది. "ఇది నీదా?"

"కాదు."

దేవత ఇనుప గొడ్డలిని తీసుకువచ్చింది. "ఇది నీదా?"

"అవును!" కట్టెలు కొట్టేవాడు సంతోషంగా చెప్పాడు.

దేవత చాలా సంతోషించింది. "నీవు చాలా నిజాయితీపరుడివి. నేను మూడు గొడ్డళ్ళూ నీకు బహుమతిగా ఇస్తున్నాను."

{childname} ఆ రోజు నిజాయితీకి ఎల్లప్పుడూ ప్రతిఫలం ఉంటుందని నేర్చుకుంది.`,
      "నిజాయితీకి ఎల్లప్పుడూ ప్రతిఫలం ఉంటుంది.",
    ],
  ],
};

const TAMIL_STORIES = {
  Panchatantra: [
    [
      "{childname} மற்றும் புத்திசாலி கொக்கு",
      `{childname} தனது பாட்டி கிராமத்திற்கு செல்ல விரும்பினார். அந்த கிராமத்தில் ஒரு அழகான குளம் இருந்தது, அங்கு பல பறவைகள் மற்றும் விலங்குகள் வசித்தன.

ஒரு நாள், {childname} குளத்தின் அருகில் அமர்ந்திருந்தபோது, ஒரு கொக்கு ஒரு காலில் நின்று மிகவும் வருத்தமாக இருப்பதைக் கண்டார்.

"ஏன் வருத்தமாக இருக்கிறாய், அன்பான கொக்கே?" {childname} கேட்டார்.

கொக்கு பெருமூச்சு விட்டது. "இந்த குளத்தில் உள்ள மீன்கள் மிகவும் சோம்பேறியாகிவிட்டன. அவை உடற்பயிற்சி செய்யாததால் சரியாக நீந்த முடியவில்லை."

{childname} ஒரு கணம் யோசித்தார். "உடற்பயிற்சி வேடிக்கையாக இருக்கும் என்பதை அவற்றிற்குக் காட்டலாமா?"

அடுத்த நாள் காலை, {childname} மற்றும் கொக்கு ஒரு நீச்சல் போட்டியை ஏற்பாடு செய்தன. மெதுவாக, அனைத்து மீன்களும் விளையாட்டில் சேர்ந்தன.

கொக்கு {childname}க்கு நன்றி தெரிவித்தது. "சில நேரங்களில் உதவி செய்வதற்கான சிறந்த வழி, கற்றலை வேடிக்கையாக மாற்றுவது என்பதை நீ எனக்குக் கற்றுக் கொடுத்தாய்."`,
      "பொறுமையும் படைப்பாற்றலும் எந்தப் பிரச்சினையையும் தீர்க்கலாம்.",
    ],
  ],
  Birbal: [
    [
      "{childname} மற்றும் புத்திசாலி பீர்பால்",
      `ஒரு நாள், பேரரசர் அக்பர் தனது அவையில் கேட்டார், "உலகில் மிகவும் மதிப்புமிக்க பொருள் எது?"

ஒரு அமைச்சர் சொன்னார், "தங்கம்!" இன்னொருவர் சொன்னார், "வைரங்கள்!" மூன்றாமவர் சொன்னார், "சக்தி!"

பீர்பால் சிரித்தார். "மன்னரே, மிகவும் மதிப்புமிக்க பொருள் ஞானம். தங்கம் திருடப்படலாம், வைரங்கள் இழக்கப்படலாம், சக்தி பறிக்கப்படலாம். ஆனால் ஞானம் எப்போதும் உங்களுடன் இருக்கும்."

{childname} அரசவையில் இருந்தார். பீர்பால் கேட்டார், "குழந்தாய், உனக்கு எது வேண்டும் — தங்க நாணயமா அல்லது வெற்றுப் புத்தகமா?"

{childname} யோசித்து சொன்னார், "நான் புத்தகத்தை எடுப்பேன். தங்க நாணயங்கள் செலவழித்தால் முடிந்துவிடும், ஆனால் புத்தகம் எனக்கு ஒவ்வொரு நாளும் புதிய விஷயங்களைக் கற்றுத் தரும்."

பேரரசர் அக்பர் மகிழ்ந்து, "இந்தக் குழந்தை ஞானத்தின் மதிப்பைப் புரிந்து கொண்டது" என்றார்.`,
      "ஞானமும் புத்தியும் செல்வத்தை விட மதிப்புமிக்கவை.",
    ],
  ],
  "Tenali Raman": [
    [
      "{childname} மற்றும் தெனாலி ராமன்",
      `விஜயநகர சாம்ராஜ்யத்தில், மன்னர் கிருஷ்ணதேவராயர் ஞானத்துடன் ஆட்சி செய்தார். அவரது அரசவையில் தெனாலி ராமன் தனது புத்திக்கூர்மைக்கு புகழ் பெற்றிருந்தார்.

ஒரு நாள், {childname} தனது பெற்றோருடன் விஜயநகரத்திற்கு வந்தார். அவர் தெனாலி ராமனைப் பற்றி நிறைய கதைகள் கேட்டிருந்தார்.

அரசவையில் ஒரு கர்வம் கொண்ட பண்டிதர் வந்து, "நான் முப்பது வருடங்கள் படித்திருக்கிறேன். என் கேள்விகளுக்கு யாரும் பதில் சொல்ல முடியாது" என்றார்.

தெனாலி ராமன் முன்னே வந்து, ஒரு தண்ணீர் பானையைக் காட்டி, "இந்தப் பானை நிரம்பியுள்ளதா அல்லது காலியாக உள்ளதா?" என்று கேட்டார்.

"தண்ணீரால் நிரம்பியுள்ளது," பண்டிதர் சொன்னார்.

ராமன் சிரித்தார். "இல்லை. இது தண்ணீரால் நிரம்பியுள்ளது மற்றும் பாலால் காலியாக உள்ளது. ஒவ்வொரு பொருளும் நிரம்பியும் காலியுமாக உள்ளது — நீங்கள் எதைத் தேடுகிறீர்கள் என்பதைப் பொறுத்தது."

{childname} கைதட்டினார். ராமன் அவரிடம் சொன்னார், "நினைவில் வைத்துக்கொள், புத்திசாலியான பதில்கள் பெரும்பாலும் எளிமையானவை."`,
      "புத்திசாலியான பதில்கள் பெரும்பாலும் எளிமையானவை.",
    ],
  ],
  Festival: [
    [
      "{childname}வின் தீபாவளி சாகசம்",
      `தீபாவளி {childname}வின் மிகவும் பிடித்த பண்டிகை. வீடு விளக்குகள் மற்றும் கோலங்களால் அலங்கரிக்கப்பட்டது. இனிப்புகளின் வாசனை எங்கும் பரவியது.

{childname}வின் பாட்டி தீபாவளியின் உண்மையான கதையைச் சொன்னார் — லார்ட் ராமர் அயோத்திக்குத் திரும்பிய நாள்.

அந்த மாலை, {childname} தனது தாய்க்கு உதவி செய்து வீடு முழுவதும் விளக்குகளை ஏற்றினார். ஒவ்வொரு விளக்கும் ஒரு சிறிய நட்சத்திரம் போல் பிரகாசித்தது.

பின்னர், வானவேடிக்கை தொடங்கியது! வானம் வண்ணங்களால் நிரம்பியது.

{childname}வின் தாய் சொன்னார், "குறைவாக உள்ளவர்களுக்காகவும் விளக்கு ஏற்ற வேண்டும்."

{childname} அக்கம் பக்கத்தில் உள்ள ஏழை குழந்தைகளுக்கு இனிப்புகள் மற்றும் புதிய ஆடைகளை கொடுத்தார். அவர்களின் சிரிப்பு எந்த வானவேடிக்கையையும் விட பிரகாசமாக இருந்தது.

அந்த இரவு, {childname} தீபாவளியின் உண்மையான அர்த்தத்தைப் புரிந்து கொண்டார் — பகிர்வதால் மகிழ்ச்சி இரட்டிப்பாகும்.`,
      "தீபாவளி ஒளி இருளை வெல்லும் என்றும் பகிர்வதால் மகிழ்ச்சி வரும் என்றும் கற்பிக்கிறது.",
    ],
  ],
  "Moral Story": [
    [
      "{childname} மற்றும் நேர்மையான விறகு வெட்டி",
      `நெடுங்காலத்திற்கு முன்பு, ஒரு சிறிய கிராமத்தில் ஒரு ஏழை விறகு வெட்டி வாழ்ந்தான். அவனுக்கு {childname} என்ற ஒரு இளம் உதவியாளர் இருந்தார்.

ஒரு நாள், ஆற்றங்கரையில் விறகு வெட்டிக்கொண்டிருந்தபோது, அவனுடைய கோடாரி நழுவி ஆழமான தண்ணீரில் விழுந்தது.

விறகு வெட்டி மிகவும் வருத்தப்பட்டான். அப்போது ஒரு தேவதை ஆற்றிலிருந்து தோன்றினாள். அவள் தங்கக் கோடாரியை எடுத்து வந்தாள். "இது உன்னுடையதா?" என்று கேட்டாள்.

"இல்லை," விறகு வெட்டி சொன்னான்.

தேவதை வெள்ளிக் கோடாரியை எடுத்து வந்தாள். "இது உன்னுடையதா?"

"இல்லை."

தேவதை இரும்புக் கோடாரியை எடுத்து வந்தாள். "இது உன்னுடையதா?"

"ஆமாம்!" விறகு வெட்டி மகிழ்ச்சியுடன் சொன்னான்.

தேவதை மிகவும் மகிழ்ந்தாள். "நீ மிகவும் நேர்மையானவன். நான் மூன்று கோடாரிகளையும் உனக்குப் பரிசாகத் தருகிறேன்."

{childname} அந்த நாளில் நேர்மைக்கு எப்போதும் வெகுமதி உண்டு என்பதைக் கற்றுக்கொண்டார்.`,
      "நேர்மைக்கு எப்போதும் வெகுமதி உண்டு.",
    ],
  ],
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const GENDERS = ["boy", "girl"];

function baseStory(gender) {
  return {
    pronoun: gender === "boy" ? "he" : "she",
    Pronoun: gender === "boy" ? "He" : "She",
    possessive: gender === "boy" ? "his" : "her",
    Possessive: gender === "boy" ? "His" : "Her",
  };
}

async function main() {
  console.log("Deleting existing stories...");
  await supabase.from("story_templates").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  let total = 0;
  const storyMap = {
    English: ENGLISH_STORIES,
    Hindi: HINDI_STORIES,
    Telugu: TELUGU_STORIES,
    Tamil: TAMIL_STORIES,
  };

  for (const lang of ["English", "Hindi", "Telugu", "Tamil"]) {
    const themeStories = storyMap[lang];
    if (!themeStories) continue;

    for (const theme of Object.keys(themeStories)) {
      const storiesList = themeStories[theme];
      if (!storiesList || storiesList.length === 0) continue;

      for (const ages of ["3-4", "5-6", "7-8", "9-10"]) {
        const toInsert = [];

        for (let n = 0; n < 5; n++) {
          const template = storiesList[n % storiesList.length];
          const gender = pick(GENDERS);
          const g = baseStory(gender);
          const title = template[0];
          const fullBody = template[1];
          const moral = template[2];

          let body = fullBody;
          if (lang === "English" || lang === "Hindi") {
            const langSuffix = lang === "English" ? "EN" : "HI";
            for (const suffix of ["", "_extra", "_final", "_super"]) {
              const expandKey = `${theme}_${langSuffix}${suffix}`;
              const expansions = EXPAND[expandKey] || [];
              if (expansions.length > 0) {
                const filled = expansions.map(e =>
                  e.replace(/\{pronoun\}/g, g.pronoun)
                   .replace(/\{Pronoun\}/g, g.Pronoun)
                   .replace(/\{possessive\}/g, g.possessive)
                   .replace(/\{Possessive\}/g, g.Possessive)
                );
                body = body + '\n\n' + filled.join('\n\n');
              }
            }
          }
          body = body
            .replace(/\{pronoun\}/g, g.pronoun)
            .replace(/\{Pronoun\}/g, g.Pronoun)
            .replace(/\{possessive\}/g, g.possessive)
            .replace(/\{Possessive\}/g, g.Possessive);

          const wc = wordCount(body);
          const mins = Math.max(5, Math.ceil(wc / 200));

          toInsert.push({
            title,
            language: lang,
            age_group: ages,
            theme,
            body,
            moral,
            reading_time_mins: mins,
          });
        }

        if (toInsert.length > 0) {
          const { error } = await supabase.from("story_templates").insert(toInsert);
          if (error) {
            console.error(`ERROR ${theme}/${lang}/${ages}: ${error.message}`);
          } else {
            console.log(`✓ ${theme} / ${lang} / ${ages} — ${toInsert.length} stories`);
            total += toInsert.length;
          }
        }
      }
    }
  }

  console.log(`\nDone! Total stories seeded: ${total}`);
}

main().catch(console.error);
