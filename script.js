function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

async function uploadData() {
    const btn = document.getElementById("submitBtn");
    const fileInput = document.getElementById("imageFile");
    const file = fileInput.files[0];
    
    if (!file) { alert("กรุณาเลือกรูปภาพ"); return; }

    btn.innerText = "กำลังอัปโหลด...";
    btn.disabled = true;

    // แปลงไฟล์รูปเป็นข้อความ (Base64) เพื่อส่งเข้า Google Script
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
        const payload = {
            name: document.getElementById("name").value,
            image: reader.result, // ข้อมูลรูปภาพ
            status: document.getElementById("status").value
        };

        try {
            await fetch("YOUR_SCRIPT_URL_HERE", {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            alert("บันทึกสำเร็จ!");
        } catch (e) { alert("ผิดพลาด!"); }
        finally { btn.innerText = "บันทึกข้อมูล"; btn.disabled = false; }
    };
}