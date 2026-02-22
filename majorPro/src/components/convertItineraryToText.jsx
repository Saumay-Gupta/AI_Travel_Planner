// function convertItineraryToText(aiText) {

//   // Match: Day1 - 18 Dec
//   console.log(aiText);
//   const dayTitles = aiText.match(/Day\d+\s*-\s*[^\n]+/g) || [];

//   // Split content after each Day title
//   const dayBlocks = aiText
//     .split(/Day\d+\s*-\s*[^\n]+\n/)
//     .slice(1);

//   return dayBlocks.map((block, index) => {

//     const activities = block
//       .split("\n")
//       .map(line => line.trim())
//       .filter(Boolean)
//       .map(line => {
//         // Split only on FIRST "-"
//         const splitIndex = line.indexOf("-");
//         if (splitIndex === -1) return null;

//         return {
//           time: line.slice(0, splitIndex).trim(),
//           text: line.slice(splitIndex + 1).trim()
//         };
//       })
//       .filter(Boolean);

//     return {
//       day: dayTitles[index],
//       activities
//     };
//   });
// }

// export default convertItineraryToText;
function convertItineraryToText(aiText) {

  const lines = aiText
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  const grouped = {};

  lines.forEach(line => {
    // Match: Day1 - 09:00 - Activity
    const match = line.match(/^Day(\d+)\s*-\s*([\d:]+)\s*-\s*(.+)$/);

    if (!match) return;

    const dayNumber = match[1];
    const time = match[2];
    const text = match[3];

    const dayKey = `Day ${dayNumber}`;

    if (!grouped[dayKey]) {
      grouped[dayKey] = [];
    }

    grouped[dayKey].push({ time, text });
  });

  return Object.keys(grouped).map(day => ({
    day,
    activities: grouped[day]
  }));
}

export default convertItineraryToText;
