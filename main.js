Status = "";
object = [];
function preload()
{
    
    siren = loadSound("alarm.mp3");

}

function setup()
{
    Canvas= createCanvas(400,400);
    Canvas.center();
    Video = createCapture(VIDEO);
    Video.hide();
    CoCo = ml5.objectDetector("cocossd", ModelL);
    document.getElementById("status").innerHTML = "Status Detecting Objects";
}

function ModelL()
{
    console.log("Model Loaded");
    Status = true;
    CoCo.detect(Video , Results);
}

function Results(error,result)
{
    if (error)
    {
        console.error(error);
    }

    else
    {
        console.log(result);
        object = result;
    }
}
 
function draw()
{
    image(Video,0,0,400,400);
    if (Status != "")
    {
        for (i=0; i<object.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill("red");
            Percent = floor(object[i].confidence*100);
            text(object[i].label+" "+Percent+"%",object[i].x+10,object[i].y+20);
            noFill();
            stroke("red");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if (object[i].label == "person")
            {
                document.getElementById("baby").innerHTML = "Baby Found";
            }
            else
            {
                document.getElementById("baby").innerHTML = "Baby Not Found";
                siren.play();
            }
        }

        if (object.length < 0)
        {
            document.getElementById("baby").innerHTML = "Baby Not Found";
            siren.play();
        }
    }
}

