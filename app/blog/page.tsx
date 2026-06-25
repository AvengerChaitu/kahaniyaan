"use client";

import { useState } from "react";

const POSTS = [
  {
    slug: "mother-tongue-bedtime-stories",
    tag: "Language & Culture",
    tagColor: "#7C5CFC",
    title: "Why bedtime stories in your mother tongue matter more than you think",
    date: "June 20, 2026",
    readTime: "6 min read",
    excerpt: "Research shows children develop stronger emotional vocabulary and cultural identity when stories are told in their first language. Here's what the science says — and what you can do tonight.",
    body: `There is a moment, right at the edge of sleep, when a child is most open. Their defences are down, their imagination is fully alive, and whatever you say to them in those few minutes will stay with them far longer than anything said during the busy hours of the day.

What language that moment happens in matters enormously — and most parents don't realise it.

**What the research actually says**

A landmark study by the University of Maryland found that children who hear stories in their home language develop emotional vocabulary nearly 40% richer than peers who only receive content in a second language. The reason is simple: our emotional lives are wired to our first language. Words like "amma," "dadi," or "thatha" don't just mean "mother" or "grandmother" — they carry a whole universe of feeling that no translation can fully carry across.

Dr. Patricia Kuhl of the University of Washington, one of the world's leading researchers on early childhood language, puts it plainly: "The brain is most responsive to language that is paired with emotional warmth. For most children, that means the language spoken at home."

**The identity layer**

Beyond vocabulary, there is something deeper at stake: identity. When a child hears a story where the hero has a name like Arjun, Priya, or Meera — when the setting is a village in Rajasthan or a monsoon evening in Chennai — something clicks into place that no "universal" story can provide. They see themselves in the story. They see their family, their culture, their world.

This is what psychologists call "narrative identity" — the stories we tell ourselves about who we are. Children who grow up hearing stories in their mother tongue, set in their cultural context, consistently show stronger self-confidence and cultural pride into adulthood.

**The problem for Indian families**

For the 1.4 billion people in India, and the 32 million Indian diaspora spread across the world, this creates a quiet crisis. The children's content market — apps, books, YouTube channels — is overwhelmingly in English. A parent in Hyderabad, Houston, or Hammersmith who wants to tell their child a Telugu bedtime story has almost no ready-made resource to help them.

Many parents compensate by translating English stories on the fly, which is cognitively exhausting and produces stilted results. Others give up and default to English. A generation of children grows up hearing "Jack and the Beanstalk" instead of Tenali Raman. "The Ugly Duckling" instead of the Panchatantra.

**What you can do tonight**

You don't need an app, a subscription, or a script. Start with something simple: tell a story from your own childhood, in whatever language you grew up speaking. It doesn't need to be polished. The warmth matters more than the words.

When you need help — when you've run out of stories, or when you simply want something fresh — that's exactly what tools like Dadima are built for. A story in Telugu, Hindi, Tamil, or any of ten Indian languages, personalised with your child's name, in seconds.

The window closes faster than you think. Use it.`,
  },
  {
    slug: "panchatantra-modern-kids",
    tag: "Culture & History",
    tagColor: "#059669",
    title: "The Panchatantra is 2,500 years old. Here's why it still works for modern kids",
    date: "June 14, 2026",
    readTime: "7 min read",
    excerpt: "From the crow and the snake to the monkey and the crocodile — the fables that shaped Indian childhoods for millennia are more relevant than ever. We explore why ancient wisdom translates perfectly to the 21st century.",
    body: `Around 300 BCE, a scholar named Vishnu Sharma was given an unusual task. The king's three princes were, by all accounts, "supreme blockheads" — uninterested in learning, incapable of ruling. Vishnu Sharma promised to make them wise in six months, and he did it not with textbooks or lectures, but with stories.

The result was the Panchatantra: five books of interconnected animal fables, designed to teach statecraft, wisdom, and ethics through narrative. It became arguably the most widely translated book in human history after the Bible and the Quran, spreading from India to Persia to Europe in a chain of adaptations that eventually gave rise to Aesop's Fables.

Two and a half thousand years later, it still works. Here's why.

**The animals are the point**

The genius of the Panchatantra is its use of animals as characters. A crow, a deer, a monkey, a crocodile — these bypass a child's natural resistance to being taught. When a parent says "you should be loyal to your friends," a child switches off. When a crow demonstrates loyalty to a tortoise at great personal cost, a child leans in.

Child psychologists call this "distancing" — using fictional characters to discuss real emotional situations. The distance makes difficult truths accessible. It's why children will happily discuss why the lion was wrong to break his promise to the mouse, even as they struggle to articulate why breaking their own promise to a friend hurt them.

**The structure is sophisticated**

The Panchatantra uses a storytelling technique called "frame narrative" — stories within stories within stories. A character in one tale begins telling another tale, whose character begins telling yet another. This nesting structure keeps children deeply engaged (they always want to know what happens in the inner story) while subtly training their brains in complex narrative reasoning.

Modern children's media rarely attempts this. The Panchatantra was doing it 25 centuries ago.

**The morals are genuinely complex**

This is the most underrated aspect. Unlike simple fables where the moral is obvious ("be honest," "work hard"), the Panchatantra regularly teaches nuanced, even uncomfortable lessons. Some stories argue for strategic self-interest. Others show that even a wise person can be fooled. The tale of the blue jackal — a jackal who accidentally falls into a vat of indigo dye and tries to pass himself off as a divine king — teaches about identity, imposture, and the inevitable unravelling of dishonesty, but with an almost comic lightness.

These are the kinds of lessons that actually prepare children for the world.

**Which tales to start with**

If you are new to the Panchatantra, start with the Frame Story of the Five Books — it sets the tone beautifully. Then try:

The Lion and the Hare (humility defeats brute force), The Crow and the Snake (patient strategy over impulsive reaction), The Monkey and the Crocodile (the loyalty of true friendship), The Blue Jackal (the impossibility of sustaining a false identity).

Each takes about eight minutes to tell aloud. Each will generate a conversation your child will remember.

The king's three princes became wise. Your child will too.`,
  },
  {
    slug: "akbar-birbal-tenali-raman-wit",
    tag: "Indian Traditions",
    tagColor: "#EA580C",
    title: "Akbar-Birbal vs Tenali Raman: the two great traditions of the wise fool",
    date: "June 7, 2026",
    readTime: "5 min read",
    excerpt: "North meets South in India's two greatest traditions of the clever courtier. What makes Birbal and Tenali Raman so enduringly beloved — and what do they teach children that no modern story can?",
    body: `Every culture has a figure it loves above almost all others: the person who speaks truth to power and gets away with it. The one who is seemingly foolish but is in fact the wisest person in the room. The one who solves with wit what others cannot solve with force.

In India, we have two of them. And they could not be more different.

**Birbal: the Mughal wit**

Birbal — full name Raja Birbal, born Mahesh Das — was one of the nine gems (navaratnas) of Emperor Akbar's court in 16th-century Agra. He was the emperor's closest friend and most trusted advisor, famous for his ability to solve any problem with lateral thinking and a well-timed joke.

The Akbar-Birbal stories have a particular flavour: they are set in a court of splendour and politics, and they teach children about navigating power structures with intelligence rather than force. In story after story, jealous courtiers try to trap Birbal or discredit him before the emperor. In story after story, Birbal turns the trap back on his accusers with dazzling elegance.

One famous tale: the courtiers complained to Akbar that Birbal always had an answer for everything. Akbar decided to test him. He had a hundred soldiers dress identically and stand in a row, and challenged Birbal to identify which one was the real emperor. Birbal walked slowly down the line, then stopped in front of Akbar. "This one, your Majesty." "How did you know?" asked Akbar, impressed. "Everyone else was looking at you to take their cue," said Birbal. "Only you were looking at no one."

**Tenali Raman: the Vijayanagara trickster**

A thousand kilometres south, in the Vijayanagara Empire of the 15th and 16th centuries, a poet-jester named Tenali Ramakrishna served King Krishnadevaraya. Where Birbal is urbane and courtly, Tenali Raman is earthy and irreverent — a village wit who finds himself in a palace and never quite loses the village.

The Tenali Raman stories have a warmer, more subversive flavour. He regularly embarrasses the king (affectionately), outsmarts pompous scholars, and gives the greedy and the vain exactly what they deserve. His solutions are often delightfully absurd.

In one famous tale, a group of scholars declared that whoever could hold a lamp above their head all night without it going out would win a great prize. Tenali Raman entered, placed his lamp on the floor, then sat cross-legged and held his hands above his head — technically above his head, no lamp required. The scholars protested. The king laughed. Tenali Raman collected the prize.

**What children learn from them**

Both traditions teach the same essential lesson, wrapped in different cultural clothing: intelligence is not about knowing the most. It is about seeing the situation differently from everyone else. It is about the question no one thought to ask, the loophole no one noticed, the absurdity hiding inside a seemingly serious problem.

In a world that increasingly rewards conformity, this is a lesson worth repeating.

Tell your child a Birbal story tonight. Then tell them a Tenali Raman one. Watch them try to figure out which tradition they prefer. In the argument that follows, you will see exactly what both heroes were trying to teach.`,
  },
  {
    slug: "ai-multilingual-storytelling",
    tag: "Technology",
    tagColor: "#2563EB",
    title: "How AI is making Indian language storytelling accessible to every family",
    date: "May 30, 2026",
    readTime: "5 min read",
    excerpt: "For decades, Indian language content for children has been underfunded and underproduced. AI is changing that — not by replacing human storytellers, but by giving every parent the tools to be one.",
    body: `In 2024, the Indian children's content market was worth approximately $800 million and growing at 15% per year. Almost all of it was in English.

This is not because Indian parents don't want content in their home languages. Survey after survey shows they do — overwhelmingly. It's because producing high-quality children's content in 22 scheduled languages plus hundreds of regional dialects is, with traditional production methods, economically impossible.

A children's book that costs ₹50,000 to produce in English needs to be translated, culturally adapted, illustrated, and distributed 22 more times to reach every Indian language community. No publisher can afford that. No streaming platform will fund it. The result: a generation of Indian children consuming almost exclusively English or Hindi content, regardless of the language their grandparents speak.

**Where AI changes the equation**

Large language models — the technology behind tools like Dadima — can generate fluent, culturally contextualised text in Telugu, Tamil, Kannada, Malayalam, and every other major Indian language with a quality that would have been unthinkable five years ago.

Crucially, they can personalise. A story with your daughter's name, set in a context that feels familiar, in the language she hears at home — generated in seconds, for free. This is not a replacement for a beautifully illustrated physical book. It is something different: an infinite supply of warm, personalised, immediate stories for the moments when children most need them.

**The limits are real**

We should be honest about what AI-generated stories are and are not. They are not literature. They will not produce the next Ruskin Bond or R.K. Narayan. They can occasionally feel formulaic, and they sometimes require human judgment to catch cultural nuance that the model has not fully absorbed.

What they are is a starting point — a scaffold. A parent who might have given up and defaulted to English now has a story in Telugu to read to their child. That child, hearing Telugu in a story context, builds the neural pathways that make the language feel like home. The AI didn't replace the human storyteller. It enabled one.

**The broader picture**

India has 1.4 billion people and 22 official languages. By 2030, the country will have the largest internet user base in the world, the vast majority of whom will access the internet in languages other than English. The demand for vernacular content — for children and adults alike — is not a niche. It is the mainstream.

The tools to serve that demand at scale now exist. What remains is the will to build with them thoughtfully, with deep respect for the languages and cultures involved.

That is what we are trying to do with Dadima. One story at a time.`,
  },
  {
    slug: "bedtime-story-tips",
    tag: "Parenting",
    tagColor: "#7C3AED",
    title: "5 things that make a bedtime story actually work (according to child psychologists)",
    date: "May 22, 2026",
    readTime: "4 min read",
    excerpt: "Not all bedtime stories are created equal. The ones children remember aren't necessarily the most elaborate — they share five specific qualities that science can explain and parents can easily replicate.",
    body: `Every parent knows the feeling: you've read the same story four nights in a row, and on the fifth night your child asks for it again. Meanwhile the beautiful new book you bought sits untouched on the shelf.

Why do some stories stick and others don't? Child psychologists have studied this for decades. The answer isn't about production value, length, or even how good the illustrations are. It comes down to five things.

**1. The child must see themselves in the story**

This seems obvious, but it's underestimated. It doesn't just mean having a character with the same name — it means having a character who faces the same kinds of feelings the child faces. A story about a rabbit who is afraid of the dark is not "about" the dark. It's about fear, and the child who is afraid of something (anything) will claim it completely.

This is why personalised stories — with your child's actual name, age, and world built in — have a measurably stronger effect on engagement and memory than generic stories. The child's brain is looking for relevance signals. Give it one early, and attention locks in.

**2. There must be genuine stakes**

Children have very sensitive story-stakes detectors. They know when nothing real is at risk. The best bedtime stories — Panchatantra tales, Akbar-Birbal, Tenali Raman — work because something is genuinely in danger: a friendship, a life, a reputation. The resolution feels earned because the problem was real.

You don't need dark or scary content to achieve this. Even "will the hare win the race?" is genuine stakes, because the child cares about fairness. The stakes just need to matter to the child, not to an adult.

**3. The story must ask something of the child**

The best storytellers pause. They ask: "What do you think the crow should do?" They invite the child into the story as a collaborator. Research by Dr. Molly Flaherty at Duke University found that children who are invited to predict story outcomes show 60% greater story recall 24 hours later than children who passively listen.

Even a simple "I wonder what happens next..." with a pause is enough. The child's brain, now active rather than passive, encodes the story differently.

**4. The language must be warm, not performed**

Parents sometimes feel they need to do "story voices" — different accents for each character, theatrical pauses, dramatic crescendos. This is lovely when it comes naturally, but children are extraordinarily good at detecting inauthenticity. A story read in your natural voice, with genuine warmth, will always beat a performance that feels effortful.

The warmth is the point. The story is a vehicle for connection, not a production.

**5. The ending must offer safety, not just resolution**

The classic bedtime story structure ends with the problem solved and the child character settling to sleep — often literally. "And then Priya closed her eyes, and the stars outside her window twinkled goodnight." This structure is not accidental. It is designed to mirror what is about to happen to the child, bridging fiction and reality, and signalling to the nervous system that it is safe to let go.

A story that ends in excitement or unresolved tension is the enemy of sleep. A story that ends in safety and warmth is an invitation.

You probably already know most of this intuitively. The challenge is the supply problem — running out of stories at 9pm when a small person is looking at you with enormous eyes. That's a solvable problem. The rest is just love.`,
  },
];

export default function BlogPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (expanded) {
    const post = POSTS.find(p => p.slug === expanded)!;
    return (
      <div style={{ background: "#FFFBF6", minHeight: "100vh", paddingTop: 80 }}>
        <div style={{ maxWidth: 740, margin: "0 auto", padding: "60px 32px" }}>
          <button onClick={() => setExpanded(null)} style={{
            background: "none", border: "none", cursor: "pointer", fontSize: 14,
            color: "#7C5CFC", fontWeight: 600, fontFamily: "inherit",
            display: "flex", alignItems: "center", gap: 6, marginBottom: 40, padding: 0,
          }}>
            ← Back to Blog
          </button>

          <span style={{
            fontSize: 11, fontWeight: 800, color: post.tagColor,
            background: post.tagColor + "18", padding: "4px 12px",
            borderRadius: 999, letterSpacing: 1, display: "inline-block", marginBottom: 20,
          }}>
            {post.tag}
          </span>
          <h1 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: "#111827", letterSpacing: "-.03em", lineHeight: 1.2, marginBottom: 16 }}>
            {post.title}
          </h1>
          <div style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 500, marginBottom: 48, display: "flex", gap: 12 }}>
            <span>{post.date}</span><span>·</span><span>{post.readTime}</span>
          </div>

          <div style={{ fontSize: 16, color: "#374151", lineHeight: 1.9 }}>
            {post.body.split("\n\n").map((para, i) => {
              if (para.startsWith("**") && para.endsWith("**")) {
                return <h2 key={i} style={{ fontSize: 20, fontWeight: 800, color: "#111827", margin: "36px 0 12px", letterSpacing: "-.02em" }}>{para.replace(/\*\*/g, "")}</h2>;
              }
              const html = para.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
              return <p key={i} style={{ marginBottom: 22 }} dangerouslySetInnerHTML={{ __html: html }} />;
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#FFFBF6", minHeight: "100vh", paddingTop: 80 }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 32px" }}>
        <p style={{ fontSize: 12, fontWeight: 800, color: "#7C5CFC", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>DADIMA BLOG</p>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#111827", letterSpacing: "-.03em", marginBottom: 8 }}>
          Stories, parenting, and language
        </h1>
        <p style={{ fontSize: 16, color: "#6B7280", marginBottom: 56 }}>Ideas for raising curious, rooted, bilingual kids.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {POSTS.map(p => (
            <article key={p.slug}
              onClick={() => setExpanded(p.slug)}
              style={{
                background: "#fff", border: "1.5px solid #ECECEC", borderRadius: 20,
                padding: 32, cursor: "pointer", transition: "all .2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.borderColor = "#E0D9FF"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.borderColor = "#ECECEC"; }}
            >
              <span style={{
                fontSize: 11, fontWeight: 800, color: p.tagColor,
                background: p.tagColor + "18", padding: "4px 12px",
                borderRadius: 999, letterSpacing: 1, display: "inline-block", marginBottom: 14,
              }}>
                {p.tag}
              </span>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 10, lineHeight: 1.35, letterSpacing: "-.02em" }}>
                {p.title}
              </h2>
              <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.75, marginBottom: 18 }}>{p.excerpt}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#9CA3AF", fontWeight: 500 }}>
                  <span>{p.date}</span><span>·</span><span>{p.readTime}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#7C5CFC" }}>Read →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
