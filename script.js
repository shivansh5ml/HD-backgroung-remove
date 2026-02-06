async function removeBg() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("image_file", file);
  formData.append("size", "auto");

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": "
    },
    body: formData
  });

  const blob = await response.blob();
  const imgURL = URL.createObjectURL(blob);
  document.getElementById("resultImg").src = imgURL;
  document.getElementById("downloadBtn").href = imgURL;
}


