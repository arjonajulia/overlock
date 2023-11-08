document.getElementById('file').addEventListener('change', function() {
    document.getElementById('res').textContent = this.files[0].name
})
