async function uploadData() {
    const btn = document.getElementById("submitBtn");
    const name = document.getElementById("name").value;
    const status = document.getElementById("status").value;
    const file = document.getElementById("imageFile").files[0];

    if (!file || !name) { alert("กรุณากรอกชื่อและเลือกรูปภาพ"); return; }

    btn.innerText = "กำลังบันทึก...";
    btn.disabled = true;

    // เปลี่ยน URL ตรงนี้ด้วย URL ใหม่ล่าสุดที่ได้จากการกด Deploy > New Version
    const URL = "https://script.google.com/macros/s/AKfycbyGaZpXjacnlE2yQgdIfB0LsvWcnwG5FtUeR3WUycs3tcQAvENArPgpPtWwxBBiY7lT/exec"; 

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, image: reader.result, status: status })
            });
            alert("บันทึกข้อมูลและอัปโหลดรูปสำเร็จ!");
            document.getElementById("name").value = "";
        } catch (e) {
            alert("เกิดข้อผิดพลาด: " + e);
        } finally {
            btn.innerText = "บันทึกข้อมูล";
            btn.disabled = false;
        }
    };
}