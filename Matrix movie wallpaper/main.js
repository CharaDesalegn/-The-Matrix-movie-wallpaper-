const canvas = document.getElementById("canvas")
const crop = 30
const width = window.innerWidth -crop
const height = window.innerHeight -crop

canvas.width = width
canvas.height = height
const line_separation = 25
const fps = 60

const ctx = canvas.getContext("2d")
canvas.style.backgroundColor = "black"

ctx.shadowBlur = 0.5;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;





class Text_line{
    constructor(x,y,text_line){
        this.x = x
        this.y = y
        this.speed = 6 + (Math.floor(Math.random()*3)-1)

        this.text_line = text_line
        this.draw()
                
        setInterval(()=>{
            let k = Math.floor(Math.random()*4)

            this.change_one_text(k)
        },3000/(Math.floor(Math.random()*2)+1))
    }
    draw(){
        let indx = 0
        for(let text of this.text_line){
            ctx.fillStyle = "rgb(0," + String(250-50*indx) + ",0)";
            ctx.shadowColor = "rgb(0," + String(250-30*indx) + ",0)";
            ctx.fillText(text,this.x,this.y - line_separation*indx);
            indx+= 1
        }
        ctx.fillStyle = "white"
        ctx.font = String(this.speed *2+5) + "px Arial";

        ctx.shadowColor = "rgb(0," + String(250-30*indx) + ",0)";
        ctx.fillText(this.text_line[this.text_line.length-1],this.x,this.y + line_separation);
        this.y += this.speed
    }
    change_one_text(k){
        this.text_line[this.text_line.length-1] = text_lines[k][0]
        // console.log("aaaaaa")
    }
}
let text_lines = [
    ["猫", "咪", "猫", "咪", "世", "界"],
    ["必", "将", "必", "将", "統", "治"],
    ["王", "霸", "王", "霸", "厉", "害"],
    ["是", "就", "是", "就", "強", "大"],
    ["世", "界", "世", "界", "貓", "咪"]
]
// let text_lines = [
//     ["C", "M", "C", "M", "W"],
//     ["W", "S", "W", "S", "R"],
//     ["K", "D", "K", "D", "P"],
//     ["I", "E", "I", "E", "S"],
//     ["W", "W", "W", "W", "C", "M"]
// ];

let l = new Text_line(100,0,text_lines[1])

let All_text_line = [l]


function Add_line(quantity){
    for(let i = 0;i<quantity;i++){
        let temp = new Text_line(25*Math.floor(Math.random()*width/line_separation),0-Math.floor(Math.random()*500),text_lines[Math.floor(Math.random()*text_lines.length)])
        All_text_line.push(temp)
    }
}

Add_line(100)


function update(){
    ctx.clearRect(0,0,width,height)
    for(let i = 0;i<All_text_line.length;i++){

        All_text_line[i].draw()
        if(All_text_line[i].y > 1000){
            All_text_line.splice(i, 1)
            Add_line(1)
        }
    }
    
}


setInterval(()=>{
    update()
},1000/fps)
