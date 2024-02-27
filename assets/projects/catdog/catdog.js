const CLASSES = {
    0: 'cat',
    1: 'dog'
    };

$("document").ready (async function() {
    model = await tf.loadLayersModel('http://127.0.0.1:5500/model/model.json');
    console.log('Load model');
    console.log(model.summary());
    });

    function previewImage(event) {
        const fileInput = event.target;
        const files = fileInput.files;
        const imagePreview = document.getElementById('imagePreview');

        if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
        }
        reader.readAsDataURL(file);
        } else {
        imagePreview.src = 'assest/img/no-img.jpg';
        }
};

async function classifyImage() {
        let image = document.getElementById("imagePreview");
        let img = tf.browser.fromPixels(image);
        let normalizationOffset = tf.scalar(255/2); // 127.5
        let tensor = img
                .resizeNearestNeighbor([224, 224])
                .toFloat()
                .sub(normalizationOffset)
                .div(normalizationOffset)
                .reverse(2)
                .expandDims();

        let predictions = await model.predict(tensor);
        predictions = Array.from(predictions.dataSync());
        console.log(predictions);

        let top5 = Array.from(predictions)
            .map(function (p, i) {
                return {
                    probability: p,
                    className: CLASSES[i]
                };
            }).sort(function (a, b) {
                return b.probability - a.probability;
            });
            console.log(top5);
            $("#result").empty();
            top5.forEach(function (p) {
                    $("#result").append(`<li>${p.className}: ${p.probability.toFixed(3)}</li>`);
                });
};

$("#imageInput").change(function () {
    let reader = new FileReader();
    reader.onload = function () {
        let dataURL = reader.result;

        imEl = document.getElementById("imagePreview");
        imEl.onload = function () {
            classifyImage();
        }
        $("#display_image").attr("src", dataURL);
        $("#result_info").empty();
    }

    let file = $("#imageInput").prop("files")[0];
    reader.readAsDataURL(file);
});