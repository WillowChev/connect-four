var butt = document.getElementById('butt')
var image = document.getElementById('buttface')

console.log(image)
butt.onclick = () => {
    console.log('button clicked')
    image.style.display = 'inline-block'
    butt.style.display = 'none'
}