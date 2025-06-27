document.addEventListener("DOMContentLoaded", () =>
{
    const text = "Color the Fox!";
    const heading = document.querySelector("h1");
    heading.textContent = "";
    let i=0;
    const type = () => 
    {
        if (i < text.length)
        {
            heading.textContent += text[i];
            i++;
            setTimeout(type,150);
        }
    };
    type();
});

function setup( ) 
{
    let canvas = createCanvas (400, 400);
    canvas.position(550,300);
    let img = createImg('cute-fox.png');
    img.position(canvas.x, canvas.y);
    img.size(400, 400);
    img.style('position','absolute');
    img.style('pointer-events','none');
    img.style('z-index','10');
    background(255);
    strokeWeight(20);
    colorMode (RGB);
}

function draw()
{
    if(mouseIsPressed) 
    {
        circle(mouseX, mouseY, 20 ,20);
        stroke(200,77,55);
    }
}

