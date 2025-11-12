// Wait for the page to load
document.getElementById("generateBtn").addEventListener("click", function() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const skills = document.getElementById("skills").value;
  const experience = document.getElementById("experience").value;
  const education = document.getElementById("education").value;

  // Create resume HTML
  const resumeHTML = `
    <div class="resume-section"><strong>Name:</strong> ${name}</div>
    <div class="resume-section"><strong>Email:</strong> ${email}</div>
    <div class="resume-section"><strong>Phone:</strong> ${phone}</div>
    <div class="resume-section"><strong>Address:</strong> ${address}</div>
    <div class="resume-section"><strong>Skills:</strong> ${skills}</div>
    <div class="resume-section"><strong>Experience:</strong><p>${experience}</p></div>
    <div class="resume-section"><strong>Education:</strong><p>${education}</p></div>
  `;

  // Display the resume
  document.getElementById("outputContent").innerHTML = resumeHTML;
  document.getElementById("resumeOutput").style.display = "block";
});

// Generate PDF
document.getElementById("downloadPDF").addEventListener("click", function() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const resumeText = document.getElementById("outputContent").innerText;
  const lines = doc.splitTextToSize(resumeText, 180);
  doc.text(lines, 10, 10);
  doc.save("Resume.pdf");
});

// Generate DOC
document.getElementById("downloadDOC").addEventListener("click", function() {
  const content = document.getElementById("outputContent").innerHTML;
  const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
                 "xmlns:w='urn:schemas-microsoft-com:office:word' " +
                 "xmlns='http://www.w3.org/TR/REC-html40'>" +
                 "<head><meta charset='utf-8'><title>Resume</title></head><body>";
  const footer = "</body></html>";
  const sourceHTML = header + content + footer;

  const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
  const fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = 'Resume.doc';
  fileDownload.click();
  document.body.removeChild(fileDownload);
});
