document.getElementById("uploadForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData();
    let fileInput = document.getElementById("imageInput").files[0];
    
    if (!fileInput) {
        alert("Please select an image!");
        return;
    }

    formData.append("image", fileInput);

    fetch("/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert("Error: " + data.error);
            return;
        }

        // Show image preview
        let previewImage = document.getElementById("previewImage");
        previewImage.src = data.image_path;
        previewImage.style.display = "block";

        // Display predictions
        let resultContainer = document.getElementById("results");
        let predictionList = document.getElementById("predictionList");

        predictionList.innerHTML = ""; // Clear previous results

        for (let [disease, confidence] of Object.entries(data.predictions)) {
            let listItem = document.createElement("li");
            listItem.innerHTML = `<b>${disease.replace("_", " ").toUpperCase()}</b>: ${confidence}%`;
            predictionList.appendChild(listItem);
        }

        resultContainer.style.display = "block";
    }  )
    .catch(error => {
        alert("Something went wrong!");
        console.error("Error:", error);
    });
});
