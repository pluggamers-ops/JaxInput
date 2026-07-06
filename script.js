async function sendDataToSheet() {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyGaZpXjacnlE2yQgdIfB0LsvWcnwG5FtUeR3WUycs3tcQAvENArPgpPtWwxBBiY7lT/exec";
  
  const payload = {
    name: document.getElementById("name").value,
    image: document.getElementById("imageLink").value,
    status: document.getElementById("status").value
  };

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    alert("บันทึกข้อมูลเรียบร้อยแล้ว!");
  } catch (error) {
    console.error("Error:", error);
    alert("เกิดข้อผิดพลาดในการบันทึก");
  }
}