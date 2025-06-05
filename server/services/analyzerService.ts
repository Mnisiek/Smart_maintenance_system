export function mockAnalyzeMessage(message: string) {
  const lower = message.toLowerCase();
  const highKeywords = ["overflow", "leak", "gas", "fire", "burst", "flood",
    "smoke", "explosion", "toxic", "carbon monoxide", "alarm", "emergency",
    "danger", "evacuation", "shock", "burning", "collapse", "hospital",
    "life-threatening", "critical", "power outage"];

  const mediumKeywords = ["broken", "jammed", "clogged", "noisy", "stuck",
    "dripping", "low pressure", "blocked", "malfunction", "dim light",
    "door won't close", "window won't open", "unstable", "rattling",
    "loose", "draft", "slow drain", "wet floor", "scratched", "flickering",];
  const lowKeywords = ["paint", "cosmetic", "dusty", "squeaky", "stained",
    "loose knob", "scuffed", "misaligned", "chipped paint", "wobbly chair",
    "faded", "dull", "needs polishing", "dirty", "outdated", "light flicker",
    "minor", "discoloration", "tilted", "marks", "furniture arrangement", ];

  let priority = 'low';
  let keywords: string[] = [];
  let score = 0;

  if (highKeywords.some(k => lower.includes(k))) {
    priority = 'high';
    keywords = highKeywords.filter(k => lower.includes(k));
    score = 0.9;
  } else if (mediumKeywords.some(k => lower.includes(k))) {
    priority = 'medium';
    keywords = mediumKeywords.filter(k => lower.includes(k));
    score = 0.6;
  } else {
    keywords = lowKeywords.filter(k => lower.includes(k));
    score = 0.3;
  }

  return {
    keywords,
    urgencyIndicators: keywords.length,
    priorityScore: score,
    priority
  };
}