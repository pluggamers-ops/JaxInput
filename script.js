function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

async function sendDataToSheet() {
    const btn = document.getElementById("submitBtn");
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyGaZpXjacnlE2yQgdIfB0LsvWcnwG5FtUeR3WUycs3tcQAvENArPgpPtWwxBBiY7lT/exec";
    
    btn.innerText = "กำลังบันทึก...";
    btn.disabled = true;

    const payload = {
        name: document.getElementById("name").value,
        image: document.getElementById("imageLink").value,
        status: document.getElementById("status").value
    };

    try {
        await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        alert("บันทึกสำเร็จ!");
        document.getElementById("name").value = "";
        document.getElementById("imageLink").value = "";
    } catch (e) {
        alert("ผิดพลาด!");
    } finally {
        btn.innerText = "บันทึกข้อมูล";
        btn.disabled = false;
    }
}