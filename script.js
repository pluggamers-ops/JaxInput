const URL = "ใส่ URL ใหม่ของคุณที่นี่/exec";

async function saveData() {
    const name = document.getElementById("name").value.trim();
    const status = document.getElementById("status").value;
    const isUpdate = document.getElementById("submitBtn").innerText === "บันทึกการแก้ไข";

    if (!name) { alert("กรุณากรอกชื่อ"); return; }

    const res = await fetch(URL + "?action=getData");
    const list = await res.json();
    if (list.some(r => r[0] === name) && !isUpdate) { alert("⚠️ ชื่อนี้มีอยู่ในระบบแล้ว!"); return; }

    await fetch(URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify({name, status, action: isUpdate ? "update" : "add"}) });
    alert("บันทึกสำเร็จ!");
    location.reload();
}

async function searchData() {
    const keyword = document.getElementById("searchBox").value.toLowerCase();
    const res = await fetch(URL + "?action=getData");
    const list = await res.json();
    const container = document.getElementById('resultContainer');
    container.innerHTML = "";
    list.forEach(row => {
        if(row[0].toLowerCase().includes(keyword)) {
            container.innerHTML += `<div class="result-item">${row[0]} <button class="edit-btn" onclick="edit('${row[0]}','${row[1]}')">แก้ไข</button></div>`;
        }
    });
}

function edit(name, status) {
    document.getElementById("name").value = name;
    document.getElementById("status").value = status;
    document.getElementById("submitBtn").innerText = "บันทึกการแก้ไข";
    showPage('form', 'nav-form');
}