const API_URL = "http://your_public_ip:5000"; // 실제 PC의 공개 IP 또는 ngrok URL 사용

// 후보 목록 가져오기
async function loadCandidates() {
    const response = await fetch(`${API_URL}/candidates`);
    const candidates = await response.json();
    const container = document.getElementById("candidates");

    candidates.forEach(candidate => {
        const button = document.createElement("button");
        button.textContent = `${candidate.name} (${candidate.party})`;
        button.onclick = () => vote(candidate.id);
        container.appendChild(button);
    });
}

// 투표하기
async function vote(candidateId) {
    const voterId = document.getElementById("voterId").value;
    if (!voterId) {
        alert("유권자 ID를 입력하세요.");
        return;
    }

    const response = await fetch(`${API_URL}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidate_id: candidateId, voter_id: voterId })
    });

    const result = await response.json();
    alert(result.message);
}

// 페이지 로딩 시 후보 목록 가져오기
loadCandidates();
