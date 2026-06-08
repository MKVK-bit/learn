document.addEventListener('DOMContentLoaded', () => {
    const tasks = [
        // Week 1: Foundation
        { day: 1, title: "The 'Why' Journal", content: "Write down three specific reasons why you want to improve your communication. Keep this list visible." },
        { day: 2, title: "The Communication Mirror", content: "Record a 2-minute video of yourself talking about your favorite hobby. Watch it back to notice your natural gestures." },
        { day: 3, title: "Active Listening", content: "In every conversation today, wait 2 seconds after the other person finishes before you speak." },
        { day: 4, title: "The Filler Word Hunt", content: "Record yourself for 1 minute. Count how many times you say 'um', 'like', or 'uh'." },
        { day: 5, title: "The Paraphrase", content: "In one conversation, repeat back what you heard: 'So, what I'm hearing is...' to ensure you understood correctly." },
        { day: 6, title: "Observation Walk", content: "Spend 10 minutes in a public place (park/cafe) observing people's body language without hearing their words." },
        { day: 7, title: "Reflection", content: "Review your notes from the week. What was the hardest task? Write one thing you'll focus on next week." },
        // Week 2: Non-Verbal
        { day: 8, title: "The Power Posture", content: "Practice standing tall with shoulders back for 2 minutes before any interaction today." },
        { day: 9, title: "Eye Contact Challenge", content: "Aim to maintain eye contact for 3–5 seconds with everyone you speak to today." },
        { day: 10, title: "The Smile Experiment", content: "Consciously smile at three strangers today (e.g., a cashier or neighbor)." },
        { day: 11, title: "Open vs. Closed", content: "Avoid crossing your arms or legs during conversations today to practice 'open' body language." },
        { day: 12, title: "Hand Gesture Awareness", content: "Use your hands to emphasize points while speaking, rather than keeping them in your pockets." },
        { day: 13, title: "The 'Nod' Technique", content: "Use slow, deliberate nodding while listening to show you are engaged." },
        { day: 14, title: "Mirroring", content: "Subtly match the posture or energy level of the person you are talking to." },
        // Week 3: Verbal Clarity
        { day: 15, title: "Volume Control", content: "Practice speaking slightly louder than usual in one low-stakes interaction (like ordering coffee)." },
        { day: 16, title: "The 'W & H' Method", content: "Ask only open-ended questions starting with Who, What, Where, When, or How." },
        { day: 17, title: "Eliminate Fillers", content: "Try to replace one 'um' with a purposeful pause today." },
        { day: 18, title: "Specific Gratitude", content: "Give one person a specific compliment: 'I appreciated how you handled that...' rather than just 'Good job'." },
        { day: 19, title: "Tone Check", content: "Say the same sentence ('I'm fine') in three different tones (happy, sad, angry) to see how meaning changes." },
        { day: 20, title: "The 'I' Statement", content: "Practice expressing a feeling using 'I feel [emotion] when [action]' instead of 'You always...'" },
        { day: 21, title: "Storytelling", content: "Tell a 1-minute story about something funny that happened recently to a friend or family member." },
        // Week 4: Social Integration
        { day: 22, title: "The Small Talk Starter", content: "Start a conversation with one person you don't know well (e.g., 'How's your day going?')." },
        { day: 23, title: "The 'Congruence' Test", content: "Ensure your face matches your words (e.g., if you say you're happy, make sure you look happy)." },
        { day: 24, title: "Group Observation", content: "In a group setting, notice who is the most effective communicator and why." },
        { day: 25, title: "The Opinion Share", content: "Share your honest (but polite) opinion on a neutral topic like a movie or news story." },
        { day: 26, title: "Phone Call Challenge", content: "Call someone instead of texting to practice real-time verbal cues." },
        { day: 27, title: "The 'Mute' Negotiation", content: "Try to convey a simple need (like 'I'm hungry') using only non-verbal cues to a friend." },
        { day: 28, title: "Deep Listening", content: "Have a 15-minute conversation where you focus 100% on the other person's needs and feelings." },
        { day: 29, title: "The 'Elevator Pitch'", content: "Practice introducing yourself and what you do in under 30 seconds." },
        { day: 30, title: "Final Review", content: "Record one last video. Compare it to Day 2. Celebrate your progress! You've completed the challenge." }
    ];

    const grid = document.getElementById('challenge-grid');
    if (!grid) return; // Not on challenge page

    const modal = document.getElementById('task-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.getElementById('close-modal');
    const completeBtn = document.getElementById('complete-task');
    let currentTaskDay = null;

    // Load progress from localStorage
    let completedDays = JSON.parse(localStorage.getItem('mkvk_progress')) || [];

    const updateUI = () => {
        const progressPercent = (completedDays.length / 30) * 100;
        document.getElementById('progress-bar').style.width = `${progressPercent}%`;
        document.getElementById('progress-text').innerText = `${completedDays.length}/30 Days`;

        // Refresh grid
        grid.innerHTML = '';
        tasks.forEach(task => {
            const isCompleted = completedDays.includes(task.day);
            const card = document.createElement('div');
            card.className = `day-card ${isCompleted ? 'completed' : ''}`;
            card.innerHTML = `
                <h3>Day ${task.day}</h3>
                <p style="font-size: 0.9rem; margin-bottom: 0.5rem; height: 3rem; overflow: hidden;">${task.title}</p>
                <div class="status">${isCompleted ? '✓ Done' : 'View Task'}</div>
            `;
            card.onclick = () => openModal(task);
            grid.appendChild(card);
        });
    };

    const openModal = (task) => {
        currentTaskDay = task.day;
        modalTitle.innerText = `Day ${task.day}: ${task.title}`;
        modalContent.innerText = task.content;
        
        const isCompleted = completedDays.includes(task.day);
        completeBtn.innerText = isCompleted ? "Mark as Incomplete" : "Mark as Completed";
        completeBtn.style.background = isCompleted ? "#ef4444" : "var(--primary)";
        
        modal.style.display = 'flex';
    };

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

    completeBtn.onclick = () => {
        if (completedDays.includes(currentTaskDay)) {
            completedDays = completedDays.filter(d => d !== currentTaskDay);
        } else {
            completedDays.push(currentTaskDay);
        }
        localStorage.setItem('mkvk_progress', JSON.stringify(completedDays));
        updateUI();
        modal.style.display = 'none';
    };

    updateUI();
});
