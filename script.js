async function uploadData() {
    const btn = document.getElementById("submitBtn");
    const name = document.getElementById("name").value;
    const status = document.getElementById("status").value;

    if (!name) { alert("กรุณากรอกชื่อ-สกุล"); return; }

    btn.innerText = "กำลังบันทึก...";
    btn.disabled = true;

    // URL ล่าสุดจากการ Deploy
    const URL = "https://script.google.com/macros/s/AKfycbyGaZpXjacnlE2yQgdIfB0LsvWcnwG5FtUeR3WUycs3tcQAvENArPgpPtWwxBBiY7lT/exec"; 

    try {
        await fetch(URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, status: status })
        });
        alert("บันทึกข้อมูลเรียบร้อย!");
        document.getElementById("name").value = ""; // เคลียร์ชื่อหลังบันทึก
    } catch (e) {
        alert("เกิดข้อผิดพลาด: " + e);
    } finally {
        btn.innerText = "บันทึกข้อมูล";
        btn.disabled = false;
    }
}