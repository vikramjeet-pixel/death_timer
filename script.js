document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const calculateBtn = document.getElementById('calculate');
    const birthdateInput = document.getElementById('birthdate');
    const lifeExpectancyInput = document.getElementById('lifeExpectancy');
    const userNameInput = document.getElementById('userName');
    const themeSelect = document.getElementById('theme');
    const visualizationSelect = document.getElementById('visualization');
    const notificationsSelect = document.getElementById('notifications');
    const timerContainer = document.getElementById('timerContainer');
    const endDateElement = document.getElementById('endDate');
    const brandNameElement = document.getElementById('brandName');
    const yearsElement = document.getElementById('years');
    const monthsElement = document.getElementById('months');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const progressBar = document.getElementById('progressBar');
    const lifePercentage = document.getElementById('lifePercentage');
    const hourHand = document.getElementById('hourHand');
    const minuteHand = document.getElementById('minuteHand');
    const secondHand = document.getElementById('secondHand');
    const quoteText = document.getElementById('quoteText');
    const newQuoteBtn = document.getElementById('newQuote');
    
    // Visualization elements
    const visualizations = {
        clock: document.getElementById('clockVisualization'),
        calendar: document.getElementById('calendarVisualization'),
        blocks: document.getElementById('blocksVisualization'),
        hourglass: document.getElementById('hourglassVisualization')
    };
    
    // Calendar and blocks elements
    const calendarGrid = document.getElementById('calendarGrid');
    const blocksContainer = document.getElementById('blocksContainer');
    const hourglassTop = document.getElementById('hourglassTop');
    const hourglassBottom = document.getElementById('hourglassBottom');
    
    // Milestones elements
    const milestonesContainer = document.getElementById('milestonesContainer');
    const milestoneProgress = document.getElementById('milestoneProgress');
    const milestoneMarkers = document.getElementById('milestoneMarkers');
    const addMilestoneBtn = document.getElementById('addMilestone');
    const milestoneForm = document.getElementById('milestoneForm');
    const milestoneTitle = document.getElementById('milestoneTitle');
    const milestoneDate = document.getElementById('milestoneDate');
    const saveMilestoneBtn = document.getElementById('saveMilestone');
    const cancelMilestoneBtn = document.getElementById('cancelMilestone');
    
    // Timeline elements
    const timelineTrack = document.getElementById('timelineTrack');
    const timelineNowMarker = document.getElementById('timelineNowMarker');
    const addTimelineEventBtn = document.getElementById('addTimelineEvent');
    const timelineForm = document.getElementById('timelineForm');
    const eventTitle = document.getElementById('eventTitle');
    const eventDate = document.getElementById('eventDate');
    const eventDescription = document.getElementById('eventDescription');
    const saveEventBtn = document.getElementById('saveEvent');
    const cancelEventBtn = document.getElementById('cancelEvent');
    
    // Goals elements
    const goalsList = document.getElementById('goalsList');
    const newGoalInput = document.getElementById('newGoalInput');
    const addGoalBtn = document.getElementById('addGoal');
    
    // Activity tracker elements
    const logActivityBtn = document.getElementById('logActivity');
    const activityForm = document.getElementById('activityForm');
    const activityCategory = document.getElementById('activityCategory');
    const activityHours = document.getElementById('activityHours');
    const activityDescription = document.getElementById('activityDescription');
    const saveActivityBtn = document.getElementById('saveActivity');
    const cancelActivityBtn = document.getElementById('cancelActivity');
    const personalGrowthTime = document.getElementById('personalGrowthTime');
    const relationshipsTime = document.getElementById('relationshipsTime');
    const workTime = document.getElementById('workTime');
    const healthTime = document.getElementById('healthTime');
    
    // Advice element
    const personalizedAdvice = document.getElementById('personalizedAdvice');
    
    // Share buttons
    const screenshotBtn = document.getElementById('screenshot');
    const shareBtn = document.getElementById('share');
    const saveBtn = document.getElementById('save');
    
    // Global variables
    let birthdate;
    let lifeExpectancy;
    let endDate;
    let timerInterval;
    let milestones = [];
    let timelineEvents = [];
    let goals = [];
    let activities = {
        personalGrowth: 0,
        relationships: 0,
        work: 0,
        health: 0
    };
    
    // Quotes array
    const quotes = [
        '"The fear of death follows from the fear of life. A man who lives fully is prepared to die at any time." - Mark Twain',
        '"It is not death that a man should fear, but he should fear never beginning to live." - Marcus Aurelius',
        '"To the well-organized mind, death is but the next great adventure." - J.K. Rowling',
        '"Life is for the living. Death is for the dead. Let life be like music. And death a note unsaid." - Langston Hughes',
        '"Death is not the greatest loss in life. The greatest loss is what dies inside us while we live." - Norman Cousins',
        '"Our dead are never dead to us, until we have forgotten them." - George Eliot',
        '"Live as if you were to die tomorrow. Learn as if you were to live forever." - Mahatma Gandhi',
        '"The only way to get rid of a temptation is to yield to it." - Oscar Wilde',
        '"Death is nothing, but to live defeated and inglorious is to die daily." - Napoleon Bonaparte',
        '"Life should not be a journey to the grave with the intention of arriving safely in a pretty and well preserved body, but rather to skid in broadside in a cloud of smoke, thoroughly used up, totally worn out, and loudly proclaiming "Wow! What a Ride!"" - Hunter S. Thompson'
    ];
    
    // Advice array based on life percentage
    const adviceByPercentage = [
        { max: 10, advice: "You're just beginning your journey. Take time to explore and discover your passions." },
        { max: 20, advice: "Focus on building a strong foundation for your future through education and experiences." },
        { max: 30, advice: "Now is the time to take risks and pursue ambitious goals while you have energy and fewer responsibilities." },
        { max: 40, advice: "Consider your long-term relationships and career path. Make adjustments if needed." },
        { max: 50, advice: "You're at the midpoint of your life. Reflect on what you've accomplished and what still matters to you." },
        { max: 60, advice: "Focus on health and relationships. Consider how you want to spend the second half of your life." },
        { max: 70, advice: "Share your wisdom with others. Consider mentoring younger generations." },
        { max: 80, advice: "Simplify your life and focus on what brings you joy and peace." },
        { max: 90, advice: "Reflect on your legacy and what you want to leave behind for others." },
        { max: 100, advice: "Focus on finding peace and closure. Express love and gratitude to those around you." }
    ];
    
    // Initialize forms as hidden
    if (milestoneForm) milestoneForm.style.display = 'none';
    if (timelineForm) timelineForm.style.display = 'none';
    if (activityForm) activityForm.style.display = 'none';
    
    // Theme change handler - FIXED
    themeSelect.addEventListener('change', function() {
        const theme = themeSelect.value;
        applyTheme(theme);
        
        // Save to localStorage
        localStorage.setItem('deathTimerTheme', theme);
    });
    
    // Visualization change handler
    visualizationSelect.addEventListener('change', function() {
        const visualization = visualizationSelect.value;
        updateVisualization(visualization);
        
        // Save to localStorage
        localStorage.setItem('deathTimerVisualization', visualization);
    });
    
    // Update brand name when user types
    userNameInput.addEventListener('input', function() {
        updateBrandName();
    });
    
    function updateBrandName() {
        const userName = userNameInput.value.trim();
        if (userName) {
            brandNameElement.textContent = userName.toUpperCase();
        } else {
            brandNameElement.textContent = "MEMENTO";
        }
        
        // Save to localStorage
        localStorage.setItem('deathTimerUserName', userName);
    }
    
    // Calculate button click handler
    calculateBtn.addEventListener('click', function() {
        birthdate = new Date(birthdateInput.value);
        lifeExpectancy = parseInt(lifeExpectancyInput.value);
        
        if (isNaN(birthdate.getTime())) {
            alert('Please enter a valid birthdate');
            return;
        }
        
        if (isNaN(lifeExpectancy) || lifeExpectancy <= 0 || lifeExpectancy > 120) {
            alert('Please enter a valid life expectancy between 1 and 120');
            return;
        }
        
        // Calculate end date
        endDate = new Date(birthdate);
        endDate.setFullYear(birthdate.getFullYear() + lifeExpectancy);
        
        // Format end date for display
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        endDateElement.textContent = `Estimated end date: ${endDate.toLocaleDateString(undefined, options)}`;
        
        // Save inputs to localStorage
        localStorage.setItem('deathTimerBirthdate', birthdateInput.value);
        localStorage.setItem('deathTimerLifeExpectancy', lifeExpectancyInput.value);
        localStorage.setItem('deathTimerUserName', userNameInput.value);
        
        // Show timer container
        timerContainer.style.display = 'block';
        
        // Clear any existing interval
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        // Initialize visualizations
        initializeVisualizations();
        
        // Update timer immediately
        updateTimer();
        
        // Set interval to update timer every second
        timerInterval = setInterval(updateTimer, 1000);
        
        // Update personalized advice
        updatePersonalizedAdvice();
        
        // Initialize notifications if selected
        initializeNotifications();
        
        // Update milestone markers and timeline events
        updateMilestoneMarkers();
        updateTimelineEvents();
        
        // Check if time is running low
        checkTimeRunningLow();
    });
    
    // Update timer function
    function updateTimer() {
        const now = new Date();
        const timeDiff = endDate - now;
        
        if (timeDiff <= 0) {
            // Time is up
            yearsElement.textContent = '0';
            monthsElement.textContent = '0';
            daysElement.textContent = '0';
            hoursElement.textContent = '0';
            minutesElement.textContent = '0';
            secondsElement.textContent = '0';
            clearInterval(timerInterval);
            return;
        }
        
        // Calculate time units
        const seconds = Math.floor((timeDiff / 1000) % 60);
        const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const days = Math.floor((timeDiff / (1000 * 60 * 60 * 24)) % 30);
        const months = Math.floor((timeDiff / (1000 * 60 * 60 * 24 * 30)) % 12);
        const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
        
        // Update display
        yearsElement.textContent = years;
        monthsElement.textContent = months;
        daysElement.textContent = days;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;
        
        // Calculate life percentage
        const totalLifespan = endDate - birthdate;
        const livedLifespan = now - birthdate;
        const percentage = Math.floor((livedLifespan / totalLifespan) * 100);
        
        // Update progress bar and percentage
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
            lifePercentage.textContent = `${percentage}% of life completed`;
        }
        
        // Update analog clock
        updateAnalogClock(percentage);
        
        // Update other visualizations
        updateCalendarView(percentage);
        updateBlocksView(percentage);
        updateHourglassView(percentage);
        
        // Update milestone progress
        if (milestoneProgress) {
            updateMilestoneProgress(percentage);
        }
        
        // Update timeline now marker
        if (timelineNowMarker) {
            updateTimelineNowMarker(percentage);
        }
        
        // Check if time is running low
        checkTimeRunningLow();
    }
    
    // Update analog clock
    function updateAnalogClock(percentage) {
        if (!hourHand || !minuteHand || !secondHand) return;
        
        const hourDegrees = (percentage / 100) * 360;
        const minuteDegrees = ((percentage % 1) * 100) * 3.6;
        const secondDegrees = ((Date.now() / 1000) % 60) * 6;
        
        hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
        minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
        secondHand.style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;
    }
    
    // Initialize visualizations
    function initializeVisualizations() {
        // Get selected visualization
        const visualization = visualizationSelect.value;
        updateVisualization(visualization);
        
        // Initialize calendar view
        initializeCalendarView();
        
        // Initialize blocks view
        initializeBlocksView();
    }
    
    // Update visualization display
    function updateVisualization(visualization) {
        // Hide all visualizations
        for (const key in visualizations) {
            if (visualizations[key]) {
                visualizations[key].style.display = 'none';
            }
        }
        
        // Show selected visualization
        if (visualizations[visualization]) {
            visualizations[visualization].style.display = 'block';
        }
    }
    
    // Initialize calendar view
    function initializeCalendarView() {
        if (!calendarGrid) return;
        
        calendarGrid.innerHTML = '';
        
        // Create 12 months x lifeExpectancy grid
        const totalMonths = lifeExpectancy * 12;
        
        for (let i = 0; i < totalMonths; i++) {
            const monthDiv = document.createElement('div');
            monthDiv.className = 'calendar-month';
            monthDiv.dataset.month = i;
            calendarGrid.appendChild(monthDiv);
        }
    }
    
    // Update calendar view
    function updateCalendarView(percentage) {
        if (!calendarGrid) return;
        
        const totalMonths = lifeExpectancy * 12;
        const completedMonths = Math.floor((totalMonths * percentage) / 100);
        const currentMonth = Math.floor(percentage * totalMonths / 100);
        
        // Update month blocks
        const monthBlocks = calendarGrid.querySelectorAll('.calendar-month');
        monthBlocks.forEach((block, index) => {
            if (index < completedMonths) {
                block.classList.add('past');
            } else {
                block.classList.remove('past');
            }
            
            if (index === currentMonth) {
                block.classList.add('current');
            } else {
                block.classList.remove('current');
            }
        });
    }
    
    // Initialize blocks view
    function initializeBlocksView() {
        if (!blocksContainer) return;
        
        blocksContainer.innerHTML = '';
        
        // Create blocks for each year
        for (let i = 0; i < lifeExpectancy; i++) {
            const yearBlock = document.createElement('div');
            yearBlock.className = 'year-block';
            yearBlock.dataset.year = i;
            blocksContainer.appendChild(yearBlock);
        }
    }
    
    // Update blocks view
    function updateBlocksView(percentage) {
        if (!blocksContainer) return;
        
        const completedYears = Math.floor((lifeExpectancy * percentage) / 100);
        const currentYear = Math.floor(percentage * lifeExpectancy / 100);
        
        // Update year blocks
        const yearBlocks = blocksContainer.querySelectorAll('.year-block');
        yearBlocks.forEach((block, index) => {
            if (index < completedYears) {
                block.classList.add('past');
            } else {
                block.classList.remove('past');
            }
            
            if (index === currentYear) {
                block.classList.add('current');
            } else {
                block.classList.remove('current');
            }
        });
    }
    
    // Update hourglass view
    function updateHourglassView(percentage) {
        if (!hourglassTop || !hourglassBottom) return;
        
        // Adjust the height of top and bottom parts based on percentage
        hourglassTop.style.height = `${(100 - percentage) * 0.4}%`;
        hourglassBottom.style.height = `${percentage * 0.4}%`;
    }
    
    // Milestone functions
    if (addMilestoneBtn) {
        addMilestoneBtn.addEventListener('click', function() {
            milestoneForm.style.display = 'block';
            milestoneDate.value = birthdateInput.value;
        });
    }
    
    if (cancelMilestoneBtn) {
        cancelMilestoneBtn.addEventListener('click', function() {
            milestoneForm.style.display = 'none';
            milestoneTitle.value = '';
            milestoneDate.value = '';
        });
    }
    
    if (saveMilestoneBtn) {
        saveMilestoneBtn.addEventListener('click', function() {
            const title = milestoneTitle.value.trim();
            const date = new Date(milestoneDate.value);
            
            if (!title || isNaN(date.getTime())) {
                alert('Please enter a valid title and date');
                return;
            }
            
            // Add milestone
            milestones.push({
                title: title,
                date: date
            });
            
            // Sort milestones by date
            milestones.sort((a, b) => a.date - b.date);
            
            // Save to localStorage
            localStorage.setItem('deathTimerMilestones', JSON.stringify(milestones));
            
            // Update milestone markers
            updateMilestoneMarkers();
            
            // Reset form
            milestoneForm.style.display = 'none';
            milestoneTitle.value = '';
            milestoneDate.value = '';
        });
    }
    
    function updateMilestoneMarkers() {
        if (!milestoneMarkers || !birthdate || !endDate) return;
        
        milestoneMarkers.innerHTML = '';
        
        if (milestones.length === 0) return;
        
        const totalLifespan = endDate - birthdate;
        
        milestones.forEach((milestone, index) => {
            const milestoneLifespan = milestone.date - birthdate;
            const percentage = (milestoneLifespan / totalLifespan) * 100;
            
            // Create marker
            const marker = document.createElement('div');
            marker.className = 'milestone-marker';
            marker.style.left = `${percentage}%`;
            marker.title = `${milestone.title} - ${milestone.date.toLocaleDateString()}`;
            
            // Add click event to show details
            marker.addEventListener('click', function() {
                alert(`${milestone.title}\n${milestone.date.toLocaleDateString()}`);
            });
            
            milestoneMarkers.appendChild(marker);
        });
    }
    
    function updateMilestoneProgress(percentage) {
        if (!milestoneProgress) return;
        milestoneProgress.style.width = `${percentage}%`;
    }
    
    // Timeline functions
    if (addTimelineEventBtn) {
        addTimelineEventBtn.addEventListener('click', function() {
            timelineForm.style.display = 'block';
            eventDate.value = birthdateInput.value;
        });
    }
    
    if (cancelEventBtn) {
        cancelEventBtn.addEventListener('click', function() {
            timelineForm.style.display = 'none';
            eventTitle.value = '';
            eventDate.value = '';
            eventDescription.value = '';
        });
    }
    
    if (saveEventBtn) {
        saveEventBtn.addEventListener('click', function() {
            const title = eventTitle.value.trim();
            const date = new Date(eventDate.value);
            const description = eventDescription.value.trim();
            
            if (!title || isNaN(date.getTime())) {
                alert('Please enter a valid title and date');
                return;
            }
            
            // Add event
            timelineEvents.push({
                title: title,
                date: date,
                description: description
            });
            
            // Sort events by date
            timelineEvents.sort((a, b) => a.date - b.date);
            
            // Save to localStorage
            localStorage.setItem('deathTimerTimelineEvents', JSON.stringify(timelineEvents));
            
            // Update timeline
            updateTimelineEvents();
            
            // Reset form
            timelineForm.style.display = 'none';
            eventTitle.value = '';
            eventDate.value = '';
            eventDescription.value = '';
        });
    }
    
    function updateTimelineEvents() {
        if (!timelineTrack || !birthdate || !endDate) return;
        
        timelineTrack.innerHTML = '';
        
        if (timelineEvents.length === 0) return;
        
        const totalLifespan = endDate - birthdate;
        
        timelineEvents.forEach((event, index) => {
            const eventLifespan = event.date - birthdate;
            const percentage = (eventLifespan / totalLifespan) * 100;
            
            // Create event item
            const eventItem = document.createElement('div');
            eventItem.className = 'timeline-event';
            eventItem.style.left = `${percentage}%`;
            
            const eventDot = document.createElement('div');
            eventDot.className = 'timeline-event-dot';
            
            const eventContent = document.createElement('div');
            eventContent.className = 'timeline-event-content';
            eventContent.innerHTML = `
                <h4>${event.title}</h4>
                <p class="event-date">${event.date.toLocaleDateString()}</p>
                <p class="event-description">${event.description}</p>
            `;
            
            eventItem.appendChild(eventDot);
            eventItem.appendChild(eventContent);
            timelineTrack.appendChild(eventItem);
        });
    }
    
    function updateTimelineNowMarker(percentage) {
        if (!timelineNowMarker) return;
        timelineNowMarker.style.left = `${percentage}%`;
    }
    
    // Goals functions
    if (addGoalBtn) {
        addGoalBtn.addEventListener('click', function() {
            const goalText = newGoalInput.value.trim();
            
            if (!goalText) {
                alert('Please enter a goal');
                return;
            }
            
            // Add goal
            goals.push({
                text: goalText,
                completed: false
            });
            
            // Save to localStorage
            localStorage.setItem('deathTimerGoals', JSON.stringify(goals));
            
            // Update goals list
            updateGoalsList();
            
            // Reset input
            newGoalInput.value = '';
        });
    }
    
    function updateGoalsList() {
        if (!goalsList) return;
        
        goalsList.innerHTML = '';
        
        goals.forEach((goal, index) => {
            const goalItem = document.createElement('div');
            goalItem.className = 'goal-item';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = goal.completed;
            checkbox.addEventListener('change', function() {
                goals[index].completed = checkbox.checked;
                localStorage.setItem('deathTimerGoals', JSON.stringify(goals));
                updateGoalsList();
            });
            
            const goalText = document.createElement('span');
            goalText.className = goal.completed ? 'goal-text completed' : 'goal-text';
            goalText.textContent = goal.text;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-goal';
            deleteBtn.textContent = '×';
            deleteBtn.addEventListener('click', function() {
                goals.splice(index, 1);
                localStorage.setItem('deathTimerGoals', JSON.stringify(goals));
                updateGoalsList();
            });
            
            goalItem.appendChild(checkbox);
            goalItem.appendChild(goalText);
            goalItem.appendChild(deleteBtn);
            goalsList.appendChild(goalItem);
        });
    }
    
    // Activity tracking functions
    if (logActivityBtn) {
        logActivityBtn.addEventListener('click', function() {
            activityForm.style.display = 'block';
        });
    }
    
    if (cancelActivityBtn) {
        cancelActivityBtn.addEventListener('click', function() {
            activityForm.style.display = 'none';
            activityHours.value = '';
            activityDescription.value = '';
        });
    }
    
    if (saveActivityBtn) {
        saveActivityBtn.addEventListener('click', function() {
            const category = activityCategory.value;
            const hours = parseInt(activityHours.value);
            const description = activityDescription.value.trim();
            
            if (isNaN(hours) || hours <= 0) {
                alert('Please enter valid hours');
                return;
            }
            
            // Add hours to category
            activities[category] += hours;
            
            // Save to localStorage
            localStorage.setItem('deathTimerActivities', JSON.stringify(activities));
            
            // Update activity display
            updateActivityDisplay();
            
            // Reset form
            activityForm.style.display = 'none';
            activityHours.value = '';
            activityDescription.value = '';
        });
    }
    
    function updateActivityDisplay() {
        if (!personalGrowthTime || !relationshipsTime || !workTime || !healthTime) return;
        
        personalGrowthTime.textContent = `${activities.personalGrowth}h`;
        relationshipsTime.textContent = `${activities.relationships}h`;
        workTime.textContent = `${activities.work}h`;
        healthTime.textContent = `${activities.health}h`;
    }
    
    // Quote functions
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', function() {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            quoteText.textContent = quotes[randomIndex];
        });
    }
    
    // Personalized advice function
    function updatePersonalizedAdvice() {
        if (!personalizedAdvice || !birthdate || !endDate) return;
        
        const now = new Date();
        const totalLifespan = endDate - birthdate;
        const livedLifespan = now - birthdate;
        const percentage = Math.floor((livedLifespan / totalLifespan) * 100);
        
        // Find appropriate advice
        let advice = "Live each day to the fullest.";
        for (const item of adviceByPercentage) {
            if (percentage <= item.max) {
                advice = item.advice;
                break;
            }
        }
        
        personalizedAdvice.textContent = advice;
    }
    
    // Notification functions
    function initializeNotifications() {
        const notificationType = notificationsSelect.value;
        
        if (notificationType === 'none') return;
        
        // Check if notifications are supported
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications");
            return;
        }
        
        // Request permission
        Notification.requestPermission().then(function(permission) {
            if (permission === "granted") {
                // Schedule notifications based on frequency
                scheduleNotifications(notificationType);
            }
        });
    }
    
    function scheduleNotifications(type) {
        // Clear any existing notification timers
        if (window.notificationTimer) {
            clearTimeout(window.notificationTimer);
        }
        
        // Set interval based on type
        let interval;
        switch (type) {
            case 'daily':
                interval = 24 * 60 * 60 * 1000; // 24 hours
                break;
            case 'weekly':
                interval = 7 * 24 * 60 * 60 * 1000; // 7 days
                break;
            case 'monthly':
                interval = 30 * 24 * 60 * 60 * 1000; // 30 days
                break;
            default:
                return;
        }
        
        // Schedule first notification
        window.notificationTimer = setTimeout(function() {
            sendNotification();
            
            // Schedule recurring notifications
            setInterval(sendNotification, interval);
        }, interval);
    }
    
    function sendNotification() {
        if (!endDate) return;
        
        const now = new Date();
        const timeDiff = endDate - now;
        
        if (timeDiff <= 0) return;
        
        const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((timeDiff / (1000 * 60 * 60 * 24 * 30)) % 12);
        
        const notification = new Notification("Mortality Timer Reminder", {
            body: `You have approximately ${years} years and ${months} months remaining. Make today count.`,
            icon: "/favicon.ico"
        });
    }
    
    // Share functions
    if (screenshotBtn) {
        screenshotBtn.addEventListener('click', function() {
            alert('Screenshot functionality would capture the current view');
            // Actual implementation would require html2canvas or similar library
        });
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: 'My Mortality Timer',
                    text: 'Check out my remaining time on this Mortality Timer',
                    url: window.location.href
                })
                .catch(error => console.log('Error sharing:', error));
            } else {
                alert('Web Share API not supported in your browser');
            }
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            alert('Save as image functionality would save the current view');
            // Actual implementation would require html2canvas or similar library
        });
    }
    
    // Check if time is running low
    function checkTimeRunningLow() {
        if (!endDate) return;
        
        const now = new Date();
        const timeDiff = endDate - now;
        const yearsLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
        
        // If less than 5 years remaining, add pulse effect to timer
        if (yearsLeft < 5) {
            document.querySelectorAll('.time-block').forEach(block => {
                block.classList.add('pulse-effect');
            });
        } else {
            document.querySelectorAll('.time-block').forEach(block => {
                block.classList.remove('pulse-effect');
            });
        }
    }
    
    // Add pulse animation to elements
    function addPulseAnimation() {
        const elements = document.querySelectorAll('.pulse-effect');
        elements.forEach(element => {
            element.style.animation = 'pulse 2s infinite';
        });
    }
    
    // Check if today is birthday
    function checkBirthday() {
        if (!birthdate) return;
        
        const today = new Date();
        const isBirthday = today.getDate() === birthdate.getDate() && 
                          today.getMonth() === birthdate.getMonth();
        
        if (isBirthday) {
            // Apply birthday theme
            applyTheme('birthday');
            themeSelect.value = 'birthday';
            
            // Show birthday message
            alert(`Happy Birthday! Another year of your journey has passed.`);
        }
    }
    
    // Apply theme function
    function applyTheme(theme) {
        // First, remove all theme classes
        document.body.classList.remove(
            'theme-blood', 
            'theme-ghost', 
            'theme-cemetery', 
            'theme-pumpkin',
            'theme-spring',
            'theme-summer',
            'theme-autumn',
            'theme-winter',
            'theme-birthday'
        );
        
        // Add the selected theme class
        if (theme !== 'default') {
            document.body.classList.add(`theme-${theme}`);
        }
        
        // Apply specific theme styles
        switch(theme) {
            case 'blood':
                document.body.style.backgroundImage = 'linear-gradient(to bottom right, #500, #300)';
                document.querySelectorAll('.time').forEach(el => el.style.color = '#ff0000');
                if (progressBar) progressBar.style.background = 'linear-gradient(to right, #800, #f00)';
                break;
                
            case 'ghost':
                document.body.style.backgroundImage = 'linear-gradient(to bottom right, #334, #112)';
                document.querySelectorAll('.time').forEach(el => el.style.color = '#aabbff');
                if (progressBar) progressBar.style.background = 'linear-gradient(to right, #557, #aaf)';
                break;
                
            case 'cemetery':
                document.body.style.backgroundImage = 'linear-gradient(to bottom right, #353, #131)';
                document.querySelectorAll('.time').forEach(el => el.style.color = '#88ff88');
                if (progressBar) progressBar.style.background = 'linear-gradient(to right, #353, #8f8)';
                break;
                
            case 'pumpkin':
                document.body.style.backgroundImage = 'linear-gradient(to bottom right, #530, #310)';
                document.querySelectorAll('.time').forEach(el => el.style.color = '#ff8800');
                if (progressBar) progressBar.style.background = 'linear-gradient(to right, #730, #f80)';
                break;
                
            case 'spring':
                document.body.style.backgroundImage = 'linear-gradient(to bottom right, #363, #141)';
                document.querySelectorAll('.time').forEach(el => el.style.color = '#88ff88');
                if (progressBar) progressBar.style.background = 'linear-gradient(to right, #363, #8f8)';
                break;
                
            case 'summer':
                document.body.style.backgroundImage = 'linear-gradient(to bottom right, #663, #441)';
                document.querySelectorAll('.time').forEach(el => el.style.color = '#ffff88');
                if (progressBar) progressBar.style.background = 'linear-gradient(to right, #663, #ff8)';
                break;
                
            case 'autumn':
                document.body.style.backgroundImage = 'linear-gradient(to bottom right, #853, #631)';
                document.querySelectorAll('.time').forEach(el => el.style.color = '#ffaa55');
                if (progressBar) progressBar.style.background = 'linear-gradient(to right, #853, #fa5)';
                break;
                
            case 'winter':
                document.body.style.backgroundImage = 'linear-gradient(to bottom right, #359, #137)';
                document.querySelectorAll('.time').forEach(el => el.style.color = '#88aaff');
                if (progressBar) progressBar.style.background = 'linear-gradient(to right, #359, #8af)';
                break;
                
            case 'birthday':
                document.body.style.backgroundImage = 'linear-gradient(to bottom right, #636, #414)';
                document.querySelectorAll('.time').forEach(el => el.style.color = '#ff88ff');
                if (progressBar) progressBar.style.background = 'linear-gradient(to right, #636, #f8f)';
                break;
                
            default: // default theme
                document.body.style.backgroundImage = 'linear-gradient(to bottom right, #1a1a1a, #0a0a0a)';
                document.querySelectorAll('.time').forEach(el => el.style.color = '#ff4757');
                if (progressBar) progressBar.style.background = 'linear-gradient(to right, #ff4757, #ff6b81)';
                break;
        }
    }
    
    // Load saved data from localStorage
    function loadSavedData() {
        // Load user inputs
        const savedBirthdate = localStorage.getItem('deathTimerBirthdate');
        const savedLifeExpectancy = localStorage.getItem('deathTimerLifeExpectancy');
        const savedUserName = localStorage.getItem('deathTimerUserName');
        const savedTheme = localStorage.getItem('deathTimerTheme');
        const savedVisualization = localStorage.getItem('deathTimerVisualization');
        
        // Set inputs if saved
        if (savedBirthdate) birthdateInput.value = savedBirthdate;
        if (savedLifeExpectancy) lifeExpectancyInput.value = savedLifeExpectancy;
        if (savedUserName) userNameInput.value = savedUserName;
        if (savedTheme) themeSelect.value = savedTheme;
        if (savedVisualization) visualizationSelect.value = savedVisualization;
        
        // Update brand name
        updateBrandName();
        
        // Load milestones
        const savedMilestones = localStorage.getItem('deathTimerMilestones');
        if (savedMilestones) {
            try {
                const parsedMilestones = JSON.parse(savedMilestones);
                milestones = parsedMilestones.map(milestone => ({
                    ...milestone,
                    date: new Date(milestone.date)
                }));
            } catch (error) {
                console.error('Error parsing saved milestones:', error);
            }
        }
        
        // Load timeline events
        const savedTimelineEvents = localStorage.getItem('deathTimerTimelineEvents');
        if (savedTimelineEvents) {
            try {
                const parsedEvents = JSON.parse(savedTimelineEvents);
                timelineEvents = parsedEvents.map(event => ({
                    ...event,
                    date: new Date(event.date)
                }));
            } catch (error) {
                console.error('Error parsing saved timeline events:', error);
            }
        }
        
        // Load goals
        const savedGoals = localStorage.getItem('deathTimerGoals');
        if (savedGoals) {
            try {
                goals = JSON.parse(savedGoals);
                updateGoalsList();
            } catch (error) {
                console.error('Error parsing saved goals:', error);
            }
        }
        
        // Load activities
        const savedActivities = localStorage.getItem('deathTimerActivities');
        if (savedActivities) {
            try {
                activities = JSON.parse(savedActivities);
                updateActivityDisplay();
            } catch (error) {
                console.error('Error parsing saved activities:', error);
            }
        }
        
        // If we have saved data, calculate timer automatically
        if (savedBirthdate && savedLifeExpectancy) {
            calculateBtn.click();
        }
    }
    
    // Initialize the application
    function init() {
        // Add pulse animation
        addPulseAnimation();
        
        // Load saved data
        loadSavedData();
        
        // Apply theme
        const savedTheme = localStorage.getItem('deathTimerTheme') || 'default';
        applyTheme(savedTheme);
        
        // Check if today is birthday
        checkBirthday();
        
        // Show random quote
        if (newQuoteBtn) newQuoteBtn.click();
    }
    
    // Call init function when DOM is loaded
    init();
});
    