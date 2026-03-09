let allIssues = [];
const issueContainer = document.getElementById('issueContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
const allTab = document.getElementById('all-issues');
const openTab = document.getElementById('openIssues');
const closedTab = document.getElementById('closedIssues');
const issueDetailsModal = document.getElementById('issue_details_modal');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function showLoading(){
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
    issueContainer.innerHTML = "";
}

function hideLoading(){
    loadingSpinner.classList.add("hidden");
    loadingSpinner.classList.remove("flex");
}

async function loadData(){
    showLoading();
    const response = await fetch ('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await response.json();
    hideLoading();
    allIssues = data.data;
    displayCards(allIssues);
}

// labels color
const labelColors = {
    "bug": "bg-[#FEECEC] text-[#EF4444] border-[#FECACA]",
    "enhancement": "bg-[#DEFCE8] text-[#00A96E] border-[#BBF7D0]",
    "help wanted": "bg-[#FFF8DB] text-[#D97706] border-[#FDE68A]",
    "good first issue": "bg-blue-100 text-blue-600 border-blue-300",
    "documentation": "bg-pink-100 text-pink-600 border-pink-300"
}

async function displayCards(issues){
    issueContainer.innerHTML = "";
    const totalIssue = issues.length;
    const numberOfIssue = document.getElementById('numberOfIssue');
    numberOfIssue.innerText = totalIssue + ' Issues'

    issues.forEach((issue) => {

        // status
        if(issue.status == "open"){
            statusClass = "./assets/Open-Status.png";
            borderColor = "border-[#00A96E]";
        }
        else if(issue.status === "closed"){
            statusClass = "./assets/Closed-Status.png";
            borderColor = "border-[#A855F7]";
        }


        // priority
        if(issue.priority === "high") {
            priorityClass = "bg-[#FEECEC] text-[#EF4444]";
        }
        else if(issue.priority === "medium") {
            priorityClass = "bg-[#FFF6D1] text-[#F59E0B]";
        }
        else if(issue.priority === "low") {
            priorityClass = "bg-[#EEEFF2] text-[#9CA3AF]";
        }

        const card = document.createElement("div");
        card.className = `w-[95%] mx-auto bg-white shadow rounded p-4 mb-2 border-t-4 ${borderColor}`;
        card.innerHTML = `
            <div class="flex justify-between mb-4">
                <img src="${statusClass}" alt="">
                <div class="badge badge-soft rounded-full px-6 py-1 border-none uppercase text-xs font-semibold ${priorityClass}">${issue.priority}</div>
            </div>

            <div class="mb-4">
                <h3 class="font-semibold text-md h-14 cursor-pointer" onclick="OpenIssueDetailsModal(${issue.id})">${issue.title}</h3>
                <p class="text-[#64748B] text-sm line-clamp-2">${issue.description}</p>
            </div>



            <div class="flex flex-wrap gap-2 mb-4">
            ${issue.labels.map(label => `
                <div class="badge badge-soft ${labelColors[label]} rounded-full border px-2 py-0.5"><p class="uppercase text-[10px]">${label}</p></div>
            `).join("")}
            </div>

            <hr class="text-[#E4E4E7]">

            <div class="text-[#64748B] text-sm mt-2">
                <p>#${issue.id} by ${issue.author}</p>
                <p>${issue.createdAt.slice(0, 10)}</p>
            </div>
        `
        issueContainer.appendChild(card);
    });
}


// tabs
document.getElementById('all-issues').addEventListener('click', () => {
    displayCards(allIssues);
});

document.getElementById('openIssues').addEventListener('click', () => {
    const openStatusIssue = allIssues.filter(issue => issue.status === 'open');
    displayCards(openStatusIssue);
});

document.getElementById('closedIssues').addEventListener('click', () => {
    const closedStatusIssue = allIssues.filter(issue => issue.status === 'closed');
    displayCards(closedStatusIssue);
});

// active tab color
allTab.addEventListener('click', () => {
    allTab.classList.add("bg-[#4A00FF]", "text-white");
    openTab.classList.remove("bg-[#4A00FF]", "text-white");
    closedTab.classList.remove("bg-[#4A00FF]", "text-white");

    allTab.classList.remove("bg-white");
    openTab.classList.add("bg-white");
    closedTab.classList.add("bg-white");
});

openTab.addEventListener('click', () => {
    openTab.classList.add("bg-[#4A00FF]", "text-white");
    allTab.classList.remove("bg-[#4A00FF]", "text-white");
    closedTab.classList.remove("bg-[#4A00FF]", "text-white");

    openTab.classList.remove("bg-white");
    allTab.classList.add("bg-white");
    closedTab.classList.add("bg-white");
});

closedTab.addEventListener('click', () => {
    closedTab.classList.add("bg-[#4A00FF]", "text-white");
    openTab.classList.remove("bg-[#4A00FF]", "text-white");
    allTab.classList.remove("bg-[#4A00FF]", "text-white");

    closedTab.classList.remove("bg-white");
    allTab.classList.add("bg-white");
    openTab.classList.add("bg-white");
});


async function OpenIssueDetailsModal(issueId){
    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`);
    const data = await response.json();
    const issueDetails = data.data;
    console.log(issueDetails, "data");

    const card = document.createElement("div");
        card.className = `w-[50%] bg-white shadow rounded p-4 mb-2`;
        card.innerHTML = `
            <h3 class="text-2xl font-semibold mb-2">${issueDetails.title}</h3>
            <div class="flex flex-col items-center gap-2 sm:flex-row">
                <div class="badge badge-soft rounded-full px-6 py-1 border-none uppercase text-xs font-semibold bg-[#00A96E] text-white">${issueDetails.status}</div>
                <div class="flex flex-col items-center gap-2 sm:flex-row">
                    <div class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-[#64748B] rounded-full"></div>
                        <p class="text-[#64748B]">Opened by ${issueDetails.author}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-[#64748B] rounded-full"></div>
                        <p class="text-[#64748B]">${issueDetails.createdAt.slice(0, 10)}</p>
                    </div>
                </div>
            </div>

            <div class="flex flex-wrap gap-2 mb-4 mt-4">
            ${issueDetails.labels.map(labels => `
                <div class="badge badge-soft ${labelColors[labels]} rounded-full border"><p class="uppercase text-xs">${labels}</p></div>
            `).join("")}
            </div>

            <p class="mb-4 text-[#64748B]">${issueDetails.description}</p>
            <div class="grid grid-cols-2 bg-[#F8FAFC] p-6 rounded">
                <div class="flex flex-col">
                    <p class="text-[#64748B]">Assignee: </p>
                    <p><strong>${issueDetails.author}</strong></p>
                </div>
                <div class="flex flex-col items-center">
                    <p class="text-[#64748B]">Priority:</p>
                    <div class="badge badge-soft bg-[#FEECEC] text-[#EF4444] rounded-full border border-[#FECACA]"><p class="uppercase text-xs">${issueDetails.priority}</p></div>
                </div>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-primary">Close</button>
                </form>
            </div>
        `
        
    issueDetailsModal.innerHTML = "";
    issueDetailsModal.appendChild(card);
    issueDetailsModal.showModal();
}

document.getElementById("searchBtn").addEventListener("click", async function(){
    const searchText = searchInput.value.toLowerCase();
    console.log(searchText)

    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);
    const data = await response.json();

    displayCards(data.data);
});


loadData();
