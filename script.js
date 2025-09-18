const baseUrl = "https://res.cloudinary.com/dr3r1szcw/image/upload";

const nameInput = document.getElementById("nameInput");
const previewImage = document.getElementById("previewImage");

const sizeSlider = document.getElementById("sizeSlider");
const xSlider = document.getElementById("xSlider");
const ySlider = document.getElementById("ySlider");
const colorPicker = document.getElementById("colorPicker");
const opacitySlider = document.getElementById("opacitySlider");
const blurSlider = document.getElementById("blurSlider");

function generateLink() {
  const name = encodeURIComponent(nameInput.value || "SeuNome");
  const size = sizeSlider.value;
  const x = xSlider.value;
  const y = ySlider.value;
  const color = colorPicker.value.replace("#", "rgb:");
  const opacity = opacitySlider.value;
  const blur = blurSlider.value;

  return `${baseUrl}/l_text:Permanent%20Marker_${size}:${name},co_${color},o_${opacity},e_blur:${blur}/fl_layer_apply,g_center,x_${x},y_${y}/v1758136687/copo_qyzeoa.jpg`;
}

function updatePreview() {
  previewImage.src = generateLink();
}

document.getElementById("generateBtn").addEventListener("click", updatePreview);

document.getElementById("copyBtn").addEventListener("click", () => {
  const link = generateLink();
  navigator.clipboard.writeText(link).then(() => alert("Link copiado!"));
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  const link = generateLink();
  const a = document.createElement("a");
  a.href = link;
  a.download = "copo_personalizado.jpg";
  a.click();
});

[nameInput, sizeSlider, xSlider, ySlider, colorPicker, opacitySlider, blurSlider].forEach(el => {
  el.addEventListener("input", updatePreview);
});

// preview inicial
updatePreview();