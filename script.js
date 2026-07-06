async function saveData() {
    const name = document.getElementById("name").value.trim();
    const status = document.getElementById("status").value;

    if (!name) { alert("กรุณากรอกชื่อ-สกุล"); return; }

    // 1. เช็คชื่อซ้ำก่อน
    google.script.run.withSuccessHandler(data => {
        const list = JSON.parse(data);
        const isDuplicate = list.some(row => row[0] === name); // เช็คว่าชื่อตรงกันไหม

        if (isDuplicate) {
            alert("⚠️ แจ้งเตือน: มีรายชื่อนี้อยู่ในระบบแล้ว!");
            return; // หยุดทำงาน ไม่บันทึก
        } else {
            // 2. ถ้าไม่ซ้ำ ให้บันทึก
            performSave(name, status);
        }
    }).doGetRawData();
}

async function performSave(name, status) {
    const isUpdate = document.getElementById("submitBtn").innerText === "บันทึกการแก้ไข";
    await fetch("URL_ของคุณ_ที่นี่/exec", {
        method: 'POST',
        mode: 'no-cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name: name, status: status, action: isUpdate ? "update" : "add" })
    });
    alert("บันทึกข้อมูลเรียบร้อย!");
    document.getElementById("name").value = "";
}