// Store moods in localStorage
function recordMood(mood) {
    const today = new Date().toLocaleDateString();
    const moodData = {
        date: today,
        mood: mood
    };

    let moods = JSON.parse(localStorage.getItem('moods')) || [];
    moods.push(moodData);
    localStorage.setItem('moods', JSON.stringify(moods));

    displayMoodHistory();
    updateMoodStats();
}

// Display mood history
function displayMoodHistory() {
    const moods = JSON.parse(localStorage.getItem('moods')) || [];
    const historyList = document.getElementById('mood-history');
    historyList.innerHTML = '';

    moods.forEach(moodData => {
        const listItem = document.createElement('li');
        listItem.textContent = `${moodData.date}: ${moodData.mood}`;
        historyList.appendChild(listItem);
    });
}

// Update analytics (most frequent mood)
function updateMoodStats() {
    const moods = JSON.parse(localStorage.getItem('moods')) || [];
    if (moods.length === 0) {
        document.getElementById('most-frequent-mood').textContent = 'Most frequent mood: N/A';
        return;
    }

    const moodCounts = {};
    moods.forEach(moodData => {
        if (moodCounts[moodData.mood]) {
            moodCounts[moodData.mood]++;
        } else {
            moodCounts[moodData.mood] = 1;
        }
    });

    let mostFrequentMood = '';
    let highestCount = 0;
    for (const mood in moodCounts) {
        if (moodCounts[mood] > highestCount) {
            highestCount = moodCounts[mood];
            mostFrequentMood = mood;
        }
    }

    document.getElementById('most-frequent-mood').textContent = `Most frequent mood: ${mostFrequentMood}`;
}

// Load the mood history and stats when the page loads
document.addEventListener('DOMContentLoaded', function() {
    displayMoodHistory();
    updateMoodStats();
});
